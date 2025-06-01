import React from "react";
import Box from "./Box";

interface TableProps {
  headers: string[];
  data: React.ReactNode[][];
}

const Table: React.FC<TableProps> = ({ headers, data }) => {
  return (
    <Box className="overflow-x-auto">
      <table className="w-full table-auto border-collapse ">
        <thead>
          <tr className="bg-gray-700 ">
            {headers.map((header, index) => (
              <th
                key={index}
                className="px-4 py-2 text-left text-sm font-medium text-text-dark border-b"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={headers.length}
                className="text-center py-4 text-text-dark"
              >
                No data available
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-600  border-b">
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className="px-4 py-2 text-sm text-text-dark"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </Box>
  );
};

export default Table;
