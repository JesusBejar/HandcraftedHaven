"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '../../utils/checkAuth'; // Import custom hook

export default function HomeTest() {
  const { isLoading } = useAuth(); // Use the hook to check authentication

  const [username, setUsername] = useState<string | null>(null); // State to hold username

  useEffect(() => {
    // Check for username in localStorage after component mounts
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername);
  }, []); // Empty dependency array to run only once when component mounts

  if (isLoading) {
    return <p>Loading...</p>; // Display loading state until token check is complete
  }

  return <h1>Welcome, {username ? username : 'Guest'}!</h1>;
}
