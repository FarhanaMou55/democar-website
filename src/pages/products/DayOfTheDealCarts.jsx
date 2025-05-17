import React, { useEffect, useState } from "react";
import CartDesign from "./CartDesign"; // Adjust path if needed
import carData from "../products/data/carData"; // Adjust the path based on your structure

const DayOfTheDealCarts = () => {
  const [products, setProducts] = useState([]);
  const [timeLeft, setTimeLeft] = useState({
    days: 15,
    hours: 10,
    minutes: 24,
    seconds: 59,
  });

  // ✅ Filter products from imported carData
  useEffect(() => {
    const filtered = carData.filter(
      (item) => item.productDisplayCategory === "Day-Of-The-Deal"
    );
    setProducts(filtered);
  }, []);

  // ✅ Timer countdown logic
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;

        if (seconds > 0) seconds--;
        else {
          seconds = 59;
          if (minutes > 0) minutes--;
          else {
            minutes = 59;
            if (hours > 0) hours--;
            else {
              hours = 23;
              if (days > 0) days--;
            }
          }
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="px-4 mt-6 my-8 w-10/12 mx-auto gap-4 object-contain">
      <h2 className="text-2xl font-bold mb-4">🔥 Deals of the Day</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {products.map((product) => (
          <div key={product.id} className="rounded-xl p-4">
            <CartDesign
              productId={product.id}
              title={product.title}
              image={product.image}
              category={product.category}
              rating={product.rating}
              discountPrice={product.discountPrice}
              price={product.price}
              discountPresent={product.discountPresent}
              productDisplayCategory={product.productDisplayCategory}
              timeLeft={timeLeft}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DayOfTheDealCarts;
