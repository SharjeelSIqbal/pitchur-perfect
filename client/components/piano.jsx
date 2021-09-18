import React from 'react';
import Key from './key';

export default class Piano extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.note = {
      frequency: 440
    };
  }

  render() {

    return (
        <div className="piano">
          <Key note="d"/>
          <Key note="d" />
          <Key note="d" />
          <Key note="d" />
          <Key note="d" />
          <Key note="d" />
          <Key note="d" />
          <Key note="d" />
        </div>
    );
  }
}
