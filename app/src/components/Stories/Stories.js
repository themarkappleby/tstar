import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Stories.css'

class Stories extends Component {
  render() {
    const classes = [
      'stories',
      this.props.storyId ? 'is-active' : ''
    ].join(' ')

    return (
      <div className={classes}>
        {this.props.stories.map((story, n) => (
          <Story
            activeStory={this.props.storyId}
            id={n + 1}
            key={n + 1}
            title={story.title}
            html={story.html}
          />
        ))}
      </div>
    )
  }
}

class Story extends Component {
  render() {
    const classes = [
      'story',
      this.props.id === this.props.activeStory ? 'is-active' : ''
    ].join(' ')

    return (
      <div className={classes}>
        <h2 className="story-title">{this.props.title}</h2>
        <div dangerouslySetInnerHTML={{ __html: this.props.html }}></div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    storyId: state.storyId
  }
}

export default connect(mapStateToProps)(Stories)
