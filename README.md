# React Native Krok App

## Demonstrating of using react-native-reanimated

<img src="src/assets/readme/demonstration.gif" alt="App demonstration showing animations in action" width="300">

### FlatList Optimization

This project showcases critical performance improvements for list rendering:

**Techniques Used:**

- `useCallback` for memoizing FlatList render functions
- `useCallback` for memoizing event handlers and callbacks

### Before vs After Optimization

| Before                                                                                      | After                                                                                     |
| ------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| <img src="src/assets/readme/before.jpeg" alt="Performance before optimization" width="200"> | <img src="src/assets/readme/after.jpeg" alt="Performance after optimization" width="200"> |
| **Issue**: Changing one item triggers re-render of entire list                              | **Solution**: Only the modified item re-renders                                           |
