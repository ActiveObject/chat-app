import React from 'react'

export default React.createClass({
  render: function () {
    return (
      <div className='new-message-view'>
        <input className='new-message-view__input' placeholder='type a message' />
      </div>
    )
  }
})