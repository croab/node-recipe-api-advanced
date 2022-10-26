class ControllerHelper {
  // Passing in a query (which is in effect a model), and a query string
  constructor(Model, queryString, optFilter) {
    // The query string
    this.queryString = queryString;
    // The model in question
    this.Model = Model;
    // Any optional filter if present
    this.optFilter = optFilter || false;
    // Initialize
    this.query = null;
  }

  filter() {
    let queryObj = { ...this.queryString };
    const excludedFields = ['sort', 'fields', 'page', 'limit'];
    excludedFields.forEach((field) => {
      delete queryObj[field];
    });
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

    // Appling filter
    queryObj = JSON.parse(queryStr);
    if (this.optFilter) queryObj = Object.assign(queryObj, this.optFilter)
    this.query = this.Model.find(queryObj);
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortFormatted = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortFormatted);
    } else {
      // Need to sort this at some point based on which fields are available on the calling model
      this.query = this.query.sort('_id');
    }
    return this;
  }

  limitFields() {
    if (this.queryString.limit) {
      const limitFormatted = this.queryString.limit.split(',').join(' ');
      this.query = this.query.select(limitFormatted);
    } else if (this.query.schema.obj.title) {
      this.query = this.query.select('title');
    } else if (this.query.schema.obj.name) {
      this.query = this.query.select('name');
    } else {
      this.query = this.query.select('createdAt');
    }
    return this;
  }

  paginate() {
    const page = parseInt(this.queryString.page, 10) || 1;
    const limit = parseInt(this.queryString.limit, 10) || 100;
    const skipNumber = (page - 1) * limit;
    this.query = this.query.skip(skipNumber).limit(limit);
    return this;
  }
}

module.exports = ControllerHelper;