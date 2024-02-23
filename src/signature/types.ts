import { BinaryToTextEncoding } from 'crypto';

export type SignatureParameters = {
  secretKey: string;
  algorithm: string;
  digestScheme: BinaryToTextEncoding;
};

export type SignatureConfig = Omit<SignatureParameters, 'secretKey'>;
