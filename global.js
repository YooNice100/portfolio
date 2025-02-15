console.log('IT’S ALIVE!');

const ARE_WE_HOME = document.documentElement.classList.contains('home');

function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

  

let pages = [
    { url: '', title: 'Home' },
    { url: 'projects/', title: 'Projects' },
    { url: 'resume/', title: 'Resume'},
    { url: 'contact/', title: 'Contact'},
    { url: 'meta/', title: 'Meta'},
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
    // nav.append(a);

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



export async function fetchJSON(url) {
  try {
      // Fetch the JSON file from the given URL
      const response = await fetch(url);


      if (!response.ok) {
        throw new Error(`Failed to fetch projects: ${response.statusText}`);
    }
    return await response.json();


  } catch (error) {
      console.error('Error fetching or parsing JSON data:', error);
      return null;
  }
}



export function renderProjects(projects, containerElement, headingLevel = 'h2') {
  // Your code will go here


  if (!containerElement || !(containerElement instanceof HTMLElement)) {
    console.error('Invalid container element')
    return;
  }
  const validHeadings = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
  if (!validHeadings.includes(headingLevel)){
    console.warn('Invalid heading level: ${headingLevel}. Set to h2')
    headingLevel = 'h2'
  }

  const titleElement = document.querySelector('.projects-title');
  if(titleElement){
    titleElement.textContent = `${projects.length} Projects`;
  }

  containerElement.innerHTML = '';


  projects.forEach(project=> {
    const article = document.createElement('article');

    const heading = document.createElement(headingLevel);
    heading.textContent = project.title || 'Untitled Project';

    const img = document.createElement('img');
    img.src = project.image?.trim() || 'placeholder.png';
    img.alt = project.title?.trim() || 'Project image';

    const descriptionContainer = document.createElement('div');

    const description = document.createElement('p');
    description.textContent = project.description || 'No description';

    const year = document.createElement('p');
    year.textContent = project.year || 'No Year'

    descriptionContainer.append(description);
    descriptionContainer.append(year);

    article.appendChild(heading);
    article.appendChild(img);
    article.appendChild(descriptionContainer);
    // article.appendChild(year);

    // article.innerHTML = `
    // <h3>${project.title}</h3>
    // <img src="${project.image}" alt="${project.title}">
    // <p>${project.description}</p>
    // `;

    containerElement.appendChild(article);
  });
  

}

export async function fetchGithubData(username) {
  return fetchJSON(`https://api.github.com/users/${username}`);
}
