// src/app/ui/profile/UserProfile.tsx
import React from 'react';
import styles from './UserProfile.module.css';

type UserProfileProps = {
  user: {
    username: string;
    email: string;
    profile_img: string;
    profile_description?: string;
    isSeller: boolean;
    categories?: string[];
  };
};

export default function UserProfile({ user }: UserProfileProps) {

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profilePictureWrapper}>
        <img
          src={user.profile_img}
          alt={`${user.username}'s profile`}
          className={styles.profilePicture}
        />
        <button type="submit" className="flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Edit Profile</button>
      </div>
      <div className={styles.profileDetails}>
        <h1 className='font-bold' >{user.username} - {user.email}</h1>
        <p>Seller Tag: {user.isSeller ? 'Yes' : 'No'}</p>
        {user.categories && <p>Categories: {user.categories.join(', ')}</p>}
        {user.profile_description && (
          <p>Description: {user.profile_description}</p>
        )}
      </div>
    </div>
  );
}
