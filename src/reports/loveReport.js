export default function generateLoveReport(chartData) {
  return `💖 SOUL TIES & LOVE REPORT 💖\n\nName: ${chartData.name}\nVenus in ${chartData.venusSign} shows your love language and romantic expression.\n\nMars in ${chartData.marsSign} reveals your desires and drive in relationships.\n\nYour Descendant in ${chartData.descendantSign} indicates the qualities you seek in a soulmate.\n\nChiron in ${chartData.chironSign} and House ${chartData.chironHouse} exposes your deepest love wounds and healing potential.`;
}
