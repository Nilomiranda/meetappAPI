import multer from 'multer';
import crypto from 'crypto';
import { resolve, extname } from 'path';

/**
 * Exporting the configuration object for multer.
 * This configuration will then be used within the routes file
 */
export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'temp', 'uploads'),
    filename: (req, file, callback) => {
      crypto.randomBytes(16, (err, res) => {
        if (err) return callback(err);

        return callback(null, res.toString('hex') + extname(file.originalname));
      });
    },
  }),
};
