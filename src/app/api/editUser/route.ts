import { NextResponse } from "next/server";
import dbConnect from '@/src/db/db';
import User from '@/src/models/userModels';
import bcrypt from 'bcrypt'; 

export async function EditUser(req: Request) {
    try {
        await dbConnect();

        // why is it necessary to parse??
        const body = await req.json();
        const { id, username, email, password, profile_img, profile_description, seller_details } = body;

        if (!id || !email || !username || !profile_img || !profile_description || !seller_details) {
            return NextResponse.json({ msg: "Please provide all required fields" }, { status: 400 });
        }

        const existingUser = await User.findById(id);
        if (!existingUser) {
            return NextResponse.json({ msg: "User not found" }, { status: 404 });
        }

        existingUser.username = username;
        existingUser.email = email;
        existingUser.profile_img = profile_img;
        existingUser.profile_description = profile_description;
        existingUser.seller_details = seller_details;

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            existingUser.password = hashedPassword; // Update the password only if provided
        }

        await existingUser.save();

        return NextResponse.json({ msg: "User updated successfully", success: true }, { status: 200 });

    } catch (err) {
        return NextResponse.json({ msg: "Internal server error", error: err }, { status: 500 });
    }
}