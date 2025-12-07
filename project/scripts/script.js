// My Clubs array of objects
const clubs = [
  {
    id: 'enyimba',
    name: 'Enyimba FC',
    nickname: 'The People\'s Elephant',
    founded: 1976,
    city: 'Aba, Abia State',
    achievements: ['CAF Champions League: 2003, 2004', 'Multiple NPFL titles'],
    stadium: 'Enyimba Stadium, Aba',
    img: 'enyimba.jpg',
    description: 'Enyimba are one of Nigeria\'s most successful clubs, known for continental success and strong local support.'
  },
  {
    id: 'remo',
    name: 'Remo Stars FC',
    nickname: 'Sky Blue Stars',
    founded: 2010,
    city: 'Ikenne, Ogun State',
    achievements: ['NPFL title: 2024-25'],
    stadium: 'Remo Stars Stadium, Ikenne',
    img: 'remo.jpg',
    description: 'A modern club focused on development and professionalism; recent rise to the top of the NPFL.'
  },
  {
    id: 'kano',
    name: 'Kano Pillars FC',
    nickname: 'Sai Masu Gida',
    founded: 1990,
    city: 'Kano, Kano State',
    achievements: ['Multiple NPFL titles historically'],
    stadium: 'Sani Abacha Stadium, Kano',
    img: 'kano.jpg',
    description: 'A northern giant with passionate supporters and a long history in Nigerian football.'
  }
];

function setupClubsModal() {
  const cards = document.querySelectorAll('.club-card');
  const modal = document.getElementById('clubModal');
  const closeBtn = document.getElementById('closeClubModal');

  if (!cards.length) return;

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const clubId = card.dataset.club;
      const club = clubs.find(c => c.id === clubId);

      if (!club) return;

      document.getElementById('clubName').innerHTML = `${club.name} (${club.nickname})`;
      document.getElementById('clubHistory').innerHTML = 
        `<strong>About:</strong> ${club.description}`;
      document.getElementById('clubAchievements').innerHTML =
        `<strong>Achievements:</strong> ${club.achievements.join(', ')}`;
      document.getElementById('clubStadium').innerHTML =
        `<strong>Stadium:</strong> ${club.stadium}`;

      modal.classList.remove('hidden');
      modal.style.display = "flex";
    });
  });

  closeBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
    modal.style.display = "none";
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
      modal.style.display = "none";
    }
  });
}


// Where I save and load subscribers via localStorage
const storage = {
  set(key, value){localStorage.setItem(key, JSON.stringify(value))},
  get(key){const v = localStorage.getItem(key); return v ? JSON.parse(v) : null}
};

// My Club Card function with Template literal
function clubCardHTML(club){
  return `
    <div class="card" data-club="${club.id}">
      <h3>${club.name} <small style="color:#6b7280;font-weight:600">(${club.nickname})</small></h3>
      <p>${club.description}</p>
      <p><strong>Founded:</strong> ${club.founded} • <strong>City:</strong> ${club.city}</p>
      <p><strong>Stadium:</strong> ${club.stadium}</p>
      <p><strong>Key achievements:</strong> ${club.achievements.join(', ')}</p>
      <button class="btn save-fav">Save as Favorite</button>
    </div>
  `;
}

// Function for the random Club of the Day feature 
function setupClubOfDay(){
  const container = document.querySelector('#club-of-day');
  if(!container) return;
  const saved = storage.get('favoriteClub');
  let currentIndex = saved ? clubs.findIndex(c => c.id === saved) : Math.floor(Math.random()*clubs.length);

  function render(){
    const club = clubs[currentIndex];
    container.innerHTML = `
      <div class="card">
        <h2>${club.name}</h2>
        <p><em>${club.nickname}</em></p>
        <p>${club.description}</p>
        <p><strong>Stadium:</strong> ${club.stadium}</p>
        <div style="display:flex;gap:8px;margin-top:8px">
          <button class="btn" id="next-club">Next</button>
          <button class="secondary" id="view-club">View Profile</button>
        </div>
      </div>
    `;
    // event listeners for the Next button on the Home Page
    document.getElementById('next-club').addEventListener('click', ()=>{
      currentIndex = (currentIndex + 1) % clubs.length;
      render();
    });
    document.getElementById('view-club').addEventListener('click', ()=>{
      // navigate to clubs page with hash
      window.location.href = 'clubs.html#' + club.id;
    });
  }
  render();
}

