import { NextResponse } from 'next/server';
import dbConnect from '@/src/db/db';
import Comment from '@/src/models/commentModels';

export async function POST(req: Request) {
    try {
        await dbConnect(); 

        const { productId, userId, username, comment, rating } = await req.json();

        // Validate required fields
        if (!productId || !userId || !username || !comment || !rating) {
            return NextResponse.json({ msg: 'All fields are required' }, { status: 400 });
        }

        // Ensure rating is within the allowed range (1-5)
        if (rating < 1 || rating > 5) {
            return NextResponse.json({ msg: 'Rating must be between 1 and 5' }, { status: 400 });
        }

        // Create a new comment
        const newComment = new Comment({
            productId,
            userId,
            username,
            comment,
            rating,
        });

        // Save the comment to the database
        await newComment.save();

        return NextResponse.json({ msg: 'Comment added successfully', comment: newComment }, { status: 201 });
    } catch (error) {
        console.error('Error adding comment:', error);
        return NextResponse.json({ msg: 'Failed to add comment', error }, { status: 500 });
    }
}
