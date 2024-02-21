import { Module } from '@nestjs/common';
import { EncryptionController } from './encryption.controller';
import { EncryptionService } from './encryption.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { encryptionConfig } from './encryption.config';

@Module({
  imports: [ConfigModule.forFeature(encryptionConfig)],
  controllers: [EncryptionController],
  providers: [
    {
      provide: EncryptionService,
      useFactory: (configService: ConfigService) =>
        new EncryptionService({
          encoding: configService.getOrThrow('encryption.encodingScheme'),
          decoding: configService.getOrThrow('encryption.decodingScheme'),
        }),
      inject: [ConfigService],
    },
  ],
})
export class EncryptionModule {}
