const categorySchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'Please provide a name for the category']
    },
    flexB: {
      type: Boolean,
      required: [true, 'Please specify if the category is for flexible budgeting']
    },
    transactions: [transactionSchema]
  });
  