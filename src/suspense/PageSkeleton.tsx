import SkeletonComponent from "../components/SkeletonComponent";

function PageSkeleton() {
  return (
    <>
      <div style={{ margin: "32px 0" }}>
        <SkeletonComponent count={1} width={"128px"} height={"32px"} />
      </div>
      <div style={{ marginBottom: "64px" }}>
        <SkeletonComponent count={1} height={"46px"} />
      </div>
      <div style={{ marginBottom: "32px" }}>
        <SkeletonComponent count={1} width={"128px"} height={"32px"} />
      </div>
      <SkeletonComponent count={5} />
    </>
  );
}
export default PageSkeleton;
