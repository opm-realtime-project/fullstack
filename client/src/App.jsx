import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import MainLayout from "./components/MainLayout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
    loader: () => {
      if (!localStorage.accessToken) {
        return redirect("/login")
      }
      return null;
    }
  },
  {
    path: "/login",
    element: <LoginPage />,
    loader: () => {
      if (localStorage.accessToken) {
        return redirect("/")
      }
      return null;
    }
  },
  {
    path: "/register",
    element: <RegisterPage />
  }
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
