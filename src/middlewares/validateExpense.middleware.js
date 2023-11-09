const ERROR_CODE = require("../constant/error-code");

const modelValidate = (req, res, next) => {
  const data = req.body;
  const ERROR = [];

  if (!data.title || !data.amount || !data.desc) {
    ERROR.push(ERROR_CODE.FIELD_REQUIRED.code);
  }
  if (data.title.length < 4 || data.title.length > 20) {
    ERROR.push(ERROR_CODE.TITLE_INVALID.code);
  }

  if (data.amount < 100) {
    ERROR.push(ERROR_CODE.AMOUNT_INVALID.code);
  }

  if (data.desc.length < 4 || data.desc.length > 20) {
    ERROR.push(ERROR_CODE.DESC_INVALID.code);
  }

  if (ERROR.length > 0) {
    return res.status(400).json({ errors: ERROR });
  }

  next();
};

module.exports = modelValidate;
