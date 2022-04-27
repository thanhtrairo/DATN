import express from "express";
import asyncHandler from "express-async-handler";
import Favorites from "./../Models/FavoritesModel.js";
import { protect } from "./../Middleware/AuthMiddleware.js";

const favoritesRoute = express.Router();

// GET ALL PRODUCT
favoritesRoute.get(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const favorites = await Favorites.find({ user: req.user._id }).sort({ _id: -1 });
    res.json(favorites);
  })
);

// DELETE PRODUCT
favoritesRoute.delete(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    const favorites = await Favorites.findById(req.params.id);
    if (favorites) {
      await favorites.remove();
      res.json({ message: "favorites deleted" });
    } else {
      res.status(404);
      throw new Error("favorites not Found");
    }
  })
);

// CREATE favorite
favoritesRoute.post(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const { name, price, description, image, countInStock, countInSold, categories, rating, numReviews } = req.body;
    const favoritesExist = await Favorites.findOne({ name });
    if (favoritesExist) {
      res.status(400);
      throw new Error("Favorites name already exist");
    } else {
      const favorites = new Favorites({
        name,
        price,
        description,
        image,
        countInStock,
        countInSold,
        categories,
        rating,
        numReviews,
        user: req.user._id
      });
      if (favorites) {
        const createdfavorites = await favorites.save();
        res.status(201).json(createdfavorites);
      } else {
        res.status(400);
        throw new Error("Invalid favorites data");
      }
    }
  })
);

export default favoritesRoute;
