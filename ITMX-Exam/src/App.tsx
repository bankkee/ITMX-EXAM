import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import NotFoundPage from "./Page/404";
import Home from "./Page/Home";
import ProductDetail from "./Page/ProductDetail";
import Shop from "./Page/Shop";
import ThemeProvider from "./hooks/ContextTheme";
import { ProductsProvider } from "./hooks/ContextProduct";
import ProductForm from "./Page/ProductForm";
import PurchasedProductsPage from "./Page/PurchasedProduct";

function App() {
  return (
    <>
      {" "}
      <ThemeProvider>
        <ProductsProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="shop"
                element={
                  <Layout>
                    <Shop />
                  </Layout>
                }
              />
              <Route
                path="product/form/:mode/:productId"
                element={
                  <Layout>
                    <ProductForm />
                  </Layout>
                }
              />
              <Route
                path="product/:productId"
                element={
                  <Layout>
                    <ProductDetail />
                  </Layout>
                }
              />
              <Route
                path="/purchased-products"
                element={
                  <Layout>
                    <PurchasedProductsPage />
                  </Layout>
                }
              />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Router>
        </ProductsProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
