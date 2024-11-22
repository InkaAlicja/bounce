import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
  withSpring,
  withDecay,
} from "react-native-reanimated";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import { StyleSheet, View, Text, Button } from "react-native";


const ballSize = 100;

export default function AnimatedStyleUpdateExample(props) {
  console.log("is fabric:", global._IS_FABRIC);

  const position = useSharedValue(1);

  const tap = Gesture.Tap()
    .maxDuration(100000)
    .onEnd(() => {
      console.log('tap');
      position.value = withDecay({
        velocity: -1000,
        deceleration: 0.998,
        clamp: [-1, 1],
        velocityFactor: 1,
        rubberBandEffect: true,
        rubberBandFactor: 0.6,
      })
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: position.value }],
  }));

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <GestureDetector gesture={tap}>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Animated.View
              style={[
                styles.ball,
                animatedStyle,
              ]}
            />
          </View>
          
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  ball: {
    width: ballSize, 
    height: ballSize, 
    borderRadius: ballSize / 2, 
    backgroundColor: "black", 
    margin: 30
  },
});
