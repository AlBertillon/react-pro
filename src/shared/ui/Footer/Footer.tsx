import { Link } from "react-router-dom";

import "./Footer.css";

/** Свойства футера */
interface FooterProps {
  /** Дочерние элементы (опционально) */
  children?: React.ReactNode;
}

/** Футер сайта */
const Footer = ({ children }: FooterProps) => (
  <footer className="footer">
    <div className="footer__content">
      <div className="footer__section">
        <span className="footer__title">DogFood</span>
        <span className="footer__text">© {new Date().getFullYear()} — Современный гав-магазин</span>
      </div>

      <div className="footer__section">
        <span className="footer__title">Навигация</span>
        <ul className="footer__links">
          <li><Link to="/">Каталог</Link></li>
          <li><Link to="/cart">Корзина</Link></li>
          <li><Link to="/favorites">Избранное</Link></li>
        </ul>
      </div>

      <div className="footer__section">
        <span className="footer__title">Контакты</span>
        <ul className="footer__links">
          <li>support@DogFood.ru</li>
          <li>8 (123) 456-78-90</li>
        </ul>
      </div>
    </div>

    <div className="footer__bottom">
      {children}
    </div>
  </footer>
);

export default Footer;
