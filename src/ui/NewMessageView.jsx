import React from 'react'

export default React.createClass({
  propTypes: {
    onEnter: React.PropTypes.func
  },

  render: function () {
    return (
      <div className='new-message-view'>
        <input className='new-message-view__input' placeholder='type a message' onKeyDown={this.onKeyDown}/>
      </div>
    )
  },

  onKeyDown: function(e) {
    if (e.keyCode === 13 && e.target.value) {
      this.props.onEnter(e.target.value);
      e.target.value = ''
    }
  }
})
