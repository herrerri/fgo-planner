import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='navbar'>
      <Link to='/' className='navlogo'>
        FGO App
      </Link>
      <ul className='navlist'>
        <li>
          <Link to='/'>Search</Link>
        </li>
        <li>
          <Link to='/list'>List</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
