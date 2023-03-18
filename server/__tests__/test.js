const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');

const app = require('../src/app');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const seedWithDummyData = require('../seeder');

const User = require('../models/User');
const Product = require('../models/Product');
const Cart = require('../models/Cart');

chai.use(chaiHttp);
chai.should();
dotenv.config();
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

let user, product;
describe('Checking Cart Routes', () => {
    before(async () => {
        await mongoose.connect(process.env.DATABASE_URL || "mongodb://localhost:27017/ecommerce", { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('connected to DB');
        await seedWithDummyData();

        user = await User.create({
            username: 'testuser',
            email: 'testuser@example.com',
            password: 'testpassword',
        });

        product = await Product.create({
            name: 'Shoes',
            description: 'Comfortable shoes for everyday use',
            price: 49.99,
            category: 'Footwear'
        }
        );

    });

    after(async () => {
        await mongoose.disconnect();
        console.log('disconnected DB')
    });

    describe('GET /api/v1/carts/', () => {
        it('should return an error if userId is not provided', async () => {
            const res = await chai
                .request(app)
                .get('/api/v1/carts/')
                .send({});

            expect(res).to.have.status(400);
        });

        it('should return an empty cart if no cart is found for the user', async () => {
            const user = await User.create({ username: 'JohneDoe', email: 'jhonedhough@gamil.com', password: '123456abcde' });

            const res = await chai
                .request(app)
                .get('/api/v1/carts/')
                .send({ userId: user._id });

            expect(res).to.have.status(200);
            expect(res.body).to.be.a('object');
            expect(res.body).to.have.property('message').eql('Cart is empty');
            expect(res.body).to.have.property('status').eql('Success');
            expect(res.body).to.have.property('cart');
            expect(res.body.cart).to.have.property('user').eql(user._id.toString());
            expect(res.body.cart).to.have.property('products').to.be.an('array').lengthOf(0);
        });

        it('should return the user\'s cart if one is found', async () => {
            const user = await User.create({ username: 'JohneDoe2', email: 'jhonedhough2@gamil.com', password: '123456abcde' });
            const product1 = await Product.create({
                name: 'Shoes',
                description: 'Comfortable shoes for everyday use',
                price: 49.99,
                category: 'Footwear'
            });
            const product2 = await Product.create({
                name: 'Shoes',
                description: 'Comfortable shoes for everyday use',
                price: 49.99,
                category: 'Footwear'
            });
            const cart = await Cart.create({
                user: user._id,
                products: [
                    { product: product1._id, quantity: 2 },
                    { product: product2._id, quantity: 1 }
                ]
            });

            const res = await chai
                .request(app)
                .get('/api/v1/carts/')
                .send({ userId: user._id });

            expect(res).to.have.status(200);
            expect(res.body).to.be.a('object');
            // expect(res.body).to.have.property('message').eql('Cart fetched successfully');
            expect(res.body).to.have.property('status').eql('Success');
            expect(res.body).to.have.property('cart');
            expect(res.body.cart).to.have.property('user').eql(user._id.toString());
            expect(res.body.cart).to.have.property('products').to.be.an('array');
            expect(res.body.cart.products[0]).to.have.property('product');
            expect(res.body.cart.products[0].product).to.have.property('_id').eql(product1._id.toString());
            expect(res.body.cart.products[0].product).to.have.property('name');
            expect(res.body.cart.products[0]).to.have.property('quantity').eql(2);
        });
    });

    describe('POST /api/v1/carts/', () => {
        it('should return an error if userId is missing', async () => {
            const res = await chai
                .request(app)
                .post('/api/v1/carts/add')
                .send({
                    productId: 'testProduct',
                    quantity: 2
                });

            expect(res.status).to.equal(400);
            expect(res.body).to.have.property('status').eql('Error');
            // expect(res.body).to.have.property('message').eql('User ID is required');
        });

        it('should return an error if productId is missing', async () => {
            const res = await chai
                .request(app)
                .post('/api/v1/carts/add')
                .send({
                    userId: 'testUser',
                    quantity: 2
                });

            expect(res.status).to.equal(400);
            expect(res.body).to.have.property('status').eql('Error');
            // expect(res.body).to.have.property('message').eql('Product ID is required');
        });

        it('should return an error if quantity is missing', async () => {
            const res = await chai
                .request(app)
                .post('/api/v1/carts/add')
                .send({
                    userId: 'testUser',
                    productId: 'testProduct'
                });

            expect(res.status).to.equal(400);
            expect(res.body).to.have.property('status').eql('Error');
            // expect(res.body).to.have.property('message').eql('Quantity must be a positive number');
        });

        it('should return an error if quantity is less than 1', async () => {
            const res = await chai
                .request(app)
                .post('/api/v1/carts/add')
                .send({
                    userId: 'testUser',
                    productId: 'testProduct',
                    quantity: 0
                });

            expect(res.status).to.equal(400);
            expect(res.body).to.have.property('status').eql('Error');
            // expect(res.body).to.have.property('message').eql('Quantity must be a positive number');
        });

        it('should add product to cart successfully', async () => {
            const res = await chai
                .request(app)
                .post('/api/v1/carts/add')
                .send({
                    userId: user._id,
                    productId: product._id,
                    quantity: 2
                });

            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('status').eql('Success');
            // expect(res.body).to.have.property('message').eql('Product added to cart');
            expect(res.body).to.have.property('cart');
            expect(res.body.cart).to.have.property('user');
            expect(res.body.cart).to.have.property('products').to.be.an('array').to.have.length(1);
            expect(res.body.cart.products[0]).to.have.property('product');
            expect(res.body.cart.products[0]).to.have.property('quantity').eql(2);
        });
        it('should update product quantity in cart successfully', async () => {
            const res = await chai
                .request(app)
                .post('/api/v1/carts/add')
                .send({
                    userId: user._id,
                    productId: product._id,
                    quantity: 2
                });

            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('status').eql('Success');
            // expect(res.body).to.have.property('message').eql('Product added to cart');
            expect(res.body).to.have.property('cart');
            expect(res.body.cart).to.have.property('user');
            expect(res.body.cart).to.have.property('products').to.be.an('array').to.have.length(1);
            expect(res.body.cart.products[0]).to.have.property('product');
            expect(res.body.cart.products[0]).to.have.property('quantity').eql(4);
        });

    });
});

/*
{
    "message": "Products Purchased by User",
    "status": "success",
    "data": {
        "products": [
            {
                "_id": "640703441e67ce712d52d3cb",
                "name": "Asus ROG Zephyrus G14",
                "description": "14 inch gaming laptop with AMD Ryzen 9 processor and NVIDIA GeForce RTX 3060 graphics",
                "price": 1499,
                "category": "Laptop",
                "createdAt": "2023-03-07T09:26:28.614Z",
                "__v": 0
            },
            {
                "_id": "640703441e67ce712d52d3ca",
                "name": "HP Spectre x360",
                "description": "15.6 inch laptop with Intel Core i7 processor and NVIDIA GeForce GTX 1650 Ti graphics",
                "price": 1599,
                "category": "Laptop",
                "createdAt": "2023-03-07T09:26:28.614Z",
                "__v": 0
            },
            {
                "_id": "640703441e67ce712d52d3c8",
                "name": "Dell XPS 13",
                "description": "13.4 inch laptop with Intel Core i7 processor and 16GB RAM",
                "price": 1499,
                "category": "Laptop",
                "createdAt": "2023-03-07T09:26:28.614Z",
                "__v": 0
            }
        ]
    }
}
*/
