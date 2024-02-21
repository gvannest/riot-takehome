import { z } from 'zod';

export const signatureRequestSchema = z.record(z.any());
export type SignatureRequestDto = z.infer<typeof signatureRequestSchema>;
