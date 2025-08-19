import type { ReactNode } from "react";
import TransitionPageMoveLayout from "./TransitionPageMoveLayout";
import Header from "../Header";

function DefaultLayout({ children }: { children: ReactNode }) {
  return (
    <div className="container">
      <Header />
      <TransitionPageMoveLayout>{children}</TransitionPageMoveLayout>
    </div>
  );
}
export default DefaultLayout;
