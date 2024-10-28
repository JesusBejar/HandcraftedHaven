"use client";
import React, { useEffect, useState } from 'react';
import UserProfile from '../ui/profile/userProfile';
import CommentsList from '../ui/comments/commentsList'; // To test the comments
import { User } from '../lib/definitions';

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userId = localStorage.getItem("_id"); // Get user ID from localStorage
      console.log('Holaa')
      console.log(userId)
      if (!userId) {
        console.error("User ID not found in localStorage");
        return;
      }

      try {
        const response = await fetch(`/api/getUserByID?id=${userId}`);
        const data = await response.json();

        if (!data) {
          console.error("No data received");
          return;
        }

        setUser({
          _id: data._id,
          username: data.username || '',
          email: data.email,
          profile_img: data.profile_img,
          profile_description: data.profile_description,
          is_seller: data.is_seller,
          categories: data.seller_details && data.seller_details.business_name 
              ? [data.seller_details.category] 
              : [],
          business_name: data.seller_details ? data.seller_details.business_name : '',
          bus_description: data.seller_details ? data.seller_details.bus_description : ''
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

  if (!user) {
    return <p>Loading...</p>; // loading...
  }

  return (
    <>
      <UserProfile user={user} />
      <CommentsList /> {/* This is only for testing; make sure to use it on card */}
    </>
  );
}
