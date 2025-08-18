import { useRoutes, BrowserRouter } from "react-router-dom";

// pages
import Main from "./pages/Main";
import WishList from "./pages/WishList";

const routes = [
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/wishlist",
    element: <WishList />,
  },
];

const Router = () => useRoutes(routes);

function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
