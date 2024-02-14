require('dotenv').config({ path: '../.env' });
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const schema = require('./graphql/schemas');
const jwt = require('jsonwebtoken');
const User = require('./models/User');

async function startServer() {
	console.log('Starting the server...');

	const app = express();
	app.use(helmet());

	const allowedOrigins = [
		'http://localhost:5173' // Main frontend domain
	];

	app.use(
		cors({
			origin: function (origin, callback) {
				if (!origin || allowedOrigins.includes(origin)) {
					callback(null, true);
				} else {
					console.error(`Origin not allowed by CORS: ${origin}`);
					callback(new Error('Not allowed by CORS'));
				}
			}
		})
	);

	app.use(
		rateLimit({
			windowMs: 15 * 60 * 1000, // 15 minutes
			max: 100 // limit each IP to 100 requests per windowMs
		})
	);

	app.use(express.json());

	 app.use((req, res, next) => {
        console.log('Incoming request:', req.path);
        console.log('Headers:', req.headers);
        console.log('Body:', req.body); // Body will be parsed JSON due to express.json() middleware
        next();
    });

	console.log('Connecting to MongoDB...');
	console.log('MONGODB_URI:', process.env.MONGODB_URI);

	mongoose
		.connect(process.env.MONGODB_URI)
		.then(() => console.log('Connected to MongoDB'))
		.catch(err => console.error('Error connecting to MongoDB:', err));

	const server = new ApolloServer({
		schema,
		context: async ({ req }) => {
			// Initialize an empty context
			const context = {
				req
			};

			// Get the token from the Authorization header
			const authHeader = req.headers.authorization || '';
			const token = authHeader.split(' ')[1]; // Assumes "Bearer [token]"

			if (token) {
				try {
					// Verify the token
					const decoded = jwt.verify(token, process.env.JWT_SECRET);

					// Find the user based on the token's payload
					const user = await User.findById(decoded.id);

					// Add the user to the context if found
					if (user) {
						context.user = user;
					}
				} catch (err) {
					console.error('Authentication error:', err);
				}
			}

			return context;
		}
	});

	await server.start();
	server.applyMiddleware({ app, path: '/graphql' });

	const PORT = process.env.PORT;
	app.listen(PORT, () => {
		console.log(`Server running on port ${PORT}`);
		console.log(`GraphQL path is ${server.graphqlPath}`);
		console.log('Server started!');
	});
}

startServer();
