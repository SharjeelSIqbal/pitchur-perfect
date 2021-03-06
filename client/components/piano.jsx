import React from 'react';
import Key from './key';

export default class Piano extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: ['sine', 'triangle', 'square', 'sawtooth'],
      currentType: 'sine'
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ currentType: e.target.value });
  }

  render() {
    return (
      <>
      <div>
        <select onChange={this.handleChange} value={this.state.currentType}>
          {this.state.type.map(element => {
            return (
              <option key={element} value={`${element}`}>{`${element.substring(0, 1).toUpperCase()}${element.substring(1)}`}</option>
            );
          })
          }
        </select>
      </div>
      <div className="piano-scroll row justify-center-all">
        <div className="piano row small-padding">
            {this.props.notes && this.props.notes.map(element => <Key key={element.frequency} setKey={this.props.callback} type={this.state.currentType} note={element}/>)}
        </div>
      </div>
      </>
    );
  }
}
