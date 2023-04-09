import React, { Component } from 'react'
import "../FotoGuardia/guardia.css"
import usuario from "../../Images/user.png"
export class FotoGuardia extends Component {
    state={
        profileImg:usuario
      }
      imageHandler = (e) => {
        const reader = new FileReader();
        reader.onload = () =>{
          if(reader.readyState === 2){
            this.setState({profileImg: reader.result})
          }
        }
        reader.readAsDataURL(e.target.files[0])
      };
        render() {
        const { profileImg} = this.state
            return (
                <div className="page">
                    <div className="container">
                        <h1 className="heading">Subir Foto</h1>
                        <div className="img-holder">
                            <img src={profileImg} alt="" id="img" className="img"></img>
                        </div>
                        <input type="file" accept="image/*" name="image-upload" id="input" onChange={this.imageHandler} />
                        <div className="label">
                   <label className="image-upload" htmlFor="input">
                            <i className="material-icons">subir imagen</i>
                           
                        </label>
              </div>
                    </div>
                </div>
            );
        }
    }

export default FotoGuardia