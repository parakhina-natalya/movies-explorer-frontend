import React from 'react';
import './Landing.css';
import Header from '../Header/Header';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';
import Footer from '../Footer/Footer';

function Landing(props) {

  return (
    <>
      <Header
        loggedIn={props.loggedIn}
        onHamburger={props.onHamburger}
        isOpen={props.isOpen}
        onClose={props.onClose}
      />
      <main className="landing">
        <div className="landing__container">
          <Promo />
          <AboutProject />
          <Techs />
          <AboutMe />
          <Portfolio />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Landing;