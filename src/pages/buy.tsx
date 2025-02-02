import { useEffect, useState } from 'react';
import Image from 'next/image'; // Import Image for optimization

interface Review {
  user: string;
  comment: string;
  rating: number;
}

interface Property {
  id: number;
  name: string;
  price: number;
  location: string;
  image: string;
  reviews: Review[];
}

const Buy = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [reviews, setReviews] = useState<{ [key: number]: string }>({}); // Store reviews by property id
  const [ratings, setRatings] = useState<{ [key: number]: number }>({}); // Store ratings by property id
  const [userEmail] = useState<string>(''); // Assuming user email is stored

  useEffect(() => {
    fetch('http://localhost:5000/buy-properties')
      .then((response) => response.json())
      .then((data: Property[]) => setProperties(data))
      .catch((err) => {
        console.error('Error fetching properties:', err); // Log error if any
      });
  }, []);

  const handleReviewChange = (propertyId: number, reviewText: string) => {
    setReviews((prevReviews) => ({
      ...prevReviews,
      [propertyId]: reviewText,
    }));
  };

  const handleRatingChange = (propertyId: number, ratingValue: number) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [propertyId]: ratingValue,
    }));
  };

  const handleReviewSubmit = (propertyId: number) => {
    const reviewData = {
      user_email: userEmail,
      property_id: propertyId,
      comment: reviews[propertyId],
      rating: ratings[propertyId],
    };

    fetch('http://localhost:5000/submit-review', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reviewData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert('Review submitted successfully!');
        } else {
          alert('Failed to submit review.');
        }
      });
  };

  const handleDelete = (propertyId: number) => {
    fetch(`http://localhost:5000/buy-properties/${propertyId}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'Property deleted successfully!') {
          setProperties((prevProperties) =>
            prevProperties.filter((property) => property.id !== propertyId)
          );
          alert('Property deleted successfully!');
        } else {
          alert('Failed to delete property.');
        }
      });
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-4xl font-bold text-primary mb-8">Buy Properties</h1>
      <div className="text-darkText grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {properties.map((property) => (
          <div key={property.id} className="bg-white p-6 rounded-lg shadow-lg">
            <Image
              src={property.image}
              alt={property.name}
              width={500} // specify width
              height={300} // specify height
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <h3 className="text-darkText text-xl font-semibold mt-4">{property.name}</h3>
            <p className="text-darkText text-gray-600">{property.location}</p>
            <p className="text-darkText text-gray-800 font-bold text-lg mt-2">${property.price}</p>

            {/* Review section */}
            <h4 className="text-darkText text-lg font-semibold mt-4">Reviews</h4>
            {Array.isArray(property.reviews) && property.reviews.length > 0 ? (
              <ul className="text-darkText space-y-2 mt-2">
                {property.reviews.map((review, index) => (
                  <li key={index} className="text-darkText border-b pb-2">
                    <p className="text-darkText"><strong>{review.user}:</strong> {review.comment}</p>
                    <p className="text-darkText">Rating: {review.rating}/5</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No reviews yet.</p>
            )}

            {/* Review Form */}
            <div className="mt-4">
              <textarea
                className="text-darkText w-full p-2 border border-gray-300 rounded-md"
                placeholder="Write your review here..."
                value={reviews[property.id] || ''}
                onChange={(e) => handleReviewChange(property.id, e.target.value)}
              />
              <div className="mt-2">
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={ratings[property.id] || 0}
                  onChange={(e) => handleRatingChange(property.id, Number(e.target.value))}
                  className="text-darkText p-2 border border-gray-300 rounded-md"
                />
                <span className="ml-2">Rating (1-5)</span>
              </div>
              <button
                onClick={() => handleReviewSubmit(property.id)}
                className="text-borderGray mt-4 bg-[#6E4559] text-white px-4 py-2 rounded-md"
              >
                Submit Review
              </button>
            </div>

            {/* Delete Button */}
            <button
              onClick={() => handleDelete(property.id)}
              className="mt-4 bg-primary hover:bg-accent text-borderGray px-4 py-2 rounded-md"
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
