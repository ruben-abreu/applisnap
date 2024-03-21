import { useContext } from 'react';
import { ThemeContext } from '../context/theme.context';
import { BarChart } from '@mui/x-charts/BarChart';

function ListsBarChart({ board }) {
  const { width } = useContext(ThemeContext);

  const chartWidth = width * 0.6;

  return (
    <div>
      {board && board.lists && (
        <div>
          <h2 className="text-center">Applications per List</h2>
          <BarChart
            xAxis={[
              {
                scaleType: 'band',
                data: board.lists.map(list => list.listName),
                tickLabelStyle: {
                  angle: width < 600 ? -45 : 0,
                  textAnchor: width < 600 ? 'end' : 'middle',
                  fontSize: width < 600 ? '10px' : '12px',
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
