import "./Navigation.css";

function Navigation() {
  return(
    <ul className="navigation">
      <li className="navigation__item">
        <a className="navigation__link" href="https://practicum.yandex.ru" target="_blank" rel="noreferrer">Яндекс.Практикум</a>
      </li>
      <li className="navigation__item">
        <a className="navigation__link" href="https://github.com/EAStogov" target="_blank" rel="noreferrer">Github</a>
      </li>
      <li className="navigation__item">
        <a className="navigation__link" href="https://vk.com/id15985072" target="_blank" rel="noreferrer">VK</a>
      </li>
    </ul>
  );
}

export default Navigation;