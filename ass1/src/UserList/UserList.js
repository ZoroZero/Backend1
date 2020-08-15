import React, { Component } from 'react';
import axios from "axios";
import UserCard from "../UserCard/UserCard"
import './UserList.css'
class UserList extends Component {
    constructor(){
        super();
        this.state = {
            hasGet: false,
            data: [],
            number_user: 0
        };

        axios.post('https://reqres.in/api/users',{
            email: "xxx@gmail.com",
            firstName: "An",
            lastName: "Duy",
        }).then(function (response) {
            console.log(response);
          })
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
            <div >
                {/* <Button> Get user lists </Button> */}
                <h1> {this.state.number_user} user </h1>
                <ul className ="list-container" style={{flex: 1, flexDirection: 'row', width: '100%'}} >
                    {this.state.data.map((user) => <UserCard id ={user.id} props={user}></UserCard>)}
                </ul>
            </div>
         );
    }
}
 
export default UserList;