import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectDB from '@/lib/mongodb';
import { Destination } from '@/models/destination';
import { User } from '@/models/user';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    const [
      totalDestinations,
      totalUsers,
      // Add more stats as needed
    ] = await Promise.all([
      Destination.countDocuments(),
      User.countDocuments(),
    ]);

    return NextResponse.json({
      totalDestinations,
      totalUsers,
      totalBookings: 0, // Add when booking model is created
      totalRevenue: 0, // Add when booking model is created
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
} 