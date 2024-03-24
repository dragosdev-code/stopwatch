import React, { useRef } from "react";
import { TouchableOpacity, StyleSheet, Animated } from "react-native";
import Icon from "react-native-vector-icons/Foundation";

type Props = {
  icon?: string;
  children?: string;
  onPress: () => void;
  iconSize?: number;
  iconColor?: string;
};

const Button: React.FC<Props> = ({
  icon,
  onPress,
  iconSize = 30,
  iconColor = "#FFFFFF",
  children,
}) => {
  const scaleValue = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.4,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
      <TouchableOpacity
        style={styles.btn}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.7} // Adjusted for better feedback
      >
        {icon && <Icon name={icon} size={iconSize} color={iconColor} />}
        {!icon && children}
      </TouchableOpacity>
    </Animated.View>
  );
};

export default Button;

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "#b317ad",
    height: 80,
    width: 80,
    borderRadius: 9999,
    alignItems: "center",
    justifyContent: "center",
  },
});
