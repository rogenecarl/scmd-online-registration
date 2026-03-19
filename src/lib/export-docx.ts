"use client";

import {
  Document,
  Packer,
  Paragraph,
  Table,
  TableRow,
  TableCell,
  TextRun,
  WidthType,
  AlignmentType,
  BorderStyle,
  PageBreak,
  HeightRule,
  VerticalAlign,
} from "docx";
import { saveAs } from "file-saver";
import type { ChurchExportData, ChurchExportEntry } from "@/actions/dashboard";

const FONT = "Arial";
const FONT_SIZE_TITLE = 28; // 14pt
const FONT_SIZE_LABEL = 18; // 9pt
const FONT_SIZE_HEADER = 16; // 8pt
const FONT_SIZE_BODY = 16; // 8pt

const BORDER_STYLE = {
  style: BorderStyle.SINGLE,
  size: 1,
  color: "000000",
};

const ALL_BORDERS = {
  top: BORDER_STYLE,
  bottom: BORDER_STYLE,
  left: BORDER_STYLE,
  right: BORDER_STYLE,
};

const NO_BORDERS = {
  top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
  bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
  left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
  right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
};

function headerCell(text: string, width?: number): TableCell {
  return new TableCell({
    borders: ALL_BORDERS,
    verticalAlign: VerticalAlign.CENTER,
    width: width ? { size: width, type: WidthType.DXA } : undefined,
    children: [
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 20, after: 20 },
        children: [
          new TextRun({
            text,
            bold: true,
            font: FONT,
            size: FONT_SIZE_HEADER,
            color: "000000",
          }),
        ],
      }),
    ],
  });
}

function bodyCell(
  text: string,
  alignment: (typeof AlignmentType)[keyof typeof AlignmentType] = AlignmentType.LEFT
): TableCell {
  return new TableCell({
    borders: ALL_BORDERS,
    verticalAlign: VerticalAlign.CENTER,
    children: [
      new Paragraph({
        alignment,
        spacing: { before: 10, after: 10 },
        children: [
          new TextRun({
            text,
            font: FONT,
            size: FONT_SIZE_BODY,
          }),
        ],
      }),
    ],
  });
}

function checkCell(checked: boolean): TableCell {
  return new TableCell({
    borders: ALL_BORDERS,
    verticalAlign: VerticalAlign.CENTER,
    children: [
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({
            text: checked ? "/" : "",
            font: FONT,
            size: FONT_SIZE_BODY,
            bold: true,
          }),
        ],
      }),
    ],
  });
}

function labelText(label: string, value: string, bold = true): Paragraph {
  return new Paragraph({
    spacing: { after: 40 },
    children: [
      new TextRun({
        text: `${label}: `,
        bold,
        font: FONT,
        size: FONT_SIZE_LABEL,
        color: "000000",
      }),
      new TextRun({
        text: value,
        font: FONT,
        size: FONT_SIZE_LABEL,
        underline: { type: "single" },
      }),
    ],
  });
}

function twoColumnLabel(
  label1: string,
  value1: string,
  label2: string,
  value2: string
): Table {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            borders: NO_BORDERS,
            width: { size: 50, type: WidthType.PERCENTAGE },
            children: [labelText(label1, value1)],
          }),
          new TableCell({
            borders: NO_BORDERS,
            width: { size: 50, type: WidthType.PERCENTAGE },
            children: [labelText(label2, value2)],
          }),
        ],
      }),
    ],
  });
}

