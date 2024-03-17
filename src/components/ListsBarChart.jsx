import { BarChart } from '@mui/x-charts/BarChart';

function ListsBarChart({ board }) {
  return (
    <div>
      {board && (
        <BarChart
          xAxis={[
            {
              scaleType: 'band',
              data: board.lists.map(list => list.listName),
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
          width={500}
          height={300}
        />
      )}
    </div>
  );
}

export default ListsBarChart;
