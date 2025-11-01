const mongoose = require('mongoose');

const ExperienceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    city: { type: String, required: true },
    basePrice: { type: Number, required: true, min: 0 },
    duration: { type: String, required: true }, // e.g., "3 hours"
    imageUrl: { type: String, required: true }, // Unsplash/Pexels link
    isFeatured: { type: Boolean, default: false },
    // A temporary array to simulate slots attached to an experience (better managed separately in production)
    slots: [{
        date: { type: Date, required: true },
        time: { type: String, required: true }, // e.g., "10:00 AM"
        capacity: { type: Number, required: true, min: 1 },
        bookedCount: { type: Number, default: 0 },
        isAvailable: { type: Boolean, default: true },
    }],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Experience', ExperienceSchema);
