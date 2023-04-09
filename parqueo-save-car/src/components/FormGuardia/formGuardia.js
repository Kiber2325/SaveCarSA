
 import React, {useState}  from 'react'
 import "./formGuardi.css"
import { Formik, Field } from 'formik';

import Navlogin from "../Login/Navlogin";
 
 
 const FormGuardia = () => {
  const [FormularioEnviado, cambiarFormularioEnviado ] = useState(false)
   return (
    
    <>
    <Navlogin/>
       <div>
         <h1 className='titulo'>Registrar Guardias</h1> 
       </div>
       <div className='container'>
      <Formik
        initialValues={{
          ci:'',
          nombre:'',
          apellido:'',
          email:'',
          celular:'',
          direccion:'',
          turno:'',
          mes:''
        }} 

       validate={(valores)=>{
          let errores = {};
          //validacion ci
            if (!valores.ci) {             
               errores.ci = "Por favor ingrese su CI"
            }else if (/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.ci)) {
              errores.ci = 'Solo puede contener numeros'
            }

          //validacion nombre 
           if (!valores.nombre) {             
              errores.nombre = "Por favor ingrese nombre"
           }else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.nombre)) {
              errores.nombre = 'EL nombre solo puede contener letras y espacios'
           }

          //validacion apellido
             if (!valores.apellido) {             
              errores.apellido = "Por favor ingrese su apellido"
           }else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.apellido)) {
              errores.apellido = 'EL apellido solo puede contener letras y espacios'
           }

            //validacion email
            if (!valores.email) {             
              errores.email = "Por favor ingrese su email"
           }else if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(valores.email)) {
              errores.email = 'EL email solo puede contener caracteres especiales'
           }

            //validacion celular
            if (!valores.celular) {             
              errores.celular = "Por favor ingrese su celular"
           }else if (/[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.celular)) {
              errores.celular = 'EL celular solo puede contener numeros'
           }

            //validacion direccion
            if (!valores.direccion) {             
              errores.direccion = "Por favor ingrese su direccion"
           }else if (/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.direccion)) {
              errores.direccion = 'EL direccion solo puede contener letras y espacios'
           }         
          return errores;
      }}
      onSubmit={(valores, {resetForm})=>{
        resetForm()
        console.log("formulario enviado");
        cambiarFormularioEnviado(true)
        setTimeout(()=> cambiarFormularioEnviado(false),4000)
      }}> 
      
       {({ values, errors, touched, handleSubmit, handleChange, handleBlur })=>(
        <form onSubmit={handleSubmit}>
        {console.log(errors)}
        <div class="container">
          <div class="row">
            <div class="col hw">
               <h5 className='titulo'>Registro datos del cliente</h5>
                   
                 <label htmlFor='CI' class="form-label"  >CI</label>
                 <Field 
                  type="text"
                  class="form-control"  
                  id='CI' name='ci' 
                  placeholder="Escriba aqui el CI del cleinte"
                 
                  />
                  {touched.ci && errors.ci && <div className="error" >{errors.ci}</div>}

                                      
                 <label htmlFor='nombre'>Nombre</label>
                 <Field type="text"
                  class="form-control"  
                  id='nombre' 
                  name='nombre'  
                  placeholder="Escriba aqui el Nombre del cleinte"
                  />
                  {touched.nombre && errors.nombre && <div className="error" >{errors.nombre}</div>}

                

                 <label htmlFor='apellidos'>Apellidos</label>
                 <Field type="text" 
                 class="form-control"  
                 id='apellidos' 
                 name='apellido'  
                 placeholder="Escriba aqui los apellidos del cleinte"  
                 />
                 {touched.apellido && errors.apellido && <div className="error" >{errors.apellido}</div>}
                

                 <label htmlFor='email'>Email</label>
                 <Field type="text"
                  class="form-control"  
                  id='email' 
                  name='email'  
                  placeholder="Escriba aqui el email del cleinte"  
                 />
                  {touched.email && errors.email && <div className="error" >{errors.email}</div>}

                

                 <label htmlFor='celular'>Celular</label>
                 <Field type="text" 
                 class="form-control"  
                 id='celular' name='celular'  
                 placeholder="Escriba aqui el celular del cleinte"  
                />
                 {touched.celular && errors.celular && <div className="error" >{errors.celular}</div>}

                

                 <label htmlFor='direccion'>Direccion</label>
                 <Field type="text" 
                 class="form-control"  
                 id='direccion' 
                 name='direccion'  
                 placeholder="Escriba aqui la dirección del cleinte" 
                />
                 {touched.direccion && errors.direccion && <div className="error" >{errors.direccion}</div>}

                </div>


                <div class="col hw2">
                  <h5 className='titulo'>Registrar datos respecto a la reserva</h5>
                    <br/>
                       <select class="form-select" aria-label="Default select example">
                        <option selected>Seleccione turno</option>
                        <option value="1">Mañana</option>
                        <option value="2">Tarde</option>
                        <option value="3">Noche</option>
                       </select>
                           

                        <label htmlFor='nombre'>Cantidad de meses</label>
                        <Field type="text" 
                        class="form-control"  
                        id='nombre' 
                        name='mes'  
                        placeholder="Escriba aqui el Nombre del cleinte"
                       />
                        {touched.mes && errors.mes && <div className="error" >{errors.mes}</div>}

                    </div>
                   </div>

              <div class="row">
                <div class='text-center botones' >
                  <button type='submit'  class="btn btn-secondary">Registrar</button> 
                  <a className="btn btn-primary" href='/Home'>volver</a>       
                  
                  {FormularioEnviado && <p className='exito'>Enviado con exito</p>}              
                </div>
              </div>
         </div>
    </form>

       )}
      
    </Formik> 
    </div>
   
    </> 

    );
 }
 
 export default FormGuardia



