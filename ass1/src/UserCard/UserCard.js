import React, { Component } from 'react';
import {Button} from 'antd';
import './UserCard.css';
// import 'antd/dist/antd.css';

class UserCard extends Component {
    constructor(props){
        super(props);
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
        this.props.pop(this.state.id);
    }

    // Handle delete 
    handleDelete = () =>{
        // const data ={
        //     id: this.state.id,
        //     email: this.state.email,
        //     first_name: this.state.first_name,
        //     last_name: this.state.last_name,
        //     avatar: this.state.avatar,
        // }
        // //console.log(`https://reqres.in/api/users/` + this.state.id )
        // axios.delete(`https://reqres.in/api/users/` + this.state.id , data)
        // .then((response) => {
        //     console.log(response.data);
        // })
        // .catch(function(error) {
        //     console.log(error);
        // });
        this.props.delete(this.state.id);
    }

    // Change state if data is change by update
    componentWillReceiveProps(nextProps) {
        this.setState({ id: nextProps.props.id,
            email: nextProps.props.email,
            firstName: nextProps.props.first_name,
            lastName: nextProps.props.last_name,
            avatar: nextProps.props.avatar })
   }
    

    render() { 
        return ( 
            <div className = "card-container">
                <img src = {this.state.avatar ? this.state.avatar : "https://i0.wp.com/www.repol.copl.ulaval.ca/wp-content/uploads/2019/01/default-user-icon.jpg" } className = "avatar"></img>
                <b className = "name">{this.state.firstName + ' ' + this.state.lastName}</b>
                <p className = "email">{this.state.email}</p>
                <Button className = "edit-btn" onClick={(e) => {e.stopPropagation(); this.handleClick()}}>Edit</Button>
                <Button className ="delete-btn" onClick={(e) => {e.stopPropagation(); this.handleDelete()}}>Delete</Button>
            </div>
         );
    }

    
}
 
export default UserCard;