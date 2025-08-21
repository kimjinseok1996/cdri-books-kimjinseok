## 프로젝트 개요

- 책 검색, 책 찜하기 프론트엔드 서비스

## 실행 방법 및 환경 설정

Node.js 20 이상 권장

의존성 설치

```
npm i
```

로컬서버 실행

```
npm run local-start
```

## 폴더 구조 및 주요 코드 설명

```
📦src
 ┣ 📂api # 서버 통신 로직
 ┣ 📂assets # 이미지
 ┣ 📂components # 재사용 가능한 컴포넌트
 ┣ 📂hooks # 커스텀 훅
 ┣ 📂pages # 화면 단위 컴포넌트
 ┣ 📂store # Zustand 전역 상태 관리
 ┣ 📂style # scss 스타일링
 ┣ 📂suspense # 서스팬스 컴포넌트
 ┣ 📂types # 재사용 가능한 타입
```

```
function SearchBook() {
  const bookList = useBookListStore((state) => state.bookList);
  const metaData = useBookListStore((state) => state.metaData);
  const setBookList = useBookListStore((state) => state.setBookList);
  const sendObj = useSendObjStore((state) => state.sendObj);
  const setPage = useSendObjStore((state) => state.setPage);

  const { mutate, error } = useGetBooksData();

  useEffect(() => {
    mutate(sendObj);
  }, [sendObj.page]);

  return (
    <>
      <h2 className="main-title">도서 검색</h2>
      <SearchBox mutate={mutate} />
      <CountBox len={metaData?.total_count} description="도서 검색 결과" />
      {error ? (
        <ErrorSection error={error} />
      ) : (
        <>
          <Suspense fallback={<SkeletonComponent count={10} />}>
            <BookList bookList={bookList} setBookList={setBookList} />
          </Suspense>
          {!!bookList.length && (
            <Pagination
              page={sendObj.page}
              setPage={setPage}
              isEnd={metaData?.is_end}
            />
          )}
        </>
      )}
    </>
  );
}
```

- Zustand Selector 기반 최적화
  - 필요한 상태만 구독함으로써 불필요한 리렌더링 최소화
- Request Data 전역 관리 및 공유
  - 전역으로 관리하여 여러 컴포넌트에서 일관성 있게 공유
- 역할 기반 컴포넌트 추상화
  - 역할 단위로 추상화된 컴포넌트로 분리해 재사용성과 유지보수성 향상

## 라이브러리 선택 이유

- tanstack/react-query,
  - 데이터 패칭을 간편하게 처리할 수 있고, 에러, 로딩 상태 관리 등 다양한 기능을 제공한다.
- framer-motion
  - js로 애니메이션을 구현할 수 있으며, 애니메이션을 컴포넌트 단위로 관리할 수 있다.
- react-icons
  - 다양한 웹 아이콘을 간단하게 임포트해서 사용할 수 있다.
- react-loading-skeleton
  - 별도의 스타일링 작업 없이도 쉽게 적용할 수 있다.
- sass
  - 함수형 스타일링과 변수, mixin 등을 활용해 재사용성과 커스터마이징이 용이하다.
- zustand
  - 다른 상태 관리 라이브러리에 비해 사용법이 간단하고, 유지보수에 용이하다.

## 강조 하고 싶은 기능

- Framer Motion과 Skeleton UI를 활용한 부드러운 사용자 경험 제공
