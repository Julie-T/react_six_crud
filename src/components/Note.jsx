import PropTypes from 'prop-types'
import React, { Component } from 'react'
import HighlightOff from '@material-ui/icons/Close';

export class Note extends Component {
  static propTypes = {
    content: PropTypes.string,
    id: PropTypes.number,
    deleteNote: PropTypes.func,
  }

  render() {
    return (
      <div>
        <div>{this.props.content}</div>
        <HighlightOff onClick={(e) => this.props.deleteNote(e, this.props.id)}/>
      </div>
    )
  }
}

export default Note