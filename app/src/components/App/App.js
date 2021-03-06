import React, { Component } from 'react'
import Controls from '../Controls/Controls'
import Date from '../Date/Date'
import Stories from '../Stories/Stories'
import Teasers from '../Teasers/Teasers'
import { connect } from 'react-redux'
import './App.css'

class App extends Component {
  constructor (props) {
    super(props)
    window.FastClick.attach(document.body)
    this.state = {
      date: '',
      stories: []
    }
  }

  componentWillReceiveProps(nextProps) {
    document.body.classList.toggle('lock', nextProps.storyId)
  }

  componentWillMount() {
    const online = navigator.onLine
    if (online) {
      const dataURL = 'https://s3.ca-central-1.amazonaws.com/tstar.com/data.json'
      fetch(dataURL).then(response => {
        response.json().then(data => {
          this.setState(data)
          localStorage.setItem('data', JSON.stringify(data))
        })
      })
    } else {
      let data = localStorage.getItem('data')
      data = JSON.parse(data)
      this.setState(data)
    }
  }

  render() {
    return (
      <div className="app">
        <Date date={this.state.date} />
        <Teasers stories={this.state.stories} />
        <Stories stories={this.state.stories} />
        <Controls />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    storyId: state.storyId
  }
}

export default connect(mapStateToProps)(App)
