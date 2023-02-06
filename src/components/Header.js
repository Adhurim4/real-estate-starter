import React from 'react';

//import link
import {Link} from 'react-router-dom'

import Logo from '../assets/img/logo2.jpg';

const Header = () => {
  return(
    <header>
      <div className='container mx-auto flex justify-between items-center'>
        {/* logo */}
        <Link 
          to='/'>
          <div className='flex items-center'>
          <img src={Logo} alt="" style={{width:"140px"}}/>
          <h1 className='text-2xl font-extrabold  text-violet-700 transition'>Real Estate</h1>
          </div>
          </Link>
          {/* buttons */}
          <div className='flex items-center gap-6'>
            <Link className='hover:text-violet-900 transition'
              to="">
              Log in
            </Link>
            <Link className='bg-violet-700 hover:bg-violet-800 text-white px-4 py-3 rounded-lg transition'
              to="">
              Sign Up
            </Link>
          </div>
      </div>
    </header>
  );
 
};

export default Header;
