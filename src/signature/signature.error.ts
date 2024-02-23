import { BadRequestException } from '@nestjs/common';

export class VerifySignatureError extends BadRequestException {}
