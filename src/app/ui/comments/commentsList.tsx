import React from 'react';
import Comment from './comment';
import { mockComments } from '../../lib/mockComment';
export default function CommentsList () {
  return (
    <div>
      {mockComments.length > 0 ? (
        mockComments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))
      ) : (
        <p>No comments available.</p>
      )}
    </div>
  );
};
