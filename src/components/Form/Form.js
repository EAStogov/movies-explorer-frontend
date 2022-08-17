import "./Form.css";
import { NavLink } from "react-router-dom";

function Form({ title, submitText, navLinkText, navLinkButtonText, children, isForEdit, route }) {
  return (
    <form className="form">
      <h2 className={`form__title ${isForEdit && "form__title_type_edit"}`}>{title}</h2>
      {children}
      <button className={`page__button form__submit ${isForEdit && "form__submit_type_edit"}`} type="submit">
        {submitText}
      </button>
      <div className="form__navLink-container">
        <p className={`form__navLink-text ${isForEdit && "form__navLink-text_type_edit"}`}>
          {navLinkText}
        </p>
        <NavLink
          to={route}
          className={`page__link form__redirect-button ${isForEdit && "form__redirect-button_type_edit"}`}
        >
          {navLinkButtonText}
        </NavLink>
      </div>
    </form>
  );
}

export default Form;
