import React, { Component } from 'react';
import axios from "axios";
import UserCard from "../UserCard/UserCard"
import './UserList.css'
import PopUp from '../PopUp/PopUp';
import {Button} from 'antd'
class UserList extends Component {
    constructor(){
        super();
        this.state = {
            hasGet: false,
            userList: [],
            rows: [],
            number_user: 0,
            seen: false,
            chosen_user_id: -1
        };
    };

    // Get user list when mount
    componentDidMount = () =>{
        axios.get("https://reqres.in/api/users").then(response =>{
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

    // toggle screen to pop up
    togglePop = (id) => {
        this.setState({
          seen: !this.state.seen,
          chosen_user_id: id
        });
    };

    // Handle add user
    handleAdd = () =>{
        var firstName = document.getElementById("fname").value;
        var lastName = document.getElementById("lname").value;
        var email = document.getElementById("email").value;
        if(firstName === "" || lastName === "" || email === ""){
            alert("Empty field");
            return;
        }
        const data = {
            first_name: firstName,
            last_name: lastName,
            email: email
        }
        axios.post('https://reqres.in/api/users', data
        )
        .then((response) => {
            if(response.data){
                console.log(response.data);
                const newUser ={
                    id: response.data.id,
                    email: response.data.email,
                    first_name: response.data.first_name,
                    last_name: response.data.last_name,
                    avatar: response.data.avatar,
                }
                console.log(this.state.rows.length)
                console.log(newUser)
                // Add new user
                var newUserList = this.state.userList;
                newUserList.push(newUser)

                // Change row
                var newRows = []
                for(var i = 0; i < this.state.userList.length/4; i++){
                    newRows.push(this.state.userList.slice(i*4, (i+1)*4))
                }
                this.setState({
                    rows: newRows
                })
                
                // Close add window
                document.getElementById("modal").style.display = "none";
            }
        })
        .catch(function(error) {
            console.log(error);
        });
    }


    // Handle update user info
    handleUpdateInfo = (id, newFirstName, newLastName, newEmail) => {
        axios.put('https://reqres.in/api/users', {
            id: id,
            first_name: newFirstName,
            last_name: newLastName,
            email: newEmail
        })
        .then((response) => {
            console.log(response.data);
            var newData = {
                id: response.data.id,
                first_name: response.data.first_name,
                last_name: response.data.last_name,
                email: response.data.email
            }
            
            // update data
            this.setState({
                userList: this.state.userList.map(user => (user.id === id ? Object.assign({}, user, newData) : user))
            });
            
            // update rows
            var newRows = []
                for(var i = 0; i < this.state.userList.length/4; i++){
                    newRows.push(this.state.userList.slice(i*4, (i+1)*4))
                }
                this.setState({
                    rows: newRows
            })
            console.log(this.state.rows)
        })
        .catch(function(error) {
            console.log(error);
        });
    }

    // Handle delete user 
    handleDeleteUser = (id) => {
        const data ={
            id: id,
        }
        axios.delete(`https://reqres.in/api/users`, data)
        .then((response) => {
            console.log(response.data);
            var newData = this.state.userList.filter(user => user.id !== id)

            this.setState({
                userList: newData
            })

            // update rows
            var newRows = []
                for(var i = 0; i < this.state.userList.length/4; i++){
                    newRows.push(this.state.userList.slice(i*4, (i+1)*4))
                }
                this.setState({
                    rows: newRows
            })
            console.log(this.state.userList)
        })
        .catch(function(error) {
            console.log(error);
        });


    }

    render() { 
        return ( 
            <div>
                <div className = "add-user">
                {/* <input type="text" id="fname" name="fname" placeholder="Firstname"/>
                <input type="text" id="lname" name="lname"  placeholder="Lastname"/>
                <input type="text" id="email" name="email"  placeholder="Email"/> */}
                
                    <Button className="add-new-user-btn" onClick = {() => {document.getElementById("modal").style.display = "block";}}><b>Add new user</b></Button>
                
                    <div id="modal" className="modal">
                        <div className="popup">
                            <Button className="close" onClick = {() => {document.getElementById("modal").style.display = "none";}}>&times;</Button>
                            <div className="content">
                                <input type="text" id="fname" name="fname" placeholder="Firstname"/>
                                <input type="text" id="lname" name="lname"  placeholder="Lastname"/>
                                <input type="text" id="email" name="email"  placeholder="Email"/>
                                <Button className="add-user-btn" onClick={this.handleAdd} href="#">Add</Button>
                            </div>
                        </div>
                    </div>
                </div> 


                <div className="user-list-container">
                {this.state.rows.map(row =>
                    <div className ="Row" gutter={40}>
                        {(row).map(user => 
                            <div className ="Col"><UserCard id ={user.id} props={user} pop={this.togglePop} delete={this.handleDeleteUser}></UserCard></div>)}
                    </div>
                )}
                {this.state.seen ? <div className="pop-up-screen"> <PopUp pop={this.togglePop} update={this.handleUpdateInfo} props={this.state.userList.find(user => user.id === this.state.chosen_user_id)}/> </div>: null}
                </div>
            </div>
         );
    }
}
 
export default UserList;