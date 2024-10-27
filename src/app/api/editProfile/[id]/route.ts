import { NextResponse } from 'next/server';
import dbConnect from '@/src/db/db';
import User from '@/src/models/userModels';
import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

export async function PUT(req: Request, context: { params?: { id?: string } }) {
    try {
        await dbConnect();

        const id = context.params?.id;

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ msg: 'Invalid or missing user ID' }, { status: 400 });
        }

        const updatedData = await req.json();
        const { profile_description, seller_details } = updatedData;

        // Find the existing user
        const existingUser = await User.findById(id);
        if (!existingUser) {
            return NextResponse.json({ msg: 'User profile not found' }, { status: 404 });
        }

        // Update fields if provided
        if (profile_description !== undefined) {
            existingUser.profile_description = profile_description;
        }

        // Update seller details if provided
        if (seller_details) {
            existingUser.seller_details = {
                ...existingUser.seller_details.toObject(),  // Retain existing fields
                ...seller_details                           // Update only provided fields
            };
        }

        // Save the updated user document
        await existingUser.save();

        return NextResponse.json({ msg: 'Profile updated successfully', user: existingUser }, { status: 200 });
    } catch (error) {
        console.error("Error updating profile:", error);
        return NextResponse.json({ msg: 'Failed to update profile' }, { status: 500 });
    }
}
