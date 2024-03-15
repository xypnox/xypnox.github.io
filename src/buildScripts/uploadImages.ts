import { PutObjectCommand } from '@aws-sdk/client-s3';
import { s3Client, Env, IMAGE_DIRECTORY } from '../lib/s3'
import { promises as fs, createReadStream } from 'fs';
import path from 'path';


const uploadFile = async (file: string, bucketName: string) => {
  const fileStream = createReadStream(file);
  const key = path.relative(IMAGE_DIRECTORY, file);

  const uploadParams = {
    Bucket: bucketName, // Your bucket name
    Key: key, // File name you want to save as in S3
    Body: fileStream,
  };

  try {
    const client = s3Client(Env);
    const data = await client.send(new PutObjectCommand(uploadParams));
    console.log(`Successfully uploaded ${file} to ${bucketName}/${key}`);
    return data;
  } catch (err) {
    console.log("Error", err);
  }
};

// Modified uploadImagesFromDirectory function to handle recursion
const uploadImagesFromDirectoryRecur = async (directory: string, bucketName: string) => {
  const entries = await fs.readdir(directory, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      await uploadImagesFromDirectoryRecur(fullPath, bucketName); // Recurse into subdirectories
    } else {
      await uploadFile(fullPath, bucketName); // Upload files
    }
  }
};



/* Directory can have multiple images and nested folders */
const uploadImagesFromDirectory = async (directory: string) => {
  console.log('Uploading images from directory:', directory)
  /* Check if the directory exists and exit if it doesn't or is empty */
  const directoryExists = await fs.stat(directory).then((stat) => stat.isDirectory())
  if (!directoryExists) {
    console.error('Directory does not exist:', directory)
  }
  const folderContents = await fs.readdir(directory)
  console.log('Folder:', folderContents, Env)

  // Ensure each item is a folder which can have multiple files inside
  for (const item of folderContents) {
    const itemPath = `${directory}/${item}`

    const isDir = await fs.stat(itemPath).then((stat) => stat.isDirectory())
    if (!isDir) {
      console.error('One of root item is not a directory:', itemPath)
    }
  }

  await uploadImagesFromDirectoryRecur(directory, Env.bucket!).then(() => {
    console.log('Images uploaded')
  }).catch((error) => {
    console.error('Error:', error)
  })
}



(async () => {
  uploadImagesFromDirectory(IMAGE_DIRECTORY).then(() => {
    console.log('Images uploaded')
  }).catch((error) => {
    console.error('Error:', error)
  })
})()
