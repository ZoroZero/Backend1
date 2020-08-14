import React, { Component } from 'react';
class UserCard extends Component {
    constructor(props){
        super();
        this.state = {
            id: props.props.id,
            email: props.props.email,
            firstName: props.props.firstName,
            lastName: props.props.lastName,
            avatar: props.props.avatar
        };
        console.log(props)
        console.log(this.state)
    };

    render() { 
        return ( 
            <div>
                <p> {this.state.id}</p>
                <img src = {this.state.avatar}></img>
                <p>{this.state.firstName}</p>
                <p>{this.state.lastName}</p>
                <p>{this.state.email}</p>
            </div>
         );
    }
}
 
export default UserCard;