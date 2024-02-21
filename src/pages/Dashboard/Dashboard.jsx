/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useFinances } from "../../context/FinancesContext";
import User from "../../components/User/User";
import styles from "./Dashboard.module.css";
import Modal from "../../components/Modal/Modal";
import CreateTransactionForm from "../../components/Form/CreateTransaction";
import Button from "../../components/Button/Button";

export default function Dashboard() {
  const { finances } = useFinances();
  const expenses = finances.filter((item) => item.type === "expense");
  const income = finances.filter((item) => item.type === "income");

  const totalExpenses = expenses.reduce(
    (totalAmount, expense) => totalAmount + Number(expense.amount),
    0
  );

  const totalIncomes = income.reduce(
    (totalAmount, income) => totalAmount + Number(income.amount),
    0
  );

  return (
    <div className="container">
      <Modal>
        <header className="page-header">
          <h2 className="title">Dashboard</h2>
          <div className="page-header-right">
            <User />
          </div>
        </header>

        <main className={styles.main}>
          <ExpensesLineChart />

          <div className={styles.total}>
            <p>Total expenses: ${totalExpenses}</p>
            <p>Total Income: ${totalIncomes}</p>
            <p>Your balance: ${totalIncomes - totalExpenses}</p>
            <Modal.Open opens="create">
              <Button variation="primary">Log income</Button>
            </Modal.Open>
          </div>
        </main>
        <Modal.Window name="create">
          <CreateTransactionForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

function ExpensesLineChart() {
  const { finances } = useFinances();
  const expenses = finances.filter((item) => item.type === "expense");

  console.log(expenses);
  return (
    <div>
      <LineChart
        width={800}
        height={300}
        data={expenses}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="amount"
          stroke="#ef4444"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </div>
  );
}

// function IncomePieChart() {
//   const { finances } = useFinances();

//   const income = finances.filter((item) => item.type === "income");
//   const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
//   return (
//     <PieChart width={400} height={400}>
//       <Pie
//         data={income}
//         cx="50%"
//         cy="50%"
//         labelLine={false}
//         outerRadius={80}
//         fill="#8884d8"
//         dataKey="amount"
//       >
//         {income.map((entry, index) => (
//           <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//         ))}
//       </Pie>
//     </PieChart>
//   );
// }
