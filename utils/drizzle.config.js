import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './utils/schema.jsx',
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://smart-spend_owner:zVyAfN1iQ4ew@ep-plain-frost-a10yooco.ap-southeast-1.aws.neon.tech/smart-spend?sslmode=require',
  },
});
