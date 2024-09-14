const { default: mongoose } = require("mongoose");

const productSchema = new mongoose.Schema({
    product_name: {
        type: String,
        required: true,
        unique: true
    },
    product_price: {
        type: Number,
        required: true,
    },
    isInStock: {
        type: Boolean,
        default: true
    },
    category: {
        type: [String],
        required: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    confirm_password: {
        type: String,
        required: true,
        minLength: 8,
        validate: {
            validator: function () {
                return this.password === this.confirm_password
            },
            message: "Password and Confirm Password should be same"
        }
    }
}, { timestamps: true });

const validCategories = ["electronics", "clothes", "mobiles", "furniture"];

// this refers to current document
productSchema.pre("save", function () {
    this.confirm_password = undefined;
    console.log("in pre hook");
})

productSchema.pre("save", function (next) {
    const invalidCategories = this.category.filter(category => {
        return !validCategories.includes(category);
    })
    if (invalidCategories.length) {
        // throw new Error("Invalid Categories")
        return next(new Error(`Invalid categories ${invalidCategories}`));
    } else {
        // valid scenario
        next();
    }
})

//always create model after hook logics
const ProductModel = mongoose.model("products", productSchema);

module.exports = ProductModel;