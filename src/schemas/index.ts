import { z } from 'zod';

export const IpSchema = z.object({
  ip: z.string().ip(),
  location: z.object({
    country: z.string(),
    region: z.string(),
    city: z.string(),
    lat: z.number(),
    lng: z.number(),
    postalCode: z.string(),
    timezone: z.string(),
    geonameId: z.number(),
  }),
  domains: z.array(z.string()).min(1).optional(),
  as: z.object({
    asn: z.number(),
    name: z.string(),
    route: z.string(),
    domain: z.string().url(),
    type: z.string(),
  }),
  isp: z.string(),
});

export type IpResponse = z.infer<typeof IpSchema>;
