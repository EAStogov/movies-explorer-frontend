import { useState } from "react";
import "./Burger.css";

function Burger() {
  const [isActive, setIsActive] = useState(false);

  function handleClick() {
    setIsActive(!isActive);
  }

  return (
    <button type="button" className={`burger ${isActive && "burger_active"}`} onClick={handleClick}>
      <span className="burger__line"></span>
      <span className="burger__line"></span>
      <span className="burger__line"></span>
    </button>
  );
}

export default Burger;
