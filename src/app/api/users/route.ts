import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/mongodb';
import { User } from '@/models/user';
import bcrypt from 'bcryptjs';

export async function GET() {
  try {
    const session = await getServerSession();

    if (!session || (session.user as any).role !== 'ADMIN') {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    await connectDB();
    const users = await User.find({}).select('-password');
    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password, role } = body;

    if (!name || !email || !password) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    await connectDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new NextResponse('User already exists', { status: 400 });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: role || 'USER',
    });

    const { password: _, ...userWithoutPassword } = user.toObject();
    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    console.error('Error creating user:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 