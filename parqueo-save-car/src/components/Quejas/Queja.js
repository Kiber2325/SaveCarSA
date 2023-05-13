import React, { useEffect, useState } from 'react'
import { database } from '../../conexion/firebase';
import { onValue, ref } from 'firebase/database';

const Queja = () => {
    const [posts, setPosts] = useState([]);


    useEffect(()=>{
      getData()
    },[]);
    function getData() {
      onValue(ref(database, 'Quejas'), (snapshot) => {
        const dataObj = snapshot.val();
        const dataArr = Object.values(dataObj);
        setPosts(dataArr);
      });
    }
  
  
  
    // useEffect(() => {
      
      
      return (
        <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.message}</li>
          ))}
      </ul>
    );
  };

export default Queja;