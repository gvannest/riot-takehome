import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SignatureService } from './signature.service';
import { HMAC_SECRET_KEY, signatureConfig } from './signature.config';
import { SignatureController } from './signature.controller';

@Module({
  imports: [ConfigModule.forFeature(signatureConfig)],
  controllers: [SignatureController],
  providers: [
    {
      provide: SignatureService,
      useFactory: (configService: ConfigService) =>
        new SignatureService({
          secretKey: configService.getOrThrow(HMAC_SECRET_KEY),
          algorithm: configService.getOrThrow('signature.algorithm'),
          digestScheme: configService.getOrThrow('signature.digestScheme'),
        }),
      inject: [ConfigService],
    },
  ],
})
export class SignatureModule {}
