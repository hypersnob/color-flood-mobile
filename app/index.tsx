import {
  Color,
  colorMap,
  Field,
  getInitialField,
  getFinalMessage,
  updateField,
} from "@/utils";
import { useCallback, useMemo, useState } from "react";
import { View, StyleSheet, Text, Button, Pressable, Modal } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 8,
    width: "100%",
    maxWidth: 600,
    alignSelf: "center",
    paddingHorizontal: 16,
  },
  controlls: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
  },
  row: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
  },
  col: {
    flexGrow: 1,
    aspectRatio: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 10,
    backgroundColor: "white",
    padding: 16,
    rowGap: 10,
    position: "relative",
  },
});

const textColor = "rgba(0,0,0, .35)";

export default function Index() {
  const [field, setField] = useState<Field>(getInitialField());
  const [count, setCount] = useState<number>(0);
  const [isInfoVisible, setIsInfoVisible] = useState<boolean>(false);

  const isDone = useMemo(
    () => field.every((row) => row.every((color) => color === field[0][0])),
    [field]
  );

  const currentColor = field[0][0];

  const handleUpdateField = useCallback(
    (color: Color) => {
      if (currentColor === color) {
        return;
      }
      setField((field) => {
        return updateField(field, color);
      });
      setCount((count) => count + 1);
    },
    [field, currentColor]
  );

  const reset = useCallback(() => {
    setField(getInitialField());
    setCount(0);
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={[styles.container, { backgroundColor: colorMap[currentColor] }]}
      >
        <View style={[styles.controlls, { justifyContent: "space-between" }]}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              color: textColor,
            }}
          >
            {count}
          </Text>
          <Pressable onPress={reset}>
            <FontAwesome6
              name="arrow-rotate-left"
              size={24}
              color={textColor}
            />
          </Pressable>
        </View>
        <View>
          {field.map((row, y) => (
            <View key={y} style={styles.row}>
              {row.map((color, x) => (
                <Pressable
                  key={x}
                  onPress={() => handleUpdateField(color)}
                  style={[{ backgroundColor: colorMap[color] }, styles.col]}
                >
                  <View />
                </Pressable>
              ))}
            </View>
          ))}
        </View>
        <View style={[styles.controlls, { justifyContent: "flex-end" }]}>
          <Pressable onPress={() => setIsInfoVisible(!isInfoVisible)}>
            <FontAwesome6 name="circle-info" size={24} color={textColor} />
          </Pressable>
        </View>
      </SafeAreaView>
      <Modal visible={isDone} animationType="fade" transparent={true}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>{getFinalMessage(count)}</Text>
            <Button title="New game" onPress={reset} />
            <Button title="Share this game" onPress={reset} />
          </View>
        </View>
      </Modal>
      <Modal visible={isInfoVisible} animationType="slide" transparent={true}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable
              onPress={() => setIsInfoVisible(false)}
              style={{ position: "absolute", top: 8, right: 8 }}
            >
              <FontAwesome6 name="xmark" size={24} color="black" />
            </Pressable>
            <Text style={{ fontWeight: "bold" }}>Color Flood</Text>
            <Text>
              The goal of the game is to fill the entire field with one color in
              the minimum number of steps. The field is filled from the upper
              left edge. Good luck!
            </Text>
          </View>
        </View>
      </Modal>
    </SafeAreaProvider>
  );
}
