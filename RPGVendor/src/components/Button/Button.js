import React, { Component } from 'react'
import './Button.scss'
import PropTypes from 'prop-types'

class Button extends Component {

  static propTypes = {
    text: PropTypes.oneOfType([
      PropTypes.string,
    ]),
    additionalStyle: PropTypes.object,
    onClick: PropTypes.func
  }

  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    const {
      onClick
    } = this.props
    
    onClick && onClick()
  }

  render() {
    const {
      text,
      additionalStyle
    } = this.props
    return (
      <button style={additionalStyle ? additionalStyle : undefined} className="descriptionButton" onClick={this.handleClick}>
          {text}
      </button>
    );
  }
}

export default Button;
