import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";

import Button from "./components/Button";
import { formatTime } from "./utils";

export default function App() {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const previousTimeSpentRef = useRef<number | undefined>(undefined);
  const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const handleTimer = () => {
    if (isRunning) {
      previousTimeSpentRef.current = time;
      setTime(0);
      clearInterval(intervalRef.current);
    } else {
      const startTime = Date.now() - time;
      intervalRef.current = setInterval(() => {
        setTime(Date.now() - startTime);
      }, 50);
    }
    setIsRunning(!isRunning);
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <View style={styles.container}>
      <View>
        {previousTimeSpentRef.current && (
          <View style={styles.previousTimeContainer}>
            <Text style={styles.previousTimeLabel}>Previous:</Text>
            <Text style={styles.previousTimeText}>
              {formatTime(previousTimeSpentRef.current)}
            </Text>
          </View>
        )}
      </View>
      <View>
        <Text style={styles.timeText}>{formatTime(time)}</Text>
      </View>

      <Button onPress={handleTimer} icon={isRunning ? "stop" : "play"} />

      <StatusBar hidden />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  previousTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  previousTimeLabel: {
    marginRight: 10,
    color: "#fff",
    fontSize: 20,
  },
  previousTimeText: {
    color: "#fff",
    fontSize: 25,
  },
  timeText: {
    color: "#fff",
    fontSize: 60,
    letterSpacing: 5,
  },
});
