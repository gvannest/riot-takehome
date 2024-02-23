import { registerAs } from '@nestjs/config';
import { SignatureConfig } from './types';

export const HMAC_SECRET_KEY = 'HMAC_SECRET_KEY';

export const signatureConfig = registerAs(
  'signature',
  () =>
    ({
      algorithm: 'sha256',
      digestScheme: 'base64',
    } satisfies SignatureConfig),
);
