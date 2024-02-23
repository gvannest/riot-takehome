import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UsePipes,
} from '@nestjs/common';
import { SignatureService } from './signature.service';
import {
  VerifySignatureRequestDto,
  verifySignatureRequestSchema,
} from './dtos/verify-signature-request.dto';
import { SignatureResponseDto } from './dtos/signature-response.dto';
import { ZodValidationPipe } from '../../lib-helpers/zod/zod-validation.pipe';
import {
  SignatureRequestDto,
  signatureRequestSchema,
} from './dtos/signature-request.dto';

@Controller()
export class SignatureController {
  constructor(private readonly signatureService: SignatureService) {}

  @Post('/sign')
  @UsePipes(new ZodValidationPipe(signatureRequestSchema))
  sign(@Body() signatureRequestDto: SignatureRequestDto): SignatureResponseDto {
    return this.signatureService.sign(signatureRequestDto);
  }

  @Post('/verify')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UsePipes(new ZodValidationPipe(verifySignatureRequestSchema))
  verify(@Body() verifySignatureRequestDto: VerifySignatureRequestDto): void {
    const originalSignature = verifySignatureRequestDto.signature;
    const data = verifySignatureRequestDto.data;
    return this.signatureService.verify(originalSignature, data);
  }
}
