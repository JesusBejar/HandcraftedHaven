"use client";
import React, { useEffect, useState } from 'react';
import UserProfile from '../ui/profile/userProfile';
import CommentsList from '../ui/comments/commentsList'; // To test the comments
import { User, Comment } from '../lib/definitions';

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [comments, setComments] = useState<Comment[]>([]); // Initialize as an empty array

  useEffect(() => {
    const fetchUser = async () => {
      const userId = localStorage.getItem("_id"); // Get user ID from localStorage
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

    // only to show on product page
    const fetchComments = async () => {
      const productId = '671b78e313fcb07b6b449243'; // Use the id for testing
      try {
        const response = await fetch(`/api/getCommentByProductId/${productId}`);
        const data = await response.json();

        if (data.comments) {
          // Sort comments by created date
          const sortedComments = data.comments.sort((a: Comment, b: Comment) => {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          });
          setComments(sortedComments);
        } else {
          console.error("No comments found for this product");
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchUser();
    fetchComments();
  }, []);

  if (!user) {
    return <p>Loading...</p>; // loading...
  }

  return (
    <>
      <UserProfile user={user} />
      <CommentsList comments={comments} loggedInUserId={user._id} onEdit={() => {}} onDelete={() => {}} />
    </>
  );
}
