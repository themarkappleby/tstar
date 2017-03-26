import React, { Component } from 'react'
import './Teasers.css'
import Teaser from './Teaser'

class Teasers extends Component {
  render() {
    return (
      <div className="teasers">
        {this.props.stories.map((story, n) => (
          <Teaser
            id={n + 1}
            key={n + 1}
            title={story.title}
            img={story.img}
          />
        ))}
      </div>
    )
  }
}

export default Teasers
