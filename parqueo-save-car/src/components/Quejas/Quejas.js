import React from 'react'
import Queja from './Queja'
import Navlading from '../landingPage/Navlading'
import InputQueja from './InputQueja'

// import InputQueja from './InputQueja'


const Quejas = () => {
  return (
    <>
      <Navlading/>
      <h2 className='titulo'>Observaciones</h2>
      <Queja/>
      <InputQueja/>
      <div className='futer'> contacto</div>
    </>
  )
}

export default Quejas