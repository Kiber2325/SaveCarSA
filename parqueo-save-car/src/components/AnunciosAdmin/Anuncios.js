import React from 'react'
import Navlogin from '../Login/Navlogin'
import Footers from '../Footer/Footer'
import ImputAnuncio from './ImputAnuncio'

const Anuncios = () => {
  return (
    <>
      <Navlogin/>
      <div className='container'>
       
     <ImputAnuncio/>
      </div>
      <Footers/>
    </>
  )
}

export default Anuncios