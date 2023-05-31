import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import MapPage from './pages/MapPage';
import ListPage from './pages/ListPage';
import PinPage from './pages/PinPage';
import LoadingPage from './pages/LoadingPage';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path:"/",
      element: <LoadingPage />,
    },
    {
      path: '/map',
      element: <MapPage />,
    },
    {
      path: '/list', 
      element: <ListPage />,
    },
    {
      path: '/pin/:id', 
      element: <PinPage />,
    },
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
  ]);

  return routes;
}
