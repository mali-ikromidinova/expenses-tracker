/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { HiPencil, HiTrash } from "react-icons/hi2";
import Menus from "../Menus/Menus";
import Modal from "../Modal/Modal";
import Table from "./Table";
import CreateTransactionForm from "../Form/CreateTransaction";
import ConfirmDelete from "../ConfirmDelete/ConfirmDelete";
import { useFinances } from "../../context/FinancesContext";

export default function TableRow({ data }) {
  const { id, date, amount, category } = data;
  const { loading, deleteFinance } = useFinances();

  return (
    <Table.Row>
      <div>{date}</div>
      <div>${amount}</div>
      <div>{category}</div>

      <div>
        <Modal>
          <Menus>
            <Menus.Toggle id={id} />

            <Menus.List id={id}>
              <Modal.Open opens="edit">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>

              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>
          </Menus>

          <Modal.Window name="edit">
            <CreateTransactionForm transactionToEdit={data} />
          </Modal.Window>

          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="transactions"
              disabled={loading}
              onConfirm={() => deleteFinance(id)}
            />
          </Modal.Window>
        </Modal>
      </div>
    </Table.Row>
  );
}
