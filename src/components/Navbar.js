import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='navbar'>
      <Link to='/' className='navlogo'>
        Search
      </Link>

      <Link className='navlist navlogo' to='/overview'>
        Overview
      </Link>
    </nav>
  );
};

export default Navbar;
