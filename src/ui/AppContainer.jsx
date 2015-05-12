import React from 'react'
import RoomList from 'app/ui/RoomList'

export default React.createClass({
  render: function () {
    return (
      <div className='app-container'>
        <div className='app-container__layer app-container__bg'></div>
        <div className='app-container__layer app-container__fg'>
          <div className='app-container__outlet'>
            <div className='app-container__sidebar'>
              <RoomList/>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
