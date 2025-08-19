import "../style/pagination.scss";
import { SlArrowRight, SlArrowLeft } from "react-icons/sl";

interface PaginationProps {
  page: number;
  setPage: (page: number) => void;
  isEnd?: boolean;
}

function Pagination({ page, setPage, isEnd }: PaginationProps) {
  return (
    <div className="pagination">
      <div>
        {page !== 1 && (
          <button onClick={() => setPage(page - 1)}>
            <span>
              <SlArrowLeft />
            </span>
            이전
          </button>
        )}

        {!isEnd && (
          <button onClick={() => setPage(page + 1)}>
            다음
            <span>
              <SlArrowRight />
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
export default Pagination;