function buildCampersTable(entry: ChurchExportEntry): Table {
  const MAX_ROWS = Math.max(entry.campers.length, 20);

  // Header row with merged gender and registration columns
  const headerRow = new TableRow({
    tableHeader: true,
    height: { value: 400, rule: HeightRule.ATLEAST },
    children: [
      headerCell("NO.", 500),
      headerCell("NAME", 2600),
      headerCell("NICKNAME\n(FOR ID)", 1200),
      headerCell("AGE", 600),
      headerCell("MALE", 700),
      headerCell("FEMALE", 800),
      headerCell("PRE-\nREGISTRATION\n(/)", 1100),
      headerCell("ONSITE-\nREGISTRATION\n(/)", 1100),
    ],
  });

  // Gender header row
  const genderLabelRow = new TableRow({
    height: { value: 300, rule: HeightRule.ATLEAST },
    children: [
      new TableCell({
        borders: ALL_BORDERS,
        columnSpan: 4,
        children: [new Paragraph({ children: [] })],
      }),
      new TableCell({
        borders: ALL_BORDERS,
        columnSpan: 2,
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: "GENDER (/)",
                bold: true,
                font: FONT,
                size: FONT_SIZE_HEADER,
              }),
            ],
          }),
        ],
      }),
      new TableCell({
        borders: ALL_BORDERS,
        columnSpan: 2,
        children: [new Paragraph({ children: [] })],
      }),
    ],
  });

  const rows: TableRow[] = [headerRow];

  for (let i = 0; i < MAX_ROWS; i++) {
    const camper = entry.campers[i];
    rows.push(
      new TableRow({
        height: { value: 300, rule: HeightRule.ATLEAST },
        children: [
          bodyCell(`${i + 1}`, AlignmentType.CENTER),
          bodyCell(camper?.name || ""),
          bodyCell(camper?.nickname || ""),
          bodyCell(camper ? `${camper.age}` : "", AlignmentType.CENTER),
          checkCell(camper?.gender === "MALE"),
          checkCell(camper?.gender === "FEMALE"),
          checkCell(camper?.isPreRegistration === true),
          checkCell(camper?.isPreRegistration === false && !!camper),
        ],
      })
    );
  }

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows,
  });
}

function buildCooksTable(entry: ChurchExportEntry): Table {
  const MAX_ROWS = Math.max(entry.cooks.length, 4);

  const headerRow = new TableRow({
    tableHeader: true,
    height: { value: 400, rule: HeightRule.ATLEAST },
    children: [
      headerCell("NO.", 500),
      headerCell("NAME", 3200),
      headerCell("NICKNAME\n(FOR ID)", 1400),
      headerCell("AGE", 700),
      headerCell("MALE", 800),
      headerCell("FEMALE", 900),
    ],
  });

  const rows: TableRow[] = [headerRow];

  for (let i = 0; i < MAX_ROWS; i++) {
    const cook = entry.cooks[i];
    rows.push(
      new TableRow({
        height: { value: 300, rule: HeightRule.ATLEAST },
        children: [
          bodyCell(`${i + 1}`, AlignmentType.CENTER),
          bodyCell(cook?.name || ""),
          bodyCell(cook?.nickname || ""),
          bodyCell(cook ? `${cook.age}` : "", AlignmentType.CENTER),
          checkCell(cook?.gender === "MALE"),
          checkCell(cook?.gender === "FEMALE"),
        ],
      })
    );
  }

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows,
  });
}

function buildTotalsTable(entry: ChurchExportEntry): Table {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            borders: ALL_BORDERS,
            width: { size: 30, type: WidthType.PERCENTAGE },
            shading: { fill: "FFFFFF" },
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "TOTAL DELEGATES",
                    bold: true,
                    font: FONT,
                    size: FONT_SIZE_LABEL,
                    color: "CC0000",
                  }),
                ],
              }),
            ],
          }),
          new TableCell({
            borders: ALL_BORDERS,
            width: { size: 20, type: WidthType.PERCENTAGE },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: `${entry.totalDelegates + entry.totalCooks}`,
                    bold: true,
                    font: FONT,
                    size: FONT_SIZE_LABEL,
                  }),
                ],
              }),
            ],
          }),
          new TableCell({
            borders: NO_BORDERS,
            width: { size: 50, type: WidthType.PERCENTAGE },
            children: [new Paragraph({ children: [] })],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            borders: ALL_BORDERS,
            shading: { fill: "FFFFFF" },
            children: [
              new Paragraph({
                spacing: { before: 80 },
                children: [
                  new TextRun({
                    text: "TOTAL MONEY",
                    bold: true,
                    font: FONT,
                    size: FONT_SIZE_LABEL,
                    color: "CC0000",
                  }),
                ],
              }),
            ],
          }),
          new TableCell({
            borders: ALL_BORDERS,
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { before: 80 },
                children: [
                  new TextRun({
                    text: `${entry.totalMoney.toLocaleString()}`,
                    bold: true,
                    font: FONT,
                    size: FONT_SIZE_LABEL,
                  }),
                ],
              }),
            ],
          }),
          new TableCell({
            borders: NO_BORDERS,
            children: [new Paragraph({ children: [] })],
          }),
        ],
      }),
    ],
  });
}

