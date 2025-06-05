import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' }); // Explicitly load the correct file
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/mongodb';
import { User } from '@/models/user';

async function seed() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    await connectDB();

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@bg-tours.com' });
    if (existingAdmin) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    // Create admin user
    const genSalt = await bcrypt.genSalt(10)
    await User.create({
      name: 'Admin User',
      email: 'admin@bg-tours.com',
      password: "umer.123",
      role: 'ADMIN',
    });

    console.log('Admin user created successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

// Execute the seed function
seed().catch((error) => {
  console.error('Error in seed script:', error);
  process.exit(1);
}); 