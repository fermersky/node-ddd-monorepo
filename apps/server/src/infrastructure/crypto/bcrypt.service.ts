import bcrypt from 'bcrypt';

export interface IBcryptService {
  compare(password: string | Buffer, hash: string): Promise<boolean>;
  hash(raw: string): Promise<string>;
}

export default function (): IBcryptService {
  return {
    async hash(raw) {
      const salt = await bcrypt.genSalt();
      return bcrypt.hash(raw, salt);
    },

    async compare(password, hash) {
      return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, (err, same) => {
          if (err) {
            reject(err);
          }

          resolve(same);
        });
      });
    },
  };
}
