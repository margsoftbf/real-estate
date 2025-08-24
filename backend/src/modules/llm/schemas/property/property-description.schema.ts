import { z } from 'zod';

export const PropertyDescriptionSchema = z.object({
  description: z
    .string()
    .describe('Profesjonalny opis nieruchomości w języku polskim'),
  tags: z
    .array(z.string())
    .describe('Lista 5-8 tagów opisujących nieruchomość'),
  highlights: z.array(z.string()).describe('3-5 głównych atutów nieruchomości'),
  title: z.string().describe('Krótki, atrakcyjny tytuł ogłoszenia'),
});
