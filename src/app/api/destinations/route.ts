import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/mongodb';
import { Destination } from '@/models/destination';

export async function GET() {
  try {
    await connectDB();
    const destinations = await Destination.find({});
    return NextResponse.json(destinations);
  } catch (error) {
    console.error('Error fetching destinations:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession();

    if (!session || (session.user as any).role !== 'ADMIN') {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body = await req.json();
    const { name, description, image, location, price } = body;

    if (!name || !description || !image || !location || !price) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    await connectDB();

    const destination = await Destination.create({
      name,
      description,
      image,
      location,
      price,
    });

    return NextResponse.json(destination);
  } catch (error) {
    console.error('Error creating destination:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 