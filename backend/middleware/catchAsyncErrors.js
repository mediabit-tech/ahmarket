module.exports = catchAsyncErr => (req, res, next) => {
    // JavaScript Classes
    Promise.resolve(catchAsyncErr(req, res, next)).catch(next);
}