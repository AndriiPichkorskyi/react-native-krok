import { ProgressChart } from 'react-native-chart-kit';
import chartConfig from './styleConfig';

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

  return (
    <ProgressChart
      data={[progress]}
      chartConfig={chartConfig}
      {...progressChartConfiguration}
      {...props}
    />
  );
}
