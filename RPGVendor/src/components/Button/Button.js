import React, { Component } from 'react';
import './Button.scss';
import PropTypes from 'prop-types';

class Button extends Component {

  static propTypes = {
    text: PropTypes.oneOfType([
      PropTypes.string,
    ]),
    onClick: PropTypes.func
  }

  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
  }

  componentDidUpdate() {
      
  }

  handleClick() {
    const {
        onClick
    } = this.props
    
    onClick && onClick()
  }

  render() {
    const {
      text
    } = this.props
    return (
      <div>
          <button onClick={this.handleClick}>{text}</button>
      </div>
    );
  }
}

export default Button;
