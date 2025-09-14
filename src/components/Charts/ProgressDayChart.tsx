import { StyleSheet, View } from 'react-native';
import ProgressChartComponent from './Parts/ProgressChartComponent';
import { ThemedText } from '../ThemedText';

export default function ProgressDayChart({
  goal = 10_000,
  steps = 6162,
  style = {},
}) {
  const stepsText = steps.toLocaleString('en-US');
  const percentProgress = steps / goal;
  const percentText = (percentProgress * 100).toFixed(0);
  return (
    <View style={[styles.chartContainer, style]}>
      <ProgressChartComponent
        progress={percentProgress}
        style={styles.chartComponent}
      />
      <View style={styles.chartText}>
        <ThemedText type="h2" style={styles.chartTextValue}>
          {stepsText}
        </ThemedText>
        <ThemedText>з {goal} кроків</ThemedText>
        <ThemedText>{percentText}% завершено</ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  chartContainer: {
    height: 200,
    width: '100%',
  },
  chartComponent: {
    position: 'absolute',
    alignSelf: 'center',
  },
  chartTextValue: {
    fontSize: 32,
  },
  chartText: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
    flex: 1,
  },
});
