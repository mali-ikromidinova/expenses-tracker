import Button from "../../components/Button/Button";
import CreateTransactionForm from "../../components/Form/CreateTransaction";
import Loader from "../../components/Loader";
import Modal from "../../components/Modal/Modal";
import Table from "../../components/Table/Table";
import TableRow from "../../components/Table/TableRow";
import { useFinances } from "../../context/FinancesContext";

export default function Expenses() {
  const { finances, isLoading } = useFinances();
  const expenses = finances.filter((item) => item.type === "expense");

  const totalExpenses = expenses.reduce(
    (totalAmount, expense) => totalAmount + expense.amount,
    0
  );

  if (isLoading) return <Loader />;

  if (!expenses.length) {
    return <div>No expenses logged yet</div>;
  }
  return (
    <div className="container">
      <Modal>
        <header className="page-header">
          <h2 className="title">Expenses</h2>
          <div className="page-header-right">
            <h4>
              Total expenses: <span>${totalExpenses}</span>
            </h4>
            <Button variation="primary">Log expense</Button>
          </div>
        </header>

        <Table>
          <Table.Header>
            <div>Date</div>
            <div>Amount</div>
            <div>Source</div>
          </Table.Header>
          <Table.Body
            data={expenses}
            render={(expense) => <TableRow data={expense} key={expense.id} />}
          />
        </Table>

        <Modal.Window name="create">
          <CreateTransactionForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}
