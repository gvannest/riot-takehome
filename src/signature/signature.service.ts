import { Injectable } from '@nestjs/common';
import { BinaryToTextEncoding, createHmac } from 'crypto';
import { SignatureResponseDto } from './dtos/signature-response.dto';
import { VerifySignatureError } from './signature.error';
import { SignatureRequestDto } from './dtos/signature-request.dto';
import { SignatureParameters } from './types';

@Injectable()
export class SignatureService {
  private readonly secretKey: string;
  private readonly algorithm: string;
  private readonly digestScheme: BinaryToTextEncoding;

  constructor({
    secretKey: secretKey,
    algorithm,
    digestScheme,
  }: SignatureParameters) {
    this.secretKey = secretKey;
    this.algorithm = algorithm;
    this.digestScheme = digestScheme;
  }

  sign(signatureRequestDto: SignatureRequestDto): SignatureResponseDto {
    const hmac = createHmac(this.algorithm, this.secretKey);
    hmac.update(Buffer.from(JSON.stringify(signatureRequestDto)));
    const signature = hmac.digest(this.digestScheme);
    return { signature };
  }

  verify(originalSignature: string, data: Record<string, unknown>): void {
    const hmac = createHmac(this.algorithm, this.secretKey);
    hmac.update(JSON.stringify(data));
    const recreatedSignature = hmac.digest(this.digestScheme);

    if (originalSignature === recreatedSignature) {
      return;
    } else {
      throw new VerifySignatureError('Invalid signature');
    }
  }
}
