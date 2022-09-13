import path from 'path';
import { config } from 'dotenv';

export const env = () => {
   config({ path: path.resolve(__dirname, '../../../local.env') });
};
