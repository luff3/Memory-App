import dotenv from 'dotenv'
dotenv.config();
import S3 from 'aws-sdk/clients/s3.js';
import fs from "fs"

const bucketName = process.env.S3_BUCKET_NAME;
const region = process.env.S3_BUCKET_REGION;
const accessKeyId = process.env.S3_ACCESS_KEY;
const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY;

const s3 = new S3({
    region, 
    accessKeyId,
    secretAccessKey,
});


export const uploadFile = async (file) => {
    console.log(bucketName);
    const fileStream = fs.createReadStream(file.path);
    console.log("KEY:", file.filename);
    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: file.filename,
    }

    return s3.upload(uploadParams).promise();
}


export const downloadFile = async (key) => {

    const downloadParams = {
        Bucket: bucketName,
        Key: key,
    }

    return s3.getObject(downloadParams).createReadStream();
}

