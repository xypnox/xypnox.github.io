import { S3Client } from '@aws-sdk/client-s3';
import dotenv from 'dotenv'

export const IMAGE_DIRECTORY = 'src/assets/';
export const CDN_URL = 'https://xyp-images.blr1.cdn.digitaloceanspaces.com/';

dotenv.config();

((env: Record<string, string | undefined>) => {
  /* Check if required environment variables are defined */
  const requiredEnvVars = [
    'IMAGE_API_URL',
    'IMAGE_API_REGION',
    'IMAGE_API_BUCKET',
    'IMAGE_API_ACCESS_KEY',
    'IMAGE_API_ACCESS_SECRET',
  ]
  for (const key of requiredEnvVars) {
    if (env[key] === undefined) {
      console.error('Required environment variable is not defined:', key, env)
      // exit
      process.exit(1)
    }
  }
})((process.env));


const Env = {
  url: process.env.IMAGE_API_URL!,
  region: process.env.IMAGE_API_REGION!,
  bucket: process.env.IMAGE_API_BUCKET!,
  accessKey: process.env.IMAGE_API_ACCESS_KEY!,
  secret: process.env.IMAGE_API_ACCESS_SECRET!,
  // cdn: process.env.IMAGE_CDN_URL
};

// console.log(env.region, env.bucket, env.url)

// Step 2: The s3Client function validates your request and directs it to your Space's specified endpoint using the AWS SDK.
const s3Client = (env: {
  url: string,
  region: string,
  accessKey: string,
  secret: string
}) => new S3Client({
  endpoint: env.url, // Find your endpoint in the control panel, under Settings. Prepend "https://".
  forcePathStyle: false, // Configures to use subdomain/virtual calling format.
  region: env.region, // Must be "us-east-1" when creating new Spaces. Otherwise, use the region in your endpoint (for example, nyc3).
  credentials: {
    accessKeyId: env.accessKey, // Access key ID defined through an environment variable.
    secretAccessKey: env.secret // Secret access key defined through an environment variable.
  }
});

export { s3Client, Env }
