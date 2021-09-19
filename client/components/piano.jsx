import React from 'react';
import Key from './key';

export default class Piano extends React.Component {

  render() {
    return (
      <div className="piano-scroll">
        <div className="piano small-padding">
          {this.props.notes ? this.props.notes.map(element => <Key key={element.frequency} note={element}/>) : null}
        </div>
      </div>
    );
  }
}
