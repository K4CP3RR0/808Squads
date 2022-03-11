import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './src/hooks/useCachedResources';
import useColorScheme from './src/hooks/useColorScheme';
import Navigation from './src/navigation';
import {StreamChat} from 'stream-chat';
import { useEffect, useState} from 'react';
import {OverlayProvider, Chat, ChannelList, Channel} from 'stream-chat-expo';


const API_KEY = "g6z9p96989ya";
const client = StreamChat.getInstance(API_KEY);

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [isReady, setIsReady] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState(null);
  
  const connectUser =async () => {
    await client.connectUser({
      id:'jack',
      name:'Jack',
      image:'https://i.imgur.com/fR9Jz14.png',
    },
    client.devToken("jack")
    );
    setIsReady(true)
    const channel = client.channel(
      'team',
      'general',
      { name: 'General', }
      );
      await channel.create();
      
  };

  useEffect(() => {
    connectUser();

  }, []);
  
  /*const onChannelSelect =  (channel) => {
    setSelectedChannel(channel);
  }*/
  if (!isLoadingComplete || !isReady) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        
        <OverlayProvider overlayOpacity={{
          value: 100
        }}>
        <Chat client={client}>
        {/* <Navigation colorScheme={colorScheme} /> */}

        {!selectedChannel ?  (
          <ChannelList /*onSelect={onChannelSelect}*//>
        ) : (
        <Channel channel={selectedChannel}>

        </Channel>)}

        </Chat>
        </OverlayProvider>
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
