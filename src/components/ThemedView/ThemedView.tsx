import {
  ImageBackground,
  StyleSheet,
  View,
  type ViewProps,
} from 'react-native';

export default function ThemedView(props: ViewProps) {
  const propStyle = props.style || {};
  return (
    <ImageBackground source={require('../../assets/backgroundGlow.png')}>
      <View {...props} style={Object.assign({}, styles.container, propStyle)}>
        {props.children}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 64,
    paddingHorizontal: 16,
  },
});
