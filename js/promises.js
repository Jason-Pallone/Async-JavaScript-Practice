const astrosUrl = 'http://api.open-notify.org/astros.json';
const wikiUrl = 'https://en.wikipedia.org/api/rest_v1/page/summary/';
const astronautList = document.querySelector('#astronauts');
const btn = document.querySelector('button');

// Make an AJAX request older version/not fetch

/*function getJSON(url){
   return new Promise((resolve, reject) =>{
     const xhr = new XMLHttpRequest();
     xhr.open('GET', url);
     xhr.onload = () => {
       if(xhr.status === 200) {
          let data = JSON.parse(xhr.responseText);
          resolve(data);
        } else {
          reject( Error(xhr.statusText) );
        }
     };
     xhr.onerror = () => reject( Error('There was a network error') );
     xhr.send();
   });
}*/



function getProfliles(json){
    const profiles = json.people.map( person => {
        if(person.name == 'Hazzaa Ali Almansoori'){
           fetch("https://en.wikipedia.org/api/rest_v1/page/summary/Hazza_Al_Mansouri")
                  .then( response => response.json() )
        }else {
            const craft = person.craft
            return fetch(wikiUrl + person.name)
                    .then( response => response.json() )
                    .then( profile => {
                    return {...profile, craft}
            })
            .catch( err => console.log('Error Fetching Wiki: ', err) )
        }
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
