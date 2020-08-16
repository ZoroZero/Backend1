import React, { Component } from 'react';
import axios from "axios";
import UserCard from "../UserCard/UserCard"
import './UserList.css'
import PopUp from '../PopUp/PopUp';
class UserList extends Component {
    constructor(){
        super();
        this.state = {
            hasGet: false,
            userList: [],
            rows: [],
            number_user: 0,
            seen: false
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

    togglePop = () => {
        this.setState({
          seen: !this.state.seen
        });
    };


    handleAdd = () =>{
        var firstName = document.getElementById("fname").value;
        var lastName = document.getElementById("lname").value;
        var email = document.getElementById("email").value;
        const data = {
            first_name: firstName,
            last_name: lastName,
            email: email
        }
        axios.post('https://reqres.in/api/users', {
            first_name: firstName,
            last_name: lastName,
            email: email
        })
        .then((response) => {
            console.log(response.data);
        })
        .catch(function(error) {
            console.log(error);
        });
    }

    render() { 
        return ( 
            <div >
                <div className = "add-user">
                    <button className="add-new-user-btn" onClick={this.handleAdd}>Add new user</button>
                    <label for="fname">First name:</label>
                    <input type="text" id="fname" name="fname"/>
                    <label for="lname">Last name:</label>
                    <input type="text" id="lname" name="lname"/>
                    <label for="email">Email:</label>
                    <input type="text" id="email" name="email"/>
                </div>
            {this.state.rows.map(row =>
                <div className ="Row" gutter={40}>
                    {(row).map(user => 
                        <div className ="Col"><UserCard id ={user.id} props={user} pop={this.togglePop}></UserCard></div>)}
                </div>
            )}
             {this.state.seen ? <div className="pop-up-screen"> <PopUp pop={this.togglePop} /> </div>: null}
            </div>
         );
    }
}
 
export default UserList;