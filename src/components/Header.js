
import React from 'react';
import '../App.scss'

const Header = () => {

  return (
    <>
      <header className="header">
        <h1>A webcomic of romance, sarcasm, <br/> math, and language.</h1>
        <div className="header__waves">
          <div className="wave circulo a"></div>
          <div className="wave circulo b"></div>
          <div className="wave circulo c"></div>
        </div>
      </header>
    </>
  );
}

export default Header;