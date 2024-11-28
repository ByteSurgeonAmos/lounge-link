import React from "react";

interface Review {
  id: number;
  text: string;
  name: string;
  role: string;
  avatar: string;
  stars: number;
}

interface PremiumReviewsProps {
  reviews: Review[];
}

const PremiumReviews: React.FC<PremiumReviewsProps> = ({ reviews }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">What Other Premium Members Say about LiveLinks</h2>
      <div className="grid grid-cols-3 gap-4">
        {reviews.map((review) => (
          <div key={review.id} className="p-4 bg-gray-100 rounded-lg shadow">
            <div className="flex items-center space-x-3 mb-3">
              <img
                src={review.avatar}
                alt={review.name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h3 className="font-bold">{review.name}</h3>
                <p className="text-gray-500 text-sm">{review.role}</p>
              </div>
            </div>
            <p className="text-gray-600">{review.text}</p>
            <div className="mt-2 text-yellow-500">
              {"★".repeat(review.stars)}{" "}
              {"☆".repeat(5 - review.stars)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PremiumReviews;
