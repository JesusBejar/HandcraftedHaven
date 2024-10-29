import { NextResponse, NextRequest } from 'next/server';
import dbConnect from '@/src/db/db';
import Comment from '@/src/models/commentModels';
import mongoose from 'mongoose';

export async function DELETE(req: Request) {
  try {
      // Connect to the database
      await dbConnect();

      // Extract user ID from the query parameters
      const { searchParams } = new URL(req.url);
      const id = searchParams.get('id'); // Assum
  
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ msg: 'Invalid or missing comment ID' }, { status: 400 });
    }
  
    const deletedComment = await Comment.findOneAndDelete({ _id: id });
    if (!deletedComment) {
      return NextResponse.json({ msg: 'Comment not found' }, { status: 404 });
    }
  
    return NextResponse.json({ msg: 'Comment deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json({ msg: 'Failed to delete comment', error }, { status: 500 });
  }
}
