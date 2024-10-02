const mongoose = require("mongoose");

const theatreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    isActive: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const Theatres = mongoose.model("theatres", theatreSchema);

module.exports = Theatres;