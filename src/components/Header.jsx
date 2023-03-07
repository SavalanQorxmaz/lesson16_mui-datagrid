

import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='fixed-header-back'>
        <div className='header'>
            <div className='container'>
               <div className='navbar'>
                <div><Link to='/'>Home</Link></div>
                <div><Link>Page2</Link></div>
                <div><Link>Page3</Link></div>
                <div><Link to={`/mui`}>MUI</Link></div>
                <div><Link to={'/products'}>Products</Link></div>
                <div><Link to='/about'>About</Link></div>
               </div>
            </div>
        </div>

    </div>
  )
}


export {Header}