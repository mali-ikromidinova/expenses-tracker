/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createContext, useContext } from "react";
import styles from "./Table.module.css";

const TableContext = createContext();

function Table({ columns, children }) {
  return (
    <TableContext.Provider value={{ columns }}>
      <div className={styles.table} role="table">
        {children}
      </div>
    </TableContext.Provider>
  );
}

function Header({ children }) {
  const { columns } = useContext(TableContext);

  return (
    <div className={styles.tableHeader} role="row">
      {children}
    </div>
  );
}
function Row({ children }) {
  const { columns } = useContext(TableContext);

  return (
    <div className={styles.row} role="row">
      {children}
    </div>
  );
}

function Body({ data, render }) {
  if (!data.length)
    return <p className="empty">No data to show at the moment</p>;

  return <section className="body">{data.map(render)}</section>;
}

Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
// Table.Footer = Footer;

export default Table;
