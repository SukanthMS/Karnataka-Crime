import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

/**
 * Export data array to CSV file download
 */
export const exportToCSV = (data, filename = 'Karnataka_Police_Crime_Report.csv') => {
  if (!data || data.length === 0) return;

  const csv = Papa.unparse(data);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Export data array to Excel (.xlsx) file download
 */
export const exportToExcel = (data, filename = 'Karnataka_Police_Crime_Report.xlsx') => {
  if (!data || data.length === 0) return;

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Crime Data');
  XLSX.writeFile(workbook, filename);
};

/**
 * Export element HTML to PDF document download
 */
export const exportToPDF = async (elementId, filename = 'Karnataka_Police_Crime_Report.pdf') => {
  const element = document.getElementById(elementId);
  if (!element) {
    // Generate programmatic PDF report fallback if element isn't present
    const doc = new jsPDF();
    doc.setFillColor(15, 23, 42); // #0F172A
    doc.rect(0, 0, 210, 297, 'F');

    doc.setTextColor(245, 158, 11); // #F59E0B
    doc.setFontSize(18);
    doc.text('GOVERNMENT OF KARNATAKA', 14, 20);

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.text('KARNATAKA POLICE AI CRIME REPORT', 14, 32);

    doc.setFontSize(10);
    doc.setTextColor(148, 163, 184);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 40);

    doc.save(filename);
    return;
  }

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      backgroundColor: '#0F172A',
      useCORS: true
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 210;
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(filename);
  } catch (error) {
    console.error("PDF generation failed:", error);
  }
};
