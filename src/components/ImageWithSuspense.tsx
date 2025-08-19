import { useImageLoader } from "../hooks/useImageLoader";
import SkeletonComponent from "./SkeletonComponent";

interface ImageWithSuspenseProps {
  src: string;
  alt?: string;
  width?: string;
  height?: string;
}

export const ImageWithSuspense = ({
  src,
  alt = "",
  width = "100%",
  height = "100%",
}: ImageWithSuspenseProps) => {
  const loaded = useImageLoader(src);

  if (!loaded) return <SkeletonComponent height={"112px"} />;

  return (
    <img
      src={src}
      alt={alt}
      style={{
        width,
        height,
      }}
    />
  );
};
