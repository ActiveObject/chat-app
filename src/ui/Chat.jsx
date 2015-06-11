import IScroll from 'iscroll/build/iscroll'
import vbus from 'app/vbus'
import Conversation from 'app/ui/Conversation'
import NewMessageView from 'app/ui/NewMessageView'
import app from 'app'

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
    this.unsub = vbus.onValue(app => this.setState({ app: app }))
    this.release = app.listen(activeRoom, () => this.forceUpdate());
    this.release2 = app.listen(currentUser, () => this.forceUpdate());
  },

  componentWillUnmount: function () {
    this.unsub()
    this.release()
    this.release2()
  },

  render: function() {
    var room = app.valueOf(activeRoom);
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
    var newDb = app.add({
      tag: ':app/message',
      text: text,
      author: app.valueOf(currentUser),
      time: new Date(),
      room: app.valueOf(activeRoom).id
    });

    vbus.push(newDb);
  }
})
