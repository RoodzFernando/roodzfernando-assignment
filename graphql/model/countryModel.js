const { Schema } = require('mongoose');

const CountryDataSchema = new Schema({
  Country: {
    type: String,
    required: true,
  },
  Year: {
    type: String,
    required: true,
  },
  Area: {
    type: Number,
    required: true
  },
  Total: {
    type: Number,
    required: true,
  },
});

module.exports = CountryDataSchema;
