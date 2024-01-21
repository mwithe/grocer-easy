const AWS = require("aws-sdk");
require("dotenv").config();

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_D,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  sessionToken: process.env.AWS_SESSION_TOKEN,
  region: "ap-southeast-2",
});

// Create an S3 client
const s3 = new AWS.S3();

// Specify the S3 bucket and object key
const bucketName = "n8824703-page-counter";
const objectKey = "pageCounter.json";

// JSON data to be written to S3
var jsonData = {
  count: 0,
};


async function createS3bucket() {
  try {
    await s3.createBucket( { Bucket: bucketName }).promise();
    console.log(`Created bucket: ${bucketName}`);
  } catch(err) {
    if (err.statusCode === 409) {
      console.log(`Bucket already exists: ${bucketName}`);
    } else {
      console.log(`Error creating bucket: ${err}`);
    }
  }
}

// Retrieve the object from S3
async function getObjectFromS3() {
  const params = {
    Bucket: bucketName,
    Key: objectKey,
  };

  try {
    const data = await s3.getObject(params).promise();
    const parsedData = JSON.parse(data.Body.toString("utf-8"));
    parsedData.count += 1;
    jsonData.count = parsedData.count;
    console.log("Parsed JSON data:", parsedData);
  } catch (err) {
    console.error("Error:", err);
  }
}


// Upload the JSON data to S3
async function uploadJsonToS3() {

  const params = {
    Bucket: bucketName,
    Key: objectKey,
    Body: JSON.stringify(jsonData),
    ContentType: "application/json",
  };

  try {
    await s3.putObject(params).promise();
    console.log('uploading', jsonData);
    console.log("JSON file uploaded successfully.");
  } catch (err) {
    console.error("Error uploading JSON file:", err);
  }
}

(async () => {
  await createS3bucket();
  await getObjectFromS3();
  await uploadJsonToS3();
})();

//export jsonData (page count) for use in other files
module.exports = {jsonData};