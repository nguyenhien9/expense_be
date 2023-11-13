const ERROR_CODE = require("../constant/error-code");

const modelValidate = (req, res, next) => {
  const { title, amount, desc } = req.body;

  if (!title || !amount || !desc) {
    return res.status(400).json({
      success: false,
      code: ERROR_CODE.FIELD_REQUIRED.code,
      message: ERROR_CODE.FIELD_REQUIRED.message,
    });
  }
  if (title.length < 4 || title.length > 20) {
    return res.status(400).json({
      success: false,
      code: ERROR_CODE.TITLE_INVALID.code,
      message: ERROR_CODE.TITLE_INVALID.message,
    });
  }
  if (amount < 100) {
    return res.status(400).json({
      success: false,
      code: ERROR_CODE.AMOUNT_INVALID.code,
      message: ERROR_CODE.AMOUNT_INVALID.message,
    });
  }
  if (desc.length < 4 || desc.length > 20) {
    return res.status(400).json({
      success: false,
      code: ERROR_CODE.DESC_INVALID.code,
      message: ERROR_CODE.DESC_INVALID.message,
    });
  }

  next();
};

module.exports = modelValidate;
