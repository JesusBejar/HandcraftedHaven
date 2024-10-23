import React from 'react';
import { Comment as CommentType } from '../../lib/definitions';

type CommentProps = {
  comment: CommentType;
};

export default function Comment({ comment }: CommentProps) {
    return (
      <div>
        <p>{comment.comment}</p>
        <p>Rating: {comment.rating}</p>
      </div>
    );
  }