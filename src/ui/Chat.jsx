import IScroll from 'iscroll/build/iscroll'
import Conversation from 'app/ui/Conversation'
import NewMessageView from 'app/ui/NewMessageView'
import app from 'app'
import { add, addWatch, valueOf } from 'app/core/IdentityStore'
import { push } from 'app/core/Runtime'

import currentUser from 'app/identities/currentUser'
import activeRoom from 'app/identities/activeRoom'

var ScrollLayer = React.createClass({
  componentDidMount: function() {
    this.scroll = new IScroll(this.refs.view.getDOMNode(), {
      mouseWheel: true,
      scrollX: false
    })
  },

  componentDidUpdate: function () {
    this.scroll.refresh()

    var lastMsg = this.refs.view.getDOMNode().querySelector('.message:last-child')

    if (lastMsg) {
      this.scroll.scrollToElement(lastMsg, 200, null, null, IScroll.utils.ease.quadratic)
    }
  },

  render: function() {
    return (
      <div className='scroll-wrapper' ref='view'>
        <div className='scroll-body'>{this.props.children}</div>
      </div>
    )
  }
})


export default React.createClass({
  componentWillMount: function () {
    this.release = addWatch(app, activeRoom, () => this.forceUpdate());
    this.release2 = addWatch(app, currentUser, () => this.forceUpdate());
  },

  componentWillUnmount: function () {
    this.release()
    this.release2()
  },

  render: function() {
    var room = valueOf(app, activeRoom);
    var messages = room ? room.history : [];

    return (
      <div className='app-container__content'>
        <div className='app-container__content-header'></div>

        <div className='app-container__content-body'>
          <ScrollLayer>
            <Conversation messages={messages} />
          </ScrollLayer>
        </div>

        <div className='app-container__content-footer'>
          <NewMessageView onEnter={this.sendMessage} />
        </div>
      </div>
    )
  },

  sendMessage: function(text) {
    var newDb = add(app, {
      tag: ':app/message',
      text: text,
      author: valueOf(app, currentUser),
      time: new Date(),
      room: valueOf(app, activeRoom).id
    })

    push(app, newDb)
  }
})
