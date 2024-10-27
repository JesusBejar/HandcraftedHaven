import { NextResponse } from "next/server";
import dbConnect from '@/src/db/db';
import User from '@/src/models/userModels';
import bcrypt from 'bcrypt'; 
// bcrypt is used to hash passwords
// GET, get by user
export async function GET (req: Request) {
    try {
        // Connect to the database
        await dbConnect();

        // Extract user ID from the query parameters
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id'); // Assuming you pass the user ID as a query parameter

        // Validate input
        if (!id) {
            return NextResponse.json({ msg: "User ID is required" }, { status: 400 });
        }

        // Find the user by ID
        const user = await User.findById(id);
        if (!user) {
            return NextResponse.json({ msg: "User not found" }, { status: 404 });
        }

        // Return user data (excluding password for security)
        const { password, ...userData } = user.toObject();
        return NextResponse.json(userData, { status: 200 });

    } catch (err) {
        return NextResponse.json({ msg: "Internal server error", error: err }, { status: 500 });
    }
}
