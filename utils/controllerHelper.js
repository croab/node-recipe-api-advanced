class ControllerHelper {
  // Passing in a query (which is in effect a model), and a query string
  constructor(model, queryString) {
    this.model = model;
    this.queryString = queryString;
    this.query = null;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ['sort', 'fields', 'page', 'limit'];
    excludedFields.forEach((field) => {
      delete queryObj[field];
    });
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

    // Appling filter
    this.query = this.model.find(JSON.parse(queryStr));
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortFormatted = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortFormatted);
    } else {
      this.query = this.query.sort('title');
    }
    return this;
  }

  // limitResults() {

  // }

  // paginate() {

  // }
}

module.exports = ControllerHelper;