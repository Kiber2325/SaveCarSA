import { push, ref } from 'firebase/database';
import React, { useState } from 'react'
import { database } from '../../conexion/firebase';

const InputQueja = () => {
  // const [message, setMessage] =  useState();
  const [message, setMessage]= useState("")
  const handleSubmit = (e) => {
    e.preventDefault();
    push(ref(database, "Quejas"), { message });
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default InputQueja