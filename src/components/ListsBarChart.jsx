import { BarChart } from '@mui/x-charts/BarChart';

function ListsBarChart({ board }) {
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
            width={500}
            height={300}
          />
        </div>
      )}
    </div>
  );
}

export default ListsBarChart;
