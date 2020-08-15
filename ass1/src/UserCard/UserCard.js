import React, { Component } from 'react';
import './UserCard.css';
import PopUp from '../PopUp/PopUp';

class UserCard extends Component {
    constructor(props){
        super();
        this.state = {
            id: props.props.id,
            email: props.props.email,
            firstName: props.props.first_name,
            lastName: props.props.last_name,
            avatar: props.props.avatar,
            seen: false
        };
        // console.log(props)
        // console.log(this.state)
    };

    togglePop = () => {
        console.log("Pop")
        this.setState({
          seen: !this.state.seen
        });
      };

    render() { 
        return ( 
            <div className = "card-container" onClick={this.togglePop}>
                <img src = {this.state.avatar} className = "avatar"></img>
                <b className = "name">{this.state.firstName + ' ' + this.state.lastName}</b>
                <p className = "email">{this.state.email}</p>
                {this.state.seen ? <div className="pop-up-screen"> <PopUp pop={this.togglePop} /> </div>: null}
            </div>
         );
    }

    
}
 
export default UserCard;