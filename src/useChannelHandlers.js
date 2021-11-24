import React, { useEffect } from 'react'
import { sendBirdSelectors, withSendBird } from 'sendbird-uikit'

const ChannelHandlers = ({sdk}) => {
  useEffect(() => {
    if (sdk && sdk.ChannelHandler) {
      const channelHandler = new sdk.ChannelHandler()
      channelHandler.onUserLeft = (...args) => {
        // console.log('onUserLeft')
        // console.log("🚀 useChannelHandlers.js channelHandler.onUserLeft, args", args)
      }

      sdk.addChannelHandler("key", channelHandler)
    }

    return () => {
      if (sdk && sdk.removeChannelHandler) {
        sdk.removeChannelHandler('key')
      }
    }
  }, [sdk])

  return <></>
}

export default withSendBird(ChannelHandlers, state => ({
  sdk: sendBirdSelectors.getSdk(state)
}))
