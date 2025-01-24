console.log('IT’S ALIVE!');

const ARE_WE_HOME = document.documentElement.classList.contains('home');

function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}


// let navLinks = $$("nav a");

// let currentLink = navLinks.find(
//     (a) => a.host === location.host && a.pathname === location.pathname
//   );


// if (currentLink){
//     currentLink.classList.add('current');
// }
  

let pages = [
    { url: '', title: 'Home' },
    { url: 'projects/', title: 'Projects' },
    { url: 'resume/', title: 'Resume'},
    { url: 'contact/', title: 'Contact'},
    { url: 'https://github.com/YooNice100', title: 'GitHub'}

  ];

let nav = document.createElement('nav');
document.body.prepend(nav);

for (let p of pages) {
    let url = p.url;
    let title = p.title;
    // TODO create link and add it to nav
    url = !ARE_WE_HOME && !url.startsWith('http') ? '../' + url : url;

    // nav.insertAdjacentHTML('beforeend', `<a href="${url}">${title}</a>`);
    let a = document.createElement('a');
    a.href = url;
    a.textContent = title;
    nav.append(a);

    if (a.host === location.host && a.pathname === location.pathname) {
        a.classList.add('current');
      }

    if (a.host !== location.host){
      a.target = '_blank'
    }

    nav.append(a);
  }


document.body.insertAdjacentHTML(
  'afterbegin',
  `
	<label class="color-scheme">
		Theme:
		<select>
			<!-- TODO add <option> elements here -->
      <option value = "light dark">Automatic</option>
      <option value = "light">Light</option>
      <option value = "dark">Dark</option>
		</select>
	</label>`
);

const select = document.querySelector('.color-scheme select');


function setColorScheme(colorScheme) {
  document.documentElement.style.setProperty('color-scheme', colorScheme);
  localStorage.colorScheme = colorScheme;
}

if ("colorScheme" in localStorage) {
  const savedColorScheme = localStorage.colorScheme;
  setColorScheme(savedColorScheme);
  select.value = savedColorScheme;

}



select.addEventListener('input', function (event){
  console.log('color scheme changed to', event.target.value);
  // document.documentElement.style.setProperty('color-scheme', event.target.value);
  setColorScheme(event.target.value)

});



