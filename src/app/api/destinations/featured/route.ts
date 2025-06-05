import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Destination } from '@/models/destination';

export async function GET() {
  try {
    await connectDB();
    const featuredDestinations = await Destination.find({ featured: true })
      .sort({ createdAt: -1 })
      .limit(6);
    return NextResponse.json(featuredDestinations);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch featured destinations' },
      { status: 500 }
    );
  }
} 