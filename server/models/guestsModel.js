const mongoose = require("mongoose");

// booking  = guest renting a cabin
// i.e connecting cabin with guest

const guestSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "A guest name is required"],
  },
  email: {
    type: String,
  },
  nationality: {
    type: String,
  },
  nationalId: {
    type: String,
  },
  countryFlag: {
    type: String,
  },
});

const Guest = mongoose.model("Guest", guestSchema);

Guest.create({
  fullName: "Jonas Schmedtmann",
  email: "hello@jonas.io",
  nationality: "Portugal",
  nationalID: "3525436345",
  countryFlag: "https://flagcdn.com/pt.svg",
});

module.exports = Guest;

// {
//     // id: 1000,
//     fullName: 'Jonas Schmedtmann',
//     email: 'hello@jonas.io',
//     nationality: 'Portugal',
//     nationalID: '3525436345',
//     countryFlag: 'https://flagcdn.com/pt.svg',
//   },
