import React, { Component } from 'react';
import axios from "axios";

class UserList extends Component {
    constructor(){
        super();
        this.state = {
            hasGet: false,
            data: []
        };
    };

    componentDidMount = () =>{
        axios.get("https://reqres.in/api/users").then(response =>{
            console.log(response);
        })
    };

    render() { 
        return ( 
            <div>
                {/* <Button> Get user lists </Button> */}
                <h1> No user list </h1>
            </div>
         );
    }
}
 
export default UserList;