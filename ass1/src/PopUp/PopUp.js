import React, { Component } from 'react';
import './PopUp.css'

class PopUp extends Component {
    // state = {
    //     wrapperRef: React.createRef(),
    //     setWrapperRef: this.setWrapperRef.bind(this),
    //     handleClickOutside: this.handleClickOutside.bind(this);
    // };
    constructor(props) {
        super(props);

        this.wrapperRef= React.createRef()
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }
    
    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
            //alert('You clicked outside of me!');
            this.handleClick();
        }
    }

    handleClick = () => {
        this.props.pop();
    };

    render() { 
        return ( 
            <div className = "pop-up-container" ref={this.wrapperRef}>
                <p>Pop up screen</p>
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
