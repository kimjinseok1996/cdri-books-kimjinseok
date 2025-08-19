import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function SkeletonComponent({ count = 1, height = "148px" }) {
  return (
    <Skeleton
      count={count}
      height={height}
      borderRadius={6}
      style={{ margin: "12px 0" }}
    />
  );
}
export default SkeletonComponent;
