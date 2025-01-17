try {
  console.log('Connecting to MongoDB...');
  const conn = await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log(`MongoDB connected: ${conn.connection.host}`);
} catch (error) {
  console.error(`MongoDB connection error: ${error.message}`);
  console.error(error); // Log full error details
  process.exit(1);
}
