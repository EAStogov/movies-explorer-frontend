import { useEffect } from "react";
import AboutMe from "../AboutMe/AboutMe";
import AboutProject from "../AboutProject/AboutProject";
import Promo from "../Promo/Promo";
import Techs from "../Techs/Techs";

function Main({ toggleFooter, onChangeRoute, route }) {
  useEffect(() => {
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