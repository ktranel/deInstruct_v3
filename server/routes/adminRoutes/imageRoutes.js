const express = require('express');
const router = express.Router();

// utilities
const responseHandler = require('../../utilities/responseHandler');
const blockNonAdmins = require('../../utilities/blockNonAdmin');
const {ErrorHandler} = require('../../utilities/errorHandler');

// definitions
const {ERROR} = require('../../definitions/errors');

// controllers
const {Image} = require('../../controllers/image');
const {ImageList} = require('../../controllers/imageList');

/*
route to add a new image
@body
- name: string
- alt: string (optional)
- image: file
 */
router.post('/new', blockNonAdmins, responseHandler(async (req) => {
    const {name, alt} = req.body;
    const {image} = req.files;

    const image1 = new Image();
    await image1.create(image, name, alt);
    return {
        id: image1.id,
        name: image1.name,
        alt: image1.alt,
        url: image1.url,
    };
}));

/*
* Route to get a list of images
* @query
* page: number (def: 1)
* name: string (optional)
*/
router.get('/list', blockNonAdmins, responseHandler(async (req) => {
    let {page, name} = req.query;
    if (!page) page =1 ;
    if (!name) name = '';

    const list = new ImageList();
    await list.find(name, page)
        .catch(e => {
            throw new ErrorHandler('Error: 6185422 - Unable to get images', ERROR)
        });
    return {
        list: list.list,
        count: list.count,
        pages: list.pages,
    }
}));
module.exports = router;