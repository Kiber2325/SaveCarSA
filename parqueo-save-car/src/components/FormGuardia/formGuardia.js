
import React, {useState}  from 'react'
import "./formGuardi.css"
import { Formik, Field } from 'formik';

import logo from '../../Images/logo.png';
import FotoGuardia from '../FotoGuardia/FotoGuardia';
import { Link, useNavigate } from 'react-router-dom';
 
 const FormGuardia = () => {
  const [FormularioEnviado, cambiarFormularioEnviado ] = useState(false)
  const navigate=useNavigate();
  
   return (
   <>    
   {/* navar */}
    <header className="Encabezado">    
      <section>
          <div>
          <a href='/'>
              <img className="image" src={logo} alt="logo"></img>
          </a>
          </div>
      </section>   
    </header>

    {/* titulo */}
       <div>
         <h1 className='titulo'>Registrar Guardias</h1> 
       </div>
       <div className='container'>

    {/*formulario  */}
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
              errores.nombre = 'El nombre solo puede contener letras, números y espacios'
           }

          //validacion apellido
             if (!valores.apellido) {             
              errores.apellido = "Por favor ingrese su apellido"
           }else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.apellido)) {
              errores.apellido = 'El apellido solo puede contener letras y espacios'
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
           
            //validacion turno
            if (!valores.turno) {             
              errores.turno = "Seleccione un turno"
            }

            //validacion direccion
            if (!valores.mes) {             
              errores.mes = "ingrese los meses"
           }else if (!/^([0-12])*$/.test(valores.mes)) {
              errores.mes= 'solo numeros'
           }

          return errores;
      }}

      onSubmit={(valores, {resetForm})=>{
        resetForm()
        console.log("formulario enviado");
        cambiarFormularioEnviado(true)
        setTimeout(()=> cambiarFormularioEnviado(false),4000)
        navigate('/Home')
      }}> 
      
       {({ values, errors, touched, handleSubmit, handleChange, handleBlur })=>(
        <form onSubmit={handleSubmit}>
        {console.log(errors)}
        <div class="container">
          <div class="row">
            <div class="col hw">
               <h5 className='titulo'>Registro datos del guardia</h5>
                   
                 <label htmlFor='CI' class="form-label"  >CI</label>
                 <Field 
                  type="text"
                  class="form-control"  
                  id='CI' name='ci' 
                  placeholder="Escriba aqui el CI del guardia"
                 
                  />
                  {touched.ci && errors.ci && <div className="error" >{errors.ci}</div>}

                                      
                 <label htmlFor='nombre'>Nombre</label>
                 <Field type="text"
                  class="form-control"  
                  id='nombre' 
                  name='nombre'  
                  placeholder="Escriba aqui el Nombre del guardia"
                  />
                  {touched.nombre && errors.nombre && <div className="error" >{errors.nombre}</div>}

                

                 <label htmlFor='apellidos'>Apellidos</label>
                 <Field type="text" 
                 class="form-control"  
                 id='apellidos' 
                 name='apellido'  
                 placeholder="Escriba aqui los apellidos del guardia"  
                 />
                 {touched.apellido && errors.apellido && <div className="error" >{errors.apellido}</div>}
                

                 <label htmlFor='email'>Email</label>
                 <Field type="text"
                  class="form-control"  
                  id='email' 
                  name='email'  
                  placeholder="Escriba aqui el email del guardia"  
                 />
                  {touched.email && errors.email && <div className="error" >{errors.email}</div>}

                

                 <label htmlFor='celular'>Celular</label>
                 <Field type="text" 
                 class="form-control"  
                 id='celular' name='celular'  
                 placeholder="Escriba aqui el celular del guardia"  
                />
                 {touched.celular && errors.celular && <div className="error" >{errors.celular}</div>}

                

                 <label htmlFor='direccion'>Direccion</label>
                 <Field type="text" 
                 class="form-control"  
                 id='direccion' 
                 name='direccion'  
                 placeholder="Escriba aqui la dirección del guardia" 
                />
                 {touched.direccion && errors.direccion && <div className="error" >{errors.direccion}</div>}

                </div>


                <div class="col hw2">
                  <h5 className='titulo'>Registrar datos respecto al trabajo</h5>
                  <label>Turno</label> <br/><br/>
                       <Field as='select' class="form-select" aria-label="Default select example" name='turno'>
                        <option selected>Seleccione turno</option>
                        <option value="2">Mañana</option>
                        <option value="2">Tarde</option>
                        <option value="3">Noche</option>
                       </Field>
                       {touched.turno && errors.turno && <div className="error" >{errors.turno}</div>}
                       <br/><br/>
                       
                        <label htmlFor='nombre'>Cantidad de meses</label>
                        <Field type="number" 
                        class="form-control"  
                        id='nombre' 
                        name='mes'  
                        placeholder="Contrato por el tiempo de:"
                       />
                        {touched.mes && errors.mes && <div className="error" >{errors.mes}</div>}
                       <FotoGuardia/>

                    </div>
                   </div>

              <div class="row">
                <div class='text-center botones' >
                  <button style={{...StyleSheet.button,backgroundColor:"#00B9BC",}} type='submit'  class="btn btn-secondary" >Registrar</button> 
                  <Link style={{...StyleSheet.button,backgroundColor:"#F46D21",}} className="btn btn-primary" to='/Home'>volver</Link>       
                  
                  {FormularioEnviado && <p className='exito'>Enviado con exito</p>}              
                </div>
              </div>
         </div>
    </form>

       )}
      
    </Formik> 
    </div>
    <div className='footerReg'><p id='cont'>Contactos</p></div>
    </> 

    );
 }
 
 export default FormGuardia



