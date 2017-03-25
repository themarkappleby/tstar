import React, { Component } from 'react'
import './Stories.css'

class Stories extends Component {
  render() {
    return (
      <div className="stories">
        {this.props.stories.map((story, n) => (
          <Story
            id={n}
            key={n}
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
    return (
      <div className="story">
        <h2 className="story-title">{this.props.title}</h2>
        <div>{this.props.html}</div>
      </div>
    )
  }
}

export default Stories
