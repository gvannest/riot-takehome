import { z } from 'zod';

export const decryptionRequestSchema = z.record(z.string());
export type DecryptionRequestDto = z.infer<typeof decryptionRequestSchema>;
