import { useRoutes, BrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import PageSkeleton from "./suspense/PageSkeleton";
import Spinner from "./components/loading/Spinner";

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
        <Suspense fallback={<PageSkeleton />}>
          <SearchBook />
        </Suspense>
      </DefaultLayout>
    ),
  },
  {
    path: "/wishlist",
    element: (
      <DefaultLayout>
        <Suspense fallback={<PageSkeleton />}>
          <WishList />
        </Suspense>
      </DefaultLayout>
    ),
  },
];

const Router = () => useRoutes(routes);

function App() {
  return (
    <>
      <Spinner />
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </>
  );
}

export default App;
