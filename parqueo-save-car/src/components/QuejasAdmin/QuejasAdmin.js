import React from 'react'
import Navlogin from '../Login/Navlogin'
import Queja from '../Quejas/Queja'
import Footers from '../Footer/Footer'
import './QuejasAdmin.css'
const QuejasAdmin = () => {
  return (
    <>
    <Navlogin/>
    <div className='container'>
    <h2 className='titu'>lista de observaciones</h2>
    <Queja/>
    </div>
    <Footers/>
    </>
  )
}

export default QuejasAdmin