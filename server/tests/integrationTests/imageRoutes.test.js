const chai = require('chai');
const { expect } = chai;
const chaiHttp = require('chai-http');
const path = require('path');

const {faker} = require('@faker-js/faker');
const app = require('../../app');
const db = require('../../models');
const {TempAdmins} = require('../../utilities/tempAdmin');
chai.use(chaiHttp);

const loginRoute = '/api/auth/web-login';

describe('(POST) /images/new', function() {
    let agent, user;
    beforeEach(async () => {
        user = new TempAdmins();
        await user.create();
        agent = chai.request.agent(app);
        await agent
            .post(loginRoute)
            .send({ email: user.email, password: user.password });
    });

    afterEach(async () => {
        await user.destroy();
    });

    it('should create a new image instance', async function () {
        const name = 'testName';
        const alt = 'testAlt';

        const res = await agent
            .post('/api/admin/images/new')
            .field('name', name)
            .field('alt', alt)
            .attach('image', path.join(__dirname, '../images/testImage.jpg'), 'testImage');

        await db.images.destroy({
            where: {},
            truncate: true
        });

        expect (res.status).to.equal(200);
        const {body: {result}} = res;
        expect(result.id).to.be.a('number');
        expect(result.name).to.equal(name);
        expect(result.alt).to.equal(alt);
        expect(result.url).to.be.a('string');
    });
});

describe('(GET) /images/list', function() {
    let agent, user;
    beforeEach(async () => {
        user = new TempAdmins();
        await user.create();
        agent = chai.request.agent(app);
        await agent
            .post(loginRoute)
            .send({ email: user.email, password: user.password });
    });

    afterEach(async () => {
        await user.destroy();
    });

    it('should get a list of images in paginated form', async function () {
        /*
        * Route should return a list of images as object. It should
        * take the query items of page and name, with page defaulting to
        * 1 and name defaulting to an empty string. It should return an
        * object with the following properties
        * - list
        * - pages
        * - count
        */
        const images = [];
        for (let i = 0; i< 50; i++) {
            const temp = {name: faker.lorem.word(), alt: faker.lorem.word(), url: faker.internet.url(), awsKey: faker.lorem.word()};
            images.push(temp);
        }
        await db.images.bulkCreate(images);

        const res = await agent
            .get('/api/admin/images/list');

        await db.images.destroy({
            where: {},
            truncate: true
        });

        expect (res.status).to.equal(200);
        const {body: {result}} = res;
        expect(result.list).to.be.an('array');
        expect(result.pages).to.equal(2);
        expect(result.count).to.equal(images.length);
    });
});