import mongoose from 'mongoose';

async function connect() {  
  const db = await mongoose.connect(process.env.MONGO_URI)
  console.log('Connected to MongoDB ');
  return db;
}

export default connect;