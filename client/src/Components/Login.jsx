import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../client-graphql/queries/loginUser';
import { useNavigate } from 'react-router-dom';

function Login() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [loginUser] = useMutation(LOGIN_USER);
	const navigate = useNavigate();

	const handleSubmit = async e => {
		e.preventDefault();

		try {
			const { data } = await loginUser({
				variables: {
					username,
					password
				}
			});

			console.log('Data sent to server:', { username });

			if (data && data.loginUser && data.loginUser.token) {
				const token = data.loginUser.token;
				console.log('Token received from server:', token);
				localStorage.setItem('token', token);
				navigate('/overviewpage');
			}
		} catch (error) {
			console.error('Login error:', error);
		}
	};

	return (
		<div
			className="min-h-screen flex items-center justify-center"
			style={{ backgroundImage: `url(/Loginbg.jpg)`, backgroundSize: 'cover' }}
		>
			<div className="p-8 bg-white rounded shadow-lg w-80">
				<h1 className="mb-6 text-3xl font-bold text-center font-rubik-doodle">
					Login
				</h1>
				<form onSubmit={handleSubmit}>
					<label className="block mb-2">
						Username:
						<input
							type="text"
							name="username"
							value={username}
							onChange={e => setUsername(e.target.value)}
							className="w-full px-3 py-2 border rounded mt-1"
						/>
					</label>
					<label className="block mb-2">
						Password:
						<input
							type="password"
							name="password"
							value={password}
							onChange={e => setPassword(e.target.value)}
							className="w-full px-3 py-2 border rounded mt-1"
						/>
					</label>
					<input
						type="submit"
						value="Submit"
						className="w-full px-3 py-2 mt-4 text-white bg-gradient-to-r from-blue-500 to-green-500 hover:from-pink-500 hover:to-yellow-500 rounded cursor-pointer active:scale-90 transform transition duration-300 ease-in-out hover:scale-105"
					/>
				</form>
			</div>
			
		</div>
	);
}

export default Login;
