import React, { useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import {
    Call, 
    StreamCall, 
    CallControlProps,
    HangUpCallButton,
    ToggleAudioPublishingButton as ToggleMic,
    ToggleVideoPublishingButton as ToggleCamera,
    useCall,
    useStreamVideoClient,
    CallContent,
    useCallStateHooks,
} from '@stream-io/video-react-native-sdk';
type Props = { goToHomeScreen: () => void; callId: string };

const CustomTopView = () => {
    const {useParticipants, useDominantSpeaker} = useCallStateHooks();
    const participants = useParticipants();
    const dominantSpeaker = useDominantSpeaker();
    return (
      <View style={styles.topContainer}>
        <Text
          ellipsizeMode="tail"
          numberOfLines={1}
          style={styles.topText}>
          Video Call between {participants.map(p => p.name).join(', ')}
        </Text>
        {dominantSpeaker?.name && (
          <Text style={styles.topText}>
            Dominant Speaker: {dominantSpeaker?.name}
          </Text>
        )}
      </View>
    );
  };

// const CustomCallControls = (props: CallControlProps) => {
//     const call = useCall();
//     return (
//       <View style={styles.customCallControlsContainer}>
//         <ToggleMic onPressHandler={call?.microphone.toggle} />
//         <ToggleCamera onPressHandler={call?.camera.toggle} />
//         <HangUpCallButton onHangupCallHandler={props.onHangupCallHandler} />
//       </View>
//     );
// };

export const CallScreen = ({ goToHomeScreen, callId }: Props) => {
    const [call, setCall] = React.useState<Call | null>(null);
    const client:any = useStreamVideoClient();

  useEffect(() => {
    const call = client.call('default', callId);
    call.join({ create: true })
      .then(() => setCall(call));
  }, [client]);

  if (!call) {
    return <Text>Joining call...</Text>;
  }
  return (
    <StreamCall call={call}>
      <View style={styles.container}>
      <Text style={styles.text}>Here we will add Video Calling UI</Text>
        <Button title="Go back" onPress={goToHomeScreen} />
        <CallContent
          onHangupCallHandler={goToHomeScreen}
        //   CallControls={CustomCallControls}
          CallTopView={CustomTopView}
        />
      </View>
    </StreamCall>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  customCallControlsContainer: {
    position: 'absolute',
    bottom: 40,
    paddingVertical: 10,
    width: '80%',
    marginHorizontal: 20,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'orange',
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 5,
    zIndex: 5,
  },
  topContainer: {
    width: '100%',
    height: 50,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topText: {
    color: 'white',
  },
});



















// import React, { useEffect } from 'react';
// import { Button, StyleSheet, Text, View } from 'react-native';
// import { Call, StreamCall, useStreamVideoClient, CallContent, 
//     CallControlProps,
//     HangUpCallButton,
//     ToggleAudioPublishingButton as ToggleMic,
//     ToggleVideoPublishingButton as ToggleCamera,
//     useCall,
// } from '@stream-io/video-react-native-sdk';
// type Props = { goToHomeScreen: () => void; callId: string };

// const CustomCallControls = (props: CallControlProps) => {
//     const call = useCall();
//     return (
//       <View style={styles.customCallControlsContainer}>
//         <ToggleMic onPressHandler={call?.microphone.toggle} />
//         <ToggleCamera onPressHandler={call?.camera.toggle} />
//         <HangUpCallButton onHangupCallHandler={props.onHangupCallHandler} />
//       </View>
//     );
//   };

// export const CallScreen = ({ goToHomeScreen, callId }: Props) => {
//     const [call, setCall] = React.useState<Call | null>(null);
//     const client: any = useStreamVideoClient();

//     useEffect(() => {
//         const call = client.call('default', callId);
//         call.join({ create: true })
//             .then(() => setCall(call));
//     }, [client]);

//     if (!call) {
//         return <Text>Joining call...</Text>;
//     }
//     return (
//         <StreamCall call={call}>
//             <View style={styles.container}>
//                 <Text style={styles.text}>Here we will add Video Calling UI</Text>
//                 <Button title="Go back" onPress={goToHomeScreen} />
//                 <CallContent
//                     onHangupCallHandler={goToHomeScreen}
//                     CallControls={CustomCallControls}
//                 />
//             </View>
//         </StreamCall>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//     },
//     text: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         marginBottom: 20,
//         textAlign: 'center',
//     },

//     customCallControlsContainer: {
//         position: 'absolute',
//         bottom: 40,
//         paddingVertical: 10,
//         width: '80%',
//         marginHorizontal: 20,
//         flexDirection: 'row',
//         alignSelf: 'center',
//         justifyContent: 'space-around',
//         backgroundColor: 'orange',
//         borderRadius: 10,
//         borderColor: 'black',
//         borderWidth: 5,
//         zIndex: 5,
//       },
// });










// import React, { useEffect } from 'react';
// import { Button, StyleSheet, Text, View } from 'react-native';
// import {Call, StreamCall, useStreamVideoClient,CallContent,} from '@stream-io/video-react-native-sdk';
// type Props = { goToHomeScreen: () => void; callId: string };

// export const CallScreen = ({ goToHomeScreen, callId }: Props) => {
//     const [call, setCall] = React.useState<Call | null>(null);
//     const client:any = useStreamVideoClient();

//   useEffect(() => {
//     const call = client.call('default', callId);
//     call.join({ create: true })
//       .then(() => setCall(call));
//   }, [client]);

//   if (!call) {
//     return <Text>Joining call...</Text>;
//   }
//   return (
//     <StreamCall call={call}>
//       <View style={styles.container}>
//       <Text style={styles.text}>Here we will add Video Calling UI</Text>
//         <Button title="Go back" onPress={goToHomeScreen} />
//         <CallContent
//           onHangupCallHandler={goToHomeScreen}
//         />
//       </View>
//     </StreamCall>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   text: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
// });
