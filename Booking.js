const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    experienceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Experience',
        required: true,
    },
    slot: {
        date: { type: Date, required: true },
        time: { type: String, required: true },
    },
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    promoCode: { type: String, default: null },
    finalPrice: { type: Number, required: true, min: 0 },
    bookingStatus: { 
        type: String, 
        enum: ['confirmed', 'pending', 'cancelled'],
        default: 'confirmed' 
    },
    bookingRef: {
        type: String,
        unique: true,
        // Simple unique ID generation (e.g., BOOK-timestamp)
        default: () => 'BOOK-' + Date.now().toString(36).toUpperCase()
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', BookingSchema);
