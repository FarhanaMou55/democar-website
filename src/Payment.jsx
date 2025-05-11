import React, { useState } from "react";

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [billingInfo, setBillingInfo] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBillingInfo({ ...billingInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Billing Info:", billingInfo);
    console.log("Selected Payment Method:", paymentMethod);
    alert("Payment processed (placeholder)");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
      <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Payment Information
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              value={billingInfo.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="input input-bordered w-full bg-gray-50 focus:bg-white focus:outline-none focus:border-indigo-500"
              required
            />
            <input
              type="email"
              name="email"
              value={billingInfo.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="input input-bordered w-full bg-gray-50 focus:bg-white focus:outline-none focus:border-indigo-500"
              required
            />
            <input
              type="text"
              name="address"
              value={billingInfo.address}
              onChange={handleChange}
              placeholder="Street Address"
              className="input input-bordered w-full bg-gray-50 focus:bg-white focus:outline-none focus:border-indigo-500"
              required
            />
            <input
              type="text"
              name="city"
              value={billingInfo.city}
              onChange={handleChange}
              placeholder="City"
              className="input input-bordered w-full bg-gray-50 focus:bg-white focus:outline-none focus:border-indigo-500"
              required
            />
            <input
              type="text"
              name="postalCode"
              value={billingInfo.postalCode}
              onChange={handleChange}
              placeholder="Postal Code"
              className="input input-bordered w-full bg-gray-50 focus:bg-white focus:outline-none focus:border-indigo-500"
              required
            />
            <input
              type="text"
              name="country"
              value={billingInfo.country}
              onChange={handleChange}
              placeholder="Country"
              className="input input-bordered w-full bg-gray-50 focus:bg-white focus:outline-none focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <p className="text-gray-700 font-medium mb-2">Payment Method</p>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={() => setPaymentMethod("card")}
                  className="radio radio-primary"
                />
                Card
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                  className="radio radio-primary"
                />
                Cash on Delivery
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-block border-none bg-gradient-to-r from-[#ff0000] to-orange-500 text-white hover:from-orange-600 hover:to-yellow-300"
          >
            Confirm & Pay
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payment;
