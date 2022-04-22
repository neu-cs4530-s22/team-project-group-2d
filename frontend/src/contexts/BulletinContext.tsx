import React from 'react';
import { BulletinPostSchema } from '../classes/BulletinPost';

const Context = React.createContext<BulletinPostSchema[]>([]);

export default Context;
