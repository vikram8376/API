import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useState } from "react";

const Home = () => {
  const [data, setdata] = useState();

  useEffect(() => {
    fetchData();
  }, []);



  const Searchandle = async (event) => {
    let key = event.target.value;
    if(key){
        try {
            let result = await axios.get(`http://127.0.0.1:8000/Search/${key}`);
        
            if (result.data) {
              setdata(result.data); // Update state with fetched search results
            }
          } catch (error) {
            console.error(error);
          }

        }else{
            fetchData();
        }
   
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/");
      setdata(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1 className="text-center mb-3">Registration...</h1>

      <div class="mb-3">
        <input
          type="search"
          class="form-control"
          id="floatingInput"
          placeholder="Search..."
          onChange={Searchandle}
        />
       
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Sr.</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone_No</th>
            <th scope="col">Password</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{item.Name}</td>
                <td>{item.Email}</td>
                <td>{item.Phone_No}</td>
                <td>{item.Password}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
