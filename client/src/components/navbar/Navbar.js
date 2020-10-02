import React, { Fragment } from 'react';

import { connect } from 'react-redux';

import './Navbar.css';

import HomeNavbar from '../../components/navbar/home-navbar/HomeNavbar';
import DefaultNavbar from '../../components/navbar/default-navbar/DefaultNavbar';

const Navbar = ({ isCurrentPageHome }) => {
  return <nav>{isCurrentPageHome ? <HomeNavbar /> : <DefaultNavbar />}</nav>;
};

const mapStateToProps = (state) => ({
  isCurrentPageHome: state.page.isCurrentPageHome,
});

export default connect(mapStateToProps)(Navbar);

{
  /* 
(<div>
        <nav>
      <ScrollLink
        activeClass="active"
        to="modern-world"
        spy={true}
        smooth={true}
        duration={500}
      >
        <img src={ruins} alt="modern world icon" />
      </ScrollLink>
      <ScrollLink
        activeClass="active"
        to="imaginarium"
        spy={true}
        smooth={true}
        duration={500}
      >
        <img src={ruins} alt="imaginarium" />
      </ScrollLink>
      <ScrollLink
        activeClass="active"
        to="ancient-world"
        spy={true}
        smooth={true}
        duration={500}
      >
        <img src={ruins} alt="ancient world icon" />
      </ScrollLink>
      <img src={ruins} alt="my space" />
    </nav></div> */
}
