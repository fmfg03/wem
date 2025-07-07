
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import ProductListing from "@/pages/ProductListing";
import ProductDetail from "@/pages/ProductDetail";
import AboutUs from "@/pages/AboutUs";
import Contact from "@/pages/Contact";
import Quote from "@/pages/Quote";
import NotFound from "@/pages/NotFound";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import Cart from "@/pages/Cart";
import Wholesale from "@/pages/Wholesale";
import Solutions from "@/pages/Solutions";
import Admin from "@/pages/Admin";
import AdminContent from "@/pages/admin/AdminContent";
import AdminProducts from "@/pages/admin/AdminProducts";
import AdminOrders from "@/pages/admin/AdminOrders";
import AdminCategories from "@/pages/admin/AdminCategories";
import AdminSettings from "@/pages/admin/AdminSettings";
import AdminClients from "@/pages/admin/AdminClients";
import AdminMedia from "@/pages/admin/AdminMedia";
import AdminAnalytics from "@/pages/admin/AdminAnalytics";
import SearchResults from "@/pages/SearchResults";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import AccountPage from "@/pages/auth/AccountPage";
import Orders from "@/pages/orders/Orders";
import OrderDetail from "@/pages/orders/OrderDetail";
import { LocaleProvider } from "@/contexts/LocaleContext";
import { SearchProvider } from "@/contexts/SearchContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import ChatLayout from "@/components/chat/ChatLayout";
import "./App.css";
import BlogCategory from './pages/BlogCategory';

function App() {
  return (
    <React.StrictMode>
      <LocaleProvider>
        <Router>
          <AuthProvider>
            <CartProvider>
              <SearchProvider>
                <ChatLayout>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/productos" element={<ProductListing />} />
                    <Route path="/categoria/:categorySlug" element={<ProductListing />} />
                    <Route path="/industria/:industrySlug" element={<ProductListing />} />
                    <Route path="/producto/:productSlug" element={<ProductDetail />} />
                    <Route path="/sobre-nosotros" element={<AboutUs />} />
                    <Route path="/contacto" element={<Contact />} />
                    <Route path="/cotizar" element={<Quote />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/blog/:postSlug" element={<BlogPost />} />
                    <Route path="/carrito" element={<Cart />} />
                    <Route path="/mayoreo" element={<Wholesale />} />
                    <Route path="/soluciones" element={<Solutions />} />
                    <Route path="/buscar" element={<SearchResults />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/registro" element={<Register />} />
                    <Route path="/cuenta" element={<AccountPage />} />
                    <Route path="/pedidos" element={<Orders />} />
                    <Route path="/pedidos/:orderId" element={<OrderDetail />} />
                    
                    {/* Admin Routes */}
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/admin/contenido" element={<AdminContent />} />
                    <Route path="/admin/productos" element={<AdminProducts />} />
                    <Route path="/admin/pedidos" element={<AdminOrders />} />
                    <Route path="/admin/categorias" element={<AdminCategories />} />
                    <Route path="/admin/ajustes" element={<AdminSettings />} />
                    <Route path="/admin/media" element={<AdminMedia />} />
                    <Route path="/admin/clientes" element={<AdminClients />} />
                    <Route path="/admin/analiticas" element={<AdminAnalytics />} />
                    
                    <Route path="/blog/categoria/:slug" element={<BlogCategory />} />
                    
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </ChatLayout>
                <Toaster />
                <SonnerToaster position="top-right" />
              </SearchProvider>
            </CartProvider>
          </AuthProvider>
        </Router>
      </LocaleProvider>
    </React.StrictMode>
  );
}

export default App;
