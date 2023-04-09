import { useState } from "react";
import "./FormInput.css";
//import styled from 'styled-components'

const FormInput = (props) => {
        const[focused,setFocused] = useState(false);
    const {label, errorMessage, onChange, id, ...inputProps} = props;

    const handleFocus = (e) => {
        setFocused(true);
    };

    return (
        <div>
            <div className="formInput">
                <label>{label}</label>
                <input 
                    {...inputProps} 
                    onChange={onChange} 
                    onBlur={handleFocus} 
                    focused={focused.toString()}
                />
                <span>{errorMessage}</span>
                
            </div>
        </div>
    )
}

export default FormInput
