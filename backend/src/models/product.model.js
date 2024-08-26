import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    images: [
        {type: String,}
      ],
    category: {
      type: String,
      enum: ["Dessert", "Drinks", "Food"],
      required: true,
    },
    // description: {
    //   type: String,
    //   required: true,
    // },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
