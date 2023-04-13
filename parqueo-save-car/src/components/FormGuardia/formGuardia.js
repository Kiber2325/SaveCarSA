
import React, {useState}  from 'react'
import "./formGuardi.css"
import { Formik, Field } from 'formik';
import { Link } from "react-router-dom";
import logo from '../../Images/logo.png';
import FotoGuardia from '../FotoGuardia/FotoGuardia';
 
 const FormGuardia = () => {
  const [FormularioEnviado, cambiarFormularioEnviado ] = useState(false)

   return (
   <>    
   {/* navar */}
    <header className="Encabezado">    
      <section>
          <div>
          <Link to='/'>
              <img className="image" src={logo} alt="logo"></img>
          </Link>
          </div>
      </section>   
    </header>

    {/* titulo */}
       <div>
         <h1 className='titulo'>Registrar Guardia</h1> 
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
      }}> 
      
       {({ values, errors, touched, handleSubmit, handleChange, handleBlur })=>(
        <form onSubmit={handleSubmit}>
        {console.log(errors)}
        <div class="container">
          <div class="row">
            <div class="col hw">
               <h5 className='tituloguardias'>Registro datos del guardia</h5>
                   
                 <label htmlFor='CI' class="form-label">CI</label>
                 <Field 
                  type="text"
                  class="form-control"  
                  id='CI' name='ci' 
                  placeholder="Escriba aqui el CI del guardia"
                 
                  />
                  {touched.ci && errors.ci && <div className="error" >{errors.ci}</div>}

                                      
                 <label htmlFor='nombre' class="form-label">Nombre</label>
                 <Field type="text"
                  class="form-control"  
                  id='nombre' 
                  name='nombre'  
                  placeholder="Escriba aqui el Nombre del guardia"
                  />
                  {touched.nombre && errors.nombre && <div className="error" >{errors.nombre}</div>}

                

                 <label htmlFor='apellidos' class="form-label">Apellidos</label>
                 <Field type="text" 
                 class="form-control"  
                 id='apellidos' 
                 name='apellido'  
                 placeholder="Escriba aqui los apellidos del guardia"  
                 />
                 {touched.apellido && errors.apellido && <div className="error" >{errors.apellido}</div>}
                

                 <label htmlFor='email' class="form-label">Email</label>
                 <Field type="text"
                  class="form-control"  
                  id='email' 
                  name='email'  
                  placeholder="Escriba aqui el email del guardia"  
                 />
                  {touched.email && errors.email && <div className="error" >{errors.email}</div>}

                

                 <label htmlFor='celular' class="form-label">Celular</label>
                 <Field type="text" 
                 class="form-control"  
                 id='celular' name='celular'  
                 placeholder="Escriba aqui el celular del guardia"  
                />
                 {touched.celular && errors.celular && <div className="error" >{errors.celular}</div>}

                

                 <label htmlFor='direccion' class="form-label">Direccion</label>
                 <Field type="text" 
                 class="form-control"  
                 id='direccion' 
                 name='direccion'  
                 placeholder="Escriba aqui la dirección del guardia" 
                />
                 {touched.direccion && errors.direccion && <div className="error" >{errors.direccion}</div>}

                </div>


                <div class="col hw2">
                  <h5 className='tituloguardias'>Registrar datos respecto a la reserva</h5>
                  <label class="flabel">Turno</label>
                       <select class="form-select" aria-label="Default select example">
                        <option selected>Seleccione turno</option>
                        <option value="1">Mañana</option>
                        <option value="2">Tarde</option>
                        <option value="3">Noche</option>
                       </select>
                       
                       
                        <label htmlFor='nombre' class="fflabel">Cantidad de meses</label>
                        <Field type="text" 
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
                  <button type='submit'  class="btn btn-secondary">Registrar</button> 
                  <Link className="btn btn-primary" to='/Home'>volver</Link>       
                  

                  <button
                    style={{
                      ...StyleSheet.button,
                      backgroundColor:"#00B9BC"
                    }} tipe='submit'
                  >Registrar</button>      
                  
                  <button
                    style={{
                      ...StyleSheet.button,
                      backgroundColor:"#F46D21",
                    }} href='/home'
                  >Volver</button>

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



