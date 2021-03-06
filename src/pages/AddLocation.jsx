import React, { useState, useEffect } from "react";
import axios from "axios";

import AddLocationIcon from '@material-ui/icons/AddLocation';

/* Reference: https://colorlib.com/etc/regform/colorlib-regform-4/ */
function CreateUser() {
    let [location, setLocation]=useState("");
    let [locationArray]=useState([]);
    
    useEffect(()=>{
        axios.get(process.env.REACT_APP_SERVERLINK + "/locationSearchFromDatabase")
        .then((response)=>{
            response.data.forEach(element => {
                locationArray.push(element.location);
            });
            // console.log(location);
        });
    }, );

    function handleClick(event) {
        event.preventDefault();
        let user={
            location: location
        }

        axios.post( process.env.REACT_APP_SERVERLINK +  "/addLocation", user )
        .then((response)=>{
            console.log(response.data);
        });
        

        // console.log(user);
        setLocation("");
    }
    // function showAllLocation(lo){
    //     return(
    //         <div>
    //             <br/>
    //             <h2>{lo}</h2>
    //         </div>
    //     );
        
    // }

    return (
        <div className="createUser" >
            <div className="formOuter" >
                <form className="createUserForm" onSubmit={handleClick} >
                    <h2> <AddLocationIcon style={{ fontSize: 40}} /> Add Location</h2>
                    <input 
                        type="text"
                        onChange={(event)=>{
                            setLocation(event.target.value);
                        }}
                        value={location}
                        required
                    />
                    <button type="submit" >Submit</button>
                </form>
                {/* <button onClick={()=>{
                    axios.get(process.env.SERVERLINK+"/locationSearchFromDatabase")
                    .then((response)=>{
                        console.log(response.data);
                    });
                    
                }} >test</button> */}
            

                
            </div>
        </div>
    );
}

export default CreateUser;