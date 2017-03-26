import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import actions from '../../actions/actions'

class Teaser extends Component {
  constructor(props) {
    super(props)
    this.select = this.select.bind(this)
  }

  select (e) {
    this.props.selectStory(this.props.id)
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

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({selectStory: actions}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Teaser)
