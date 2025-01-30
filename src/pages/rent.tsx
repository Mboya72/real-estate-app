import React, { useState } from 'react';

const Rent = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  
  // Sample properties for rent with location and bedrooms
  const properties = [
    { id: 1, name: "Cozy 2-Bedroom Apartment", price: 1200, location: "New York", bedrooms: 2, description: "Located in a prime neighborhood with easy access to shops and parks.", image: "/property1.jpg" },
    { id: 2, name: "Spacious 3-Bedroom House", price: 2500, location: "Los Angeles", bedrooms: 3, description: "Perfect for families with a large backyard and modern amenities.", image: "/property2.jpg" },
    { id: 3, name: "Studio Apartment", price: 800, location: "San Francisco", bedrooms: 1, description: "Affordable and compact, ideal for students or young professionals.", image: "/property3.jpg" },
  ];

  // Filter properties based on search criteria
  const filteredProperties = properties.filter(property => {
    const isLocationMatch = property.location.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            property.name.toLowerCase().includes(searchQuery.toLowerCase());
    const isPriceMatch = (!minPrice || property.price >= minPrice) && (!maxPrice || property.price <= maxPrice);
    const isBedroomsMatch = !bedrooms || property.bedrooms === parseInt(bedrooms);

    return isLocationMatch && isPriceMatch && isBedroomsMatch;
  });

  return (
    <div className="bg-[#f7f7f7] p-8 min-h-screen">
      <h1 className="text-[#6E4559] text-3xl font-semibold text-center sm:text-4xl md:text-6xl lg:text-8xl mb-8">Properties for Rent</h1>
      
      {/* Search Bar with Filters */}
      <div className="mb-8 text-center space-y-4">
        <input
          type="text"
          placeholder="Search by location or property name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-3 w-full sm:w-[400px] lg:w-[600px] rounded-lg shadow-lg border"
        />

        <div className="space-x-4">
          {/* Price Filters */}
          <input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="p-3 w-full sm:w-[180px] lg:w-[200px] rounded-lg shadow-lg border"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="p-3 w-full sm:w-[180px] lg:w-[200px] rounded-lg shadow-lg border"
          />

          {/* Bedrooms Filter */}
          <input
            type="number"
            placeholder="Bedrooms"
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
            className="p-3 w-full sm:w-[180px] lg:w-[200px] rounded-lg shadow-lg border"
          />
        </div>
      </div>

      {/* Display Filtered Properties */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProperties.map((property) => (
          <div key={property.id} className="bg-white p-4 rounded-lg shadow-lg">
            <img src={property.image} alt={property.name} className="w-full h-[200px] object-cover rounded-t-lg" />
            <h3 className="font-semibold text-xl mt-4">{property.name}</h3>
            <p className="text-[#6E4559] mt-2">${property.price}/month</p>
            <p className="text-sm mt-2">{property.description}</p>
            <p className="text-sm mt-2"><strong>Location:</strong> {property.location}</p>
            <p className="text-sm mt-2"><strong>Bedrooms:</strong> {property.bedrooms}</p>
            <button className="bg-[#6E4559] text-white p-2 rounded-lg mt-4 w-full">View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rent;
