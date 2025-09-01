import { z } from 'zod';

export const PropertyDescriptionSchema = z.object({
  description: z
    .string()
    .describe('Professional property description in English'),
  tags: z
    .array(z.string())
    .describe('List of 5-8 tags describing the property'),
  highlights: z.array(z.string()).describe('3-5 main advantages of the property'),
  title: z.string().describe('Short, attractive title of the ad'),
});
