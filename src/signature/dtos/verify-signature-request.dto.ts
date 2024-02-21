import { z } from 'zod';

export const verifySignatureRequestSchema = z.object({
  signature: z.string(),
  data: z.record(z.any()),
});
export type VerifySignatureRequestDto = z.infer<
  typeof verifySignatureRequestSchema
>;
