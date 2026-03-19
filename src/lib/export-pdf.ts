"use client";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import type { ChurchExportData, ChurchExportEntry } from "@/actions/dashboard";

function renderChurchPage(doc: jsPDF, entry: ChurchExportEntry) {
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 14;
  let y = 16;

  // Title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.text(entry.eventName.toUpperCase(), pageWidth / 2, y, {
    align: "center",
  });
  y += 10;

  // Division + Coordinator row
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.text("DIVISION: ", margin, y);
  doc.setFont("helvetica", "normal");
  doc.text(entry.division, margin + 26, y);

  doc.setFont("helvetica", "bold");
  doc.text("DIVISION FY COOR.: ", pageWidth / 2, y);
  doc.setFont("helvetica", "normal");
  doc.text(entry.divisionCoordinator, pageWidth / 2 + 40, y);
  y += 6;

  // Church + Pastor row
  doc.setFont("helvetica", "bold");
  doc.text("CHURCH: ", margin, y);
  doc.setFont("helvetica", "normal");
  doc.text(entry.church, margin + 22, y);

  doc.setFont("helvetica", "bold");
  doc.text("HOST PASTOR: ", pageWidth / 2, y);
  doc.setFont("helvetica", "normal");
  doc.text(entry.hostPastor, pageWidth / 2 + 32, y);
  y += 8;

  // CAMPERS section
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(204, 0, 0);
  doc.text("CAMPERS", margin, y);
  y += 5;

  doc.text(`PRE-REGISTRATION FEE: `, margin, y);
  doc.setTextColor(0, 0, 0);
  doc.setFont("helvetica", "normal");
  doc.text(`${entry.preRegistrationFee.toLocaleString()}`, margin + 45, y);
  y += 5;

  doc.setFont("helvetica", "bold");
  doc.setTextColor(204, 0, 0);
  doc.text(`ONSITE REGISTRATION FEE: `, margin, y);
  doc.setTextColor(0, 0, 0);
  doc.setFont("helvetica", "normal");
  doc.text(`${entry.onsiteRegistrationFee.toLocaleString()}`, margin + 52, y);
  y += 4;

  // Campers table
  const maxCamperRows = Math.max(entry.campers.length, 20);
  const camperData: string[][] = [];

  for (let i = 0; i < maxCamperRows; i++) {
    const c = entry.campers[i];
    camperData.push([
      `${i + 1}`,
      c?.name || "",
      c?.nickname || "",
      c ? `${c.age}` : "",
      c?.gender === "MALE" ? "/" : "",
      c?.gender === "FEMALE" ? "/" : "",
      c?.isPreRegistration ? "/" : "",
      c && !c.isPreRegistration ? "/" : "",
    ]);
  }

  autoTable(doc, {
    startY: y,
    margin: { left: margin, right: margin },
    head: [
      [
        "NO.",
        "NAME",
        "NICKNAME\n(FOR ID)",
        "AGE",
        "MALE",
        "FEMALE",
        "PRE-\nREG (/)",
        "ONSITE-\nREG (/)",
      ],
    ],
    body: camperData,
    theme: "grid",
    styles: {
      fontSize: 7,
      cellPadding: 1.5,
      lineColor: [0, 0, 0],
      lineWidth: 0.2,
      textColor: [0, 0, 0],
      font: "helvetica",
      valign: "middle",
    },
    headStyles: {
      fillColor: [255, 255, 255],
      textColor: [0, 0, 0],
      fontStyle: "bold",
      halign: "center",
      fontSize: 7,
    },
    columnStyles: {
      0: { halign: "center", cellWidth: 10 },
      1: { cellWidth: "auto" },
      2: { cellWidth: 28 },
      3: { halign: "center", cellWidth: 12 },
      4: { halign: "center", cellWidth: 14 },
      5: { halign: "center", cellWidth: 16 },
      6: { halign: "center", cellWidth: 18 },
      7: { halign: "center", cellWidth: 18 },
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  y = (doc as any).lastAutoTable.finalY + 8;

  // COOK section
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(204, 0, 0);
  doc.text("COOK", margin, y);
  y += 5;

  doc.text(`REGISTRATION FEE: `, margin, y);
  doc.setTextColor(0, 0, 0);
  doc.setFont("helvetica", "normal");
  doc.text(`${entry.cookRegistrationFee.toLocaleString()}`, margin + 38, y);
  y += 4;

  // Cooks table
  const maxCookRows = Math.max(entry.cooks.length, 4);
  const cookData: string[][] = [];

  for (let i = 0; i < maxCookRows; i++) {
    const c = entry.cooks[i];
    cookData.push([
      `${i + 1}`,
      c?.name || "",
      c?.nickname || "",
      c ? `${c.age}` : "",
      c?.gender === "MALE" ? "/" : "",
      c?.gender === "FEMALE" ? "/" : "",
    ]);
  }

  autoTable(doc, {
    startY: y,
    margin: { left: margin, right: margin },
    head: [["NO.", "NAME", "NICKNAME\n(FOR ID)", "AGE", "MALE", "FEMALE"]],
    body: cookData,
    theme: "grid",
    styles: {
      fontSize: 7,
      cellPadding: 1.5,
      lineColor: [0, 0, 0],
      lineWidth: 0.2,
      textColor: [0, 0, 0],
      font: "helvetica",
      valign: "middle",
    },
    headStyles: {
      fillColor: [255, 255, 255],
      textColor: [0, 0, 0],
      fontStyle: "bold",
      halign: "center",
      fontSize: 7,
    },
    columnStyles: {
      0: { halign: "center", cellWidth: 10 },
      1: { cellWidth: "auto" },
      2: { cellWidth: 30 },
      3: { halign: "center", cellWidth: 14 },
      4: { halign: "center", cellWidth: 16 },
      5: { halign: "center", cellWidth: 18 },
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  y = (doc as any).lastAutoTable.finalY + 10;

  // Totals
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(204, 0, 0);
  doc.text("TOTAL DELEGATES", margin, y);
  doc.setTextColor(0, 0, 0);
  doc.text(`${entry.totalDelegates + entry.totalCooks}`, margin + 55, y);
  y += 8;

  doc.setTextColor(204, 0, 0);
  doc.text("TOTAL MONEY", margin, y);
  doc.setTextColor(0, 0, 0);
  doc.text(`${entry.totalMoney.toLocaleString()}`, margin + 55, y);
}

export function generatePdf(data: ChurchExportData): void {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  data.entries.forEach((entry, index) => {
    if (index > 0) {
      doc.addPage();
    }
    renderChurchPage(doc, entry);
  });

  const timestamp = new Date().toISOString().slice(0, 10);
  doc.save(`scmd-registrations-${timestamp}.pdf`);
}
