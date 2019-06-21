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
          <p><strong>Votes: </strong><span class="vote-count">
          ${candidate.votes}</span></p>`;
        candidateList.appendChild(candidateData);

        let voteForm = document.createElement('form');
        voteForm.method = 'POST';
        voteForm.action = 'https://bb-election-api.herokuapp.com/vote';
        candidateData.appendChild(voteForm);

        let voteInput = document.createElement('input');
        voteInput.type = 'hidden';
        voteInput.name = 'name';
        voteInput.value = candidate.name;

        let voteBtn = document.createElement('button');
        voteBtn.innerText = `Vote for ${candidate.name}`;

        voteForm.appendChild(voteInput);
        voteForm.appendChild(voteBtn);

        let refreshBtn = document.createElement('button');
        refreshBtn.innerText = 'Refresh';
        candidateData.appendChild(refreshBtn);
        refreshBtn.addEventListener('click', () => {
          axios.get('https://bb-election-api.herokuapp.com/')
            .then(resp => {
              let refreshedCandidates = resp.data.candidates;
              let updateSpan = candidateData.querySelector('.vote-count');
              updateSpan.innerText = refreshCandidates[data.indexOf(candidate)].votes;
            })
        })
      })
    });

  document.addEventListener('submit', e => {
    e.preventDefault();

    axios.post(e.target.action, {
      name : event.target.querySelector('input[name="name"').value
    })
      .then(resp => {
        console.log(e.target.nextElementSibling);
        e.target.nextElementSibling.click();
      })
  })
});
