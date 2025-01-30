import React, { useState, useEffect } from 'react';

interface Property {
  id: number;
  name: string;
  price: number;
  location: string;
  image: string;
  description: string;
  bedrooms: number;
}

const Buy = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [minPrice, setMinPrice] = useState<number | ''>('');
  const [maxPrice, setMaxPrice] = useState<number | ''>('');
  const [bedrooms, setBedrooms] = useState<number | ''>('');
  const [properties, setProperties] = useState<Property[]>([]);

  // Fetch properties from the API
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch('http://localhost:5000/properties');
        const data = await response.json();
        setProperties(data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    fetchProperties();
  }, []);  // Empty dependency array means this runs only once when the component mounts

  // Filter properties based on search criteria
  const filteredProperties = properties.filter(property => {
    const isLocationMatch = property.location.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            property.name.toLowerCase().includes(searchQuery.toLowerCase());

    const isPriceMatch = 
      (minPrice === '' || property.price >= minPrice) && 
      (maxPrice === '' || property.price <= maxPrice);

    const isBedroomsMatch = bedrooms === '' || property.bedrooms === bedrooms;

    return isLocationMatch && isPriceMatch && isBedroomsMatch;
  });

  // Handle Buy button click (for now it just logs the action)
  const handleBuyClick = (property: Property) => {
    // For now, just alerting the user that the property is being "bought".
    alert(`You have bought the property: ${property.name}`);
  };

  return (
    <div className="bg-[#f7f7f7] text-black p-8 min-h-screen">
      <h1 className="text-[#6E4559] text-3xl font-semibold text-center sm:text-4xl md:text-6xl lg:text-8xl mb-8">Properties for Sale</h1>
      
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
            value={minPrice === '' ? '' : minPrice}
            onChange={(e) => setMinPrice(e.target.value === '' ? '' : parseInt(e.target.value))}
            className="p-3 w-full sm:w-[180px] lg:w-[200px] rounded-lg shadow-lg border"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice === '' ? '' : maxPrice}
            onChange={(e) => setMaxPrice(e.target.value === '' ? '' : parseInt(e.target.value))}
            className="p-3 w-full sm:w-[180px] lg:w-[200px] rounded-lg shadow-lg border"
          />

          {/* Bedrooms Filter */}
          <input
            type="number"
            placeholder="Bedrooms"
            value={bedrooms === '' ? '' : bedrooms}
            onChange={(e) => setBedrooms(e.target.value === '' ? '' : parseInt(e.target.value))}
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
            <p className="text-[#6E4559] mt-2">${property.price.toLocaleString()}</p>
            <p className="text-sm mt-2">{property.description}</p>
            <p className="text-sm mt-2"><strong>Location:</strong> {property.location}</p>
            <p className="text-sm mt-2"><strong>Bedrooms:</strong> {property.bedrooms}</p>
            <button className="bg-[#6E4559] text-white p-2 rounded-lg mt-4 w-full">View Details</button>
            {/* Buy Button */}
            <button 
              onClick={() => handleBuyClick(property)} 
              className="bg-[#6E4559] text-white p-2 rounded-lg mt-4 w-full">
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Buy;
