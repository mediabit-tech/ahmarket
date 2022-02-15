// Search and pagination features

class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    // Search keyword feature of API
    search() {
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: 'i'
            }
        } : {};

        this.query = this.query.find({ ...keyword });
        return this;
    }

    // Filter category feature of API
    filter() {
        const queryCopy = { ...this.queryStr };
        // Removing some fields for category
        const removeFields = ['keyword', 'page', 'limit']; // here limit for page

        removeFields.forEach(key => delete queryCopy[key]);

        // Filter for price and rating
        let queryStr = JSON.stringify(queryCopy);
        // gt: greater than, gte: greater than or equal to, lt: less than, lte: less than or equal to
        queryStr = queryStr.replace(/\b(gt | gte | lt | lte)\b/g, key => `$${key}`);

        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }

    // Pagination
    pagination(resultPerPage){
        const currentPage = Number(this.queryStr.page) || 1;

        const skip = resultPerPage * (currentPage - 1);
        this.query = this.query.limit(resultPerPage).skip(skip);
        return this;
    }
};

module.exports = ApiFeatures;