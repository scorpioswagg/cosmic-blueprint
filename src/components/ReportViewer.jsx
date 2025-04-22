import React from 'react';
import generateNatalReport from '../reports/natalReport';
import generateKarmicReport from '../reports/karmicReport';
import generateLoveReport from '../reports/loveReport';
import { calculateChartData } from '../utils/astrologyCalculator';

export default function ReportViewer() {
  const chartData = calculateChartData({
    name: 'Cosmic Seeker',
    birthDate: '1990-01-01',
    birthTime: '12:00',
    birthCity: 'Los Angeles'
  });

  const natal = generateNatalReport(chartData);
  const karmic = generateKarmicReport(chartData);
  const love = generateLoveReport(chartData);

  return (
    <div style={{ padding: '2rem', fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
      <h1>🪐 Cosmic Blueprint Reports 🪐</h1>
      <hr />
      <pre>{natal}</pre>
      <hr />
      <pre>{karmic}</pre>
      <hr />
      <pre>{love}</pre>
    </div>
  );
}
