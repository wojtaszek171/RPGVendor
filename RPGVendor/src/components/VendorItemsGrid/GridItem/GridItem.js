import React, { Component } from 'react';
import  './GridItem.scss';
import PropTypes from 'prop-types';
import itemsIcons from '../../../icons/itemsIcons';

class GridItem extends Component {

  static propTypes = {
    itemId: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    counter: PropTypes.number
  }

  componentDidMount() {
      
  }

  componentDidUpdate() {
      
  }

  render() {
    const {
      itemId,
      counter
    } = this.props
    return (
      <div className="GridItemComponent">
        <svg className="GridItemBackground" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" ><path d="M0 0h512v512H0z" fill="url(#pattern)" fillOpacity="1"></path><g transform="translate(0,0)" ><path d={itemsIcons[itemId]} fill="#000" fillOpacity="1"></path></g></svg>
        {counter && <span className="gridItemCounter">{counter}</span>}
      </div>
    );
  }
}

export default GridItem;
