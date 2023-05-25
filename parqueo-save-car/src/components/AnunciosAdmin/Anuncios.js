import React from 'react'
import Navlogin from '../Login/Navlogin'
import Footers from '../Footer/Footer'
import ImputAnuncio from './ImputAnuncio'
import AnucioAdmin from './AnucioAdmin'

const Anuncios = () => {
  return (
    <>
      <Navlogin/>
      <div className='container'>
       <AnucioAdmin/>
      <ImputAnuncio/>
      </div>
      <Footers/>
    </>
  )
}

export default Anuncios