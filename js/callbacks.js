const astrosUrl = 'http://api.open-notify.org/astros.json';
const wikiUrl = 'https://en.wikipedia.org/api/rest_v1/page/summary/';
const astronautList = document.querySelector('#astronauts');
const btn = document.querySelector('button');

// Make an AJAX request
function getJSON(url, callback){
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.onload = () => {
    if(xhr.status === 200){
        let data = JSON.parse(xhr.responseText);
        console.log(data)
        return callback(data)
    }
  };
  xhr.send();
}

function getProfliles(json){
    json.people.map(person => {
    getJSON(wikiUrl + person.name, generateHTML)
    })
}

function generateHTML(data){
    const section = document.createElement('section');
    astronautList.appendChild(section);
    section.innerHTML = `
    <img src=${data.thumbnail.source}>
    <h2>${data.title}</h2>
    <p>${data.description}</p>
    <p>${data.extract}</p>
    `;
}


btn.addEventListener('click', (event)=> {
    getJSON(astrosUrl, getProfliles);
    event.target.remove()
});
