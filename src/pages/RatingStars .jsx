import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const RatingStars = ({ rating }) => {
  let fullStars = Math.floor(rating);
  let hasHalfStar = false;

  // Add half star only if the decimal is between 0.25 and 0.74
  const decimal = rating - fullStars;

  if (rating >= 4.75) {
    fullStars = 5;
  } else if (decimal >= 0.25 && decimal < 0.75) {
    hasHalfStar = true;
  }

  const totalStars = fullStars + (hasHalfStar ? 1 : 0);
  const emptyStars = 5 - totalStars;

  return (
    <span className="text-yellow-400 flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <FaStar key={`full-${i}`} className="mr-1" />
      ))}
      {hasHalfStar && <FaStarHalfAlt className="mr-1" />}
      {[...Array(emptyStars)].map((_, i) => (
        <FaRegStar key={`empty-${i}`} className="mr-1 text-gray-300" />
      ))}
    </span>
  );
};

export default RatingStars;
