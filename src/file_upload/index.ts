import { v2 as cloudinary } from 'cloudinary';
import environment from 'utils/environment';

cloudinary.config({
    cloud_name: environment.CLOUD_NAME,
    api_key: environment.API_KEY,
    api_secret: environment.API_SECRET,
});