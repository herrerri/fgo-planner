import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='navbar'>
      <Link to='/' className='navlogo'>
        Home
      </Link>
      <div>
        <Link to='/search' className='navlist navlogo'>
          Search
        </Link>
        <Link className='navlist navlogo' to='/overview'>
          Overview
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
