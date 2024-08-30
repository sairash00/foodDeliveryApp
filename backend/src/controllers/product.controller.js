import {uploadOnCloudinary, removeFromCloudinary} from "../utils/cloudinary.js"
import Product from '../models/product.model.js'
import User from '../models/user.model.js'
import { isValidObjectId } from "mongoose"

export const addProduct = async (req, res) => {
    try {
        const data = req.body
        const file = req.file
        if(!data || data.name === "" || !data.price || data.description === "" || data.category === "" || !file ) return res.status(403).json({
            success: false,
            message: "All fields are required"
        })
        
        const result = await uploadOnCloudinary(file.path)

        if(!result) return res.status(500).json({
            success:false,
            message: "Failed to upload image"
        })

        const product = {
            name: data.name,
            price: data.price,
            description: data.description,
            category: data.category,
        }

        const newProduct = await Product.create(product)
        
        if(!product){
            await removeFromCloudinary(result.secure_url)
            return res.status(403).json({
                success: false,
                message: "Failed to create product"
            })
        }

        newProduct.images.push(result.secure_url)
        newProduct.save()

       res.status(200).json({
        success: true,
        message: "Product created successfully",
        product: newProduct
       })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const deleteProduct = async (req,res) => {
    try {
        const productId = req.body.id
        if(!productId) return res.status(404).json({
            success: false,
            message: "Product ID is required"
        })

        const product = await Product.findByIdAndDelete(productId)
        if(!product) return res.status(404).json({
            success: false,
            message: "Product not found"
        })

        const url = product.images[0];
        const removedImage = await removeFromCloudinary(url)

        res.status(200).json({
            success: true,
            message: "Product deleted successfully",
            product,
            removedImage
        })
    
    }catch(error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const getProducts = async(req,res) => {
    try {
        const products = await Product.find()

        if(!products) return res.status(404).json({
            success: false,
            message: "No products found"
        })

        res.status(200).json({
            success: true,
            products
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const getOneProduct = async(req,res) => {
    try {
        
        const id = req.params.id
        if(!id || !isValidObjectId(id)) return res.status(404).json({
                success: false,
                message: "Invalid Id"
            })

        const product = await Product.findById(id)
        if(!product) return res.status(404).json({
            success: false,
            message: "Product not found"
        })
    
        res.status(200).json({
            success: true,
            message: "Product fetched successfully",
            product
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const addToCart = async (req,res) => {
    try {
        
        const userId = req.user
        const productId = req.body.id
        const quantity = req.body.quantity

        if(!userId || !productId || !quantity) return res.status(403).json({
            success: false,
            message: "All fields are required"
        })

        const product = await Product.findById(productId)
        if(!product) return res.status(404).json({
            success: false,
            message: "Product not found"
        })

        const user = await User.findByIdAndUpdate(userId, {
            $push:{
                cart:{
                    item: product._id,
                    quantity
                }
            }
        },{new:true}).select("email cart")

        if(!user) return res.status(403).json({
            success: false,
            message: "Failed to add to cart"
        })

        return res.status(200).json({
            success: true,
            message: "product added to cart successfully",
            user
        })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const removeFromCart = async(req, res) => {
    try {
        
        
        const userId = req.user
        const cartId = req.body.id

        if(!userId ||!cartId) return res.status(403).json({
            success: false,
            message: "All fields are required"
        })

        const user = await User.findByIdAndUpdate(userId,{
            $pull:{
                cart:{
                    _id: cartId
                }
            }
        },{new: true}).select("cart")

        if(!user) return res.status(403).json({
            success: false,
            message: "Failed to delete cart"
        })

        res.status(200).json({
            success: true,
            message: "Product removed from cart successfully",
            user
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const getCartDetails = async (req, res) => {
    try {
        
        
        const userId = req.user

        if(!userId) return res.status(403).json({
            success: false,
            message: "userId is required"
        })

        const products = await User.findById(userId).select("cart").populate({
            path: "cart.item",
            select: "name price images"

        })

        if(!products) return res.status(403).json({
            success: false,
            message: "Failed to get Cart details"
        })

        res.status(200).json({
            success: true,
            message: "Cart details fetched successfully",
            products
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const search = async(req,res) => {
    try {
        
        const search = req.query.search
        if(!search || search === "") return res.status(403).json({
            success: false,
            message: " Invalid Name "
        })
        const products = await Product.find()
        if(!products) return res.status(404).json({
            success: false,
            message: "Product not found"
        })

        const filteredProducts = products.filter(product => product.name === search)

        if(!filteredProducts || !filteredProducts.length ) return res.status(404).json({
            success: false,
            message: "Product not found"
        })

        res.status(200).json({
            success: true,
            message: "Products found successfully",
            products: filteredProducts
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}