/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
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
              <Button variation="primary">Log transaction</Button>
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
