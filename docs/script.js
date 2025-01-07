document.addEventListener('DOMContentLoaded', function() {
  fetch('/data.json')
    .then(response => response.json())
    .then(data => {
      // Display Author Information
      const author = data.author;
      document.getElementById('author-name').innerText = author.name;
      document.getElementById('author-affiliations').innerText = author.affiliations;
      document.getElementById('author-email').innerText = author.email;
      document.getElementById('author-interests').innerText = author.interests.map(interest => interest.title).join(', ');
      document.getElementById('author-thumbnail').src = author.thumbnail;

      // Display Articles
      const articlesDiv = document.getElementById('articles');
      data.articles.forEach(article => {
        const div = document.createElement('div');
        div.className = 'card mt-3';
        div.innerHTML = `
          <div class="card-body">
            <h5 class="card-title">${article.title}</h5>
            <p class="card-text">Authors: ${article.authors}</p>
            <p class="card-text">Publication: ${article.publication}</p>
            <p class="card-text">Cited by: ${article.cited_by.value || '0'}</p>
            <p class="card-text">Year: ${article.year}</p>
          </div>
        `;
        articlesDiv.appendChild(div);
      });

      // Citation Graph
      const citationGraph = data.cited_by.graph;
      const years = citationGraph.map(point => point.year);
      const citations = citationGraph.map(point => point.citations);

      const ctx = document.getElementById('citationChart').getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: years,
          datasets: [{
            label: 'Citations Over Time',
            data: citations,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    })
    .catch(error => console.error('Error fetching data:', error));
});