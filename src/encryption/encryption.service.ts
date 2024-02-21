import { Injectable } from '@nestjs/common';
import { DecryptionRequestDto } from './dtos/decryption-request.dto';
import { DecryptionResponseDto } from './dtos/decryption.response.dto';
import { EncryptionRequestDto } from './dtos/encryption-request.dto';
import { EncryptionResponseDto } from './dtos/encryption.response.dto';

@Injectable()
export class EncryptionService {
  private readonly encoding: BufferEncoding;
  private readonly decoding: BufferEncoding;

  constructor({
    encoding,
    decoding,
  }: {
    encoding: BufferEncoding;
    decoding: BufferEncoding;
  }) {
    this.encoding = encoding;
    this.decoding = decoding;
  }

  encrypt(data: EncryptionRequestDto): EncryptionResponseDto {
    return Object.entries(data).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: Buffer.from(JSON.stringify(value)).toString(this.encoding),
      }),
      {},
    );
  }

  decrypt(data: DecryptionRequestDto): DecryptionResponseDto {
    return Object.entries(data).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: JSON.parse(
          Buffer.from(value, this.encoding).toString(this.decoding),
        ),
      }),
      {},
    );
  }
}
