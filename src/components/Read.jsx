import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function Read() {

  const [data, setData] = useState([]);
  const [error, setError] = useState();

 

  async function getData() {

    const response = await fetch("http://localhost:5000/allUser");

    const result = await response.json();

    console.log("result...", result);

    if (!response.ok) {

      setError(result.error);
    }

    if (response.ok) {
      console.log(response.ok);
      setData(result);
      setError("");
    }
  }

  useEffect(() => {
    getData();
  }, []);

  console.log(data);

  const handleDelete= async (id) =>{
    const done= window.confirm("do u want to delete?")
    console.log(done);
    if (done) {
      const response = await fetch (`http://localhost:5000/delete/${id}`,{
        method: "DELETE",
      });
  
      const result1= await response.json();
  
      if (!response.ok) {
  
        setError(result1.error);
      }
  
      if (response.ok) {
        console.log("deleted",response.ok);
        setError("Deleted Succesfully");
        setTimeout(()=>{
          setError("");
          getData();
        }, 1000);
      }
  
    }


   
  }

  // async function getData(id){
  //   const response = await fetch (`http://localhost:5000/edit/${id}`)
  //   const result= await response.json();
  //   console.log("result...", result);
  //   if (!response.ok) {

  //     setError(result.error);
  //   }

  //   if (response.ok) {
  //     setData(result);
  //     setError("");
  //   }


  // }

  // // useEffect(()=>{
  // //   getData();
  // // },[])



  return (
    <div className='container my-2'>

      <h2 className='text-center'>All Data</h2>

      <div className='row'>

        {data?.map((ele) => (
          

          <div key={ele._id} className='col-3'>
            <div className="card" >
              <div className="card-body">
                <h5 className="card-title">{ele.name}</h5>
                <h6 className="card-subtitle mb-2 text-body-secondary">{ele.email}</h6>
                <p className="card-text">{ele.age}</p>
                <a href="#" className="card-link" onClick={()=> handleDelete(ele._id)}>Delete</a>
                <Link to = {`/${ele._id}`} className="card-link">Edit</Link>
              </div>
            </div>

          </div>

        ))}

      </div>
    </div>
  )
}

export default Read
