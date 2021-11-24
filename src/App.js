import React, { useState, useEffect, useMemo } from 'react';
import './App.css';

import {
  // App as SendbirdApp,
  Channel,
  ChannelList,
  ChannelSettings,
  SendBirdProvider,
  // sendBirdSelectors,
  // useSendbirdStateContext,
} from 'sendbird-uikit';
import 'sendbird-uikit/dist/index.css';
import ChannelHandlers from './useChannelHandlers';

// const chatItem = ({message, onUpdateMessage, onDeleteMessage, channel}) => {
//   console.log("🚀 ~ file: App.js ~ line 13 ~ chatItem ~ message", message)
//   return message.message
// }

function App() {
  const [currentChannel, setCurrentChannel] = useState(null);
  const [showChannelSettings, setShowChannelSettings] = useState(false);
  // const [sdk, setSdk] = useState(null);
  // const context = useSendbirdStateContext()


  const onChannelSelect = channel => {
      console.log("🚀 onChannelSelect")
      setCurrentChannel(channel)
  }

  // useEffect(() => {
  //   if (context) {
  //     const sdk = sendBirdSelectors.getSdk(context)
  // }, [context])

  const defaultQueries = {
		channelListQuery: {
      includeEmpty: true,
    }
	}
  const [queries, setQueries] = useState(defaultQueries);

  const leaveChannel = () => {
    currentChannel.leave(function(response, error) {
      if (error) {
        console.error("currentChannel.leave ~ error", error)
        // Handle error.
      } else {
        setQueries(defaultQueries)
      }
    });
  }

  const LeaveButton = () => (
    <button
      className="leave-button sendbird-button sendbird-button--primary sendbird-button--big"
      onClick={leaveChannel}
    >
      <span
        className="sendbird-button__text sendbird-label sendbird-label--button-1 sendbird-label--color-oncontent-1"
      >Leave channel
      </span>
    </button>
  )

  return (
    <div className="App">
      {/* <SendbirdApp
        appId={process.env.APP_ID}
        userId="sendbird"
        nickname="sendbird"
      >
      </SendbirdApp> */}
      <SendBirdProvider
        appId={process.env.APP_ID}
        userId={process.env.USER_ID}
        // accessToken={process.env.USER_ACCESS_TOKEN}
        // nickname={process.env.USER_ID}
        // profileUrl={"http://dreamvilla.life/wp-content/uploads/2017/07/dummy-profile-pic.png"}
        allowProfileEdit={true}
      >
        <ChannelHandlers />
        <ChannelList
          onChannelSelect={onChannelSelect}
          queries={queries}
        />
        <Channel
          // renderChatItem={chatItem}
          onChatHeaderActionClick={() => setShowChannelSettings(!showChannelSettings)}
          channelUrl={currentChannel?.url}
        />
        {showChannelSettings &&
          <ChannelSettings
            onCloseClick={() => setShowChannelSettings(!showChannelSettings)}
            channelUrl={currentChannel.url}
          />
        }
        {currentChannel && <LeaveButton />}
      </SendBirdProvider>
    </div>
  );
}

export default App;
