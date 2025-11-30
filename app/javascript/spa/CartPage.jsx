import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const CartPage = () => {
  const [cart, setCart] = useState(null);
  const navigate = useNavigate();

  const refresh = () => {
    fetch("/api/cart")
      .then((res) => res.json())
      .then((data) => setCart(data));
  };

  useEffect(() => {
    refresh();
  }, []);

  const updateQuantity = (itemId, quantity) => {
    fetch(`/api/cart_items/${itemId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity }),
    }).then(refresh);
  };

  const removeItem = (itemId) => {
    fetch(`/api/cart_items/${itemId}`, { method: "DELETE" }).then(refresh);
  };

  if (!cart) {
    return <p className="text-slate-400 text-base">Loading cart…</p>;
  }

  if (cart.items.length === 0) {
    return (
      <div className="space-y-5">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-emerald-300"
        >
          <span className="mr-1">←</span>
          Back
        </button>
        <p className="text-slate-300 text-base">Your cart is empty. Browse agents to get started.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-emerald-300"
        >
          <span className="mr-1">←</span>
          Back
        </button>
        <h1 className="text-3xl font-semibold text-slate-50">Cart</h1>
      </div>
      <div>
        <p className="mt-1 text-base text-slate-400">These AI agents will join your team after checkout.</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <div className="space-y-4">
          {cart.items.map((item) => (
            <div
              key={item.id}
              className="flex gap-5 rounded-xl border border-slate-800 bg-slate-950/60 p-5 items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="h-20 w-32 overflow-hidden rounded-md bg-slate-900 relative">
                  <img src={item.image_url} alt={item.name} className="h-full w-full object-cover opacity-20" />
                  {item.icon_svg && (
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <div
                        className="h-12 w-12 text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                        dangerouslySetInnerHTML={{ __html: item.icon_svg }}
                      />
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-base font-medium text-slate-50">{item.name}</p>
                  <p className="text-sm text-slate-400">{item.category_name}</p>
                  <p className="mt-1 text-base font-semibold text-emerald-300">
                    ${(item.price / 100).toFixed(0)} / month
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="inline-flex items-center rounded border border-slate-700 bg-slate-900 px-2">
                  <button
                    type="button"
                    className="px-2 text-slate-300 hover:text-emerald-300"
                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                  >
                    −
                  </button>
                  <span className="px-2 text-base">{item.quantity}</span>
                  <button
                    type="button"
                    className="px-2 text-slate-300 hover:text-emerald-300"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  className="text-sm text-slate-400 hover:text-red-400"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <aside className="space-y-4 rounded-xl border border-slate-800 bg-slate-950/70 p-5">
          <h2 className="text-base font-semibold text-slate-50">Summary</h2>
          <div className="space-y-1 text-base">
            <div className="flex justify-between text-slate-300">
              <span>Subtotal</span>
              <span>${(cart.subtotal / 100).toFixed(0)}</span>
            </div>
            <div className="flex justify-between text-slate-500 text-sm">
              <span>Billing</span>
              <span>Monthly</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => navigate("/checkout")}
            className="w-full rounded-md bg-emerald-500 px-4 py-2 text-base font-medium text-slate-950 shadow-sm hover:bg-emerald-400"
          >
            Proceed to Checkout
          </button>
          <p className="text-xs text-slate-500">
            Enter fake details to complete the order.
          </p>
        </aside>
      </div>
    </div>
  );
};
