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

  const position = useSharedValue(0);

  const tap = Gesture.Tap()
    .maxDuration(100000)
    .onStart(() => {
      position.value += 2;
    })
    .onEnd(() => {
      position.value = withSpring(0, {
        mass: 5,
        damping: 12,
        stiffness: 150,
        restDisplacementThreshold: 1,
        velocity: -1500,
      })
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: -Math.abs(position.value) }],
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
