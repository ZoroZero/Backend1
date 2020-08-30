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
            userList: [],
            rows: [],
            number_user: 0,
            seen: false,
            chosen_user_id: -1
        };
    };

    // Get user list when mount
    componentDidMount = () =>{
        // Get request
        axios.get("/users").then(response =>{

            if(response.data.data) {

                // Set userlist
                this.setState(
                    {
                        userList: response.data.data,
                        number_user: 0
                    }
                )

                //Set rows
                var rows = []
                for(var i = 0; i < this.state.userList.length/4; i++){
                    rows.push(this.state.userList.slice(i*4, (i+1)*4))
                }
                this.setState({
                    rows: rows
                })
                // console.log(this.state.rows)
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
    handleAdd = (firstName, lastName, email, avatar) =>{
        // Get input
        if(firstName === "" || lastName === "" || email === ""){
            alert("Empty field");
            return;
        }
        const data = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            avatar: avatar
        }

        // Post request
        axios.post('/users', data
        )
        .then((response) => {
            if(response.data){
                // Log response
                console.log("POST request")
                console.log(response.data);
                const newUser ={
                    id: response.data.id,
                    email: response.data.email,
                    first_name: response.data.first_name,
                    last_name: response.data.last_name,
                    avatar: response.data.avatar,
                }
                // console.log(this.state.rows.length)
                // console.log(newUser)
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
                //document.getElementById("modal").style.display = "none";
            }
        })
        .catch(function(error) {
            console.log(error);
        });
    }


    // Handle update user info
    handleUpdateInfo = (id, newFirstName, newLastName, newEmail, newAvatar) => {
        // Put request
        axios.put('/users', {
            id: id,
            first_name: newFirstName,
            last_name: newLastName,
            email: newEmail,
            avatar: newAvatar
        })
        .then((response) => {
            if(response.data){
                // Log response
                console.log("Update response");
                console.log(response.data);
                // Generate new user
                // var newData = {
                //     id: response.data.id,
                //     first_name: response.data.first_name,
                //     last_name: response.data.last_name,
                //     email: response.data.email,
                //     avatar: response.data.avatar
                // }
                
                // // update data
                // this.setState({
                //     userList: this.state.userList.map(user => (user.id === id ? Object.assign({}, user, newData) : user))
                // });
                
                // // update rows
                // var newRows = []
                //     for(var i = 0; i < this.state.userList.length/4; i++){
                //         newRows.push(this.state.userList.slice(i*4, (i+1)*4))
                //     }
                //     this.setState({
                //         rows: newRows
                // })
                // console.log(this.state.rows)
            }
        })
        .catch(function(error) {
            console.log(error);
        });
    }

    // Handle delete user 
    handleDeleteUser = (id) => {

        // Delete request
        axios.delete(`/users/${id}`)
        .then((response) => {
                // Log response
                console.log("Delete response");
                console.log(response.data);

                // Update user list
                // var newData = this.state.userList.filter(user => user.id !== id)

                // this.setState({
                //     userList: newData
                // })

                // // update rows
                // var newRows = []
                //     for(var i = 0; i < this.state.userList.length/4; i++){
                //         newRows.push(this.state.userList.slice(i*4, (i+1)*4))
                //     }
                //     this.setState({
                //         rows: newRows
                // })
                // console.log(this.state.userList)
        })
        .catch(function(error) {
            console.log(error);
        });


    }

    render() { 
        return ( 
            <div>
                <div className = "add-user col-md-12">
                    {/* <Button className="add-new-user-btn" onClick = {() => {document.getElementById("modal").style.display = "block";}}><b>Add new user</b></Button> */}
                    <Button className="add-new-user-btn" onClick = {() => {this.togglePop(-1)}}><b>Add new user</b></Button>
                </div> 


                <div className="user-list-container">
                {this.state.rows.map(row =>
                    <div className ="row container-fluid mb-4" gutter={40}>
                        {(row).map(user => 
                            <div className ="col-md-3"><UserCard id ={user.id} props={user} pop={this.togglePop} delete={this.handleDeleteUser}></UserCard></div>)}
                    </div>
                )}
                {this.state.seen ? <div className="pop-up-screen"> <PopUp className="pop-up-container" pop={this.togglePop} update={this.handleUpdateInfo} add={this.handleAdd} user={this.state.chosen_user_id===-1? null: this.state.userList.find(user => user.id === this.state.chosen_user_id)}/> </div>: null}
                </div>
            </div>
         );
    }
}
 
export default UserList;