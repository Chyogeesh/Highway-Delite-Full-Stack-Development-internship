// Frontend TypeScript Interface for Booking State

interface Slot {
  date: string; // e.g., "2024-11-15T00:00:00.000Z"
  time: string; // e.g., "14:00 PM"
  capacity: number;
  bookedCount: number;
  isAvailable: boolean;
}

interface ExperienceDetail {
  _id: string;
  title: string;
  description: string;
  basePrice: number;
  duration: string;
  imageUrl: string;
  slots: Slot[];
}

interface CheckoutData {
  customerName: string;
  customerEmail: string;
  promoCode: string | null;
  priceBeforeDiscount: number;
  discountAmount: number;
  finalPrice: number;
}

interface BookingState {
  // Details Page
  currentExperience: ExperienceDetail | null;
  selectedSlot: Slot | null;
  
  // Checkout Page
  checkoutData: CheckoutData;
  
  // Result Page
  bookingRef: string | null;
  bookingStatus: 'initial' | 'loading' | 'confirmed' | 'failed';
  errorMessage: string | null;
}
