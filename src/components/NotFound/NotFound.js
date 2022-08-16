import "./NotFound.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function NotFound({ toggleHeader, toggleFooter }) {
  const navigate = useNavigate();
  useEffect(() => {
    toggleHeader(false);
    toggleFooter(false)
  }, []);

  function handleButtonClick() {
    return navigate(-1);
  }

  return(
    <section className="error-page">
      <div className="error-page__container">
        <h1 className="error-page__title">404</h1>
        <p className="error-page__subtitle">Страница не найдена</p>
      </div>
      <button className="error-page__button-link" onClick={handleButtonClick}>Назад</button>
    </section>
  );
}

export default NotFound;