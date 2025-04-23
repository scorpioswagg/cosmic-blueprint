import type { ReportType, PdfOptions } from "@/lib/pdf-generator"
import type { NatalChart } from "@/lib/astrological-calculations"

export function generateReportHtml(
  report: ReportType,
  chart: NatalChart,
  chartWheelSvg: string | null,
  options: PdfOptions = {},
): string {
  const { userName = "Client", birthDate = "", birthTime = "", birthPlace = "", colorTheme = "cosmic" } = options

  // Define theme colors based on the selected theme
  let themeColors = {
    primary: "#5D41A9", // Purple
    secondary: "#9C7CF4",
    text: "#333333",
    background: "#FFFFFF",
    accent: "#F4EEFF",
  }

  if (colorTheme === "dark") {
    themeColors = {
      primary: "#5D41A9",
      secondary: "#9C7CF4",
      text: "#E0E0E0",
      background: "#121212",
      accent: "#2D2B55",
    }
  } else if (colorTheme === "cosmic") {
    themeColors = {
      primary: "#6B46C1",
      secondary: "#9F7AEA",
      text: "#2D3748",
      background: "#FAF5FF",
      accent: "#E9D8FD",
    }
  }

  // Generate the HTML with embedded CSS
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>${report.title}</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Lora:wght@400;500;600&display=swap');
        
        body {
          font-family: 'Lora', serif;
          color: ${themeColors.text};
          background-color: ${themeColors.background};
          line-height: 1.6;
          font-size: 11pt;
          margin: 0;
          padding: 0;
        }
        
        .page-break {
          page-break-after: always;
        }
        
        .cover-page {
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          background: linear-gradient(135deg, ${themeColors.accent} 0%, ${themeColors.background} 100%);
        }
        
        .cover-title {
          font-family: 'Montserrat', sans-serif;
          font-size: 32pt;
          font-weight: 700;
          color: ${themeColors.primary};
          margin-bottom: 20px;
        }
        
        .cover-subtitle {
          font-family: 'Montserrat', sans-serif;
          font-size: 16pt;
          font-weight: 500;
          color: ${themeColors.secondary};
          margin-bottom: 40px;
        }
        
        .cover-info {
          font-size: 12pt;
          margin-bottom: 10px;
        }
        
        .header {
          background-color: ${themeColors.primary};
          color: white;
          padding: 20px;
          text-align: center;
          font-family: 'Montserrat', sans-serif;
          font-weight: 600;
          font-size: 14pt;
        }
        
        .footer {
          text-align: center;
          font-size: 9pt;
          color: ${themeColors.secondary};
          margin-top: 20px;
          font-style: italic;
        }
        
        .section {
          margin-bottom: 20px;
        }
        
        .section-title {
          font-family: 'Montserrat', sans-serif;
          font-size: 16pt;
          font-weight: 600;
          color: ${themeColors.primary};
          border-bottom: 2px solid ${themeColors.secondary};
          padding-bottom: 5px;
          margin-bottom: 15px;
        }
        
        .section-content {
          text-align: justify;
          margin-bottom: 15px;
        }
        
        .chart-container {
          text-align: center;
          margin: 30px 0;
        }
        
        .chart-title {
          font-family: 'Montserrat', sans-serif;
          font-size: 14pt;
          font-weight: 500;
          color: ${themeColors.primary};
          margin-bottom: 15px;
        }
        
        .chart-image {
          max-width: 500px;
          max-height: 500px;
          margin: 0 auto;
        }
        
        .planet-table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
        }
        
        .planet-table th {
          background-color: ${themeColors.accent};
          color: ${themeColors.primary};
          font-family: 'Montserrat', sans-serif;
          font-weight: 600;
          text-align: left;
          padding: 8px;
        }
        
        .planet-table td {
          border-bottom: 1px solid ${themeColors.accent};
          padding: 8px;
        }
        
        .planet-table tr:nth-child(even) {
          background-color: ${themeColors.background === "#FFFFFF" ? "#f9f9f9" : "#1a1a1a"};
        }
        
        .introduction {
          font-style: italic;
          border-left: 3px solid ${themeColors.secondary};
          padding-left: 15px;
          margin: 20px 0;
        }
        
        .page-number {
          position: absolute;
          bottom: 20px;
          right: 20px;
          font-size: 9pt;
          color: ${themeColors.secondary};
        }
        
        .cosmic-symbol {
          font-size: 24pt;
          color: ${themeColors.secondary};
          margin: 0 5px;
        }
        
        .two-column {
          column-count: 2;
          column-gap: 20px;
        }
      </style>
    </head>
    <body>
      <!-- Cover Page -->
      <div class="cover-page">
        <div class="cosmic-symbol">✧ ✦ ✧</div>
        <h1 class="cover-title">${report.title}</h1>
        <h2 class="cover-subtitle">Cosmic Blueprint Analysis</h2>
        <p class="cover-info"><strong>Name:</strong> ${userName}</p>
        ${birthDate ? `<p class="cover-info"><strong>Birth Date:</strong> ${birthDate}</p>` : ""}
        ${birthTime ? `<p class="cover-info"><strong>Birth Time:</strong> ${birthTime}</p>` : ""}
        ${birthPlace ? `<p class="cover-info"><strong>Birth Place:</strong> ${birthPlace}</p>` : ""}
        <p class="cover-info"><strong>Generated:</strong> ${new Date().toLocaleDateString()}</p>
        <div class="cosmic-symbol">✧ ✦ ✧</div>
      </div>
      
      <div class="page-break"></div>
      
      <!-- Table of Contents -->
      <div class="header">Table of Contents</div>
      
      <div style="padding: 20px;">
        <p><strong>Introduction</strong> .................................................. 3</p>
        ${report.sections
          .map(
            (section, index) => `
          <p><strong>${section.title}</strong> .................................................. ${index + 4}</p>
        `,
          )
          .join("")}
      </div>
      
      <div class="page-break"></div>
      
      <!-- Introduction -->
      <div class="header">Introduction</div>
      
      <div style="padding: 20px;">
        <div class="introduction">
          ${report.introduction
            .split("\n\n")
            .map((paragraph) => `<p>${paragraph}</p>`)
            .join("")}
        </div>
        
        ${
          options.includeChartWheel && chartWheelSvg
            ? `
          <div class="chart-container">
            <h3 class="chart-title">Natal Chart Wheel</h3>
            <div class="chart-image">
              ${chartWheelSvg}
            </div>
          </div>
        `
            : ""
        }
        
        <!-- Planet Positions Table -->
        <h3 class="section-title">Planetary Positions</h3>
        <table class="planet-table">
          <thead>
            <tr>
              <th>Planet</th>
              <th>Sign</th>
              <th>Degree</th>
              <th>House</th>
              <th>Retrograde</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Sun</td>
              <td>${chart.sun.sign}</td>
              <td>${chart.sun.degree}° ${chart.sun.minute}'</td>
              <td>${chart.sun.house}</td>
              <td>${chart.sun.retrograde ? "Yes" : "No"}</td>
            </tr>
            <tr>
              <td>Moon</td>
              <td>${chart.moon.sign}</td>
              <td>${chart.moon.degree}° ${chart.moon.minute}'</td>
              <td>${chart.moon.house}</td>
              <td>${chart.moon.retrograde ? "Yes" : "No"}</td>
            </tr>
            <tr>
              <td>Mercury</td>
              <td>${chart.mercury.sign}</td>
              <td>${chart.mercury.degree}° ${chart.mercury.minute}'</td>
              <td>${chart.mercury.house}</td>
              <td>${chart.mercury.retrograde ? "Yes" : "No"}</td>
            </tr>
            <tr>
              <td>Venus</td>
              <td>${chart.venus.sign}</td>
              <td>${chart.venus.degree}° ${chart.venus.minute}'</td>
              <td>${chart.venus.house}</td>
              <td>${chart.venus.retrograde ? "Yes" : "No"}</td>
            </tr>
            <tr>
              <td>Mars</td>
              <td>${chart.mars.sign}</td>
              <td>${chart.mars.degree}° ${chart.mars.minute}'</td>
              <td>${chart.mars.house}</td>
              <td>${chart.mars.retrograde ? "Yes" : "No"}</td>
            </tr>
            <tr>
              <td>Jupiter</td>
              <td>${chart.jupiter.sign}</td>
              <td>${chart.jupiter.degree}° ${chart.jupiter.minute}'</td>
              <td>${chart.jupiter.house}</td>
              <td>${chart.jupiter.retrograde ? "Yes" : "No"}</td>
            </tr>
            <tr>
              <td>Saturn</td>
              <td>${chart.saturn.sign}</td>
              <td>${chart.saturn.degree}° ${chart.saturn.minute}'</td>
              <td>${chart.saturn.house}</td>
              <td>${chart.saturn.retrograde ? "Yes" : "No"}</td>
            </tr>
            <tr>
              <td>Uranus</td>
              <td>${chart.uranus.sign}</td>
              <td>${chart.uranus.degree}° ${chart.uranus.minute}'</td>
              <td>${chart.uranus.house}</td>
              <td>${chart.uranus.retrograde ? "Yes" : "No"}</td>
            </tr>
            <tr>
              <td>Neptune</td>
              <td>${chart.neptune.sign}</td>
              <td>${chart.neptune.degree}° ${chart.neptune.minute}'</td>
              <td>${chart.neptune.house}</td>
              <td>${chart.neptune.retrograde ? "Yes" : "No"}</td>
            </tr>
            <tr>
              <td>Pluto</td>
              <td>${chart.pluto.sign}</td>
              <td>${chart.pluto.degree}° ${chart.pluto.minute}'</td>
              <td>${chart.pluto.house}</td>
              <td>${chart.pluto.retrograde ? "Yes" : "No"}</td>
            </tr>
            <tr>
              <td>Chiron</td>
              <td>${chart.chiron.sign}</td>
              <td>${chart.chiron.degree}° ${chart.chiron.minute}'</td>
              <td>${chart.chiron.house}</td>
              <td>${chart.chiron.retrograde ? "Yes" : "No"}</td>
            </tr>
            <tr>
              <td>North Node</td>
              <td>${chart.northNode.sign}</td>
              <td>${chart.northNode.degree}° ${chart.northNode.minute}'</td>
              <td>${chart.northNode.house}</td>
              <td>${chart.northNode.retrograde ? "Yes" : "No"}</td>
            </tr>
            <tr>
              <td>South Node</td>
              <td>${chart.southNode.sign}</td>
              <td>${chart.southNode.degree}° ${chart.southNode.minute}'</td>
              <td>${chart.southNode.house}</td>
              <td>${chart.southNode.retrograde ? "Yes" : "No"}</td>
            </tr>
            <tr>
              <td>Ascendant</td>
              <td>${chart.ascendant.sign}</td>
              <td>${chart.ascendant.degree}° ${chart.ascendant.minute}'</td>
              <td>${chart.ascendant.house}</td>
              <td>N/A</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div class="page-break"></div>
      
      <!-- Report Sections -->
      ${report.sections
        .map(
          (section, index) => `
        <div class="header">${section.title}</div>
        
        <div style="padding: 20px;">
          <div class="section-content ${index % 3 === 0 ? "two-column" : ""}">
            ${section.content
              .split("\n\n")
              .map((paragraph) => `<p>${paragraph}</p>`)
              .join("")}
          </div>
          
          <div class="footer">
            Cosmic Blueprint - ${userName} - Page ${index + 4}
          </div>
        </div>
        
        ${index < report.sections.length - 1 ? '<div class="page-break"></div>' : ""}
      `,
        )
        .join("")}
    </body>
    </html>
  `
}
