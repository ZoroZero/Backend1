import React, { Component } from 'react';
import './PopUp.css'
import {Button} from 'antd'

class PopUp extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            user: props.props
        }
        this.wrapperRef= React.createRef()
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }
    
    
    componentDidMount() {  
        // Add click outside handle 
        // Set input text 
        document.addEventListener('mousedown', this.handleClickOutside);
        document.getElementById("newFName").value = this.state.user.first_name;
        document.getElementById("newLName").value = this.state.user.last_name;
        document.getElementById("newEmail").value = this.state.user.email;
        document.getElementById("newAvatar").value = this.state.user.avatar;
    }

    // Remove click outside handle
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    // Set click zone
    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    // Handle click outside
    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
            //alert('You clicked outside of me!');
            this.handleClick();
        }
    }

    // If click outside
    handleClick = () => {
        this.props.pop();
    };


    // When click update
    handleUpdateClick =() =>{
        var firstName = document.getElementById("newFName").value;
        var lastName = document.getElementById("newLName").value;
        var email = document.getElementById("newEmail").value;
        var avatar = document.getElementById("newAvatar").value;
        if(firstName === "" || lastName === "" || email === ""){
            alert("Empty field detected")
            return;
        }
 
        this.props.update(this.state.user.id, firstName, lastName, email, avatar)
        this.handleClick();
    }

    // Render component
    render() { 
        return ( 
            <div className = "pop-up-container" ref={this.wrapperRef}>
                <Button className="close" onClick = {(e) => {e.stopPropagation(); this.handleClick()}}>&times;</Button>
                
                <img  src = {this.state.user.avatar ? this.state.user.avatar : "https://i0.wp.com/www.repol.copl.ulaval.ca/wp-content/uploads/2019/01/default-user-icon.jpg"} alt="Not found"></img>
                <p>{this.state.user.first_name + ' ' + this.state.user.last_name}</p>
                <p>{this.state.user.email}</p>
                <label>First name</label><input type="text" id="newFName" name="fname" placeholder={this.state.user.first_name +""}/>
                
                <label>Last name</label><input type="text" id="newLName" name="lname"  placeholder={this.state.user.last_name+ ''}/>
                <label>Email</label><input type="text" id="newEmail" name="email"  placeholder={this.state.user.email+ ''}/>
                <label>Avatar</label><input type="text" id="newAvatar" name="avatar"  placeholder={this.state.user.avatar+ ''}/>
                <Button onClick={this.handleUpdateClick}>Update</Button>
            </div>
         );
    }
}
 
export default PopUp;

