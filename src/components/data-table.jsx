/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import React, { useEffect, useMemo, useState } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import DataPagination from "./data-pagination";

export default function DataTable({ data, columns, title }) {
  const sortedColumns = React.useMemo(() => [...columns], [columns]);

  const [sortedData, setSortedData] = useState(data);

  useEffect(() => {
    setSortedData([...data]);
  }, [data]);

  const TableInstance = useTable(
    {
      data: sortedData,
      columns: sortedColumns,
      initialState: { pageSize: 5 },
    },

    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,

    setGlobalFilter,
    getTableBodyProps,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    gotoPage,
    pageCount,
    setPageSize,
    pageOptions,
    headerGroups,
    prepareRow,
    state,
  } = TableInstance;
  const { globalFilter, pageIndex, pageSize } = state;

  return (
    <div className="bg dark:bg-dark-bg shadow-lg px-5 py-8 rounded-md w-[100%] mx-auto lg:w-[100%] mb-10 border-[0.5px] border-white/10">
      <div className=" flex items-center justify-between pb-6">
        <div>
          <h2 className="text-gray-800 dark:text-white font-semibold text-xl">
            {title}
          </h2>
          {/* <span className="text-xs text-gray-600">Current cohort</span> */}
          <input
            defaultValue={globalFilter || ""}
            placeholder="Filter"
            className="border-gray-300 dark:bg-dark-tertiary dark:text-white border py-2 mt-4 rounded outline-none px-5 font-sans text-xs w-52 md:w-96"
            /* istanbul ignore next */
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
        </div>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table className="min-w-full leading-normal" {...getTableProps()}>
          <thead>
            {headerGroups?.map((headerGroup) => (
              <tr
                {...headerGroup.getHeaderGroupProps()}
                className="dark:text-white"
              >
                {headerGroup.headers.map((column) => (
                  <th
                    className={
                      column.isSorted
                        ? "sort-asc thead text-left py-[8px] px-[4px]"
                        : " thead text-left py-[8px] px-[4px]"
                    }
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page?.map((row) => {
              prepareRow(row);

              // eslint-disable-next-line operator-linebreak
              // const rowTheme =
              //   row.index % 2 !== 0
              //     ? "bg-light-bg dark:bg-dark-tertiary"
              //     : "bg-white dark:bg-dark-bg";
              return (
                <tr
                  className={
                    row?.index % 2 !== 0
                      ? "bg-light-bg dark:bg-dark-tertiary"
                      : "bg-white dark:bg-dark-bg"
                  }
                  {...row?.getRowProps()}
                >
                  {row?.cells.map((cell) => (
                    <td
                      className="data-cell py-[8px] px-[4px] dark:text-white/75"
                      {...cell?.getCellProps()}
                    >
                      {cell?.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
        <DataPagination
          pageOptions={pageOptions}
          canNextPage={canNextPage}
          gotoPage={gotoPage}
          columnLength={columns?.length}
          canPreviousPage={canPreviousPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
          previousPage={previousPage}
          nextPage={nextPage}
          pageCount={pageCount}
          pageIndex={pageIndex}
        />
      </div>
    </div>
  );
}
