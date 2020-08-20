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
    
    // Add click outside handle
    componentDidMount() {   
        document.addEventListener('mousedown', this.handleClickOutside);
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
        // this.props.update(this.state.user.id, firstName === ""? firstName: this.state.user.first_name, lastName === "" ? lastName: this.state.user.last_name, 
        // email ==="" ? email: this.state.user.email);
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


// import React, { useRef, useEffect } from "react";

// /**
//  * Hook that alerts clicks outside of the passed ref
//  */
// function useOutsideAlerter(ref) {
//     useEffect(() => {
//         /**
//          * Alert if clicked on outside of element
//          */
//         function handleClickOutside(event) {
//             if (ref.current && !ref.current.contains(event.target)) {
//                 alert("You clicked outside of me!");
//             }
//         }

//         // Bind the event listener
//         document.addEventListener("mousedown", handleClickOutside);
//         return () => {
//             // Unbind the event listener on clean up
//             document.removeEventListener("mousedown", handleClickOutside);
//         };
//     }, [ref]);
// }

// /**
//  * Component that alerts if you click outside of it
//  */
// export default function PopUp(props) {
//     const wrapperRef = useRef(null);
//     useOutsideAlerter(wrapperRef);

//     return <div className = "pop-up-container" ref={wrapperRef}>
//     //                 <p>Pop up screen</p>
//     //             </div>;
// }
