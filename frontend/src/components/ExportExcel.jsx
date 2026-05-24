import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function ExportExcel({ transactions }) {
  const exportToExcel = () => {
    if (!transactions.length) {
      alert("No transactions available");

      return;
    }

    // FORMAT DATA
    const formattedData = transactions.map((item) => ({
      Type: item.type,
      Amount: item.amount,
      Category: item.category,
      Description: item.description,
      Date: new Date(item.created_at).toLocaleDateString(),
    }));

    // CREATE WORKSHEET
    const worksheet = XLSX.utils.json_to_sheet(formattedData);

    // CREATE WORKBOOK
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");

    // GENERATE BUFFER
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    // CREATE FILE
    const fileData = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });

    saveAs(fileData, "FinTrack_Transactions.xlsx");
  };

  return (
    <button
      onClick={exportToExcel}
      className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl shadow-lg"
    >
      Export Excel
    </button>
  );
}

export default ExportExcel;
