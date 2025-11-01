// Example logic for POST /promo/validate
const validatePromoCode = (req, res) => {
    const { code, currentPrice } = req.body;
    
    // Hardcoded logic for mock validation
    const PROMO_MAPPING = {
        'SAVE10': { type: 'percent', value: 0.10, message: '10% off applied!' },
        'FLAT100': { type: 'flat', value: 100, message: '₹100 flat discount applied!' },
        'SUMMER25': { type: 'percent', value: 0.25, message: 'Summer Sale 25% off!' },
    };

    const promo = PROMO_MAPPING[code.toUpperCase()];

    if (!promo) {
        return res.status(404).json({ message: 'Invalid promo code.' });
    }

    let discountAmount = 0;
    if (promo.type === 'percent') {
        discountAmount = currentPrice * promo.value;
    } else if (promo.type === 'flat') {
        discountAmount = promo.value;
    }

    const newPrice = Math.max(0, currentPrice - discountAmount);
    
    res.json({
        valid: true,
        discountAmount: Math.round(discountAmount),
        finalPrice: Math.round(newPrice),
        message: promo.message,
    });
};
