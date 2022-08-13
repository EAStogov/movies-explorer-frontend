import avatar from "../../images/my-avatar.png";
import "./AboutMe.css";
import Portfolio from "../Portfolio/Portfolio";

function AboutMe() {
  return(
    <section className="me">
      <h2 className="page__nav-title">Студент</h2>
      <div className="me__container">
        <div className="me__desc-container">
          <h3 className="me__name">Егор</h3>
          <p className="me__subtitle">Фронтенд-разработчик, 27 лет</p>
          <p className="me__desc">Я родился и живу в Саратове, закончил факультет экономики СГУ. 
            У меня есть жена и дочь. 
            Я люблю слушать музыку, а ещё увлекаюсь бегом. 
            Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». 
            После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <ul className="me__link-list">
            <li>
              <a className="me__link" href="https://vk.com/id15985072" target="_blank" rel="noreferrer">VK</a>
            </li>
            <li>
              <a className="me__link" href="https://github.com/EAStogov" target="_blank" rel="noreferrer">Github</a>
            </li>
          </ul>
        </div>
        <img className="me__avatar" src={avatar} alt="Я" />
      </div>
      <Portfolio />
    </section>
  );
}

export default AboutMe;