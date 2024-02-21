import { Body, Controller, HttpStatus, Post, UsePipes } from '@nestjs/common';
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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('Encryption')
export class EncryptionController {
  constructor(private readonly encryptionService: EncryptionService) {}

  @Post('/encrypt')
  @ApiOperation({ summary: 'Encrypt payload' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Payload successfuly encrypted',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Input wrongly formatted',
  })
  @UsePipes(new ZodValidationPipe(encryptionRequestSchema))
  encrypt(
    @Body() encryptionRequestDto: EncryptionRequestDto,
  ): EncryptionResponseDto {
    return this.encryptionService.encrypt(encryptionRequestDto);
  }

  @Post('/decrypt')
  @ApiOperation({ summary: 'Decrypt payload' })
  @ApiResponse({ status: 400, description: 'Input wrongly formatted' })
  @UsePipes(new ZodValidationPipe(decryptionRequestSchema))
  decrypt(
    @Body() decryptionRequestDto: DecryptionRequestDto,
  ): DecryptionResponseDto {
    return this.encryptionService.decrypt(decryptionRequestDto);
  }
}
