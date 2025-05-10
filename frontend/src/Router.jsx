import { createBrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import UsersAdminComponent from './components/UsersAdminComponent';
import UsersManagerComponent from './components/UsersManagerComponent';
import UsersRepresentativesComponent from './components/UsersRepresentativesComponent';
import UsersNewUsersComponent from './components/UsersNewUsersComponent';
import Products from './pages/Products';
import ProductCategoryComponent from './components/ProductCategoryComponent';
import NewProductCategoryComponent from './components/NewProductCategoryComponent';
import AddProductComponent from './components/AddProductComponent';
import Home from './pages/Home';
import UserEditPage from './components/UserEditPage';
import ProductCategoryEdit from './components/ProductCategoryEdit';
import ProductVariant from './components/ProductVariant';
import ProtectedRoute from './components/ProtectedRoute'; // <== ADD THIS
import Unauthorized from './pages/Unauthorized';
import Layout from './layouts/Layout';
import ProductVariantEdit from './components/ProductVariantEdit';
import Stocks from './pages/Stocks';
import StockAllStockComponent from './components/StockAllStockComponent';

const Router = createBrowserRouter([
  { path: '/unauthorized', element: <Unauthorized /> },
  {
    path: '/',
    element: <Layout />, // All routes below will include SessionRedirector
    children: [
      { path: '', element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute allowedRoles={['admin', 'manager']}>
            <Dashboard />
          </ProtectedRoute>
        )
      },
    ]
  },
  {
    path: '/users',
    element: (
      <ProtectedRoute allowedRoles={['admin', 'manager']}>
        <Users />
      </ProtectedRoute>
    ),
    children: [
      { path: 'admins', element: <UsersAdminComponent /> },
      { path: 'managers', element: <UsersManagerComponent /> },
      { path: 'refs', element: <UsersRepresentativesComponent /> },
      { path: 'newusers', element: <UsersNewUsersComponent /> },
      { path: 'user/:id', element: <UserEditPage /> }
    ]
  },
  {
    path: '/products',
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <Products />
      </ProtectedRoute>
    ),
    children: [
      { path: 'category', element: <ProductCategoryComponent /> },
      { path: 'newcategory', element: <NewProductCategoryComponent /> },
      { path: 'addproduct', element: <AddProductComponent /> },
      { path: 'category/variants/edit', element: <ProductVariantEdit /> },
      { path: 'category/variants/:id', element: <ProductVariant /> },
      { path: 'category/:id', element: <ProductCategoryEdit /> }
    ]
  },
  {
    path: '/stocks',
    element: (
      <ProtectedRoute allowedRoles={['admin', 'manager']}>
        <Stocks />
      </ProtectedRoute>
    ),
    children: [
      { path: 'allstocks', element:<StockAllStockComponent /> },
    ]
  }
]);

export default Router;
