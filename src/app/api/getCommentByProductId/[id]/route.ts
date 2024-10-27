import { NextResponse } from 'next/server';
import dbConnect from '@/src/db/db';
import Comment from '@/src/models/commentModels';
import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

// Get comments by product ID (artworkId)
export async function GET(req: Request, context: { params?: { id?: string } }) {
  try {
    await dbConnect();

    const artworkId = context.params?.id;
    console.log(artworkId);

   // Check if productId is provided and valid
   if (!artworkId || !mongoose.Types.ObjectId.isValid(artworkId)) {
    return NextResponse.json({ msg: 'Invalid or missing artworkId' }, { status: 400 });
  }

    // Find comments by product ID
    const comments = await Comment.find({ artworkId });
    if (comments.length === 0) {
      return NextResponse.json({ msg: 'No comments found for this product' }, { status: 404 });
    }

    return NextResponse.json({ comments }, { status: 200 });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json({ msg: 'Failed to fetch comments', error }, { status: 500 });
  }
}
