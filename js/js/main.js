const container = document.getElementById("vulnContainer");
const searchInput = document.getElementById("searchInput");

function createCard(vuln) {
  return `
    <div class="card">
      <h3>${vuln.product_name}</h3>
      <p><strong>CVE:</strong> ${vuln.cve_id}</p>
      <p><strong>Severity:</strong> ${vuln.severity}</p>
      <p><strong>Date:</strong> ${vuln.published_date}</p>
    </div>
  `;
}

function renderVulnerabilities(data) {
  container.innerHTML = data.map(createCard).join("");
}

fetchVulnerabilities().then(data => {
  renderVulnerabilities(data);

  // Simple search
  searchInput.addEventListener("input", () => {
    const term = searchInput.value.toLowerCase();
    const filtered = data.filter(v => 
      v.product_name.toLowerCase().includes(term) || 
      v.cve_id.toLowerCase().includes(term)
    );
    renderVulnerabilities(filtered);
  });
});
