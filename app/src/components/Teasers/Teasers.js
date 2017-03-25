import React, { Component } from 'react'
import './Teasers.css'

class Teasers extends Component {
  render() {
    return (
      <div className="teasers">
        {this.props.stories.map((story, n) => (
          <Teaser
            id={n}
            key={n}
            title={story.title}
            img={story.img}
          />
        ))}
      </div>
    )
  }
}

class Teaser extends Component {
  constructor(props) {
    super(props)
    this.select = this.select.bind(this)
  }

  select (e) {
    console.log('foo', this.props.id)
  }

  render() {
    const style = {
      backgroundImage: `url(${this.props.img})`
    }
    return (
      <div className="teaser" onClick={this.select}>
        <div className="teaser-img" style={style}></div>
        <div className="teaser-title">{this.props.title}</div>
      </div>
    )
  }
}

export default Teasers
