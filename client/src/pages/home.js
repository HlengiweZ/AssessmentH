import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import "./home.css";
import {toast, ToastContainer} from "react-toastify";
import axios from 'axios';


const Home = () => {
    const [data, setData]= useState([]);


    useEffect (() =>{
        (async() => {
            const response = await axios.get("http://localhost:5000/api/get");
            setData (response.data);
        })();

    }, []);
    return (
        <div style={{marginTop: "150px"}}>
            <table className= "styled-table">
                <thead>
                    <tr>
                        <th style ={{textAlign: "center"}}>CityID </th>
                        <th style ={{textAlign: "center"}}>SerialNumber</th>
                        <th style ={{textAlign: "center"}}>Description</th>
                        <th style ={{textAlign: "center"}}>SmartWeatherEnabled</th>
                        <th style ={{textAlign: "center"}}>Latitude</th>
                        <th style ={{textAlign: "center"}}>Longitude</th>
                        <th style ={{textAlign: "center"}}>Action</th>

                    </tr>

                </thead>
                <tbody>
                    {data.map((item, index) => {
                        return (
                            <tr key={item.id}>
                                <th scope="row">{index +1}</th>
                                <td>{item.CityID}</td>
                                <td>{item.SerialNumber}</td>
                                <td>{item.Description}</td>
                                <td>{item.Latitude}</td>
                                <td>{item.Longitude}</td>
                                <td>
                                    <Link to={'/update/ ${item.id}'}>
                                    <button className="btn btn-edit">Edit</button>
                                    </Link>
                                    <button className="btn btn-delete">Delete</button>
                                    <Link to={'/update/ ${item.id}'}>
                                    <button className="btn btn-view">view</button>
                                    </Link>
                                </td>


                            </tr>

                        )
                    })}

                </tbody>

            </table>
        </div>
    )
}

export default Home;