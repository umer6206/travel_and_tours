import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Destination } from '@/models/destination';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const destination = await Destination.findById(params.id);
    
    if (!destination) {
      return NextResponse.json(
        { error: 'Destination not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(destination);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch destination' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const body = await request.json();
    const destination = await Destination.findByIdAndUpdate(
      params.id,
      body,
      { new: true, runValidators: true }
    );

    if (!destination) {
      return NextResponse.json(
        { error: 'Destination not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(destination);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update destination' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const destination = await Destination.findByIdAndDelete(params.id);

    if (!destination) {
      return NextResponse.json(
        { error: 'Destination not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Destination deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete destination' },
      { status: 500 }
    );
  }
} 