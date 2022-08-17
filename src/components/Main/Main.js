import { useEffect } from "react";
import AboutMe from "../AboutMe/AboutMe";
import AboutProject from "../AboutProject/AboutProject";
import Promo from "../Promo/Promo";
import Techs from "../Techs/Techs";

function Main({ toggleHeaderNavigation, toggleFooter, onChangeRoute, route }) {
  useEffect(() => {
    toggleHeaderNavigation(true);
    toggleFooter(true);
    onChangeRoute(route);
  }, [])

  return (
    <>
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
    </>
  );
}

export default Main;