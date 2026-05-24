import {
  FaWallet,
  FaChartLine,
  FaPiggyBank
} from 'react-icons/fa';

function FinancialInsights({ summary }) {

  const income =
    Number(summary.total_income);

  const expense =
    Number(summary.total_expense);

  const balance =
    Number(summary.balance);


  // HEALTH SCORE
  let healthScore = 0;

  if (income > 0) {

    healthScore = Math.max(
      0,
      Math.min(
        100,
        Math.round(
          ((income - expense) / income) * 100
        )
      )
    );

  }


  // STATUS
  let status = '';

  let statusColor = '';

  if (healthScore >= 70) {

    status = 'Excellent';

    statusColor = 'text-green-500';

  }

  else if (healthScore >= 40) {

    status = 'Moderate';

    statusColor = 'text-yellow-500';

  }

  else {

    status = 'Needs Improvement';

    statusColor = 'text-red-500';

  }


  // SAVINGS RATE
  const savingsRate =
    income > 0
      ? Math.round(
          (balance / income) * 100
        )
      : 0;


  return (

    <div className="
      bg-white
      dark:bg-gray-800
      rounded-[35px]
      shadow-xl
      p-6
      sm:p-8
      mb-10
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

          Financial Insights

        </h2>

        <p className="
          text-gray-500
          mt-2
        ">

          Smart overview of your financial health

        </p>

      </div>


      {/* INSIGHT CARDS */}
      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-3
        gap-6
      ">

        {/* HEALTH SCORE */}
        <div className="
          bg-gradient-to-br
          from-blue-500
          to-indigo-600
          text-white
          p-6
          rounded-[30px]
          shadow-lg
          relative
          overflow-hidden
        ">

          <div className="
            absolute
            top-0
            right-0
            w-32
            h-32
            bg-white/10
            rounded-full
            -mr-10
            -mt-10
          "></div>

          <div className="
            flex
            items-center
            justify-between
          ">

            <h3 className="
              text-xl
              font-semibold
            ">

              Health Score

            </h3>

            <FaChartLine size={26} />

          </div>

          <p className="
            text-5xl
            font-bold
            mt-6
          ">

            {healthScore}

          </p>

          <p className="
            mt-4
            text-lg
          ">

            {status}

          </p>

        </div>


        {/* SAVINGS */}
        <div className="
          bg-gradient-to-br
          from-green-500
          to-emerald-600
          text-white
          p-6
          rounded-[30px]
          shadow-lg
          relative
          overflow-hidden
        ">

          <div className="
            absolute
            top-0
            right-0
            w-32
            h-32
            bg-white/10
            rounded-full
            -mr-10
            -mt-10
          "></div>

          <div className="
            flex
            items-center
            justify-between
          ">

            <h3 className="
              text-xl
              font-semibold
            ">

              Savings Rate

            </h3>

            <FaPiggyBank size={26} />

          </div>

          <p className="
            text-5xl
            font-bold
            mt-6
          ">

            {savingsRate}%

          </p>

          <p className="
            mt-4
            text-lg
          ">

            Monthly savings efficiency

          </p>

        </div>


        {/* BALANCE */}
        <div className="
          bg-gradient-to-br
          from-purple-500
          to-pink-600
          text-white
          p-6
          rounded-[30px]
          shadow-lg
          relative
          overflow-hidden
        ">

          <div className="
            absolute
            top-0
            right-0
            w-32
            h-32
            bg-white/10
            rounded-full
            -mr-10
            -mt-10
          "></div>

          <div className="
            flex
            items-center
            justify-between
          ">

            <h3 className="
              text-xl
              font-semibold
            ">

              Net Balance

            </h3>

            <FaWallet size={26} />

          </div>

          <p className="
            text-4xl
            sm:text-5xl
            font-bold
            mt-6
          ">

            ₹ {balance}

          </p>

          <p className="
            mt-4
            text-lg
          ">

            Available financial balance

          </p>

        </div>

      </div>

    </div>

  );

}

export default FinancialInsights;