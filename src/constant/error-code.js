const ERROR_CODE = {
  FIELD_REQUIRED: {
    message: "All Fields Required",
    code: 1000,
  },

  TITLE_INVALID: {
    message: "Title must be in range 4 to 20 characters",
    code: 1001,
  },

  AMOUNT_INVALID: {
    message: "Amount must be of minimum 100 VND ",
    code: 1002,
  },

  DESC_INVALID: {
    message: "Description must be in range 4 to 20 characters",
    code: 1003,
  },
};

module.exports = ERROR_CODE;
