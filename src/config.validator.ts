import { z } from 'zod';

export const configSchema = z.object({
  HMAC_SECRET_KEY: z.string(),
});

export const configValidator = (config: Record<string, unknown>) => {
  configSchema.parse(config);
  return config;
};
