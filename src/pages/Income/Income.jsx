import Button from "../../components/Button/Button";
import CreateTransactionForm from "../../components/Form/CreateTransaction";
import Loader from "../../components/Loader";
import Modal from "../../components/Modal/Modal";
import Table from "../../components/Table/Table";
import TableRow from "../../components/Table/TableRow";
import { useFinances } from "../../context/FinancesContext";

export default function Income() {
  const { finances, isLoading } = useFinances();
  const incomes = finances.filter((item) => item.type === "income");

  const totalIncomes = incomes.reduce(
    (totalAmount, income) => totalAmount + Number(income.amount),
    0
  );

  if (isLoading) return <Loader />;

  if (!incomes.length) {
    return <div>No incomes logged yet</div>;
  }

  return (
    <div className="container">
      <Modal>
        <header className="page-header">
          <h2 className="title">Incomes</h2>
          <div className="page-header-right">
            <h4>
              Total income: <span>${totalIncomes}</span>
            </h4>
            <Modal.Open opens="create">
              <Button variation="primary">Log income</Button>
            </Modal.Open>
          </div>
        </header>
        <Table>
          <Table.Header>
            <div>Date</div>
            <div>Amount</div>
            <div>Source</div>
            <div></div>
          </Table.Header>
          <Table.Body
            data={incomes}
            render={(income) => <TableRow data={income} key={income.id} />}
          />
        </Table>

        <Modal.Window name="create">
          <CreateTransactionForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}
