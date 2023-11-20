import { builder } from './builder';

import './schemas/Post';
import './schemas/User';
import './schemas/Auth';
import './schemas/Version';
export const schema = builder.toSchema();
