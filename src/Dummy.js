import React, { useEffect, useState } from 'react'
import { ChannelList, sendBirdSelectors, useSendbirdStateContext } from 'sendbird-uikit';

const Dummy = () => {
  const context = useSendbirdStateContext()
  const sdkInstance = sendBirdSelectors.getSdk(context)
  // const [groupChannels, setGroupChannels] = useState(null)
  // const [newMessage, setNewMessage] = useState(null)

  // const getAllAppUsers = (channelQuery) => {
  //   const query = sdkInstance.createApplicationUserListQuery()
  //   query.next(async (users, error) => {
  //     if (error) {
  //       console.error("GroupChannelListQuery Error: ", error)
  //       return []
  //     }
  //     return await retrieveChannels(channelQuery, users)
  //   })
  // }

  const retrieveChannels = useCallback(async (query) => {
    query.next((_groupChannels, error) => {
      if (error) {
        console.error("GroupChannelListQuery Error: ", error)
        return
      }
      console.log("🚀 ~ query.next ~ _groupChannels", _groupChannels)
      if (query.hasNext) {
        retrieveChannels(query)
      }
      // setGroupChannels(_groupChannels)
    })
  })

  useEffect(() => {
    if (sdkInstance && sdkInstance.GroupChannel) {

      const query = sdkInstance.GroupChannel.createMyGroupChannelListQuery();
      query.includeEmpty = true;
      retrieveChannels(query)
    }

    //   if (sdkInstance && sdkInstance.ChannelHandler) {
    //     const channelHandler = new sdkInstance.ChannelHandler()
    //     // ! Channel Event handler not working
    //     channelHandler.onMessageReceived((channel, message) => {
    //       console.log("🚀 channelHandler.onMessageReceived ~ message", message)
    //       setNewMessage(message.url)
    //     })
    //     channelHandler.onMessageDeleted((channel, message) => {
    //       console.log("🚀 channelHandler.onMessageDeleted ~ message", message)
    //     })
    //     sdkInstance.addChannelHandler('CHANNEL_HANDLER', channelHandler)
    //   }
    //   return () => {
    //     if (sdkInstance && sdkInstance.removeChannelHandler) {
    //       sdkInstance.removeChannelHandler('CHANNEL_HANDLER')
    //     }
    //   }
  }, [retrieveChannels, sdkInstance])

  return (
    <ChannelList />
  )
}

export default Dummy
