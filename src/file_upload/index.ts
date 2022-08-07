import { v2 as cloudinary } from 'cloudinary';
import environment from 'utils/environment';

cloudinary.config({
    cloud_name: environment.CLOUD_NAME,
    api_key: environment.API_KEY,
    api_secret: environment.API_SECRET,
});

export class ImageUpload {

    static async upload(base64Encoded: string) {
        const uploadResponse = await cloudinary.uploader.upload(base64Encoded, {
            folder: 'images',
        });
        return uploadResponse;
    }
}