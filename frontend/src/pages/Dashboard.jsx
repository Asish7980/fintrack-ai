import { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "../components/Sidebar";
import AddTransaction from "../components/AddTransaction";
import TransactionList from "../components/TransactionList";
import AIChat from "../components/AIChat";
import ThemeToggle from "../components/ThemeToggle";
import AdvancedCharts from "../components/AdvancedCharts";
import FinancialInsights from "../components/FinancialInsights";
import RecentActivity from "../components/RecentActivity";

import { motion } from "framer-motion";

function Dashboard() {

  const [activeTab, setActiveTab] =
    useState("Dashboard");

  const [transactions, setTransactions] =
    useState([]);

  const [summary, setSummary] =
    useState({
      total_income: 0,
      total_expense: 0,
      balance: 0,
    });


  // LOAD DATA
  useEffect(() => {

    fetchSummary();

    fetchTransactions();

  }, []);


  // FETCH SUMMARY
  const fetchSummary = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/analytics/summary",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSummary(response.data);

    } catch (error) {

      console.log(error);

    }

  };


  // FETCH TRANSACTIONS
  const fetchTransactions = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/transactions",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTransactions(response.data);

    } catch (error) {

      console.log(error);

    }

  };


  return (

    <div className="
      flex
      flex-col
      lg:flex-row
      bg-gray-100
      dark:bg-gray-900
      min-h-screen
    ">

      {/* SIDEBAR */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />


      {/* MAIN CONTENT */}
      <div
        className="
          w-full
          lg:ml-64
          p-4
          sm:p-6
          md:p-8
          lg:p-10
          mt-20
          lg:mt-0
        "
      >

        {/* HEADER */}
        <div
          className="
            flex
            flex-col
            sm:flex-row
            justify-between
            sm:items-center
            gap-6
            mb-10
          "
        >

          <div>

            <h1 className="
              text-3xl
              sm:text-4xl
              lg:text-5xl
              font-bold
              dark:text-white
            ">

              FinTrack Dashboard

            </h1>

            <p className="
              text-gray-500
              mt-2
            ">

              Smart AI-powered finance management

            </p>

          </div>

          <ThemeToggle />

        </div>


        {/* DASHBOARD */}
        {activeTab === "Dashboard" && (

          <>

            {/* SUMMARY CARDS */}
            <div
              className="
                grid
                grid-cols-1
                md:grid-cols-2
                xl:grid-cols-3
                gap-6
                mb-10
              "
            >

              {/* INCOME */}
              <motion.div
                whileHover={{
                  scale: 1.03,
                  y: -5,
                }}
                className="
                  relative
                  overflow-hidden
                  bg-gradient-to-br
                  from-green-400
                  to-emerald-600
                  p-8
                  rounded-[35px]
                  shadow-2xl
                  text-white
                "
              >

                <div className="
                  absolute
                  top-0
                  right-0
                  w-40
                  h-40
                  bg-white/10
                  rounded-full
                  -mr-16
                  -mt-16
                "></div>

                <div className="
                  absolute
                  bottom-0
                  left-0
                  w-28
                  h-28
                  bg-white/10
                  rounded-full
                  -ml-10
                  -mb-10
                "></div>

                <h2 className="
                  text-2xl
                  font-semibold
                  opacity-90
                ">

                  Total Income

                </h2>

                <p className="
                  text-4xl
                  sm:text-5xl
                  lg:text-6xl
                  font-bold
                  mt-6
                ">

                  ₹ {summary.total_income}

                </p>

                <p className="
                  mt-6
                  text-lg
                  opacity-90
                ">

                  Income this month

                </p>

              </motion.div>


              {/* EXPENSE */}
              <motion.div
                whileHover={{
                  scale: 1.03,
                  y: -5,
                }}
                className="
                  relative
                  overflow-hidden
                  bg-gradient-to-br
                  from-red-400
                  to-rose-600
                  p-8
                  rounded-[35px]
                  shadow-2xl
                  text-white
                "
              >

                <div className="
                  absolute
                  top-0
                  right-0
                  w-40
                  h-40
                  bg-white/10
                  rounded-full
                  -mr-16
                  -mt-16
                "></div>

                <div className="
                  absolute
                  bottom-0
                  left-0
                  w-28
                  h-28
                  bg-white/10
                  rounded-full
                  -ml-10
                  -mb-10
                "></div>

                <h2 className="
                  text-2xl
                  font-semibold
                  opacity-90
                ">

                  Total Expense

                </h2>

                <p className="
                  text-4xl
                  sm:text-5xl
                  lg:text-6xl
                  font-bold
                  mt-6
                ">

                  ₹ {summary.total_expense}

                </p>

                <p className="
                  mt-6
                  text-lg
                  opacity-90
                ">

                  Expense this month

                </p>

              </motion.div>


              {/* BALANCE */}
              <motion.div
                whileHover={{
                  scale: 1.03,
                  y: -5,
                }}
                className="
                  relative
                  overflow-hidden
                  bg-gradient-to-br
                  from-blue-400
                  to-indigo-600
                  p-8
                  rounded-[35px]
                  shadow-2xl
                  text-white
                "
              >

                <div className="
                  absolute
                  top-0
                  right-0
                  w-40
                  h-40
                  bg-white/10
                  rounded-full
                  -mr-16
                  -mt-16
                "></div>

                <div className="
                  absolute
                  bottom-0
                  left-0
                  w-28
                  h-28
                  bg-white/10
                  rounded-full
                  -ml-10
                  -mb-10
                "></div>

                <h2 className="
                  text-2xl
                  font-semibold
                  opacity-90
                ">

                  Balance

                </h2>

                <p className="
                  text-4xl
                  sm:text-5xl
                  lg:text-6xl
                  font-bold
                  mt-6
                ">

                  ₹ {summary.balance}

                </p>

                <p className="
                  mt-6
                  text-lg
                  opacity-90
                ">

                  Available balance

                </p>

              </motion.div>

            </div>


            {/* FINANCIAL INSIGHTS */}
            <FinancialInsights
              summary={summary}
            />


            {/* ADD TRANSACTION */}
            <div className="
              bg-white
              dark:bg-gray-800
              rounded-3xl
              shadow-xl
              p-8
              mb-10
            ">

              <AddTransaction
                refreshDashboard={() => {
                  fetchSummary();
                  fetchTransactions();
                }}
              />

            </div>


            {/* CHARTS + RECENT ACTIVITY */}
            <div
              className="
                grid
                grid-cols-1
                xl:grid-cols-2
                gap-8
              "
            >

              <AdvancedCharts
                summary={summary}
                transactions={transactions}
              />

              <RecentActivity
                transactions={transactions}
              />

            </div>

          </>

        )}


        {/* TRANSACTIONS */}
        {activeTab === "Transactions" && (

          <div className="
            bg-white
            dark:bg-gray-800
            rounded-3xl
            shadow-xl
            p-8
          ">

            <TransactionList />

          </div>

        )}


        {/* AI CHAT */}
        {activeTab === "AI Assistant" && (

          <AIChat />

        )}

      </div>

    </div>

  );

}

export default Dashboard;