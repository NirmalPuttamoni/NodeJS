const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    createdAt: Date,
    updatedAt: Date
});

// don't use doc in pre hook
userSchema.pre("save", function (next) {
    console.log("in pre hook of user");
    const now = new Date();
    this.updatedAt = now;
    if (!this.createdAt) {
        this.createdAt = now;
    };
    next(); // if next is not called next processes will not get invoked
});

//doc is not available in pre hook
userSchema.post("save", function (doc, next) {
    console.log(`User ${doc.name} saved`);
    next();
});

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;