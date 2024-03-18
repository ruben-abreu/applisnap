import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import { BarChart } from '@mui/x-charts/BarChart';

function TimeChart({ board }) {
  const [seriesNb, setSeriesNb] = useState([1, 12]);
  const [itemNb, setItemNb] = useState([1, 31]);
  const [chartSeries, setChartSeries] = useState([]);

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  useEffect(() => {
    const jobCountPerDay = {};

    board.jobs.forEach(job => {
      const month = parseInt(job.date.created.slice(5, 7), 10);
      const day = parseInt(job.date.created.slice(8, 10), 10);

      if (!jobCountPerDay[month]) {
        jobCountPerDay[month] = {};
      }

      jobCountPerDay[month][day] = (jobCountPerDay[month][day] || 0) + 1;
    });

    const updatedSeries = Array.from({ length: 12 }, (_, i) => i + 1).map(
      month => {
        const data = [];
        for (let day = 1; day <= 31; day++) {
          const jobCount = jobCountPerDay[month]
            ? jobCountPerDay[month][day] || 0
            : 0;
          data.push(jobCount);
        }

        return {
          label: months[month - 1],
          data: data,
        };
      }
    );

    setChartSeries(updatedSeries);
  }, [board.jobs]);

  const handleItemNbChange = (event, newValue) => {
    setItemNb(newValue);
  };

  const handleSeriesNbChange = (event, newValue) => {
    setSeriesNb(newValue);
  };

  const valuetext = value => {
    return `${months[value - 1]}`;
  };

  const filteredSeries = chartSeries.map(s => ({
    ...s,
    data: s.data.slice(itemNb[0] - 1, itemNb[1]),
  }));

  // Generate x-axis data for the selected month range
  const xAxisData = Array.from(
    { length: itemNb[1] - itemNb[0] + 1 },
    (_, i) => i + itemNb[0]
  );

  return (
    <Box sx={{ width: '100%' }}>
      <BarChart
        xAxis={[
          {
            scaleType: 'band',
            data: xAxisData,
          },
        ]}
        height={300}
        series={filteredSeries.slice(seriesNb[0] - 1, seriesNb[1])}
        skipAnimation={false}
        margin={{
          left: 50,
          right: 50,
          top: 100,
          bottom: 50,
        }}
      />
      <Typography id="input-item-number" gutterBottom>
        Day
      </Typography>
      <Slider
        getAriaLabel={() => 'Day range'}
        value={itemNb}
        onChange={handleItemNbChange}
        valueLabelDisplay="auto"
        min={1}
        max={31}
        aria-labelledby="input-item-number"
      />
      <Typography id="input-series-number" gutterBottom>
        Month
      </Typography>
      <Slider
        getAriaLabel={() => 'Month range'}
        getAriaValueText={valuetext}
        value={seriesNb}
        onChange={handleSeriesNbChange}
        valueLabelDisplay="auto"
        min={1}
        max={12}
      />
    </Box>
  );
}

export default TimeChart;
