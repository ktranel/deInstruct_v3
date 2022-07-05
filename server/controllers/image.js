const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const {aws} = require('../config/config');
const sharp =  require('sharp');
const db = require('../models');

const s3Client = new S3Client({
    region: aws.region,
    credentials:{
        accessKeyId: aws.accessKey,
        secretAccessKey: aws.secretKey
    }
});

class Image{
    constructor(props) {
        this.id = '';
        this.name = '';
        this.alt = '';
        this.url = '';
        this.awsKey = '';
    }

    async create(file, name, alt) {
        const metadata = await sharp(file.data).metadata();
        const {format, width} = metadata;
        let {data} = file;
        const urlFriendly = name.replaceAll(' ', '_');
        const awsKey = urlFriendly + '-' + new Date().getTime().toString() +'.' + format;

        if (width > 400) {
            data = await sharp(data).resize({ width: 400 }).toBuffer();
        }
        const params = {
            Bucket: aws.bucket,
            Key: awsKey,
            Body: data,
        };
        try{
            await s3Client.send(new PutObjectCommand(params));
            const created = await db.images.create({
                name,
                alt,
                url: `https://${aws.bucket}.s3.${aws.region}.amazonaws.com/${awsKey}`,
                awsKey
            });
            this.id = created.id;
            this.name = name;
            this.alt = alt;
            this.url = created.url;
            this.awsKey = awsKey;
        } catch (e) {
            console.log(e);
        }
    }

}

module.exports = {Image};