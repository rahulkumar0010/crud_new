import React from "react";
import { Table } from "react-bootstrap";

interface Props {
  columns: { key: "string"; value: string }[];
  data: { [key: string]: any }[];
  renderObj: (key: string, value: any, data: any) => any;
  actions: any;
}

const BootstrapTable: React.FC<Props> = ({
  columns,
  data,
  renderObj,
  actions,
}) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={index}>{column.value}</th>
          ))}
          {actions && actions.length ? <th>Actions</th> : null}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((column, colIndex) => (
              <td key={colIndex}>
                {typeof row[column.key] === "object"
                  ? renderObj(column.key, row[column.key], row)
                  : // Otherwise, display the value as is
                    row[column.key]}
              </td>
            ))}
            {actions && (
              <td>
                {actions && actions.length
                  ? actions.map((action: any, actionIndex: number) => (
                      <button key={actionIndex} onClick={()=>action.onClick(row)}>
                        {action.label}
                      </button>
                    ))
                  : null}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default BootstrapTable;
