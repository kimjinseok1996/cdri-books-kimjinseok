import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import SkeletonComponent from "./SkeletonComponent";

function PageSkeletonComponent() {
  return (
    <>
      <div style={{ margin: "32px 0" }}>
        <Skeleton count={1} width={"128px"} height={"32px"} borderRadius={6} />
      </div>
      <div style={{ marginBottom: "64px" }}>
        <Skeleton count={1} height={"46px"} borderRadius={6} />
      </div>
      <div style={{ marginBottom: "32px" }}>
        <Skeleton count={1} width={"128px"} height={"32px"} borderRadius={6} />
      </div>
      <SkeletonComponent count={10} />
    </>
  );
}
export default PageSkeletonComponent;
