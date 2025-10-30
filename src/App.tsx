import { createBrowserRouter, RouterProvider } from "react-router"

import { SnackbarProvider } from "./context/SnackbarContext.tsx"
import { WishesProvider } from "./context/WishesContext.tsx"

import Dashboard from "./pages/Dashboard.tsx"
import WishPage from "./pages/WishPage.tsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/wish/:id",
    element: <WishPage />,
  },
])

function App() {
  return (
    <SnackbarProvider>
      <WishesProvider>
        <RouterProvider router={router} />
      </WishesProvider>
    </SnackbarProvider>
  )
}

export default App
