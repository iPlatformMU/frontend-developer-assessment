import React, { Component } from 'react';

import Backdrop from '../Backdrop';
import { ModalStyle } from './style';

class Modal extends Component {

    shouldComponentUpdate ( nextProps, nextState ) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }
    
    render () {
        return (
            <>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
                <ModalStyle
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    {this.props.children}
                </ModalStyle>
            </>
        )
    }
}

export default Modal;