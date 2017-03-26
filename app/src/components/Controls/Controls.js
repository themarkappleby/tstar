import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import actions from '../../actions/actions'
import './Controls.css'

class Controls extends Component {
  constructor(props) {
    super(props)
    this.allStories = this.allStories.bind(this)
    this.nextStory = this.nextStory.bind(this)
  }

  allStories () {
    this.props.selectStory(0)
  }

  nextStory () {
    this.props.selectStory(this.props.storyId + 1)
  }

  render() {
    const classes = [
      'controls',
      this.props.storyId ? 'is-active' : ''
    ].join(' ')

    return (
      <div className={classes}>
        <div className="controls-all" onClick={this.allStories}>All</div>
        <div className="controls-next" onClick={this.nextStory}>Next</div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    storyId: state.storyId
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({selectStory: actions}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Controls)
