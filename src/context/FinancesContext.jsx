/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createContext, useEffect, useContext, useReducer } from "react";

const API_URL = "http://localhost:9000";

const FinanceContext = createContext();

const initialState = {
  finances: [],
  isLoading: false,
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };
    case "finances/loaded":
      return {
        ...state,
        isLoading: false,
        finances: action.payload,
      };
    case "finance/created":
      return {
        ...state,
        isLoading: false,
        finances: [...state.finances, action.payload],
      };
    case "finance/edited":
      return {
        ...state,
        isLoading: false,
        finances: [...state.finances, action.payload],
      };

    case "finance/deleted":
      return {
        ...state,
        isLoading: false,
        finances: state.finances.filter(
          (finance) => finance.id !== action.payload
        ),
      };

    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      throw new Error("Unknown action type");
  }
}

function FinancesProvider({ children }) {
  const [{ finances, isLoading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    getFinances();
  }, []);

  async function getFinances() {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${API_URL}/budgetData`);
      const data = await res.json();

      dispatch({ type: "finances/loaded", payload: data });
    } catch {
      dispatch({ type: "rejected", payload: "Error in loading finances" });
      throw new Error("Finances could not be loaded");
    }
  }

  async function createFinance(financeData) {
    dispatch({ type: "loading" });
    console.log(financeData);
    try {
      const res = await fetch(`${API_URL}/budgetData/`, {
        method: "POST",
        body: JSON.stringify(financeData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log("from create", data);
      console.log("from create", finances);

      dispatch({ type: "finance/created", payload: data });
    } catch (error) {
      console.error(error);
      dispatch({ type: "rejected", payload: "Error in creating finance" });
      throw new Error("Finance is not added");
    }
  }

  async function editFinance(updatedData, id) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${API_URL}/budgetData/${id}`);
      if (!res.ok) {
        throw new Error(`Error fetching finance data: ${res.statusText}`);
      }
      const existingFinance = await res.json();

      const newFinance = { ...existingFinance, ...updatedData };

      const updateRes = await fetch(`${API_URL}/budgetData/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newFinance),
      });
      if (!updateRes.ok) {
        throw new Error(`Error updating finance data: ${updateRes.statusText}`);
      }

      const updatedFinance = await updateRes.json();

      dispatch({ type: "finance/edited", payload: updatedFinance });
    } catch (error) {
      console.error(error);
      dispatch({ type: "rejected", payload: "Error in editing finance" });
      throw new Error("Finance is not added");
    }
  }

  async function deleteFinance(id) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${API_URL}/budgetData/${id}`, {
        method: "DELETE",
      });

      dispatch({ type: "finance/deleted", payload: id });
    } catch {
      dispatch({ type: "rejected", payload: "Finance is not deleted" });
    }
  }

  return (
    <FinanceContext.Provider
      value={{
        finances,
        isLoading,
        createFinance,
        deleteFinance,
        editFinance,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
}

function useFinances() {
  const context = useContext(FinanceContext);
  if (context === undefined)
    throw new Error("Incomes context was used outside of incomes provider");
  return context;
}

export { FinancesProvider, useFinances };
