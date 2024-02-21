import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EncryptionModule } from './encryption/encryption.module';
import { SignatureModule } from './signature/signature.module';

@Module({
  imports: [EncryptionModule, SignatureModule, ConfigModule.forRoot()],
})
export class AppModule {}
