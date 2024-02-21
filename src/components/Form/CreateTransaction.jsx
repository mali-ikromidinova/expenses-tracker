/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */ import { useFinances } from "../../context/FinancesContext";

import FormRow from "./FormRow";
import Form from "./Form";
import Button from "../Button/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateTransactionForm({ transactionToEdit = {}, onCloseModal }) {
  const navigate = useNavigate;

  const { id: editId, ...editValues } = transactionToEdit;

  const [category, setCategory] = useState("" || editValues.category);
  const [amount, setAmount] = useState("" || editValues.amount);
  const [date, setDate] = useState("" || editValues.date);
  const [type, setType] = useState("expense" || "income");

  const isEditSession = Boolean(editId);
  const { loading, createFinance, editFinance } = useFinances();
  const isWorking = loading;

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("here");

    if (!amount || !date || !category) return;

    const newData = {
      id: Math.random(),
      amount,
      category,
      date,
    };

    if (isEditSession) {
      console.log("edit");
      await editFinance(newData, editId);
      onCloseModal?.();
    }
    await createFinance(newData);
    onCloseModal?.();
    navigate("/dashboard");
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <FormRow label="Category">
        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          type="text"
          id="category"
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="Amount">
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type="number"
          id="amount"
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="Date">
        <input
          value={date}
          onChange={(e) => setDate(e.target.value)}
          type="text"
          id="date"
          disabled={isWorking}
        />
      </FormRow>

      {/* <FormRow label="type">
        <label htmlFor="income">Income</label>
        <input
          value={type}
          onChange={(e) => setDate(e.target.value)}
          type="type"
          id="income"
          disabled={isWorking}
        />
      </FormRow> */}

      <FormRow>
        <Button type="submit" disabled={isWorking} variation="secondary">
          {isEditSession ? "Edit information" : "Create new transaction"}
        </Button>
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
      </FormRow>
    </form>
  );
}

export default CreateTransactionForm;
