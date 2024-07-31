import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  bookNow,
} from "../store/cartSlice";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Box,
  Container,
} from "@mui/material";
import "../custom.css";
import { Toaster } from "react-hot-toast";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const total = useSelector((state) => state.cart.total);
  const bookingCount = useSelector((state) => state.cart.bookingCount);
  const bookings = useSelector((state) => state.cart.bookings) || []; // Default to empty array

  const handleBookNow = () => {
    // Ensure all cart items have a location before booking
    const allItemsHaveLocation = cart.every((item) => item.location);

    if (allItemsHaveLocation) {
      dispatch(bookNow());
    } else {
      // Handle case where location is missing
      alert("All items must have a location before booking.");
    }
  };

  return (
    <div className="bg-animate min-h-screen">
      <Toaster />
      <Container>
        <h2 className="text-white font-serif text-4xl py-3">Cart</h2>
        {cart.length === 0 ? (
          <Typography variant="body1">Your cart is empty.</Typography>
        ) : (
          <div>
            {cart.map((property) => (
              <Card
                key={property.id}
                sx={{ mb: 2 }}
                className="hover:shadow-xl"
              >
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={8}>
                      <Typography variant="h6">{property.title}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {property.description}
                      </Typography>
                      <Box
                        sx={{ display: "flex", alignItems: "center", mt: 1 }}
                      >
                        <Typography variant="body2" sx={{ ml: 0.5 }}>
                          {property.location}
                        </Typography>
                        <Typography variant="body2" sx={{ ml: 0.5 }}>
                          {property.bedrooms} Bedrooms
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", flexWrap: "wrap", mt: 1 }}>
                        {property.amenities.map((amenity, index) => (
                          <Box
                            key={index}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              mr: 2,
                              mb: 1,
                            }}
                          >
                            <Typography variant="body2" sx={{ ml: 0.5 }}>
                              {amenity}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </Grid>
                    <Grid
                      item
                      xs={4}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography variant="h6">${property.price}</Typography>
                      <Box
                        sx={{ display: "flex", alignItems: "center", mt: 1 }}
                      >
                        <Button
                          onClick={() =>
                            dispatch(decreaseQuantity(property.id))
                          }
                          variant="contained"
                        >
                          -
                        </Button>
                        <Typography variant="body2" sx={{ ml: 1, mr: 1 }}>
                          {property.quantity}
                        </Typography>
                        <Button
                          onClick={() =>
                            dispatch(increaseQuantity(property.id))
                          }
                          variant="contained"
                        >
                          +
                        </Button>
                      </Box>
                      <Button
                        onClick={() => dispatch(removeFromCart(property.id))}
                        variant="contained"
                        color="secondary"
                        sx={{ mt: 1 }}
                      >
                        Remove
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))}
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" className="text-white">Total: ${total}</Typography>
              <Typography variant="body1" >
                Count: {bookingCount}
              </Typography>
              <Button
                onClick={handleBookNow}
                variant="contained"
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-3 rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                sx={{ mt: 2 }}
              >
                Checkout
              </Button>
            </Box>
          </div>
        )}
        {bookings.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" className="text-white font-serif text-4xl py-3">Bookings</Typography>
            {bookings.map((booking, index) => (
              <Card key={index} sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="h6" >{booking.title}</Typography>
                  <Typography variant="body2">
                    Price: ${booking.price}
                  </Typography>
                  <Typography variant="body2">Date: {booking.date}</Typography>
                  <Typography variant="body2">Time: {booking.time}</Typography>
                  <Typography variant="body2">
                    Location: {booking.location}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      </Container>
    </div>
  );
};

export default Cart;
