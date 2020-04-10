/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/
// axios.get('https://api.github.com/users/jonush');

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const followersArray = ['SandraCoburn', 'msheets1983', 'maryjwaters7', 'james-coulter', 'liamcox'];

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>
*/
function make(selector) {
  return document.createElement(selector);
}

function get(element) {
  return document.querySelector(element);
}

const cards = get('.cards');

function cardMaker({login, avatar_url, html_url, name, location, bio, followers, following}) {
  const card = make('div');
  const img = make('img');
  const info = make('div');
  const ghName = make('h3');
  const user = make('p');
  const ghLocation = make('p');
  const profile = make('div');
  const address = make('a');
  const ghFollowers = make('p');
  const ghFollowing = make('p');
  const ghBio = make('p');
  // STRETCH
  const contentContainer = make('div');
  const calendar = make('img');

  card.setAttribute('class', 'card');
  img.setAttribute('class', 'profile-pic');
  img.src = avatar_url;
  info.setAttribute('class', 'card-info');
  ghName.setAttribute('class', 'name');
  user.setAttribute('class', 'username');
  profile.setAttribute('class', 'profile');
  address.href = html_url;
  // STRETCH
  contentContainer.setAttribute('class', 'contentContainer');
  calendar.setAttribute('alt', `${name}'s 2020 calendar`);
  calendar.src = `http://ghchart.rshah.org/${login}`;

  ghName.textContent = `${name}`;
  user.textContent = `${login}`;
  ghLocation.textContent = `${location}`;
  profile.textContent = 'Profile: ';
  address.textContent = `${html_url}`;
  ghFollowers.textContent = `Followers: ${followers}`;
  ghFollowing.textContent = `Following: ${following}`;
  ghBio.textContent = `${bio}`;

  // STRETCH
  card.appendChild(contentContainer);
  contentContainer.appendChild(img);
  contentContainer.appendChild(info);
  info.appendChild(ghName);
  info.appendChild(user);
  info.appendChild(ghLocation);
  info.appendChild(profile);
  profile.appendChild(address);
  info.appendChild(ghFollowers);
  info.appendChild(ghFollowing);
  info.appendChild(ghBio);
  card.appendChild(calendar);

  return card;
}
/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/

// STEP 4
axios.get('https://api.github.com/users/jonush')
  .then (
    response => {
      //console.log(response);
      const profileData = response.data;
      //console.log('User Info', profileData);
      cards.appendChild(cardMaker(profileData));
    }
  )
  .catch (
    error => {
      alert(`There was an error retrieving your data. A card could not be created.`)
    }
  )


// STEP 5
function getFollowers(array) {
  for (let i = 0; i < array.length; i++) {
    axios.get(`https://api.github.com/users/${array[i]}`)
      .then (
        response => {
          const profileData = response.data;
    
          cards.appendChild(cardMaker(profileData));
        }
      )
      .catch (
        error => {
          alert(`There was an error retrieving your data. A card could not be created.`)
        }
      )
  }
}

getFollowers(followersArray);