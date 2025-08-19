import { motion } from "framer-motion";
import type { ReactNode } from "react";
import type {
  TargetAndTransition,
  VariantLabels,
  Transition,
} from "framer-motion";

interface MotionValues {
  _uniqueKey?: string | number;
  _initial?: TargetAndTransition | VariantLabels;
  _animate?: TargetAndTransition | VariantLabels;
  _transition?: Transition;
}

interface FramerMotionProps {
  children: ReactNode;
  values: MotionValues;
}

const FramerMotion = ({ children, values }: FramerMotionProps) => {
  const { _uniqueKey, _initial, _animate, _transition } = values;
  return (
    <motion.div
      key={_uniqueKey}
      initial={_initial}
      animate={_animate}
      transition={_transition}
    >
      {children}
    </motion.div>
  );
};
export default FramerMotion;
