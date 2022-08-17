import "./Footer.css";

function Footer({ isFooterShown }) {
  return (
    <section className={`footer ${!isFooterShown && "footer__hidden"}`}>
      <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
      <div className="footer__container">
        <p className="footer__year">© 2022</p>
        <ul className="footer__nav">
          <li className="footer__nav-item">
            <a
              className="page__link footer__nav-link"
              href="https://practicum.yandex.ru"
              target="_blank"
              rel="noreferrer"
            >
              Яндекс.Практикум
            </a>
          </li>
          <li className="footer__nav-item">
            <a
              className="page__link footer__nav-link"
              href="https://github.com/EAStogov"
              target="_blank"
              rel="noreferrer"
            >
              Github
            </a>
          </li>
          <li className="footer__nav-item">
            <a
              className="page__link footer__nav-link"
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
            >
              Facebook
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Footer;
