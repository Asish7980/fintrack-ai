import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend
} from 'recharts';

function AdvancedCharts({
  summary,
  transactions = []
}) {

  // =====================================
  // PIE DATA
  // =====================================
  const pieData = [
    {
      name: 'Income',
      value: Number(summary.total_income)
    },
    {
      name: 'Expense',
      value: Number(summary.total_expense)
    }
  ];

  const COLORS = [
    '#22c55e',
    '#ef4444'
  ];


  // =====================================
  // MONTHLY DATA
  // =====================================
  const monthlyMap = {};

  transactions.forEach((item) => {

    if (!item.created_at) return;

    const date = new Date(
      item.created_at
    );

    const month =
      date.toLocaleString('default', {
        month: 'short'
      });

    if (!monthlyMap[month]) {

      monthlyMap[month] = {
        month,
        income: 0,
        expense: 0
      };

    }

    if (item.type === 'income') {

      monthlyMap[month].income +=
        Number(item.amount);

    } else {

      monthlyMap[month].expense +=
        Number(item.amount);

    }

  });

  const lineData =
    Object.values(monthlyMap);


  return (

  <div className="
    grid
    grid-cols-1
    2xl:grid-cols-2
    gap-8
  ">

    {/* INCOME VS EXPENSE */}
    <div className="
      bg-white
      dark:bg-gray-800
      rounded-[30px]
      shadow-xl
      p-6
      sm:p-8
      border
      border-gray-200
      dark:border-gray-700
    ">

      {/* HEADER */}
      <div className="mb-8">

        <h2 className="
          text-2xl
          sm:text-3xl
          font-bold
          dark:text-white
        ">

          Income vs Expense

        </h2>

        <p className="
          text-gray-500
          mt-2
          text-sm
          sm:text-base
        ">

          Financial distribution overview

        </p>

      </div>


      {/* CHART */}
      <div className="w-full h-[320px]">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <PieChart>

            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              innerRadius={60}
              dataKey="value"
              paddingAngle={5}
            >

              {pieData.map((entry, index) => (

                <Cell
                  key={index}
                  fill={COLORS[index]}
                />

              ))}

            </Pie>

            <Tooltip />

          </PieChart>

        </ResponsiveContainer>

      </div>


      {/* LEGEND */}
      <div className="
        flex
        justify-center
        gap-8
        mt-4
      ">

        <div className="flex items-center gap-2">

          <div className="
            w-4
            h-4
            rounded-full
            bg-green-500
          "></div>

          <span className="dark:text-white">
            Income
          </span>

        </div>

        <div className="flex items-center gap-2">

          <div className="
            w-4
            h-4
            rounded-full
            bg-red-500
          "></div>

          <span className="dark:text-white">
            Expense
          </span>

        </div>

      </div>

    </div>



    {/* MONTHLY TRENDS */}
    <div className="
      bg-white
      dark:bg-gray-800
      rounded-[30px]
      shadow-xl
      p-6
      sm:p-8
      border
      border-gray-200
      dark:border-gray-700
    ">

      {/* HEADER */}
      <div className="mb-8">

        <h2 className="
          text-2xl
          sm:text-3xl
          font-bold
          dark:text-white
        ">

          Monthly Trends

        </h2>

        <p className="
          text-gray-500
          mt-2
          text-sm
          sm:text-base
        ">

          Income and expense comparison

        </p>

      </div>


      {/* CHART */}
      <div className="w-full h-[320px]">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <LineChart
            data={lineData}
          >

            <CartesianGrid
              strokeDasharray="3 3"
              opacity={0.2}
            />

            <XAxis
              dataKey="month"
              stroke="#888"
            />

            <YAxis
              stroke="#888"
            />

            <Tooltip />

            <Legend />

            <Line
              type="monotone"
              dataKey="income"
              stroke="#22c55e"
              strokeWidth={4}
              dot={{
                r: 5
              }}
              activeDot={{
                r: 8
              }}
            />

            <Line
              type="monotone"
              dataKey="expense"
              stroke="#ef4444"
              strokeWidth={4}
              dot={{
                r: 5
              }}
              activeDot={{
                r: 8
              }}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>

  </div>

);

}

export default AdvancedCharts;