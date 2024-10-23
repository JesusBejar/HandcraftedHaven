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

const UserProfile: React.FC<UserProfileProps> = ({ user }) => (
  <div className={styles.profileContainer}>
    <div className={styles.profilePictureWrapper}>
      <img
        src={user.profile_img}
        alt={`${user.username}'s profile`}
        className={styles.profilePicture}
      />
    </div>
    <div className={styles.profileDetails}>
      <h2>{user.username}</h2>
      <p>Email: {user.email}</p>
      <p>Seller Tag: {user.isSeller ? 'Yes' : 'No'}</p>
      {user.categories && <p>Categories: {user.categories.join(', ')}</p>}
      {user.profile_description && (
        <p>Description: {user.profile_description}</p>
      )}
    </div>
  </div>
);

export default UserProfile;
