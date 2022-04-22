import assert from 'assert';
import { useContext } from 'react';
import { BulletinPostSchema } from '../classes/BulletinPost';
import BulletinContext from '../contexts/BulletinContext';

export default function useBulletinPosts(): BulletinPostSchema[] {
  const ctx = useContext(BulletinContext);
  assert(ctx, 'Bulletin post context should be defined.');
  return ctx;
}
