import { BrowserRouter, Routes, Route } from "react-router-dom";


import Login from "./pages/Login";
import POS from "./modules/pos/pages/POS";
import Categories from "./modules/categories/pages/Categories"
import Products from "./modules/products/pages/Products"
import Dashboard from "./modules/dashboard/pages/Dashboard"
import PrivateRoute from "./routes/PrivateRoute";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* login */}
        <Route path="/" element={<Login />} />

        {/* ruta protegida */}
        <Route
          path="/pos"
          element={
            <PrivateRoute>
              <POS />
            </PrivateRoute>
          }
        />

        <Route
  path="/categories"
  element={
    <PrivateRoute>
      <Categories />
    </PrivateRoute>
  }
/>

<Route
  path="/products"
  element={
    <PrivateRoute>
      <Products />
    </PrivateRoute>
  }
/>

<Route
  path="/dashboard"
  element={
    <PrivateRoute>
      <Dashboard />
    </PrivateRoute>
  }
/>

      </Routes>

    </BrowserRouter>

  );

}

export default App;