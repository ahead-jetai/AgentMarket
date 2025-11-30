import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./spa/HomePage";
import { CategoriesPage } from "./spa/CategoriesPage";
import { CategoryPage } from "./spa/CategoryPage";
import { ProductPage } from "./spa/ProductPage";
import { CartPage } from "./spa/CartPage";
import { CheckoutPage } from "./spa/CheckoutPage";
import { OrderConfirmationPage } from "./spa/OrderConfirmationPage";
import { SignupPage } from "./spa/SignupPage";
import { LoginPage } from "./spa/LoginPage";
import { DashboardPage } from "./spa/DashboardPage";
import { ProfilePage } from "./spa/ProfilePage";
import { WorkspacePage } from "./spa/WorkspacePage";
import { Layout } from "./spa/Layout";

document.addEventListener("DOMContentLoaded", () => {
  const rootElement = document.getElementById("ai-agents-root");
  if (!rootElement) return;

  const root = createRoot(rootElement);

  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/categories/:slug" element={<CategoryPage />} />
            <Route path="/agents/:id" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order/confirmation" element={<OrderConfirmationPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/workspace" element={<WorkspacePage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </React.StrictMode>
  );
});
