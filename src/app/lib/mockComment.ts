import { Comment } from './definitions';

export const mockComments: Comment[] = [
  {
    id: '1',
    userId: '101',
    productId: '202',
    comment: 'Great product!',
    rating: 5,
  },
  {
    id: '2',
    userId: '102',
    productId: '202',
    comment: 'Not bad, but could be improved.',
    rating: 3,
  },
];
