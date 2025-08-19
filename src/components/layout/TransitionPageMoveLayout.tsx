import { useLocation, useNavigationType } from "react-router-dom";
import FramerMotion from "../FramerMotion";
import type { ReactNode } from "react";

const TransitionPageMoveLayout = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const navigationType = useNavigationType();

  const _distance = 10;

  const _initialDistanceValue =
    navigationType === "PUSH" ? _distance : -_distance;

  const _uniqueKey = location.pathname;
  const _initial = { opacity: 0, y: _initialDistanceValue };
  const _animate = { opacity: 1, y: 0 };
  const _transition = { duration: 0.4 };

  const _values = {
    _uniqueKey,
    _initial,
    _animate,
    _transition,
  };

  return <FramerMotion values={_values}>{children}</FramerMotion>;
};

export default TransitionPageMoveLayout;
