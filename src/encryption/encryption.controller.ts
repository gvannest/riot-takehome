import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { EncryptionService } from './encryption.service';
import {
  DecryptionRequestDto,
  decryptionRequestSchema,
} from './dtos/decryption-request.dto';
import { DecryptionResponseDto } from './dtos/decryption.response.dto';
import { ZodValidationPipe } from '../../lib-helpers/zod/zod-validation.pipe';
import {
  EncryptionRequestDto,
  encryptionRequestSchema,
} from './dtos/encryption-request.dto';
import { EncryptionResponseDto } from './dtos/encryption.response.dto';

@Controller()
export class EncryptionController {
  constructor(private readonly encryptionService: EncryptionService) {}

  @Post('/encrypt')
  @UsePipes(new ZodValidationPipe(encryptionRequestSchema))
  encrypt(
    @Body() encryptionRequestDto: EncryptionRequestDto,
  ): EncryptionResponseDto {
    return this.encryptionService.encrypt(encryptionRequestDto);
  }

  @Post('/decrypt')
  @UsePipes(new ZodValidationPipe(decryptionRequestSchema))
  decrypt(
    @Body() decryptionRequestDto: DecryptionRequestDto,
  ): DecryptionResponseDto {
    return this.encryptionService.decrypt(decryptionRequestDto);
  }
}
