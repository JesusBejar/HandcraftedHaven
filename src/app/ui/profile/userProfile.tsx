"use client";

import React from 'react';
import styles from './UserProfile.module.css';

type UserProfileProps = {
  user: {
    username: string;
    email: string;
    profile_img: string;
    profile_description?: string;
    isSeller: boolean;
    business_name?: string;
    bus_description?: string;
    categories?: string[];
  };
};

export default function UserProfile({ user }: UserProfileProps) {
  return (
    <div className={styles.profileContainer}>
      <div className={styles.profilePictureWrapper}>
        <img
          src={user.profile_img}
          alt={user.isSeller ? `${user.business_name}'s profile` : `${user.username}'s profile`}  // Update alt text
          className={styles.profilePicture}
        />
        <button type="button" className="flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Edit Profile
        </button>
      </div>
      <div className={styles.profileDetails}>
        {user.isSeller ? (
          <>
            <h1>{user.business_name}</h1>
            <p>Email: {user.email}</p>
            <p>Description: {user.bus_description}</p>
          </>
        ) : (
          <>
            <h1>{user.username}</h1>
            <p>Email: {user.email}</p>
            <p>No seller tag</p>
          </>
        )}
        <p>
          {/* Seller Tag */}
          <span className={user.isSeller ? styles.sellerTag : styles.buyerTag}>
            {user.isSeller ? ' Seller' : ' Buyer'}
          </span>
        </p>
        {user.categories && user.categories.length > 0 && (
          <p>Categories: {user.categories.join(', ')}</p>
        )}
        {user.profile_description && (
          <p>Description: {user.profile_description}</p>
        )}
      </div>
    </div>
  );
}
