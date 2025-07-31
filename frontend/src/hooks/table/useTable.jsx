import { useEffect, useRef, useState } from 'react';
import { TabulatorFull as Tabulator } from 'tabulator-tables';
import "tabulator-tables/dist/css/tabulator.min.css";
import '@styles/table.css';

function useTable({ data, columns, filter, dataToFilter, initialSortName, onSelectionChange }) {
    const tableRef = useRef(null);
    const [table, setTable] = useState(null);
    const [isTableBuilt, setIsTableBuilt] = useState(false);

    useEffect(() => {
        if (tableRef.current) {
            setTimeout(() => {
                const updatedColumns = [
                    { 
                        formatter: "rowSelection", 
                        titleFormatter: false, 
                        hozAlign: "center", 
                        headerSort: false, 
                        width: 55, 
                        cellClick: function (e, cell) {
                            cell.getRow().toggleSelect();
                        },
                        responsive: 0
                    },
                    ...columns.map((col, index) => ({
                        ...col,
                        responsive: col.responsive !== undefined ? col.responsive : index + 1,
                        minWidth: col.minWidth || 120
                    }))
                ];

                const tabulatorTable = new Tabulator(tableRef.current, {
                    data: [],
                    columns: updatedColumns,
                    layout: "fitColumns",
                    responsiveLayout: "collapse",
                    responsiveLayoutCollapseFormatter: function (data) {
                        const container = document.createElement("div");

                        for (const [key, value] of Object.entries(data)) {
                            const row = document.createElement("div");
                            const label = document.createElement("strong");
                            label.textContent = key + ": ";
                            row.appendChild(label);

                            const displayValue = 
                                value && typeof value === 'object' && 'value' in value
                                    ? value.value
                                    : typeof value === 'object'
                                        ? JSON.stringify(value)
                                        : value;

                            row.appendChild(document.createTextNode(displayValue));
                            container.appendChild(row);
                        }

                        return container;
                    },
                    pagination: true,
                    paginationSize: 6,
                    selectableRows: 1,
                    rowHeight: 46,
                    langs: {
                        "default": {
                            "pagination": {
                                "first": "Primero",
                                "prev": "Anterior",
                                "next": "Siguiente",
                                "last": "Último",
                            }
                        }
                    },
                    initialSort: [
                        { column: initialSortName, dir: "asc" }
                    ],
                });

                tabulatorTable.on("rowSelectionChanged", function(selectedData) {
                    if (onSelectionChange) {
                        onSelectionChange(selectedData);
                    }
                });

                tabulatorTable.on("tableBuilt", function() {
                    setIsTableBuilt(true);
                });

                setTable(tabulatorTable);

                return () => {
                    tabulatorTable.destroy();
                    setIsTableBuilt(false);
                    setTable(null);
                };
            }, 50); 
        }
    }, []);

    useEffect(() => {
        if (table && isTableBuilt) {
            table.replaceData(data);
            table.redraw(true); 
        }
    }, [data, table, isTableBuilt]);

    useEffect(() => {
        if (table && isTableBuilt) {
            if (filter) {
                table.setFilter(dataToFilter, "like", filter);
            } else {
                table.clearFilter();
            }
            table.redraw(true);
        }
    }, [filter, table, dataToFilter, isTableBuilt]);

    return { tableRef };
}

export default useTable;
