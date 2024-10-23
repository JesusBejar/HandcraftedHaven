"use client";

import React, { useEffect, useState } from 'react';
import { fetchUser } from '../lib/mockData'; // Import your mock data
import UserProfile from '../ui/profile/userProfile';
import { User } from '../lib/definitions'; // Import the User type
import styles from '../ui/profile/userProfile.module.css';

const ProfilePage: React.FC = () => {
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
    <div className={styles.profilePage}>
      <h1 className={styles.profileTitle}>Profile</h1>
      <UserProfile user={user} /> {/* Pass user data to UserProfile */}
    </div>
  );
};

export default ProfilePage;
