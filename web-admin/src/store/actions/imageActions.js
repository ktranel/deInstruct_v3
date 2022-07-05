import {imageApi} from "../api/imageApi";

// send an image file to the server to be uploaded to appropriate service
export async function uploadImage(data) {
    return imageApi().upload(data);
}

// get a list of images, paginated, with optional query of name
export async function fetchImages(page, name) {
    return imageApi().getList(page, name);
}