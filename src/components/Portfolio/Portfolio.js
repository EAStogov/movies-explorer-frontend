import "./Portfolio.css";

function Portfolio() {
  return (
    <section className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolio__links-list">
        <li className="portfolio__link-container">
          <a className="portfolio__link" href="https://eastogov.github.io/how-to-learn/">
            <h4 className="portfolio__link-title">Статичный сайт</h4>
            <p className="portfolio__link-icon">↗</p>
          </a>
        </li>
        <li className="portfolio__link-container">
          <a className="portfolio__link" href="https://github.com/EAStogov/russian-travel">
            <h4 className="portfolio__link-title">Адаптивный сайт</h4>
            <p className="portfolio__link-icon">↗</p>
          </a>
        </li>
        <li className="portfolio__link-container">
          <a className="portfolio__link" href="https://esto.mesto.nomoredomains.xyz/">
            <h4 className="portfolio__link-title">Одностраничное приложение</h4>
            <p className="portfolio__link-icon">↗</p>
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
