import "../style/header.scss";
import { Link, useLocation } from "react-router-dom";

const menuLinks = [
  { to: "/", label: "도서 검색" },
  { to: "/wishlist", label: "내가 찜한 책" },
];

function Header() {
  const location = useLocation();

  return (
    <header>
      <h1>
        <Link to={"/"}>CERTICOS BOOKS</Link>
      </h1>
      <nav>
        <ul>
          {menuLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className={`${location.pathname === link.to ? "active" : ""}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
export default Header;
