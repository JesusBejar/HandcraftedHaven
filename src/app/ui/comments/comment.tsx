import React from 'react';
import { Comment as CommentType } from '../../lib/definitions';
import styles from './comment.module.css';

type CommentProps = {
  comment: CommentType;
};

export default function Comment({ comment }: CommentProps) {
    return (
      <div className={styles.commentContainer}>
      <p className={styles.commentText}>{comment.comment}</p>
      <p className={styles.commentText}>Rating: {comment.rating}</p>
      <p className={styles.commentText}>User: {comment.userName}</p>
    </div>
    );
  }