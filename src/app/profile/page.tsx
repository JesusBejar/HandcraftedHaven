"use client";

import React, { useEffect, useState } from 'react';
import { fetchUser } from '../lib/mockData';
import UserProfile from '../ui/profile/userProfile';
import CommentsList from '../ui/comments/commentsList'; //To test the comments
import { User } from '../lib/definitions'; 

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const fetchedUser = await fetchUser();
      setUser(fetchedUser);
    };

    getUser();
  }, []);

  if (!user) {
    return <p>Loading...</p>; // loading...
  }

  return (
    <>
      <UserProfile user={user} />
      <CommentsList /> {/* This is only for testing, meake sure you use it on card*/}
    </>
  );
};