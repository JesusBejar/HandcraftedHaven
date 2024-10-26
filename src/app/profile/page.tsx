"use client";

import React, { useEffect, useState } from 'react';
import { fetchUser } from '../lib/mockData'; // Import your mock data
import UserProfile from '../ui/profile/userProfile';
import { User } from '../lib/definitions'; // Import the User type
import Comment from '../ui/comments/comment';

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
    return <p>Loading...</p>; // Show loading state
  }

  return (
    <>
      {/* <h1>Profile Page</h1> */}
      <UserProfile user={user} /> {/* Pass user data to UserProfile */}
      <Comment comment={}>
    </>
  );
};