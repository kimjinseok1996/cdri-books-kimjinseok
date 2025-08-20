import { useRoutes, BrowserRouter } from "react-router-dom";

// pages
import SearchBook from "./pages/SearchBook";
import WishList from "./pages/WishList";

//layout
import DefaultLayout from "./components/layout/DefaultLayout";

const routes = [
  {
    path: "/",
    element: (
      <DefaultLayout>
        <SearchBook />
      </DefaultLayout>
    ),
  },
  {
    path: "/wishlist",
    element: (
      <DefaultLayout>
        <WishList />
      </DefaultLayout>
    ),
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
