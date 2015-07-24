import React from 'react'

export default React.createClass({
  render: function () {
    var { text, author } = this.props.value;

    return (
      <div className='message'>
        <div className='message__avatar'>
          <img width='40' height='40' src={author.picture} alt={author.username} />
        </div>
        <div className='message__content'>
          <div className='message__top'>
            <div className='message__author'>{author.displayName}</div>
            <div className='message__time'>2:49 pm</div>
          </div>
          <div className='message__text'>{text}</div>
        </div>
      </div>
    )
  }
})