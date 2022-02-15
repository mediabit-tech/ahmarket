const express = require('express');
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview, getProductReviews, deleteReview } = require('../controllers/productController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

// Set the route for fetch All produts
router.route('/products').get(getAllProducts);

// Set the route for create new product
router.route('/admin/product/new').post(isAuthenticatedUser, authorizeRoles('admin'), createProduct);

// Set the route for update & delete the details of the single product respectively
router.route('/admin/product/:id')
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateProduct)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct);

// Set the route for get the all details of product
router.route('/product/:id').get(getProductDetails);

// Set the route for give the review by authorized user
router.route('/review').put(isAuthenticatedUser, createProductReview);

// Set the route for get all reviews & delete review respectively
router.route('/reviews').get(getProductReviews).delete(isAuthenticatedUser, deleteReview);

module.exports = router