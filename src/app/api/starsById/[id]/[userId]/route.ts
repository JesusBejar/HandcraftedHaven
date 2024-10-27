import { NextResponse } from 'next/server';
import dbConnect from '@/src/db/db';
import Star from '@/src/models/starModels';
import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';


// Delete star by user ID and product ID
export async function DELETE(req: Request, context: { params?: { id?: string, userId?: string } }) {
    try {
      await dbConnect();
      
      //I named id but it actually is productId
      //const { id, userId } = context.params || {};
      const productId = context.params?.id;
      const userId = context.params?.userId
  
      // Validate IDs
      if (!productId || !mongoose.Types.ObjectId.isValid(productId) || !userId || !mongoose.Types.ObjectId.isValid(userId)) {
        return NextResponse.json({ msg: 'Invalid or missing product ID or user ID' }, { status: 400 });
      }
  
      // Find and delete the star entry
      const deletedStar = await Star.findOneAndDelete({ productId, userId });
      if (!deletedStar) {
        return NextResponse.json({ msg: 'Star not found' }, { status: 404 });
      }
  
      return NextResponse.json({ msg: 'Star deleted successfully' }, { status: 200 });
    } catch (error) {
      console.error("Error deleting star:", error);
      return NextResponse.json({ msg: 'Failed to delete star', error }, { status: 500 });
    }
  }
  