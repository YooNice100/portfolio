import { fetchJSON, renderProjects, fetchGithubData } from './global.js';


    

async function loadGitHubData(){
  try{
    const projects = await fetchJSON('./lib/projects.json');
const latestProjects = projects.slice(0, 3);
const projectsContainer = document.querySelector('.projects');

renderProjects(latestProjects, projectsContainer, 'h2');

const githubData = await fetchGithubData('YooNice100');


const profileStats = document.querySelector('#profile-stats');

if (profileStats) {
    profileStats.innerHTML = `
          <dl>
            <dt>Public Repos:</dt><dd>${githubData.public_repos}</dd>
            <dt>Public Gists:</dt><dd>${githubData.public_gists}</dd>
            <dt>Followers:</dt><dd>${githubData.followers}</dd>
            <dt>Following:</dt><dd>${githubData.following}</dd>
          </dl>
      `;
  } else {
    console.error("github data could not be loaded");
  }

  }catch(error){
    console.error('github data fetch error', error);
  }
}

loadGitHubData();
// const projects = await fetchJSON('./lib/projects.json');
// const latestProjects = projects.slice(0, 3);
// const projectsContainer = document.querySelector('.projects');

// renderProjects(latestProjects, projectsContainer, 'h2');

// const githubData = await fetchGithubData('YooNice100');


// const profileStats = document.querySelector('#profile-stats');

// if (profileStats) {
//     profileStats.innerHTML = `
//           <dl>
//             <dt>Public Repos:</dt><dd>${githubData.public_repos}</dd>
//             <dt>Public Gists:</dt><dd>${githubData.public_gists}</dd>
//             <dt>Followers:</dt><dd>${githubData.followers}</dd>
//             <dt>Following:</dt><dd>${githubData.following}</dd>
//           </dl>
//       `;
//   }