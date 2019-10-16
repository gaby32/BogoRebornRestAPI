const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AddressSchema = new Schema({
    streetNumber: {
        type: String
    },
    streetName: {
        type: String
    },
    city: {
        type: String
    },
    postalCode: {
        type: String,
        trim: true
    },
    province: {
        type: String
    },
    country: {
        type: String
    }
});

module.exports = mongoose.model('Address', AddressSchema);