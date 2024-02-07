import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

function Update() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0)

  const [error, setError] = useState();

  const { id } = useParams();
  console.log(id);

  const navigate = useNavigate();


  const getsingleUser = async () => {
    const response = await fetch(`http://localhost:5000/get/single/user/${id}`);
    const result = await response.json();

    if (response.ok) {
      setError("");
      console.log("updatedUser", result);
      setName(result.name)
      setEmail(result.email)
      setAge(result.age)

    };

    if (!response.ok) {
      console.log(result.error);
      setError(result.error);
    }
  };

  //passing editted data to backend
  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedUser = { name, email, age };
    console.log(updatedUser);

    const response = await fetch(`http://localhost:5000/edit/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),

    });
    const result = await response.json();

    if (response.ok) {
      console.log("updated resulut...", result);
      setError(""); 
      alert("updated data successfully")
      navigate("/all");
    }
    if (!response.ok) {
      console.log(response.error);
      setError(response.error)
    }
  };
  useEffect(() => {
    getsingleUser();
  }, []);
  
  return (
    <div><div classNameName='container my-2'>
      <h1 classNameName='text-container'> Enter the data</h1>
      <form onSubmit={handleUpdate} >
        <div className="mb-3">
          <label className="form-label">Edit Your Name</label>
          <input type="text" className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="mb-3">
          <label for="" className="form-label">Edit Your Email</label>
          <input type="email" className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="">
          <label for="" className="form-label">Edit Your Age</label>
          <input type="number" className="form-control"
            value={age}
            onChange={(e) => setAge(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div></div>
  );
};


export default Update