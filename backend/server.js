require('dotenv').config();
const express = require('express');
const AWS = require('aws-sdk');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());

// Configure AWS SDK with credentials from .env
AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3();

const BUCKET = process.env.S3_BUCKET;
const MODEL_PREFIX = 'models/';
const IMAGE_PREFIX = 'images/';

const generateS3Url = (key) => `https://${BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

app.get('/api/models', async (req, res) => {
  try {
    const params = {
      Bucket: BUCKET,
      Prefix: MODEL_PREFIX,
    };

    const data = await s3.listObjectsV2(params).promise();

    if (!data.Contents || data.Contents.length === 0) {
      return res.json([]);
    }

    const models = data.Contents
      .filter(item => item.Key.endsWith('.glb'))
      .map(item => {
        const modelName = item.Key.split('/').pop().replace('.glb', '');
        return {
          name: modelName.charAt(0).toUpperCase() + modelName.slice(1),
          modelUrl: generateS3Url(item.Key),
          thumbnailUrl: generateS3Url(`${IMAGE_PREFIX}${modelName}.png`)
        };
      });

    res.json(models);
  } catch (err) {
    console.error('Error fetching models:', err);
    res.status(500).json({ message: 'Failed to fetch models' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
