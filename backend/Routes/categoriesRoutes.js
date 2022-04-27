import express from "express";
import asyncHandler from "express-async-handler";
import Categories from "../Models/CategoriesModel.js";
import { admin, protect } from "./../Middleware/AuthMiddleware.js";

const categoriesRouter = express.Router();

// CREATE Categories
categoriesRouter.post(
    "/",
    protect,
    admin,
    asyncHandler(async (req, res) => {
        const { name } = req.body;
        const categoriesExist = await Categories.findOne({ name });
        if (categoriesExist) {
            res.status(400);
            throw new Error("Categories name already exist");
        } else {
            const categories = new Categories({
                name,
                user: req.user._id,
            });
            if (categories) {
                const createdCategories = await categories.save();
                res.status(201).json(createdCategories);
            } else {
                res.status(400);
                throw new Error("Invalid categories data");
            }
        }
    })
);

categoriesRouter.get(
    "/",
    asyncHandler(async (req, res) => {
        const categories = await Categories.find({})
        res.json(categories)
    })
);

export default categoriesRouter;