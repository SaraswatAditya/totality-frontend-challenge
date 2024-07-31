import React from "react";
import { useNavigate } from "react-router-dom";

// Sample property data
const properties = [
  {
    id: 1,
    title: "Cozy Apartment",
    location: "New York",
    price: 120,
    image:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fGFwYXJ0bWVudCUyMG5ldyUyMHlvcmt8fDB8fHx8MTY1NDg5NjQ5OQ&ixlib=rb-1.2.1&q=80&w=400",
  },
  {
    id: 2,
    title: "Luxury Villa",
    location: "Los Angeles",
    price: 350,
    image:
      "https://images.pexels.com/photos/6957083/pexels-photo-6957083.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 3,
    title: "Beach House",
    location: "Miami",
    price: 200,
    image:
      "https://images.pexels.com/photos/593171/pexels-photo-593171.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  // Add more properties here
];

const Homepage = () => {
  const navigate = useNavigate();

  const allListings = () => {
    navigate("/property");
  };

  return (
    <div className="flex flex-col min-h-screen bg-animate antialiased">
      {/* Hero Section */}
      <header className="text-white py-16">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-serif mb-4">Find Your Dream Property</h1>
          <p className="text-lg mb-8">
            Search from a wide range of properties across the world.
          </p>
        </div>
      </header>

      {/* Property Listings */}
      <main className="flex-grow py-6">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">
            Featured Properties
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ">
            {properties.map((property) => (
              <div
                key={property.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden "
              >
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-56 object-cover hover:scale-105 ease-in duration-150 hover:shadow-xl"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">
                    {property.title}
                  </h3>
                  <p className="text-gray-600 mb-2">{property.location}</p>
                  <p className="text-lg font-bold">
                    ${property.price} per night
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <button
              className="bg-blue-600 text-white py-3 px-6 rounded-lg"
              onClick={allListings}
            >
              View All Listings
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white py-6 mt-auto">
        <div className="container mx-auto text-center">
          <p className="text-lg mb-2">
            &copy; 2024 Property Rental Platform. All rights reserved.
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
            <a href="#" className="hover:underline">
              Terms of Service
            </a>
            <a href="#" className="hover:underline">
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
