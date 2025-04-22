export default function generateKarmicReport(chartData) {
  return `🌀 KARMIC INSIGHT REPORT 🌀\n\nName: ${chartData.name}\n\nBased on your South Node in ${chartData.southNode}, your past life patterns revolve around these themes: ${chartData.karmicThemes}.\n\nYour North Node in ${chartData.northNode} points to your soul's purpose: ${chartData.soulMission}.\n\nThe placement of Saturn in ${chartData.saturnSign} and House ${chartData.saturnHouse} reveals the karmic debts and life lessons you've brought into this incarnation.`;
}
