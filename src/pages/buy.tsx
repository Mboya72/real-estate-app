import { useEffect, useState } from 'react';

const Buy = () => {
  const [properties, setProperties] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost:5000/buy-properties')
      .then((response) => response.json())
      .then((data) => setProperties(data))
      .catch((err) => setError('Failed to fetch properties.'));
  }, []);

  const deleteProperty = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:5000/buy-properties`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        const result = await response.json();
        setError(result.error || 'Failed to delete property');
        return;
      }
  
      // If deletion is successful, filter out the deleted property
      setProperties(properties.filter((property) => property.id !== id));
    } catch (error) {
      console.error('Error deleting property:', error);
      setError('Failed to delete property.');
    }
  };
  
  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-4xl font-bold text-primary mb-8">Buy Properties</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="text-darkText grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {properties.map((property: any) => (
          <div key={property.id} className="bg-white p-6 rounded-lg shadow-lg">
            <img
              src={property.image}
              alt={property.name}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <h3 className="text-darkText text-xl font-semibold mt-4">{property.name}</h3>
            <p className="text-darkText text-gray-600">{property.location}</p>
            <p className="text-darkText text-gray-800 font-bold text-lg mt-2">${property.price}</p>

            {/* Review section */}
            <h4 className="text-lg font-semibold mt-4">Reviews</h4>
            {Array.isArray(property.reviews) && property.reviews.length > 0 ? (
              <ul className="space-y-2 mt-2">
                {property.reviews.map((review: any, index: number) => (
                  <li key={index} className="border-b pb-2">
                    <p><strong>{review.user}:</strong> {review.comment}</p>
                    <p>Rating: {review.rating}/5</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No reviews yet.</p>
            )}

            {/* Delete Button */}
            <button
              onClick={() => deleteProperty(property.id)}
              className="mt-4 text-white bg-primary hover:bg-accent py-2 px-4 rounded-md"
            >
              Delete Property
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Buy;
