import React, { useState } from "react";
import { useGlobalContext } from "./context/GlobalState";
import { FaMoneyBillWave } from "react-icons/fa";
import { RiVisaFill } from "react-icons/ri";
import Bkash from "./assets/bkash.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AnimatePresence, motion } from "framer-motion";

const Payment = () => {
  const { cartItems, clearCart } = useGlobalContext();
  const [paymentMethod, setPaymentMethod] = useState("bkash");
  const [bkashDetails, setBkashDetails] = useState({ number: "", transactionId: "" });
  const [formData, setFormData] = useState({
    fullName: "",
    location: "",
    phone: "",
    email: "",
  });

  const shippingPrice = 100.0;

  const totalDiscount = cartItems.reduce((total, item) => {
    const base = parseFloat(item.price) || 0;
    const discount = parseFloat(item.discountPrice || item.price) || 0;
    const quantity = parseInt(item.quantity) || 1;
    return total + (base - discount) * quantity;
  }, 0);

  const subtotal = cartItems.reduce((total, item) => {
    const discount = parseFloat(item.discountPrice || item.price) || 0;
    const quantity = parseInt(item.quantity) || 1;
    return total + discount * quantity;
  }, 0);

  const totalPaymentAmount = subtotal + shippingPrice;

  const handleBkashChange = (e) => {
    const { name, value } = e.target;
    setBkashDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { fullName, location, phone, email } = formData;

    if (!fullName || !location || !phone || !email) {
      toast.error("Please fill in all personal information.");
      return;
    }

    if (paymentMethod === "bkash" && (!bkashDetails.number || !bkashDetails.transactionId)) {
      toast.error("Please enter your bKash number and transaction ID.");
      return;
    }

    toast.success("Payment submitted successfully!");
    clearCart();
  };

  return (
    <div className="w-10/12 mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Left: Payment Form */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Personal & Payment Information</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Personal Info */}
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleFormChange}
            className="w-full border p-2 rounded-md"
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleFormChange}
            className="w-full border p-2 rounded-md"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleFormChange}
            className="w-full border p-2 rounded-md"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleFormChange}
            className="w-full border p-2 rounded-md"
          />

          {/* Payment Method Selection */}
          <div className="space-y-2">
            <label className="block font-medium text-sm">Select Payment Method:</label>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setPaymentMethod("bkash")}
                className={`flex items-center gap-2 px-3 py-2 rounded-md border transition ${
                  paymentMethod === "bkash" ? "bg-pink-100 border-pink-400" : "border-gray-300"
                }`}
              >
                <img className="w-5 h-5" src={Bkash} alt="Bkash" /> bKash
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod("visa")}
                className={`flex items-center gap-2 px-3 py-2 rounded-md border transition ${
                  paymentMethod === "visa" ? "bg-blue-100 border-blue-400" : "border-gray-300"
                }`}
              >
                <RiVisaFill className="text-blue-600 text-xl" /> Visa
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod("cod")}
                className={`flex items-center gap-2 px-3 py-2 rounded-md border transition ${
                  paymentMethod === "cod" ? "bg-green-100 border-green-400" : "border-gray-300"
                }`}
              >
                <FaMoneyBillWave className="text-green-600 text-xl" /> Cash on Delivery
              </button>
            </div>
          </div>

          {/* Animated Payment Fields */}
          <AnimatePresence mode="wait">
            {paymentMethod === "bkash" && (
              <motion.div
                key="bkash"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-2"
              >
                <input
                  type="text"
                  name="number"
                  placeholder="bKash Number"
                  value={bkashDetails.number}
                  onChange={handleBkashChange}
                  className="w-full border p-2 rounded-md"
                />
                <input
                  type="text"
                  name="transactionId"
                  placeholder="Transaction ID"
                  value={bkashDetails.transactionId}
                  onChange={handleBkashChange}
                  className="w-full border p-2 rounded-md"
                />
              </motion.div>
            )}

            {paymentMethod === "visa" && (
              <motion.div
                key="visa"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-2"
              >
                <input type="text" placeholder="Cardholder Name" className="w-full border p-2 rounded-md" />
                <input type="text" placeholder="Card Number" className="w-full border p-2 rounded-md" />
                <div className="flex gap-4">
                  <input type="text" placeholder="MM/YY" className="w-full border p-2 rounded-md" />
                  <input type="text" placeholder="CVV" className="w-full border p-2 rounded-md" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md"
          >
            Pay ${totalPaymentAmount.toFixed(2)}
          </button>
        </form>
      </div>

      {/* Right: Order Summary */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.cartItemId} className="flex gap-4 items-center border-b pb-3">
              <img src={item.image} alt={item.title} className="w-16 h-16 rounded object-cover" />
              <div className="flex-1">
                <p className="font-medium text-sm">{item.title}</p>
                <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
              </div>
              <div className="text-right text-sm">
                <p className="font-medium text-gray-800">
                  ${(parseFloat(item.discountPrice || item.price) * item.quantity).toFixed(2)}
                </p>
                {item.discountPrice && (
                  <p className="line-through text-xs text-gray-400">
                    ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 border-t pt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>${shippingPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Total Discount</span>
            <span className="text-green-600">-${totalDiscount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-semibold border-t pt-2 text-base">
            <span>Total</span>
            <span>${totalPaymentAmount.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
