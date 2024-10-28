import React from 'react';
import Comment from './comment';
import { Comment as CommentType } from '../../lib/definitions';

type CommentsListProps = {
  comments: CommentType[];
  loggedInUserId: string;
  onEdit: (commentId: string) => void; // Function to handle editing
  onDelete: (commentId: string) => void; // Function to handle deleting
};

export default function CommentsList({ comments = [], loggedInUserId, onEdit, onDelete }: CommentsListProps) {
  
  return (
    <div>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <Comment
            key={comment._id}
            comment={comment}
            loggedInUserId={loggedInUserId}
            onEdit={() => onEdit(comment._id)} // Pass the comment ID to the edit handler
            onDelete={() => onDelete(comment._id)} // Pass the comment ID to the delete handler
          />
        ))
      ) : (
        <p>No comments available.</p>
      )}
    </div>
  );
}
