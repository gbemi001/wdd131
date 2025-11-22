const mainNav = document.querySelector('#main-nav')
const hamButton = document.querySelector('#menu');
const header = document.querySelector('header');
const templeGallery = document.querySelector('#temple-gallery');

// Hamburger Menu Toggle

hamButton.addEventListener('click', () => {
	mainNav.classList.toggle('show');
    header.classList.toggle('menu-open');
	hamButton.classList.toggle('show');
	hamButton.setAttribute('aria-expanded', String(hamButton.classList.contains('show')));
});


document.getElementById("lastModified").innerHTML =`Last Modified: ${document.lastModified}`;
document.getElementById("current-year").innerHTML = new Date().getFullYear();

const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  {
    templeName: "Rome Italy",
    location: "Rome, Italy",
    dedicated: "2019, March, 10",
    area: 41010,
    imageUrl:
    "images/rome_temple.jpg"
  },
  {
    templeName: "Trujillo Perú",
    location: "Trujillo, Perú",
    dedicated: "2015, June, 21",
    area: 28200,
    imageUrl:
    "images/trujillo_temple.jpg"
  },
  {
    templeName: "Kyiv Ukraine",
    location: "Kyiv, Ukraine",
    dedicated: "2010, August, 29",
    area: 22184,
    imageUrl:
    "images/kyiv_temple.jpg"
  },
];

function displayTemples(temples) {
  templeGallery.innerHTML = "";

  temples.forEach(t => {
    const card = document.createElement("article");
    card.className = "temple";

    const h3 = document.createElement("h3");
    h3.textContent = t.templeName;

    const loc = document.createElement("p");
    loc.textContent = t.location;

    const ded = document.createElement("p");
    ded.textContent = `Dedicated: ${t.dedicated}`;

    const area = document.createElement("p");
    area.textContent = `Area: ${t.area.toLocaleString()} sq ft`;

    const img = document.createElement("img");
    img.src = t.imageUrl;
    img.alt = `${t.templeName} Temple Image`;
	img.loading = "lazy";
	img.width = 400;
	img.height = 250;


    card.append(h3, loc, ded, area, img);
    templeGallery.appendChild(card);
  });
}

const home_link = document.getElementById("home");
const old_link = document.getElementById("old");
const new_link = document.getElementById("new");
const large_link = document.getElementById("large");
const small_link = document.getElementById("small");
const h1_title = document.getElementById("h1-title");

home_link.addEventListener("click", () => {
	h1_title.textContent = `Home - All Temples`;
	displayTemples(temples);
});

old_link.addEventListener("click", () => {
	let oldTemples = temples.filter(t => {
		const dedicatedYear = new Date(t.dedicated).getFullYear();
		return dedicatedYear < 1900;
	});
	h1_title.textContent = `Old - Temples Dedicated Before 1900`;
	displayTemples(oldTemples);
});

new_link.addEventListener("click", () => {
	let newTemples = temples.filter(t => {
		const dedicatedYear = new Date(t.dedicated).getFullYear();
		return dedicatedYear > 2000;
	});
	h1_title.textContent = `New - Temples Dedicated After 2000`;
	displayTemples(newTemples);
});

large_link.addEventListener("click", () => {
	let largeTemples = temples.filter(t => t.area > 90000);
	h1_title.textContent = `Large - Temples Over 90,000 sq ft`;
	displayTemples(largeTemples);
});

small_link.addEventListener("click", () => {
	let smallTemples = temples.filter(t => t.area < 10000);
	h1_title.textContent = `Small - Temples Under 10,000 sq ft`;
	displayTemples(smallTemples);
});

displayTemples(temples);
