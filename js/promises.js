const astrosUrl = 'http://api.open-notify.org/astros.json';
const wikiUrl = 'https://en.wikipedia.org/api/rest_v1/page/summary/';
const astronautList = document.querySelector('#astronauts');
const btn = document.querySelector('button');


function getProfliles(json){
    const profiles = json.people.map( person => {
            const craft = person.craft
            return fetch(wikiUrl + person.name)
                    .then( response => response.json() )
                    .then( profile => {
                    return {...profile, craft}
            })
            .catch( err => console.log('Error Fetching Wiki: ', err) )
    })
    return profiles;
}

function generateHTML(data){
  data.map(person => {
    const section = document.createElement('section');
    astronautList.appendChild(section);
    section.innerHTML = `
      <img src=${person.thumbnail.source}>
      <span>${person.craft}</span>
      <h2>${person.title}</h2>
      <p>${person.description}</p>
      <p>${person.extract}</p>
    `;
  })
}


btn.addEventListener('click', (event)=> {
  event.target.textContent = 'Loading...'

  fetch(astrosUrl)
    .then( response => response.json() )
    .then(getProfliles)
    .then(generateHTML)
    .catch( err => {
        astronautList.innerHTML = '<h3> Something went wrong! </h3>';
        console.log(err) 
    })
    .finally(() => event.target.remove())
});
