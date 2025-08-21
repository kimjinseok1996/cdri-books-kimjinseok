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

📦src
┣ 📂api ### api 관련 폴더
┃ ┣ 📂path
┃ ┃ ┗ 📜searchBook.path.ts
┃ ┣ 📜axios.ts ### axios 기본 세팅
┃ ┗ 📜books.api.ts
┣ 📂assets
┃ ┗ 📜icon_book.svg
┣ 📂components
┃ ┣ 📂layout
┃ ┃ ┣ 📜DefaultLayout.tsx
┃ ┃ ┗ 📜TransitionPageMoveLayout.tsx
┃ ┣ 📂searchBook
┃ ┃ ┣ 📜SearchBox.tsx
┃ ┃ ┗ 📜SearchModal.tsx
┃ ┣ 📂wishList
┃ ┣ 📜BookList.tsx
┃ ┣ 📜CountBox.tsx
┃ ┣ 📜FramerMotion.tsx
┃ ┣ 📜Header.tsx
┃ ┣ 📜ImageWithSuspense.tsx
┃ ┣ 📜NoBooks.tsx
┃ ┣ 📜Pagination.tsx
┃ ┗ 📜SkeletonComponent.tsx
┣ 📂hooks
┃ ┣ 📜useGetBooksData.ts ### 책데이터 패칭 훅
┃ ┗ 📜useImageLoader.tsx ### 이미지 로드 여부 훅
┣ 📂pages
┃ ┣ 📜SearchBook.tsx
┃ ┗ 📜WishList.tsx
┣ 📂share ### 공통 common 폴더
┃ ┗ 📜share.ts
┣ 📂store
┃ ┣ 📜useBookListStore.ts
┃ ┣ 📜useSearchListStore.ts
┃ ┣ 📜useSendObjStore.ts
┃ ┗ 📜useWishListStore.ts
┣ 📂style
┃ ┣ 📂searchBook
┃ ┃ ┣ 📜bookList.scss
┃ ┃ ┣ 📜searchBox.scss
┃ ┃ ┗ 📜searchModal.scss
┃ ┣ 📜global.scss
┃ ┣ 📜header.scss
┃ ┣ 📜pagination.scss
┃ ┗ 📜_variables.scss
┣ 📂types
┃ ┗ 📜books.type.ts
┣ 📜App.tsx
┣ 📜main.tsx
┣ 📜properties.ts
┗ 📜vite-env.d.ts

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
