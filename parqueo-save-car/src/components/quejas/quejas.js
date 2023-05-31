import React from 'react'

import Navlading from '../landingPage/Navlading'
import InputQueja from './InputQueja'
import Footers from '../Footer/Footer'

// import InputQueja from './InputQueja'


const Quejas = () => {
  return (
    <>
      <Navlading/>
      <div className='container'>
      <br/><br/><br/>
       <h2 className='titulo'>Observaciones</h2>
      
      <InputQueja/>
      </div>
      <Footers/>
    </>
  )
}

export default Quejas