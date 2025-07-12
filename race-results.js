const apiUrl = 'https://pocketbase-qehx.onrender.com';
const raceName = 'Vuelta: Stage 1';

async function loadResults() {
  const racesRes = await fetch(`${apiUrl}/api/collections/races/records?filter=name="${encodeURIComponent(raceName)}"`);
  const racesData = await racesRes.json();
  const race = racesData.items[0];
  if (!race) return alert("Race not found");

  const resultsRes = await fetch(`${apiUrl}/api/collections/results/records?filter=race="${race.id}"&expand=rider`);
  const resultsData = await resultsRes.json();

  const tbody = document.querySelector('#results-table tbody');
  tbody.innerHTML = '';

  for (const result of resultsData.items) {
    const riderName = result.expand?.rider?.name || 'Unknown';
    const timeMin = Math.round(result.time / 60);
    const timeStr = `${Math.floor(timeMin / 60)}h ${timeMin % 60}m`;

    tbody.innerHTML += `
      <tr>
        <td>${riderName}</td>
        <td>${timeStr}</td>
        <td>${result.points}</td>
      </tr>
    `;
  }
}

loadResults();
