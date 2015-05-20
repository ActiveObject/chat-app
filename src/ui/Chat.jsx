import IScroll from 'iscroll/build/iscroll'
import vbus from 'app/vbus'
import Message from 'app/values/Message'
import Conversation from 'app/ui/Conversation'
import NewMessageView from 'app/ui/NewMessageView'

var ScrollLayer = React.createClass({
  componentDidMount: function() {
    this.scroll = new IScroll(this.refs.view.getDOMNode(), {
      mouseWheel: true,
      scrollX: false
    })
  },

  componentDidUpdate: function () {
    this.scroll.refresh()
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
  },

  componentWillUnmount: function () {
    this.unsub()
  },

  render: function() {
    var messages = this.state && this.state.app ? this.state.app.rooms[0].history : []

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
    var msg = new Message({
      text: text,
      author: this.state.app.user,
      time: new Date()
    })

    var rooms = this.state.app.rooms.slice(1)

    rooms.unshift(this.state.app.rooms[0].addMessage(msg))

    vbus.push({ user: this.state.app.user, rooms: rooms })
  }
})
