import mongoose from "mongoose";

const favoritesSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        name: {
            type: String,
            required: true,
        },
        image: {
            type: String,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
            default: 0,
        },
        rating: {
            type: Number,
            required: true,
            default: 0,
        },
        numReviews: {
            type: Number,
            required: true,
            default: 0,
        },
        countInStock: {
            type: Number,
            required: true,
            default: 0,
        },
        countInSold: {
            type: Number,
            required: true,
            default: 0,
        },
        categories: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

const Favorites = mongoose.model("Favorites", favoritesSchema);

export default Favorites;
