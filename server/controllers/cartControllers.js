const Product = require('../models/Product');
const User = require('../models/User');
const Cart = require('../models/Cart');

const getCart = async (req, res) => { 
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({
            message: "User ID is required",
            status: "Error"
        });
    }

    try {
        const cart = await Cart.findOne({ user: userId }).populate('products.product');

        if (!cart) {
            return res.status(200).json({
                message: "Cart is empty",
                status: "Success",
                cart: {
                    user: userId,
                    products: []
                }
            });
        }

        return res.status(200).json({
            message: "Cart fetched successfully",
            status: "Success",
            cart
        });

    } catch (err) {
        return res.status(500).json({
            message: "Internal server error",
            status: "Error",
            error: err
        });
    }
}

/*
Implement an API to add products to a user's cart.
Instructions:
The function should accept the following inputs:

userId: string representing the ID of the user adding the product
productId: string representing the ID of the product being added to the cart
quantity: number representing the quantity of the product being added to the cart
The function should perform the following steps:

Validate that all required inputs are present (userId, productId, and quantity).
Validate that the quantity is a positive number.
Retrieve the user's cart from the database.
If the user does not have a cart, create a new cart object for the user.
Check if the product being added already exists in the cart.
If the product exists, update the quantity of the existing product in the cart.
If the product does not exist, add a new product object to the cart with the provided quantity.
Save the cart object to the database.
The function should return a JSON response with a status code of 200 and the following format:
{
    "message": "Product added to cart",
    "status": "Success",
    "cart": <the updated cart object>
}

If any errors occur during the execution of the function, the function should return a JSON response with a status code of 500 and the following format:
{
    "message": "Internal server error",
    "status": "Error",
    "error": <the error object>
}

If any of the required inputs (userId, productId, or quantity) are missing or invalid, the function should return a JSON response with a status code of 400 and the following format:
{
    "message": "<validation error message>",
    "status": "Error"
}
*/

const addToCart = async (req, res) => {
    const { userId, productId, quantity } = req.body;

    if (!userId) {
        return res.status(400).json({
            message: "User ID is required",
            status: "Error"
        });
    }

    if (!productId) {
        return res.status(400).json({
            message: "Product ID is required",
            status: "Error"
        });
    }

    if (!quantity || quantity < 1) {
        return res.status(400).json({
            message: "Quantity must be a positive number",
            status: "Error"
        });
    }

    try {
        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            cart = new Cart({
                user: userId,
                products: []
            });
        }

        const cartProductIndex = cart.products.findIndex(p => p.product.toString() === productId);

        if (cartProductIndex >= 0) {
            cart.products[cartProductIndex].quantity += quantity;
        } else {
            cart.products.push({
                product: productId,
                quantity: quantity
            });
        }

        await cart.save();

        return res.status(200).json({
            message: "Product added to cart",
            status: "Success",
            cart
        });

    } catch (err) {
        return res.status(500).json({
            message: "Internal server error",
            status: "Error",
            error: err
        });
    }
};

/*
Implement a controller to delete a product from a user's cart.
Instructions:
The controller should accept the userId and productId from the request body.
It should then query the Cart collection to find the user's cart with the given userId.
If the cart is not found, it should return a JSON response with a status code of 404 and the following format:
{
    "message": "Cart not found",
    "status": "Error"
}
If the cart is found, it should find the index of the product with the given productId in the cart's products array using findIndex() method.
If the product is found, it should remove it from the cart's products array using the splice() method.
It should then save the updated cart using the save() method.
If the cart's products array becomes empty, it should delete the cart using the deleteOne() method.
It should return a JSON response with a status code of 200 and the updated cart object in the following format:
{
    "message": "Product deleted from cart",
    "status": "Success",
    "cart": <updated cart object>
}
If an error occurs during the operation, it should return a JSON response with a status code of 500 and the following format:
{
    "message": "Internal server error",
    "status": "Error",
    "error": <the error object>
}
*/

const deleteFromCart = async (req, res) => {
    const { userId, productId } = req.body;

    try {
        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({
                message: "Cart not found",
                status: "Error"
            });
        }

        const cartProductIndex = cart.products.findIndex(p =>
            p.product.toString() === productId
        );

        if (cartProductIndex >= 0) {
            cart.products.splice(cartProductIndex, 1);
            await cart.save();

            if (cart.products.length === 0) {
                await cart.deleteOne();
            }
        }

        return res.status(200).json({
            message: "Product deleted from cart",
            status: "Success",
            cart
        });

    } catch (err) {
        return res.status(500).json({
            message: "Internal server error",
            status: "Error",
            error: err
        });
    }
};

module.exports = { getCart ,addToCart, deleteFromCart };