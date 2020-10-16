import React from 'react';
import { NavLink } from 'react-router-dom';
import { RiFocus2Line, RiSettings2Line } from 'react-icons/ri';

import Logo from '../Logo';
import { StyledHeader } from './styles';

export default function Header() {
  return (
    <StyledHeader>
      <div className="content">
        <div className="navigation">
          <Logo mode="expanded" />
          <Logo />
          <nav>
            <NavLink to="/" exact activeClassName="active">
              <RiFocus2Line size={24} />
              <span>Stream</span>
            </NavLink>
            <NavLink to="/rules" exact activeClassName="active">
              <RiSettings2Line size={24} />
              <span>Rules</span>
            </NavLink>
          </nav>
        </div>
      </div>
    </StyledHeader>
  );
}