// Fixtures page: list fixtures and show modal on click
const fixtures = [
  {id:'f1', home:'Remo Stars', away:'Kano Pillars', date:'2025-02-08', venue:'Remo Stars Stadium, Ikenne'},
  {id:'f2', home:'Enyimba', away:'Remo Stars', date:'2025-03-01', venue:'Enyimba Stadium, Aba'},
  {id:'f3', home:'Kano Pillars', away:'Enyimba', date:'2025-03-15', venue:'Sani Abacha Stadium, Kano'}
];

function setupFixtures(){
  const list = document.querySelector('#fixtures-list');
  if(!list) return;

  const upcoming = fixtures.filter(f=>{
  
    const today = new Date();
    return new Date(f.date) >= today;
  });

  const toShow = upcoming.length ? upcoming : fixtures;
  list.innerHTML = toShow.map(f => `
    <div class="fixture-row" data-id="${f.id}">
      <div>
        <div class="teams">${f.home} vs ${f.away}</div>
        <div style="font-size:0.95rem;color:#6b7280">${f.date} • ${f.venue}</div>
      </div>
      <div style="font-size:0.9rem;color:#6b7280">Details</div>
    </div>
  `).join('');

  list.querySelectorAll('.fixture-row').forEach(row=>{
    row.addEventListener('click', ()=>{
      const id = row.dataset.id;
      const fixture = fixtures.find(x => x.id === id);
      openModal(fixture);
    });
  });
}

// Modal functions
function openModal(fixture){
  const modal = document.getElementById('modal');
  modal.style.display = 'flex';
  modal.querySelector('.dialog').innerHTML = `
    <h2>${fixture.home} vs ${fixture.away}</h2>
    <p><strong>Date:</strong> ${fixture.date}</p>
    <p><strong>Venue:</strong> ${fixture.venue}</p>
    <p>${getHeadToHead(fixture.home, fixture.away)}</p>
    <div style="display:flex;gap:8px;margin-top:12px">
      <button class="secondary" id="close-modal">Close</button>
    </div>
  `;
  document.getElementById('close-modal').addEventListener('click', closeModal);
}
function closeModal(){
  document.getElementById('modal').style.display = 'none'
}

// A simple head-to-head generator using object
function getHeadToHead(home, away){
  // use object to return H2H summary;
  const h2h = {
    'Remo Stars|Kano Pillars': 'Remo Stars have won recent encounters, including a 2-1 win in Feb 2025.',
    'Enyimba|Remo Stars': 'Enyimba have historical edge, though Remo Stars are rising.',
    'Kano Pillars|Enyimba': 'Kano Pillars boast strong home support and several historic wins.'
  };
  return h2h[home+'|'+away] || 'No detailed head-to-head available; matchups are competitive.';
}

// Subscription form: validation and storage using array and array method
function setupSubscriptionForm(){
  const form = document.querySelector('#subscribe-form');
  if(!form) return;
  const input = form.querySelector('input[type="email"]');
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const email = input.value.trim();
    if(!email || !/^[\w.-]+@[\w.-]+\.\w{2,}$/.test(email)){
      alert('Please enter a valid email address.');
      return;
    }
    // load existing
    const subs = storage.get('subscribers') || [];
    // conditional branching: avoid duplicates
    if(subs.includes(email)){
      alert('This email is already subscribed.');
    } else {
      subs.push(email); // array method push
      storage.set('subscribers', subs);
      alert('Thank you for subscribing!');
      input.value = '';
    }
  });
}

    document.getElementById("lastModified").innerHTML =`Last Modified: ${document.lastModified}`;

// Initialization: runs on all pages safely
function init(){
  setupClubOfDay();
  setupClubsModal();
  setupFixtures();
  setupSubscriptionForm();
}

// Run init after DOM loads
document.addEventListener('DOMContentLoaded', init);
