import React from 'react';
import Comment from './comment';
import { Comment as CommentType } from '../../lib/definitions';
import { mockComments } from '../../lib/mockComment';
const CommentsList: React.FC = () => {
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

export default CommentsList;
