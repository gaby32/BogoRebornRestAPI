const Address = require('../other_models/Address');
const UserType = require('../other_models/UserType');

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const Schema = mongoose.Schema;

//TODO REVOIR LES REQUIRED
const UserSchema = new Schema({
    userType: {
        type: UserType,
        required: false
    },
    firstName: {
        type: String
    },
    info: {
        firstName: {
            type: String,
            trim: true,
            required: false
        },
        lastName: {
            type: String,
            trim: true,
            required: false
        },
        phones: {
            type: [String],
            required: false
        },
        addresses: {
            type: String
        },
        email: {
            type: String,
            trim: true/*,
            validate: {
                validator: function (v) {
                    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v);
                },
            }*/
        },
        password: {
            type: String,
            trim: true,
            required: false/*,
            validate: {
                validator: function(v){
                    return /^(?=.\d)(?=.[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(v);
                }
            },*/
        },
        cities: {
            type: String
        },
        business: {
            type: String
        },
        rating: Number
    },
    config: {
        visual: {
            darkTheme: false,
            denseTable: false
        },
        security: {
            twoFactorAuth: false
        },
        notification: {
            type: Array
        }
    },
    terms:{
        type: Boolean,
        required:false/*,
        validate:{ validator: function (v){
                return  v === true;
            }
        }*/
    },
    lastLoggedIn: {
        type: Date,
        default: Date.now()
    }
});

/*UserSchema.pre('save', function (next) {
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next();
});*/
module.exports = mongoose.model('User', UserSchema);