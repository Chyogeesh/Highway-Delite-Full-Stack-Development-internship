// Example middleware/controller logic for POST /bookings
const createBooking = async (req, res) => {
    const { experienceId, selectedDate, selectedTime, customerEmail, ... } = req.body;

    // 1. Find the Experience and the specific slot
    const experience = await Experience.findById(experienceId);

    if (!experience) {
        return res.status(404).json({ message: 'Experience not found.' });
    }

    // Find the specific slot within the experience (requires careful array manipulation in Mongo)
    const slotIndex = experience.slots.findIndex(slot => 
        slot.time === selectedTime && slot.date.toISOString().startsWith(selectedDate.substring(0, 10))
    );

    if (slotIndex === -1) {
        return res.status(400).json({ message: 'Selected slot is invalid or unavailable.' });
    }

    const slot = experience.slots[slotIndex];

    // 2. Check Capacity
    if (slot.bookedCount >= slot.capacity) {
        // Important Feedback State
        return res.status(409).json({ message: 'Slot is fully booked (Sold Out).' });
    }

    try {
        // 3. Increment bookedCount and Save
        experience.slots[slotIndex].bookedCount += 1;
        // Optionally update isAvailable to false if bookedCount === capacity
        if (experience.slots[slotIndex].bookedCount === experience.slots[slotIndex].capacity) {
            experience.slots[slotIndex].isAvailable = false;
        }

        await experience.save();

        // 4. Create Booking Document
        const newBooking = new Booking({
            experienceId,
            slot: { date: slot.date, time: slot.time },
            customerEmail,
            finalPrice: calculateFinalPrice(req.body.price, req.body.promoCode), // Implement this function
            // ... other fields
        });
        await newBooking.save();

        res.status(201).json({ 
            message: 'Booking confirmed!', 
            bookingRef: newBooking.bookingRef 
        });

    } catch (error) {
        console.error('Booking failed:', error);
        res.status(500).json({ message: 'Server error during booking process.' });
    }
};
