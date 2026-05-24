import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function ExportPDF({ transactions }) {
  const exportPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);

    doc.text("FinTrack Expense Report", 14, 20);

    const tableColumn = ["Type", "Amount", "Category", "Description", "Date"];

    const tableRows = [];

    transactions.forEach((tx) => {
      const rowData = [
        tx.type,

        `₹ ${tx.amount}`,

        tx.category,

        tx.description,

        new Date(tx.created_at).toLocaleDateString(),
      ];

      tableRows.push(rowData);
    });

    autoTable(doc, {
      head: [tableColumn],

      body: tableRows,

      startY: 30,
    });

    doc.save("FinTrack_Report.pdf");
  };

  return (
    <button
      onClick={exportPDF}
      className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl shadow-lg"
    >
      Export PDF
    </button>
  );
}

export default ExportPDF;
