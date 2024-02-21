import { z } from 'zod';

export const encryptionRequestSchema = z.record(z.any());
export type EncryptionRequestDto = z.infer<typeof encryptionRequestSchema>;
