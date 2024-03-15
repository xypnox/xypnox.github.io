import { promises as fs, createWriteStream } from 'fs';
import { XMLParser } from "fast-xml-parser";

import { CDN_URL, IMAGE_DIRECTORY } from "../lib/s3";
import path from 'path';

const xmlData = (xml: string) => {
  const parser = new XMLParser();
  const jsonObj = parser.parse(xml);
  console.log(jsonObj);
  return jsonObj;
}

const fetchCdnImage = async (cdnBucketUrl: string, image: string, directory: string) => {
  return new Promise(async (resolve, reject) => {
    const objectPath = path.join(directory, image);
    const dir = path.dirname(objectPath);
    console.log('Fetching image:', { cdnBucketUrl, image, objectPath });

    await fs.mkdir(dir, { recursive: true });

    try {
      // This will be a image, save the stream to the file in the directory
      const response = await fetch(`${cdnBucketUrl}${image}`);
      // check responses type. it should not be xml
      if (response.headers.get('content-type')?.includes('xml')) {
        console.warn('Response is xml', await response.text());
        return;
      }
      const fileStream = createWriteStream(objectPath);
      const data = await response.arrayBuffer();
      if (!data) {
        console.warn('No data found');
        return;
      }
      if (data.byteLength === 0) {
        console.warn('Empty data found');
        return;
      }
      fileStream.write(Buffer.from(data), (err) => {
        if (err) {
          console.error('Error writing image:', err);
          reject(err);
        }
        else {
          console.log('Image written:', objectPath);
          resolve(objectPath);
        }
      });
    } catch (error) {
      console.error('Error fetching image:', error);
      reject(error);
    }
  })
}

const fetchImagesToDirectory = async (directory: string, cdnBucketUrl: string) => {
  console.log('Fetching images to directory:', directory, cdnBucketUrl);

  try {
    const response = await fetch(cdnBucketUrl);
    const data = await response.text();
    console.log('Data:', data);
    // Parse to XML
    const xml = xmlData(data);
    console.log('XML:', xml);

    const bucketData = xml['ListBucketResult'];
    if (!bucketData) {
      console.warn('No bucket data found');
      return;
    }

    const contents = bucketData['Contents'];

    if (!contents) {
      console.warn('No contents found');
      return;
    }

    const imagePaths = Array.from(contents).map((content: any) => {
      const key = content['Key'];
      return key;
    });
    console.log('Image paths:', imagePaths);

    await fs.mkdir(directory, { recursive: true });

    const promises = imagePaths.map(async (imagePath) => {
      if (!imagePath) return;
      return await fetchCdnImage(cdnBucketUrl, imagePath, directory);
    });

    await Promise.all(promises);
    return
  } catch (error) {
    console.error('Error fetching images:', error);
  }
}

(async () => {
  try {
    const t1 = performance.now();
    await fetchImagesToDirectory(IMAGE_DIRECTORY, CDN_URL)
    const t2 = performance.now();
    console.log(`Images fetched in ${(t2 - t1) / 1000} seconds`);
  } catch (error) {
    console.error('Error:', error)
  }
})()
