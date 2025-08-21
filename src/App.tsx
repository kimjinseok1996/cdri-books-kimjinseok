import { useRoutes, BrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import PageSkeletonComponent from "./components/PageSkeletonComponent";

// pages
const SearchBook = lazy(() => import("./pages/SearchBook"));
const WishList = lazy(() => import("./pages/WishList"));

//layout
import DefaultLayout from "./components/layout/DefaultLayout";

const routes = [
  {
    path: "/",
    element: (
      <DefaultLayout>
        <Suspense fallback={<PageSkeletonComponent />}>
          <SearchBook />
        </Suspense>
      </DefaultLayout>
    ),
  },
  {
    path: "/wishlist",
    element: (
      <DefaultLayout>
        <Suspense fallback={<PageSkeletonComponent />}>
          <WishList />
        </Suspense>
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
