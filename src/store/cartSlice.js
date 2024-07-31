import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  total: 0,
  bookingCount: 0,
  bookings: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const property = action.payload;
      const existingProperty = state.cart.find(
        (item) => item.id === property.id
      );
      if (existingProperty) {
        existingProperty.quantity += 1;
      } else {
        state.cart.push({ ...property, quantity: 1 });
      }
      state.total += property.price;
      state.bookingCount += 1;
    },
    removeFromCart: (state, action) => {
      const propertyId = action.payload;
      const existingProperty = state.cart.find(
        (item) => item.id === propertyId
      );
      if (existingProperty) {
        state.total -= existingProperty.price * existingProperty.quantity;
        state.bookingCount -= existingProperty.quantity;
        state.cart = state.cart.filter((item) => item.id !== propertyId);
      }
    },
    increaseQuantity: (state, action) => {
      const propertyId = action.payload;
      const property = state.cart.find((item) => item.id === propertyId);
      if (property) {
        property.quantity += 1;
        state.total += property.price;
        state.bookingCount += 1;
      }
    },
    decreaseQuantity: (state, action) => {
      const propertyId = action.payload;
      const property = state.cart.find((item) => item.id === propertyId);
      if (property && property.quantity > 1) {
        property.quantity -= 1;
        state.total -= property.price;
        state.bookingCount -= 1;
      }
    },
    bookNow(state) {
      const newBookings = state.cart.map((item) => ({
        id: item.id,
        title: item.title,
        price: item.price,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        location: item.location, // Include location
      }));
      state.bookings = [...state.bookings, ...newBookings]; // Append new bookings
      state.cart = [];
      state.total = 0;
      state.bookingCount = 0;
    },
  },
});
export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  bookNow,
} = cartSlice.actions;

export default cartSlice.reducer;
