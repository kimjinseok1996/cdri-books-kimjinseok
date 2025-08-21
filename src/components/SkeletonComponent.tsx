import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function SkeletonComponent({ count = 1, width = "100%", height = "148px" }) {
  return (
    <Skeleton count={count} width={width} height={height} borderRadius={6} />
  );
}
export default SkeletonComponent;
