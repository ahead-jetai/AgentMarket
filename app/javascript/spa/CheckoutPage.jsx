import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    cardNumber: "",
    expiration: "",
    cvc: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetch("/api/cart")
      .then((res) => res.json())
      .then((data) => setCart(data));
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.address) newErrors.address = "Address is required";
    
    const cleanCard = formData.cardNumber.replace(/\s/g, "");
    if (cleanCard !== "4111111111111111") {
      newErrors.cardNumber = "Card number must be 4111 1111 1111 1111";
    }

    if (!/^\d{3}$/.test(formData.cvc)) {
      newErrors.cvc = "CVC must be 3 digits";
    }

    // Simple future date check
    if (!formData.expiration) {
      newErrors.expiration = "Expiration is required";
    } else {
        const [month, year] = formData.expiration.split('/').map(num => parseInt(num, 10));
        const now = new Date();
        const currentYear = now.getFullYear() % 100; // last 2 digits
        const currentMonth = now.getMonth() + 1;

        if (!month || !year || month < 1 || month > 12) {
             newErrors.expiration = "Invalid date format (MM/YY)";
        } else if (year < currentYear || (year === currentYear && month < currentMonth)) {
             newErrors.expiration = "Date must be in the future";
        }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const fillTestCard = () => {
    setFormData({
      ...formData,
      name: "Test User",
      email: "test@example.com",
      address: "123 Test St",
      cardNumber: "4111 1111 1111 1111",
      expiration: "12/30",
      cvc: "123",
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Persist purchased agents
      const newAgents = cart.items.map(item => ({
        id: item.id,
        name: item.name,
        category: item.category_name,
        price: item.price,
        image_url: item.image_url,
        icon_svg: item.icon_svg
      }));

      const existingAgentsJson = localStorage.getItem("agentmarket_purchased_agents");
      let allAgents = [];
      if (existingAgentsJson) {
        try {
          allAgents = JSON.parse(existingAgentsJson);
        } catch (e) {
          console.error("Error parsing stored agents", e);
          allAgents = [];
        }
      }

      // simple deduplication by id
      const existingIds = new Set(allAgents.map(a => a.id));
      const agentsToAdd = newAgents.filter(a => !existingIds.has(a.id));
      const updatedAgents = [...allAgents, ...agentsToAdd];

      localStorage.setItem("agentmarket_purchased_agents", JSON.stringify(updatedAgents));
      
      // Clear cart on backend
      fetch("/api/cart", { method: "DELETE" })
        .then(() => {
          // Navigate to confirmation
          navigate("/order/confirmation", { state: { purchasedAgents: newAgents } });
        });
    }
  };

  if (!cart) return <p className="text-slate-400">Loading checkout...</p>;

  return (
    <div className="relative -mx-4 md:-mx-8 lg:-mx-12 -mt-4 md:-mt-6 lg:-mt-8 bg-gradient-to-b from-emerald-500/15 min-h-screen">
      <div className="relative w-full px-4 md:px-8 lg:px-12 pt-24 pb-20 space-y-8">
        <div className="space-y-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-emerald-300"
          >
            <span className="mr-1">←</span>
            Back
          </button>
          <h1 className="text-3xl font-semibold text-slate-50">Checkout</h1>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          <form onSubmit={handleSubmit} className="space-y-6 rounded-xl border border-slate-800 bg-slate-950/60 p-6">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={fillTestCard}
                className="text-sm font-medium text-emerald-400 hover:text-emerald-300"
              >
                Fill Test Card Info
              </button>
            </div>
            <div className="space-y-4">
              <h2 className="text-xl font-medium text-slate-50">Billing Details</h2>
              
              <div>
                <label className="block text-sm font-medium text-slate-400">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-slate-800 bg-slate-900 px-3 py-2 text-slate-50 focus:border-emerald-500 focus:ring-emerald-500"
                />
                {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-slate-800 bg-slate-900 px-3 py-2 text-slate-50 focus:border-emerald-500 focus:ring-emerald-500"
                />
                {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400">Billing Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-slate-800 bg-slate-900 px-3 py-2 text-slate-50 focus:border-emerald-500 focus:ring-emerald-500"
                />
                 {errors.address && <p className="text-red-400 text-sm mt-1">{errors.address}</p>}
              </div>
            </div>

            <div className="space-y-4 border-t border-slate-800 pt-6">
              <h2 className="text-xl font-medium text-slate-50">Payment Method</h2>
              <p className="text-sm text-slate-500">Use card: 4111 1111 1111 1111</p>

              <div>
                <label className="block text-sm font-medium text-slate-400">Card Number</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  placeholder="4111 1111 1111 1111"
                  className="mt-1 block w-full rounded-md border-slate-800 bg-slate-900 px-3 py-2 text-slate-50 focus:border-emerald-500 focus:ring-emerald-500"
                />
                {errors.cardNumber && <p className="text-red-400 text-sm mt-1">{errors.cardNumber}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400">Expiration (MM/YY)</label>
                  <input
                    type="text"
                    name="expiration"
                    value={formData.expiration}
                    onChange={handleChange}
                    placeholder="12/25"
                    className="mt-1 block w-full rounded-md border-slate-800 bg-slate-900 px-3 py-2 text-slate-50 focus:border-emerald-500 focus:ring-emerald-500"
                  />
                  {errors.expiration && <p className="text-red-400 text-sm mt-1">{errors.expiration}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400">CVC</label>
                  <input
                    type="text"
                    name="cvc"
                    value={formData.cvc}
                    onChange={handleChange}
                    placeholder="123"
                    className="mt-1 block w-full rounded-md border-slate-800 bg-slate-900 px-3 py-2 text-slate-50 focus:border-emerald-500 focus:ring-emerald-500"
                  />
                  {errors.cvc && <p className="text-red-400 text-sm mt-1">{errors.cvc}</p>}
                </div>
              </div>
            </div>
             
             <button
              type="submit"
              className="w-full rounded-md bg-emerald-500 px-4 py-2 text-base font-medium text-slate-950 shadow-sm hover:bg-emerald-400"
            >
              Place Order
            </button>
          </form>

          <aside className="h-fit space-y-4 rounded-xl border border-slate-800 bg-slate-950/70 p-5">
            <h2 className="text-base font-semibold text-slate-50">Order Summary</h2>
            <div className="divide-y divide-slate-800">
              {cart.items.map((item) => (
                <div key={item.id} className="flex justify-between py-3">
                  <div>
                    <p className="text-slate-50 font-medium">{item.name}</p>
                    <p className="text-sm text-slate-400">{item.category_name}</p>
                  </div>
                  <p className="text-slate-300">${(item.price / 100).toFixed(0)}/mo</p>
                </div>
              ))}
            </div>
            <div className="border-t border-slate-800 pt-4">
              <div className="flex justify-between text-slate-50 font-semibold text-lg">
                <span>Total</span>
                <span>${(cart.subtotal / 100).toFixed(0)} / month</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
