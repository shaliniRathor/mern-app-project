
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";


function Create() {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [age, setAge] = useState(0)
  const [error, setError] = useState("")
  const navigate = useNavigate();

  

 
  const handleSubmit = async(e) => {
    
    let response;
    let result;

    e.preventDefault();
    const addUser = {name,email,age};
    console.log(addUser);

     response = await fetch("http://localhost:5000/create",{

    method: "POST",
    headers:{
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(addUser),
  });
   result = await response.json();
   if(!response.ok){
    console.log(result.error);
    setError(result.error);
  }
  if (response.ok) {
    console.log(result);
    setName("");
    setEmail("");
    setAge(0);
    setError("");
    navigate("/all");
    }
  }

  console.log(name,email,age);

  return (
    <div classNameName='container my-2'>
      {error && <div className="alert alert-danger">email is already used </div> }
      <h1 classNameName='text-container'> Enter the data</h1>
<form onSubmit={handleSubmit} >  
      <div className="">
    <label  className="form-label">Enter Your Name</label>
    <input type="text" className="form-control" 
    value={name}
    onChange={(e)=> setName(e.target.value)} />
  </div>
      <div className="mb-3">
    <label for="" className="form-label">Enter Your Email</label>
    <input type="email" className="form-control"
     value={email}
     onChange={(e)=> setEmail(e.target.value)}/>
  </div>
  <div className="">
    <label for="" className="form-label">Enter Your Age</label>
    <input type="number" className="form-control"
     value={age}
     onChange={(e)=> setAge(e.target.value)}/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Create