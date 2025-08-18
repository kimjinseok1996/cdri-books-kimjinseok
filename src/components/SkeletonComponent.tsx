import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function SkeletonComponent({ count = 1, height = "72vh" }) {
  return (
    <div style={{ margin: "12px 0" }}>
      <Skeleton count={count} height={height} borderRadius={6} />
    </div>
  );
}
export default SkeletonComponent;
