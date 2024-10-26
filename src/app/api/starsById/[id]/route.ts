import { NextResponse } from 'next/server';
import dbConnect from '@/src/db/db';
import Star from '@/src/models/starModels';
import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

// Get stars by product ID
export async function GET(req: Request, context: { params?: { id?: string } }) {
  try {
    await dbConnect();

    const productId = context.params?.id;

    // Check if productId is provided and valid
    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
      return NextResponse.json({ msg: 'Invalid or missing product ID' }, { status: 400 });
    }

    // Find stars by product ID
    const stars = await Star.find({ productId });
    if (stars.length === 0) {
      return NextResponse.json({ msg: 'No stars found for this product' }, { status: 404 });
    }

    return NextResponse.json({ stars }, { status: 200 });
  } catch (error) {
    console.error("Error fetching stars:", error);
    return NextResponse.json({ msg: 'Failed to fetch stars', error }, { status: 500 });
  }
}


