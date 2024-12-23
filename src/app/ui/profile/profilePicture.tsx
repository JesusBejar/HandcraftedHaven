import React from 'react';

const ProfilePicture: React.FC<{ src: string; alt: string }> = ({
  src,
  alt,
}) => <img src={src} alt={alt} className="profile-picture" />;

export default ProfilePicture;
