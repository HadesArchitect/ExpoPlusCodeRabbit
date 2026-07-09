import { Pressable } from "react-native";
import TestRenderer, { act } from "react-test-renderer";

jest.mock("expo-media-library", () => ({
  usePermissions: jest.fn(() => [{ granted: true }, jest.fn()]),
  saveToLibraryAsync: jest.fn(),
}));

jest.mock("expo-image-picker", () => ({
  launchImageLibraryAsync: jest.fn(),
}));

jest.mock("dom-to-image", () => ({
  __esModule: true,
  default: { toJpeg: jest.fn() },
}));

jest.mock("react-native-view-shot", () => ({
  captureRef: jest.fn(),
}));

jest.mock("react-native-gesture-handler", () => {
  const { View: RNView } = require("react-native");
  return { GestureHandlerRootView: RNView };
});

jest.mock("../../../components/Button", () => {
  const { Pressable: RNPressable, Text } = require("react-native");
  return function MockButton({ label, onPress }: any) {
    return (
      <RNPressable testID={`button-${label}`} onPress={onPress}>
        <Text>{label}</Text>
      </RNPressable>
    );
  };
});

jest.mock("../../../components/CircleButton", () => {
  const { Pressable: RNPressable, Text } = require("react-native");
  return function MockCircleButton({ onPress }: any) {
    return (
      <RNPressable testID="circle-button" onPress={onPress}>
        <Text>Add</Text>
      </RNPressable>
    );
  };
});

jest.mock("../../../components/EmojiPicker", () => {
  const { View: RNView } = require("react-native");
  return function MockEmojiPicker({ children, isVisible }: any) {
    return isVisible ? <RNView testID="emoji-picker">{children}</RNView> : null;
  };
});

jest.mock("../../../components/EmojiList", () => {
  const { Pressable: RNPressable, Text } = require("react-native");
  return function MockEmojiList({ onSelect, onCloseModal }: any) {
    return (
      <RNPressable
        testID="emoji-list-item"
        onPress={() => {
          onSelect({ uri: "fake-emoji.png" });
          onCloseModal();
        }}
      >
        <Text>emoji</Text>
      </RNPressable>
    );
  };
});

jest.mock("../../../components/EmojiSticker", () => {
  const { View: RNView, Text } = require("react-native");
  return function MockEmojiSticker({ stickerSource }: any) {
    return (
      <RNView testID="emoji-sticker">
        <Text>{JSON.stringify(stickerSource)}</Text>
      </RNView>
    );
  };
});

jest.mock("../../../components/ImageViewer", () => {
  const { View: RNView } = require("react-native");
  return function MockImageViewer() {
    return <RNView testID="image-viewer" />;
  };
});

import Index from "../index";

function findByTestID(renderer: ReturnType<typeof TestRenderer.create>, testID: string) {
  return renderer.root.findByProps({ testID });
}

function queryByTestID(
  renderer: ReturnType<typeof TestRenderer.create>,
  testID: string
) {
  const matches = renderer.root.findAllByProps({ testID });
  return matches.length > 0 ? matches[0] : null;
}

/** Reaches the "Use this photo" flow and returns the renderer with app options shown. */
function renderWithAppOptionsShown() {
  const renderer = TestRenderer.create(<Index />);
  act(() => {
    findByTestID(renderer, "button-Use this photo").props.onPress();
  });
  return renderer;
}

function getIconButtonPressable(
  renderer: ReturnType<typeof TestRenderer.create>,
  label: string
) {
  const iconButtons = renderer.root.findAllByProps({ label });
  const iconButton = iconButtons.find((instance) =>
    instance.findAllByType(Pressable).length > 0
  );
  if (!iconButton) {
    throw new Error(`Could not find IconButton with label "${label}"`);
  }
  return iconButton.findByType(Pressable);
}

function selectEmoji(renderer: ReturnType<typeof TestRenderer.create>) {
  act(() => {
    findByTestID(renderer, "circle-button").props.onPress();
  });
  act(() => {
    findByTestID(renderer, "emoji-list-item").props.onPress();
  });
}

describe("Index screen - clear sticker feature", () => {
  it("renders the Clear icon button disabled when no sticker has been picked", () => {
    const renderer = renderWithAppOptionsShown();

    const clearPressable = getIconButtonPressable(renderer, "Clear");
    expect(clearPressable.props.disabled).toBe(true);
    expect(clearPressable.props.onPress).toBeUndefined();
    expect(queryByTestID(renderer, "emoji-sticker")).toBeNull();
  });

  it("enables the Clear icon button once a sticker is picked", () => {
    const renderer = renderWithAppOptionsShown();

    selectEmoji(renderer);

    const clearPressable = getIconButtonPressable(renderer, "Clear");
    expect(clearPressable.props.disabled).toBeFalsy();
    expect(typeof clearPressable.props.onPress).toBe("function");
    expect(queryByTestID(renderer, "emoji-sticker")).not.toBeNull();
  });

  it("clears the picked sticker when the Clear icon button is pressed", () => {
    const renderer = renderWithAppOptionsShown();

    selectEmoji(renderer);
    expect(queryByTestID(renderer, "emoji-sticker")).not.toBeNull();

    act(() => {
      getIconButtonPressable(renderer, "Clear").props.onPress();
    });

    expect(queryByTestID(renderer, "emoji-sticker")).toBeNull();

    const clearPressable = getIconButtonPressable(renderer, "Clear");
    expect(clearPressable.props.disabled).toBe(true);
    expect(clearPressable.props.onPress).toBeUndefined();
  });

  it("leaves Clear inert (onPress not wired) while there is no picked sticker", () => {
    const renderer = renderWithAppOptionsShown();

    // Clear is disabled from the start, so its onPress is not wired up.
    const clearPressable = getIconButtonPressable(renderer, "Clear");
    expect(clearPressable.props.onPress).toBeUndefined();
    expect(queryByTestID(renderer, "emoji-sticker")).toBeNull();
  });

  it("allows picking a new sticker again after clearing the previous one", () => {
    const renderer = renderWithAppOptionsShown();

    selectEmoji(renderer);
    act(() => {
      getIconButtonPressable(renderer, "Clear").props.onPress();
    });
    expect(queryByTestID(renderer, "emoji-sticker")).toBeNull();

    selectEmoji(renderer);

    expect(queryByTestID(renderer, "emoji-sticker")).not.toBeNull();
    const clearPressable = getIconButtonPressable(renderer, "Clear");
    expect(clearPressable.props.disabled).toBeFalsy();
  });

  it("renders Reset and Save icon buttons as enabled regardless of the picked sticker", () => {
    const renderer = renderWithAppOptionsShown();

    const resetPressable = getIconButtonPressable(renderer, "Reset");
    const savePressable = getIconButtonPressable(renderer, "Save");

    expect(resetPressable.props.disabled).toBeUndefined();
    expect(savePressable.props.disabled).toBeUndefined();
  });
});

describe("Index screen - options row layout", () => {
  it("applies a gap between the action buttons", () => {
    const renderer = renderWithAppOptionsShown();
    const { StyleSheet } = require("react-native");

    const resetIconButton = renderer.root.findByProps({ label: "Reset" });
    const optionsRow = resetIconButton.parent as any;

    const flattened = StyleSheet.flatten(optionsRow.props.style);
    expect(flattened.gap).toBe(20);
    expect(flattened.flexDirection).toBe("row");
  });
});