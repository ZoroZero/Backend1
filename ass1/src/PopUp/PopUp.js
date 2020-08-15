import React, { Component } from 'react';
import './PopUp.css'

class PopUp extends Component {
    // state = {
    //     wrapperRef: React.createRef(),
    //     setWrapperRef: this.setWrapperRef.bind(this),
    //     handleClickOutside: this.handleClickOutside.bind(this);
    // };
    constructor(props) {
        super();

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
            alert('You clicked outside of me!');
        }
    }

    // handleClick = () => {
    //     this.props.pop();
    // };

    render() { 
        return ( 
            <div className = "pop-up-container" ref={this.wrapperRef}>
                <p>Pop up screen</p>
            </div>
         );
    }
}
 
export default PopUp;
