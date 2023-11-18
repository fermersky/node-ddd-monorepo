import bcrypt from 'bcrypt';
import { injectable } from 'tsyringe';

export interface IBcryptService {
  compare(password: string | Buffer, hash: string): Promise<boolean>;
  hash(raw: string): Promise<string>;
}

@injectable()
export class BcryptService implements IBcryptService {
  compare(password: string | Buffer, hash: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, hash, (err, same) => {
        if (err) {
          reject(err);
        }

        resolve(same);
      });
    });
  }
  async hash(raw: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(raw, salt);
  }
}
