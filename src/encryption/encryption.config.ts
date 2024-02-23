import { registerAs } from '@nestjs/config';
import { EncryptionParameters } from './types';

export const encryptionConfig = registerAs(
  'encryption',
  () =>
    ({
      encodingScheme: 'base64',
      decodingScheme: 'utf-8',
    } satisfies EncryptionParameters),
);
