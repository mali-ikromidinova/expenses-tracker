/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */ import { useFinances } from "../../context/FinancesContext";

import FormRow from "./FormRow";
import Form from "./Form";
import Button from "../Button/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateTransactionForm({ transactionToEdit = {}, onCloseModal }) {
  const navigate = useNavigate();

  const { id: editId, ...editValues } = transactionToEdit;

  const [category, setCategory] = useState("" || editValues.category);
  const [amount, setAmount] = useState("" || editValues.amount);
  const [date, setDate] = useState("" || editValues.date);
  const [type, setType] = useState("");

  const isEditSession = Boolean(editId);
  const { loading, createFinance, editFinance } = useFinances();
  const isWorking = loading;

  const handleCheckboxChange = (e) => {
    setType(e.target.value);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("here");

    if (!amount || !date || !category) return;

    const newData = {
      id: Math.random(),
      amount,
      category,
      date,
      type,
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

      <FormRow>
        <label className="formLabel" htmlFor="type">
          Transaction Type
        </label>
        <div className="radio">
          <input
            type="radio"
            className="radio-input"
            value="expense"
            id="expense"
            name="type"
            checked={type === "expense"}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="expense">Expense</label>
        </div>
        <div className="radio">
          <input
            type="radio"
            className="radio-input"
            id="income"
            value="income"
            name="type"
            checked={type === "income"}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="income">Income</label>
        </div>
      </FormRow>

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
