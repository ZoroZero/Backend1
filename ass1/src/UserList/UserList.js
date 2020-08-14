import React, { Component } from 'react';
import axios from "axios";
import UserCard from "../UserCard/UserCard"
class UserList extends Component {
    constructor(){
        super();
        this.state = {
            hasGet: false,
            data: [],
            number_user: 0
        };
    };

    componentDidMount = () =>{
        axios.get("/users").then(response =>{
            if(response.data.data) {
                this.setState(
                    {
                        hasGet: false,
                        data: response.data.data,
                        number_user: 0
                    }
                )
                console.log(this.state.data[0].avatar);
            }
            
        })
    };

    render() { 
        return ( 
            <div>
                {/* <Button> Get user lists </Button> */}
                <h1> {this.state.number_user} user </h1>
                <ul>
                    {this.state.data.map((user) => <li key ={user.id}><UserCard props={user}></UserCard></li>)}
                </ul>
            </div>
         );
    }
}
 
export default UserList;