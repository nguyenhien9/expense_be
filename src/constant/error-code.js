const ERROR_CODE = {
  FIELD_REQUIRED: {
    message: "All Fields Required",
    code: 100,
  },
  TITLE_INVALID: {
    message: "Title must be in range 4 to 20 characters",
    code: 101,
  },

  AMOUNT_INVALID: {
    message: "Amount must be of minimum 100 VND ",
    code: 102,
  },

  DESC_INVALID: {
    message: "Description must be in range 4 to 20 characters",
    code: 103,
  },
};

module.exports = ERROR_CODE;
