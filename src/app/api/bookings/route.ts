import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/mongodb';
import { Booking } from '@/models/booking';
import { User } from '@/models/user';

export async function GET(req: Request) {
  try {
    const session = await getServerSession();
    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    await connectDB();
    const user = await User.findOne({ email: session.user?.email });

    if (!user) {
      return new NextResponse('User not found', { status: 404 });
    }

    // If admin, return all bookings, otherwise return only user's bookings
    const bookings = (session.user as any).role === 'ADMIN'
      ? await Booking.find({}).populate('destinationId').populate('userId', '-password')
      : await Booking.find({ userId: user._id }).populate('destinationId');

    return NextResponse.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body = await req.json();
    const { destinationId, startDate, endDate, totalPrice } = body;

    if (!destinationId || !startDate || !endDate || !totalPrice) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    await connectDB();
    const user = await User.findOne({ email: session.user?.email });

    if (!user) {
      return new NextResponse('User not found', { status: 404 });
    }

    const booking = await Booking.create({
      userId: user._id,
      destinationId,
      startDate,
      endDate,
      totalPrice,
      status: 'PENDING',
    });

    const populatedBooking = await Booking.findById(booking._id)
      .populate('destinationId')
      .populate('userId', '-password');

    return NextResponse.json(populatedBooking);
  } catch (error) {
    console.error('Error creating booking:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 