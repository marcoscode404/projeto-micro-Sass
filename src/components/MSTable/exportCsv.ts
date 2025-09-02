export default {
  header(data: any, excludeColumns?: any, exclude?: any) {
    if (exclude == null)
      return data.map((column: any) => `"${column.title}"`).join(";");
    else {
      let columnHeader: any = [];
      data.map((column: any) => {
        if (!excludeColumns.includes(column.key)) {
          columnHeader.push(`"${column.title}"`);
        }
      });
      return columnHeader;
    }
  },
  rows(data: any, dataColum: any, excludeColumns?: any, exclude?: any) {
    return data.map((row: any) => {
      if (exclude == null) {
        const columns: any = dataColum
          .map((col: any) => {
            if (typeof row[col.key] == "number") {
              return `"${row[col.key].toLocaleString("pt-BR")}"`;
            }

            if (typeof row[col.key] == "object") {
              return `"${col.transform(row) ?? ""}"`;
            }

            return `"${row[col.key] ?? ""}"`;
          })
          .join(";");

        return columns;
      } else {
        const columns: any = [];
        dataColum.map((col: any) => {
          if (!excludeColumns.includes(col.key)) {
            if (typeof row[col.key] == "number") {
              return columns.push(`"${row[col.key].toLocaleString("pt-BR")}"`);
            }

            if (typeof row[col.key] == "object") {
              return columns.push(`"${col.transform(row) ?? ""}"`);
            }
            return columns.push(`"${row[col.key] ?? ""}"`);
          }
        });
        return columns
      }
    });
  },
  exportDataToCsv(
    itemHeader: any,
    itemRow: any,
    nameFile: string = "export_data",
    withHeader: boolean = true,
    options?: {
      excludeColumns?: string[];
    },
    exclude?: boolean
  ) {
    const header = this.header(itemHeader, options?.excludeColumns, exclude);

    let rows = this.rows(itemRow, itemHeader, options?.excludeColumns, exclude);
    if (withHeader) {
      rows = [header, ...rows];
    }
    const csv = rows.join("\n");
    const blob = new Blob([csv], { type: "text/csv; charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${nameFile}.csv`);
    link.click();
  },
};
