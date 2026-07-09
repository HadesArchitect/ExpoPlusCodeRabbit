import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Pressable, Text } from "react-native";
import TestRenderer, { act } from "react-test-renderer";

import IconButton from "../IconButton";

function getPressable(renderer: ReturnType<typeof TestRenderer.create>) {
  return renderer.root.findByType(Pressable);
}

describe("<IconButton />", () => {
  it("renders the provided label", () => {
    const renderer = TestRenderer.create(
      <IconButton icon="refresh" label="Reset" onPress={() => {}} />
    );

    const text = renderer.root.findByType(Text);
    expect(text.props.children).toBe("Reset");
  });

  it("renders the MaterialIcons icon with the provided name", () => {
    const renderer = TestRenderer.create(
      <IconButton icon="delete-outline" label="Clear" onPress={() => {}} />
    );

    const icon = renderer.root.findByType(MaterialIcons);
    expect(icon.props.name).toBe("delete-outline");
    expect(icon.props.size).toBe(24);
  });

  it("calls onPress when pressed and disabled is not set", () => {
    const onPress = jest.fn();
    const renderer = TestRenderer.create(
      <IconButton icon="save-alt" label="Save" onPress={onPress} />
    );

    const pressable = getPressable(renderer);
    expect(typeof pressable.props.onPress).toBe("function");

    act(() => {
      pressable.props.onPress();
    });

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("calls onPress when pressed and disabled is explicitly false", () => {
    const onPress = jest.fn();
    const renderer = TestRenderer.create(
      <IconButton
        icon="save-alt"
        label="Save"
        onPress={onPress}
        disabled={false}
      />
    );

    act(() => {
      getPressable(renderer).props.onPress();
    });

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("does not wire up onPress when disabled", () => {
    const onPress = jest.fn();
    const renderer = TestRenderer.create(
      <IconButton
        icon="delete-outline"
        label="Clear"
        onPress={onPress}
        disabled={true}
      />
    );

    const pressable = getPressable(renderer);
    expect(pressable.props.onPress).toBeUndefined();
    expect(onPress).not.toHaveBeenCalled();
  });

  it("passes the disabled prop through to the underlying Pressable", () => {
    const rendererEnabled = TestRenderer.create(
      <IconButton icon="refresh" label="Reset" onPress={() => {}} />
    );
    expect(getPressable(rendererEnabled).props.disabled).toBeUndefined();

    const rendererDisabled = TestRenderer.create(
      <IconButton
        icon="refresh"
        label="Reset"
        onPress={() => {}}
        disabled={true}
      />
    );
    expect(getPressable(rendererDisabled).props.disabled).toBe(true);
  });

  it("uses the enabled icon color by default", () => {
    const renderer = TestRenderer.create(
      <IconButton icon="refresh" label="Reset" onPress={() => {}} />
    );

    const icon = renderer.root.findByType(MaterialIcons);
    expect(icon.props.color).toBe("#fff");
  });

  it("uses a dimmed icon color when disabled", () => {
    const renderer = TestRenderer.create(
      <IconButton
        icon="refresh"
        label="Reset"
        onPress={() => {}}
        disabled={true}
      />
    );

    const icon = renderer.root.findByType(MaterialIcons);
    expect(icon.props.color).toBe("#666");
  });

  it("does not apply the disabled label style by default", () => {
    const renderer = TestRenderer.create(
      <IconButton icon="refresh" label="Reset" onPress={() => {}} />
    );

    const text = renderer.root.findByType(Text);
    const styleArray = [].concat(text.props.style as any);
    expect(styleArray.some((s: any) => s && s.color === "#666")).toBe(false);
  });

  it("applies the disabled label style when disabled", () => {
    const renderer = TestRenderer.create(
      <IconButton
        icon="refresh"
        label="Reset"
        onPress={() => {}}
        disabled={true}
      />
    );

    const text = renderer.root.findByType(Text);
    const styleArray = [].concat(text.props.style as any);
    expect(styleArray.some((s: any) => s && s.color === "#666")).toBe(true);
  });

  it("does not throw and stays inert when repeatedly toggled between disabled and enabled", () => {
    const onPress = jest.fn();
    const renderer = TestRenderer.create(
      <IconButton
        icon="delete-outline"
        label="Clear"
        onPress={onPress}
        disabled={true}
      />
    );

    expect(getPressable(renderer).props.onPress).toBeUndefined();

    act(() => {
      renderer.update(
        <IconButton
          icon="delete-outline"
          label="Clear"
          onPress={onPress}
          disabled={false}
        />
      );
    });

    act(() => {
      getPressable(renderer).props.onPress();
    });
    expect(onPress).toHaveBeenCalledTimes(1);

    act(() => {
      renderer.update(
        <IconButton
          icon="delete-outline"
          label="Clear"
          onPress={onPress}
          disabled={true}
        />
      );
    });

    expect(getPressable(renderer).props.onPress).toBeUndefined();
  });
});