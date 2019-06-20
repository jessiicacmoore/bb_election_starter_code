document.addEventListener("DOMContentLoaded", function() {

  const body = document.querySelector('body');

  axios.get('https://bb-election-api.herokuapp.com/')
    .then(resp => {
      let data = resp.data.candidates;
      let candidateList = document.createElement('ul');
      body.appendChild(candidateList);

      data.forEach(candidate => {
        let candidateData = document.createElement('li');
        candidateData.innerHTML = `<p><strong>Name: </strong>${candidate.name}</p>\n
          <p><strong>Votes: </strong>${candidate.votes}</p>`;
        candidateList.appendChild(candidateData);
      })
    });
});
