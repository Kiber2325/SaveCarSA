 import React from 'react'
 import "./formGuardi.css"
 
 const FormGuardia = () => {
   return (
    <>
    <div>
      <h1 className='titulo'>Registrar Guardias</h1> 
    </div>
    <form>
    <div>
         <label htmlFor='CI' class="form-label"  >CI</label>
         <input  type="text" class="form-control"  id='CI' name='CI' placeholder="Escriba aqui el CI del cleinte"></input>

         <label htmlFor='nombre'>Nombre</label>
         <input type="text" class="form-control"  id='nombre' name='nombre'  placeholder="Escriba aqui el Nombre del cleinte"></input>

         <label htmlFor='apellidos'>Apellidos</label>
         <input type="text" class="form-control"  id='apellidos' name='apellidos'  placeholder="Escriba aqui los apellidos del cleinte"></input>

         <label htmlFor='email'>Email</label>
         <input type="text" class="form-control"  id='email' name='email'  placeholder="Escriba aqui el email del cleinte"></input>

         <label htmlFor='celular'>Celular</label>
         <input type="text" class="form-control"  id='celular' name='celular'  placeholder="Escriba aqui el celular del cleinte"></input>

         <label htmlFor='direccion'>Direccion</label>
         <input type="text" class="form-control"  id='direccion' name='direccion'  placeholder="Escriba aqui la dirección del cleinte"></input>
    </div>
    </form>
    
    
    </> 

    );
 }
 
 export default FormGuardia



