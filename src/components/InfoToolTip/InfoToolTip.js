import "./InfoToolTip.css";

const InfoTooltip = ({ errorText, isOpen, onClose}) => {
  return (
    <section className={`popup ${isOpen  && "popup_opened"}`}>
      <div className='popup__container'>
        <p className='popup__message'>{errorText}</p>
        <button
          className="popup__close"
          type="button"
          onClick={onClose}>
            <span className="popup__close-icon-line"></span>
            <span className="popup__close-icon-line"></span>
        </button>
      </div>
    </section>
  )
}

export default InfoTooltip;