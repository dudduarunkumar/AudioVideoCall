import React, {useMemo, useState} from 'react';
import {
  StreamVideo,
  StreamVideoClient,
} from '@stream-io/video-react-native-sdk';
import { SafeAreaView, StyleSheet } from 'react-native';
import { HomeScreen } from './src/HomeScreen';
import { CallScreen } from './src/CallScreen';

const apiKey = 'mmhfdzb5evj2'; 
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiRGFzaF9SZW5kYXIiLCJpc3MiOiJodHRwczovL3Byb250by5nZXRzdHJlYW0uaW8iLCJzdWIiOiJ1c2VyL0Rhc2hfUmVuZGFyIiwiaWF0IjoxNzA5MTA2OTI1LCJleHAiOjE3MDk3MTE3MzB9.YSfkc5SHTNZ1cz_ZmCabuNj7-vZBUYAm-9Zk1s7xEvc'; 
const userId = 'Dash_Rendar'; 
const callId = 'sh8j6K0QHAOy'; 

const user = {
  id: userId,
  name: 'Arun Kumar',
  image: `https://getstream.io/random_png/?id=${userId}&name=John+Malkovich`,
};
const client = new StreamVideoClient({ apiKey, user, token });

export default function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const goToCallScreen = () => setActiveScreen('call-screen');
  const goToHomeScreen = () => setActiveScreen('home');

  const theme = useMemo(
    () => ({
      callControlsButton: {
        container: {
          borderRadius: 10,
        },
      },
      hangupCallButton: {
        container: {
          backgroundColor: 'red',
        },
      },
      toggleAudioPublishingButton: {
        container: {
          backgroundColor: 'green',
        },
      },
    }),
    [],
  );

  return (
    <StreamVideo client={client} style={theme}>
      <SafeAreaView style={styles.container}>
        {activeScreen === 'call-screen' ? (
          <CallScreen goToHomeScreen={goToHomeScreen} callId={callId} />
        ) : (
          <HomeScreen goToCallScreen={goToCallScreen} />
        )}
      </SafeAreaView>
    </StreamVideo>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
  },
});
