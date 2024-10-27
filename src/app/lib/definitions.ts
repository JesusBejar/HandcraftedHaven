// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.

export type User = {
    id: string;
    username: string;
    email: string;
    password: string;
    profile_img: string;
    profile_description: string;
    isSeller: boolean;
    categories?: string[]; //how will categories be added?
  }

  export type Comment = {
    id: string;
    userName: string;
    userId: string;
    productId: string;
    comment: string;
    rating: number; // Rating from 1 to 5
  };