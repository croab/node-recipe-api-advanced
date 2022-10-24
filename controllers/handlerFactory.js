const CustomError = require('./../utils/customError');
const catchAsync = require('./../utils/catchAsync');

exports.deleteOne = Model =>
  catchAsync(async (req, res, next) => {
    const deletedRecipe = await Model.findByIdAndDelete(
      req.params.id
    );
    if (!deletedRecipe) {
      return next(new CustomError('No recipe found with that id', 404));
    }
    res.status(204).json({
      status: 'success',
      data: null
    });
  });