import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/cartSlice";
import propertiesData from "../assets/properties.json";
import "../custom.css";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
  Box,
  TextField,
  Container,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  ListItemText,
  OutlinedInput,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import KingBedIcon from "@mui/icons-material/KingBed";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const PropertyList = () => {
  const dispatch = useDispatch();
  const [properties, setProperties] = useState(propertiesData);
  const isAuthenticated = useSelector((state) => state.auth.auth.active);

  const [filters, setFilters] = useState({
    location: "",
    minPrice: 0,
    maxPrice: 9000,
    bedrooms: "",
    amenities: [],
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleAmenitiesChange = (event) => {
    const {
      target: { value },
    } = event;
    setFilters({
      ...filters,
      amenities: typeof value === "string" ? value.split(",") : value,
    });
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    let filteredProperties = propertiesData;

    if (filters.location) {
      filteredProperties = filteredProperties.filter((property) =>
        property.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    if (filters.minPrice) {
      filteredProperties = filteredProperties.filter(
        (property) => property.price >= filters.minPrice
      );
    }
    if (filters.maxPrice) {
      filteredProperties = filteredProperties.filter(
        (property) => property.price <= filters.maxPrice
      );
    }
    if (filters.bedrooms) {
      filteredProperties = filteredProperties.filter(
        (property) => property.bedrooms >= filters.bedrooms
      );
    }
    if (filters.amenities.length) {
      filteredProperties = filteredProperties.filter((property) =>
        filters.amenities.every((amenity) => property.amenities.includes(amenity))
      );
    }

    setProperties(filteredProperties);
  };

  const navigate = useNavigate();

  const amenitiesOptions = ["WiFi", "Pool", "Parking", "Gym"];

  return (
    <div className="bg-animate min-h-screen">
      <Toaster />
      <Container>
        <Box sx={{ p: 3 }}>
          <h1 className="text-white font-serif text-4xl mb-8">Property Listings</h1>
          <form onSubmit={handleFilterSubmit} style={{ marginBottom: "20px" }}>
            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                label="Location"
                name="location"
                value={filters.location}
                onChange={handleFilterChange}
              />
              <TextField
                label="Min Price"
                name="minPrice"
                type="number"
                value={filters.minPrice}
                onChange={handleFilterChange}
              />
              <TextField
                label="Max Price"
                name="maxPrice"
                type="number"
                value={filters.maxPrice}
                onChange={handleFilterChange}
              />
              <FormControl sx={{ minWidth: 120 }}>
                <InputLabel>Bedrooms</InputLabel>
                <Select
                  name="bedrooms"
                  value={filters.bedrooms}
                  onChange={handleFilterChange}
                  input={<OutlinedInput label="Bedrooms" />}
                >
                  <MenuItem value="">
                    <em>Any</em>
                  </MenuItem>
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5+</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ minWidth: 200 }}>
                <InputLabel>Amenities</InputLabel>
                <Select
                  multiple
                  name="amenities"
                  value={filters.amenities}
                  onChange={handleAmenitiesChange}
                  input={<OutlinedInput label="Amenities" />}
                  renderValue={(selected) => selected.join(", ")}
                >
                  {amenitiesOptions.map((amenity) => (
                    <MenuItem key={amenity} value={amenity}>
                      <Checkbox checked={filters.amenities.indexOf(amenity) > -1} />
                      <ListItemText primary={amenity} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                type="submit"
                variant="contained"
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-3 rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
              >
                Apply Filters
              </Button>
            </Box>
          </form>
          <Box>
            {properties.map((property) => (
              <Card key={property.id} sx={{ display: "flex", mb: 2 }} className="hover:shadow-xl">
                <CardMedia
                  component="img"
                  sx={{ width: 151 }}
                  image={property.image}
                  alt={property.title}
                />
                <Grid container spacing={2}>
                  <Grid item xs={8}>
                    <CardContent>
                      <Typography variant="h6">{property.title}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {property.description}
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                        <LocationOnIcon />
                        <Typography variant="body2" sx={{ ml: 0.5 }}>
                          {property.location}
                        </Typography>
                        <KingBedIcon sx={{ ml: 2 }} />
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
                            <CheckIcon />
                            <Typography variant="body2" sx={{ ml: 0.5 }}>
                              {amenity}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </CardContent>
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
                    <Typography variant="h6">
                      <AttachMoneyIcon />
                      {property.price}
                    </Typography>
                    <Button
                      variant="contained"
                      className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-3 rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                      sx={{ mt: 1 }}
                      onClick={() => {
                        try {
                          if (isAuthenticated) {
                            dispatch(addToCart(property));
                            toast.success("Added to cart");
                          } else {
                            navigate("/login");
                          }
                        } catch (error) {
                          toast.error("Can't add to cart");
                        }
                      }}
                    >
                      Book Now
                    </Button>
                  </Grid>
                </Grid>
              </Card>
            ))}
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default PropertyList;
