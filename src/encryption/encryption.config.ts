import { registerAs } from '@nestjs/config';

export const encryptionConfig = registerAs('encryption', () => ({
  encodingScheme: 'base64' satisfies BufferEncoding,
  decodingScheme: 'utf-8' satisfies BufferEncoding,
}));
