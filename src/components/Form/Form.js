import "./Form.css";

function Form({ title, submitText, navLinkText, navLinkButtonText, children, isForEdit }) {
  return (
    <form className="form">
      <h2 className={`form__title ${isForEdit && 'form__title_type_edit'}`}>{title}</h2>
      {children}
      <button className={`form__submit ${isForEdit && 'form__submit_type_edit'}`} type="submit">{submitText}</button>
      <div className="form__navLink-container">
        <p className={`form__navLink-text ${isForEdit && 'form__navLink-text_type_edit'}`}>{navLinkText}</p>
        <button className={`form__redirect-button ${isForEdit && 'form__redirect-button_type_edit'}`}>{navLinkButtonText}</button>
      </div>
    </form>
  )
}

export default Form;