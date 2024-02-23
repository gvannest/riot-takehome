import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService, ConfigType } from '@nestjs/config';
import { SignatureService } from './signature.service';
import { signatureConfig } from './signature.config';
import { SignatureController } from './signature.controller';

@Module({
  imports: [ConfigModule.forFeature(signatureConfig)],
  controllers: [SignatureController],
  providers: [
    {
      provide: SignatureService,
      useFactory: (
        config: ConfigType<typeof signatureConfig>,
        configService: ConfigService,
      ) =>
        new SignatureService({
          ...config,
          secretKey: configService.getOrThrow('HMAC_SECRET_KEY'),
        }),
      inject: [signatureConfig.KEY, ConfigService],
    },
  ],
})
export class SignatureModule {}
