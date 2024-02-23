import { Injectable } from '@nestjs/common';
import { DecryptionRequestDto } from './dtos/decryption-request.dto';
import { DecryptionResponseDto } from './dtos/decryption-response.dto';
import { EncryptionRequestDto } from './dtos/encryption-request.dto';
import { EncryptionResponseDto } from './dtos/encryption.response.dto';
import { EncryptionParameters } from './types';

@Injectable()
export class EncryptionService {
  private readonly encodingScheme: BufferEncoding;
  private readonly decodingScheme: BufferEncoding;

  constructor({
    encodingScheme,
    decodingScheme: decodingScheme,
  }: EncryptionParameters) {
    this.encodingScheme = encodingScheme;
    this.decodingScheme = decodingScheme;
  }

  encrypt(data: EncryptionRequestDto): EncryptionResponseDto {
    return Object.entries(data).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: Buffer.from(JSON.stringify(value)).toString(this.encodingScheme),
      }),
      {},
    );
  }

  decrypt(data: DecryptionRequestDto): DecryptionResponseDto {
    return Object.entries(data).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: JSON.parse(
          Buffer.from(value, this.encodingScheme).toString(this.decodingScheme),
        ),
      }),
      {},
    );
  }
}
