const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");

// Create product -- Admin route
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
    // get the user name, who is product created
    req.body.user = req.user.id;

    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product,
    });
});

// Get All Products
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
    // Pagination
    const resultPerPage = 8;
    const productsCount = await Product.countDocuments();
    // apiFeature is filter feature with keyword
    const apiFeature = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter()
        .pagination(resultPerPage);
    // filteredProductCount
    // let products = await apiFeature.query;
    // let filteredProductsCount = products.length;
    // apiFeature.pagination(resultPerPage);

    const products = await apiFeature.query;
    res.status(200).json({
        success: true,
        products,
        productsCount,
        resultPerPage,
        // filteredProductsCount,
    });
});

// Get single product details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    // If product isn't available into database
    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }
    // If available
    res.status(200).json({
        success: true,
        product,
    });
});

// Update product -- Admin route
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    // If product isn't available into database
    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }
    // If product is available into database
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
        product,
    });
});

// Delete product -- Admin route
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    // If product isn't available into database
    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }
    // If product is available into database
    await product.remove();

    res.status(200).json({
        success: true,
        message: "Product deleted successfully",
    });
});

// Create new review or update the review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
    // destructuring...
    const { rating, comment, productId } = req.body;
    const review = {
        user: req.user.id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    };

    const product = await Product.findById(productId);
    const isReviewed = product.reviews.find(
        (rev) => rev.user.toString() === req.user._id.toString()
    );
    if (isReviewed) {
        product.reviews.forEach((rev) => {
            if (rev.user.toString() === req.user._id.toString())
                (rev.rating = rating), (rev.comment = comment);
        });
    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }

    // overall rating
    // Ex: 4,5,5,2 = 16/4 = 4
    let avg = 0;
    product.reviews.forEach((rev) => {
        avg += rev.rating; //avg = avg + rev.rating
    });

    product.ratings = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false });
    res.status(200).json({
        success: true,
    });
});

// Get all reviews
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
    const product = await product.findById(req.query.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json({
        success: true,
        reviews: product.reviews,
    });
});

// Delete review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
    const product = await product.findById(req.query.productId);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    const reviews = product.reviews.filter((rev) => {
        rev._id.toString() !== req.query.id.toString();
    });

    let avg = 0;
    reviews.forEach((rev) => {
        avg += rev.rating; //avg = avg + rev.rating
    });

    const ratings = avg / reviews.length;
    const numOfReviews = reviews.length;
    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        ratings,
        numOfReviews,
    },
        {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        });

    res.status(200).json({
        success: true,
    });
});
