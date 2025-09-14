import { LineChart } from 'react-native-chart-kit';
import chartConfig from './styleConfig';

export default function LineChartComponent({
  width = 200,
  height = 192,
  data = {
    labels: ['пят', 'пон', 'вів', 'cер', 'чет', 'пят', 'суб', 'нед'],
    datasets: [
      {
        data: [50, 20, 2, 86, 71, 100],
        // color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
      },
    ],
  },
  ...props
}) {
  const progressChartConfiguration = {
    hideLegend: true,
    width: width,
    height: height,
    strokeWidth: 8,
  };

  return (
    <LineChart
      data={data}
      chartConfig={chartConfig}
      withHorizontalLabels={false}
      {...progressChartConfiguration}
      bezier
      {...props}
      style={Object.assign({}, props.style, { paddingRight: 0 })}
    />
  );
}
