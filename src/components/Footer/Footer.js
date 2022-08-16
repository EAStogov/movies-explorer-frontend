import Navigation from "../Navigation/Navigation";
import "./Footer.css";

function Footer({ isFooterShown }) {
  return(
    <section className={`footer ${!isFooterShown && 'footer__hidden'}`}>
      <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
      <div className="footer__container">
        <p className="footer__year">© 2022</p>
        <Navigation />
      </div>
    </section>
  );
}

export default Footer;