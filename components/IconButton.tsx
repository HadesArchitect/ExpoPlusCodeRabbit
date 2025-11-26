import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Pressable, StyleSheet, Text } from "react-native";

type Props = {
  icon: keyof typeof MaterialIcons.glyphMap;
  label: string;
  onPress: () => void;
  disabled?: boolean;
};

export default function IconButton({ icon, label, onPress, disabled }: Props) {
  return (
    <Pressable 
      style={styles.iconButton} 
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
    >
      <MaterialIcons name={icon} size={24} color={disabled ? "#666" : "#fff"} />
      <Text style={[styles.iconButtonLabel, disabled && styles.disabledLabel]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  iconButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  iconButtonLabel: {
    color: "#fff",
    marginTop: 12,
  },
  disabledLabel: {
    color: "#666",
  },
});