function buildChurchSection(
  entry: ChurchExportEntry,
  isFirst: boolean
): Paragraph[] | (Paragraph | Table)[] {
  const elements: (Paragraph | Table)[] = [];

  // Page break for non-first entries
  if (!isFirst) {
    elements.push(
      new Paragraph({
        children: [new PageBreak()],
      })
    );
  }

  // Title
  elements.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
      children: [
        new TextRun({
          text: entry.eventName.toUpperCase(),
          bold: true,
          font: FONT,
          size: FONT_SIZE_TITLE,
          color: "000000",
        }),
      ],
    })
  );

  // Division + Division FY Coordinator
  elements.push(
    twoColumnLabel(
      "DIVISION",
      entry.division,
      "DIVISION FY COOR.",
      entry.divisionCoordinator
    )
  );

  // Church + Host Pastor
  elements.push(
    twoColumnLabel("CHURCH", entry.church, "HOST PASTOR", entry.hostPastor)
  );

  elements.push(new Paragraph({ spacing: { after: 100 }, children: [] }));

  // CAMPERS section header
  elements.push(
    new Paragraph({
      spacing: { after: 20 },
      children: [
        new TextRun({
          text: "CAMPERS",
          bold: true,
          font: FONT,
          size: FONT_SIZE_LABEL,
          color: "CC0000",
        }),
      ],
    })
  );

  elements.push(
    new Paragraph({
      spacing: { after: 10 },
      children: [
        new TextRun({
          text: "PRE-REGISTRATION FEE: ",
          bold: true,
          font: FONT,
          size: FONT_SIZE_LABEL,
          color: "CC0000",
        }),
        new TextRun({
          text: `${entry.preRegistrationFee.toLocaleString()}`,
          font: FONT,
          size: FONT_SIZE_LABEL,
        }),
      ],
    })
  );

  elements.push(
    new Paragraph({
      spacing: { after: 80 },
      children: [
        new TextRun({
          text: "ONSITE REGISTRATION FEE: ",
          bold: true,
          font: FONT,
          size: FONT_SIZE_LABEL,
          color: "CC0000",
        }),
        new TextRun({
          text: `${entry.onsiteRegistrationFee.toLocaleString()}`,
          font: FONT,
          size: FONT_SIZE_LABEL,
        }),
      ],
    })
  );

  // Campers table
  elements.push(buildCampersTable(entry));

  elements.push(new Paragraph({ spacing: { after: 200 }, children: [] }));

  // COOK section header
  elements.push(
    new Paragraph({
      spacing: { after: 20 },
      children: [
        new TextRun({
          text: "COOK",
          bold: true,
          font: FONT,
          size: FONT_SIZE_LABEL,
          color: "CC0000",
        }),
      ],
    })
  );

  elements.push(
    new Paragraph({
      spacing: { after: 80 },
      children: [
        new TextRun({
          text: "REGISTRATION FEE: ",
          bold: true,
          font: FONT,
          size: FONT_SIZE_LABEL,
          color: "CC0000",
        }),
        new TextRun({
          text: `${entry.cookRegistrationFee.toLocaleString()}`,
          font: FONT,
          size: FONT_SIZE_LABEL,
        }),
      ],
    })
  );

  // Cooks table
  elements.push(buildCooksTable(entry));

  elements.push(new Paragraph({ spacing: { after: 200 }, children: [] }));

  // Totals
  elements.push(buildTotalsTable(entry));

  return elements;
}

export async function generateDocx(data: ChurchExportData): Promise<void> {
  const allChildren: (Paragraph | Table)[] = [];

  data.entries.forEach((entry, index) => {
    const section = buildChurchSection(entry, index === 0);
    allChildren.push(...section);
  });

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 720,
              right: 720,
              bottom: 720,
              left: 720,
            },
          },
        },
        children: allChildren,
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const timestamp = new Date().toISOString().slice(0, 10);
  saveAs(blob, `scmd-registrations-${timestamp}.docx`);
}
