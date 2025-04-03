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

const Router = createBrowserRouter([
    {path: '/', element: <Login/>},
    {path: '/register', element: <Register/>},
    {path: '/dashboard', element: <Dashboard/>},
    {
        path: '/users',
        element: <Users/>,
        children: [
            {path: 'admins', element: <UsersAdminComponent/>},
            {path: 'managers', element: <UsersManagerComponent/>},
            {path: 'refs', element: <UsersRepresentativesComponent/>},
            {path: 'newusers', element: <UsersNewUsersComponent/>},
        ]
    },
    {
        path: '/products',
        element: <Products/>,
        children: [
            {path: 'category', element: <ProductCategoryComponent/>},
            {path: 'newcategory', element: <NewProductCategoryComponent/>},
            {path: 'addproduct', element: <AddProductComponent/>},
        ]
    }
])

export default Router;