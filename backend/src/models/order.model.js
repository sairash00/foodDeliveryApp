import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    items: [
        {
            item: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            },
            quantity:{
                type: Number,
                default: 1
            }
        }
    ],
    pickUp: {
        type: Boolean,
        default: false
    },
    status:{
        type: String,
        enum: ['pending', 'delivering', 'delivered', 'cancelled'],
        default: 'pending'
    },
    paid:{
        type: Boolean,
        default: false
    },
    deliveryAddress: {
        street: { type: String},
        city: { type: String},
        state: { type: String},
        country: { type: String},
      }
},{timestamps: true})

const Order = mongoose.model("Order", orderSchema);
export default Order  