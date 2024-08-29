import User from '../models/user.model.js'
import Product from '../models/product.model.js'
import Order from '../models/order.model.js'
import { verifyToken } from '../utils/jwt.js'
import { isValidObjectId } from 'mongoose'

export const add = async (req,res) => {
    try {
        (req.body)
        const data = req.body
        if(!data || !data.items) return res.status(403).json({
            success: false,
            message: "All fields are required"
        })

        const uid = req.user

        const user = await User.findById(uid).select("orders")
        if(!user) return res.status(403).json({
            success: false,
            message: "User not found"
        }) 

        const productValidations = await Promise.all(
            data.items.map(async (item) => {
                const product = await Product.findById(item.item._id);
                if (!product) throw new Error(`Product with ID ${item.item._id} not found`);
            })
        );

        const newData = {
            by: uid,
            items: data.items,
            pickUp: data.pickUp,
            paid: data.paid,
            deliveryAddress: data.address || null
        }

        const order = await Order.create(newData)

        if(!order) return res.status(500).json({
            success: false,
            message: "Failed to create order"
        })

        user.orders.push(order._id);
        user.save();

        res.status(200).json({
            success: true,
            message: "Order created successfully",
            order,
            user
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const deleteOrder = async (req,res) => {
    try {

        const orderId = req.body.id
        if(!orderId || !isValidObjectId(orderId)) return res.status(403).json({
            success: false,
            message: "Invalid order id"
        })


        const order = await Order.findByIdAndDelete(orderId);
        if(!order) return res.status(404).json({
            success: false,
            message: "Order not found"
        })

        const uid = req.user

        const user = await User.findByIdAndUpdate({_id:uid},{
            $pull: {
                orders: orderId
            }
        },{new:true}).select("orders")

        if(!user) return res.status(500).json({
            success: false,
            message: "Error removing order"
        })

        res.status(200).json({
            success: true,
            message: "Order deleted successfully",
            order,
            user
        })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const status = async(req,res) => {
    try {
        const id = req.body.id
        if(!id || !isValidObjectId(id)) return res.status(403).json({
            success: false,
            message: "Invalid order id"
        })
        const status = req.body.status
        if(!status || !status === "delivering" || !status === "delivered") return res.status(403).json({
            success: false,
            message: "Invalid status"
        })

        const order= await Order.findByIdAndUpdate(id,{
            status
        },{new: true})

        if(!order) return res.status(404).json({
            success: false,
            message: "Order not found"
        })

        res.status(200).json({
            success: true,
            message: "Order status updated successfully",
            order
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const cancel = async (req,res) => {
    try {

        const id = req.body.id
        if(!id || !isValidObjectId(id)) return res.status(403).json({
            success:false,
            message: "Invalid order id"
        })

        const order = await Order.findByIdAndUpdate(id,{
            status: "cancelled"
        },{new: true})

        if(!order) return res.status(404).json({
            success: false,
            message: "Order not found"
        })

        res.status(200).json({
            success: true,
            message: "Order cancelled",
            order
        })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const getAll = async (req,res) => {
    try {
        const orders = await Order.find().populate({
            path: "by",
            select: "name"
        }).populate({
            path: "items.item",
            model: "Product",
            select:"name price images"
        })
        if(!orders) return res.status(404).json({
            success: false,
            message: "No orders found"  
        })

        res.status(200).json({
            success: true,
            message: "Orders fetched successfully",
            orders
        })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const getUserOrder = async (req,res) => {
    try {

        const uid = req.user
        const orders = await User.findById(uid).select("orders").populate({
            path: "orders",
            populate: {
                path: "items.item",
                model: "Product",
                select:"name price images"
            }
        })

        if(!orders) return res.status(404).json({
            success: false,
            message: "User orders not found"
        })

        res.status(200).json({
            success: true,
            message: "User orders fetched successfully",
            orders
        })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}