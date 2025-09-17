import { ProgressChart } from 'react-native-chart-kit';
import chartConfig from './styleConfig';
import { useEffect, useState } from 'react';
import {
  runOnJS,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export default function ProgressChartComponent({
  size = 200,
  progress = 0,
  ...props
}) {
  const progressChartConfiguration = {
    hideLegend: true,
    width: size,
    height: size,
    radius: size / 2.1,
    strokeWidth: 8,
  };
  const [data, setData] = useState(0);

  const progressAnimated = useSharedValue(0);

  useEffect(() => {
    progressAnimated.value = withTiming(progress, { duration: 1500 });
  }, [progress]);

  useDerivedValue(() => {
    runOnJS(setData)(progressAnimated.value);
  }, [progressAnimated]);

  return (
    <ProgressChart
      data={[data]}
      chartConfig={chartConfig}
      {...progressChartConfiguration}
      {...props}
    />
  );
}
