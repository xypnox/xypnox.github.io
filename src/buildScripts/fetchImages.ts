import { ListObjectsCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { s3Client, env, IMAGE_DIRECTORY } from '../lib/s3'
import { promises as fs, createWriteStream } from 'fs';
import path from 'path';

const fetchImagesToDirectory = async (directory: string, bucketName: string) => {
  console.log('Fetching images to directory:', directory, bucketName);

  try {
    const { Contents } = await s3Client.send(new ListObjectsCommand({
      Bucket: bucketName
    }));

    if (!Contents) {
      console.log('No contents found');
      return;
    }

    await fs.mkdir(directory, { recursive: true });

    for (const content of Contents) {
      if (!content.Key) continue;

      const objectPath = path.join(directory, content.Key);
      const dir = path.dirname(objectPath);

      // Ensure the directory structure exists
      await fs.mkdir(dir, { recursive: true });

      const objectData = await s3Client.send(new GetObjectCommand({
        Bucket: bucketName,
        Key: content.Key,
      }));

      const fileStream = createWriteStream(objectPath);
      if (!objectData.Body) continue;
      objectData.Body.transformToByteArray().then((data) => {
        fileStream.write(data);
      });

      console.log(`File downloaded: ${objectPath}`);
    }
  } catch (error) {
    console.error('Error fetching images:', error);
  }
};


(async () => {
  fetchImagesToDirectory(IMAGE_DIRECTORY, env.bucket!).then(() => {
    console.log('Images fetched')
  }).catch((error) => {
    console.error('Error:', error)
  })
})()
