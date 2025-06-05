import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Destination } from '@/models/destination';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const region = searchParams.get('region') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    await connectDB();

    const searchQuery: any = {};
    
    if (query) {
      searchQuery.$or = [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { shortDescription: { $regex: query, $options: 'i' } },
      ];
    }

    if (region) {
      searchQuery.region = region;
    }

    const [destinations, total] = await Promise.all([
      Destination.find(searchQuery)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Destination.countDocuments(searchQuery),
    ]);

    return NextResponse.json({
      destinations,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to search destinations' },
      { status: 500 }
    );
  }
} 