import React, { Component } from 'react'

class Link extends Component {
  render() {
    return (
      <div>
        <div>
          {this.props.link.description} ({this.props.link.url}) -- {this.props.link.postedBy.email} -- {this.props.link.postedBy.name}
        </div>
      </div>
    )
  }
}

export default Link