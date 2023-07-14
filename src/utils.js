import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const hashPassword = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const comparePassword = (user, password) => bcrypt.compareSync(password, user.password);

export default __dirname;