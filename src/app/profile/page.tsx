"use client";
import React, { useEffect, useState } from 'react';
import UserProfile from '../ui/profile/userProfile';
import CommentsList from '../ui/comments/commentsList';
import { User, Comment } from '../lib/definitions';

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const fetchUser = async () => {
      const userId = localStorage.getItem("_id");
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
          seller_details:{business_name: data.seller_details ? data.seller_details.business_name : '',
          bus_description: data.seller_details ? data.seller_details.bus_description : ''}
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchComments = async () => {
      const productId = '671b78e313fcb07b6b449243'; // Testing ID
      try {
        const response = await fetch(`/api/getCommentByProductId/${productId}`);
        const data = await response.json();

        if (data.comments) {
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

  const handleEdit = async (commentId: string, updatedComment: string) => {
    try {
      const response = await fetch(`/api/editComment/${commentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ comment: updatedComment }),
      });

      const result = await response.json();
      if (result.msg === 'Comment updated successfully') {
        // Update the comments state with the new data
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment._id === commentId ? { ...comment, comment: updatedComment, updatedAt: new Date() } : comment
          )
        );
      } else {
        console.error(result.msg);
      }
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  const handleDelete = async (commentId: string) => {
    try {
      const response = await fetch(`/api/deleteComment/${commentId}`, {
        method: 'DELETE',
      });

      const result = await response.json();
      if (result.msg === 'Comment deleted successfully') {
        // Update the comments state to remove the deleted comment
        setComments((prevComments) => prevComments.filter(comment => comment._id !== commentId));
      } else {
        console.error(result.msg);
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <UserProfile user={user} />
      <CommentsList
        comments={comments}
        loggedInUserId={user._id}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </>
  );
}
