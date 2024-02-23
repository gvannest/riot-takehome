import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EncryptionModule } from './encryption/encryption.module';
import { SignatureModule } from './signature/signature.module';
import { configValidator } from './config.validator';

@Module({
  imports: [
    EncryptionModule,
    SignatureModule,
    ConfigModule.forRoot({
      validate: configValidator,
    }),
  ],
})
export class AppModule {}
