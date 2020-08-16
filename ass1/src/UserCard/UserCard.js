import React, { Component } from 'react';
import axios from "axios";
import './UserCard.css';
// import 'antd/dist/antd.css';

class UserCard extends Component {
    constructor(props){
        super();
        this.state = {
            id: props.props.id,
            email: props.props.email,
            firstName: props.props.first_name,
            lastName: props.props.last_name,
            avatar: props.props.avatar,
        };
        // console.log(props)
        // console.log(this.state)
    };

    handleClick = () =>{
        this.props.pop();
    }

    handleDelete = () =>{
        const data ={
            id: this.state.id,
            email: this.state.email,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            avatar: this.state.avatar,
        }
        //console.log(`https://reqres.in/api/users/` + this.state.id )
        axios.delete(`https://reqres.in/api/users/` + this.state.id , data)
        .then((response) => {
            console.log(response.data);
        })
        .catch(function(error) {
            console.log(error);
        });
    }
    

    render() { 
        return ( 
            <div className = "card-container" onClick={this.handleClick}>
                <img src = {this.state.avatar} className = "avatar"></img>
                <b className = "name">{this.state.firstName + ' ' + this.state.lastName}</b>
                <p className = "email">{this.state.email}</p>
                <button className ="delete-btn" onClick={(e) => {e.stopPropagation(); this.handleDelete()}}>Delete</button>
            </div>
         );
    }

    
}
 
export default UserCard;