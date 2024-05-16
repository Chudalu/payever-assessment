import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
    constructor() {}

    async hash(value: string): Promise<String> {
        return await bcrypt.hash(value, 1);
    }
}
