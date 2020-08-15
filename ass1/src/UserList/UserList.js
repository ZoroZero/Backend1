import React, { Component } from 'react';
import axios from "axios";
import UserCard from "../UserCard/UserCard"
import './UserList.css'
class UserList extends Component {
    constructor(){
        super();
        this.state = {
            hasGet: false,
            userList: [],
            rows: [],
            number_user: 0,
        };

        // axios.post('https://reqres.in/api/users',{
        //     email: "xxx@gmail.com",
        //     firstName: "An",
        //     lastName: "Duy",
        // }).then(function (response) {
        //     console.log(response);
        //   })
    };

    componentDidMount = () =>{
        axios.get("/users").then(response =>{
            if(response.data.data) {
                
                this.setState(
                    {
                        hasGet: true,
                        userList: response.data.data,
                        number_user: 0
                    }
                )
                var rows = []
                for(var i = 0; i < this.state.userList.length/4; i++){
                    rows.push(this.state.userList.slice(i*4, (i+1)*4))
                }
                this.setState({
                    rows: rows
                })
                console.log(this.state.rows)
            }
            
        })
    };

    render() { 
        return ( 
            <div >
            {this.state.rows.map(row =>
                <div className ="Row" gutter={40}>
                    {(row).map(user => 
                        <div className ="Col"><UserCard id ={user.id} props={user}></UserCard></div>)}
                </div>
            )}
            </div>
         );
    }
}
 
export default UserList;