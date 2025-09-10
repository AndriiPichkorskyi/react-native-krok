import {
  ImageBackground,
  StyleSheet,
  View,
  type ViewProps,
} from 'react-native';

export default function ThemedView(props: ViewProps) {
  const style123 = props.style || {};
  return (
    <ImageBackground source={require('../../assets/backgroundGlow.png')}>
      <View {...props} style={Object.assign({}, styles.container, style123)}>
        {props.children}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingHorizontal: 16,
  },
});
