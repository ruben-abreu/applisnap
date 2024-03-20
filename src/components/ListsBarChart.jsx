import { useContext } from 'react';
import { ThemeContext } from '../context/theme.context';
import { BarChart } from '@mui/x-charts/BarChart';

function ListsBarChart({ board }) {
  const { width } = useContext(ThemeContext);

  console.log('width', width);

  const chartWidth = width * 0.9;

  console.log('chartWidth', chartWidth);

  return (
    <div>
      {board && board.lists && (
        <div className="w-[90%]">
          <h2 className="text-center">Applications per List</h2>
          <BarChart
            xAxis={[
              {
                scaleType: 'band',
                data: board.lists.map(list => list.listName),
                tickLabelStyle: {
                  angle: width < 600 ? -45 : 0,
                  textAnchor: 'end',
                },
              },
            ]}
            yAxis={[
              {
                label: 'Applications',
                tickNumber: '1',
              },
            ]}
            series={[
              {
                data: board.lists.map(list => {
                  const array = [];
                  array.push(+list.jobs.length);
                  return array;
                }),
              },
            ]}
            width={chartWidth}
            height={300}
          />
        </div>
      )}
    </div>
  );
}

export default ListsBarChart;
