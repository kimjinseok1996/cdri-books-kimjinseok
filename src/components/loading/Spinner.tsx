import "../../style/loading/spinner.scss";
import { useIsMutating } from "@tanstack/react-query";

function Spinner() {
  const isMutating = useIsMutating();

  if (!isMutating) return null;

  return <div className="spinner-loader"></div>;
}

export default Spinner;
