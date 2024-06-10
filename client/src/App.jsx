// LIBRARIES
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// COMPONENTS AND PAGES
import HomePage from './pages/Main/HomePage';
import ErrorPage from './pages/ErrorPage';
import RootLayout from './pages/RootLayout';
// import { AuthProvider } from './context/AuthProvider';
import { AccessTokenProvider } from './context/GetAccessToken';
import SearchResultPage from './pages/Main/SearchResultPage';
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'search/:keyword',
        element: <SearchResultPage />,
        
      },
    ],
  },
]);

function App() {
  return (
    <AccessTokenProvider>
      {/* <AuthProvider> */}
        <RouterProvider router={router} />
      {/* </AuthProvider> */}
    </AccessTokenProvider>
  );
}

export default App;
