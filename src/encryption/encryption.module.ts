import { Module } from '@nestjs/common';
import { EncryptionController } from './encryption.controller';
import { EncryptionService } from './encryption.service';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { encryptionConfig } from './encryption.config';

@Module({
  imports: [ConfigModule.forFeature(encryptionConfig)],
  controllers: [EncryptionController],
  providers: [
    {
      provide: EncryptionService,
      useFactory: (config: ConfigType<typeof encryptionConfig>) =>
        new EncryptionService(config),
      inject: [encryptionConfig.KEY],
    },
  ],
})
export class EncryptionModule {}
