import { fetchJSON, renderProjects } from '../global.js';
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm";


const projects = await fetchJSON('../lib/projects.json');

const projectsContainer = document.querySelector('.projects');
renderProjects(projects, projectsContainer, 'h2');

let selectedIndex = -1;


let searchInput = document.querySelector('.searchBar');

function renderPieChart(projectsGiven) {
    let newSVG = d3.select('svg');
    newSVG.selectAll('path').remove();
    d3.select('.legend').selectAll('li').remove();

    let rolledData = d3.rollups(
        projectsGiven,
        (v) => v.length,
        (d) => d.year,
    );

    let newData = rolledData.map(([year, count]) => {
        return { value: count, label: year };
      });
      
      
    let colors = d3.scaleOrdinal(d3.schemeTableau10);
    let sliceGenerator = d3.pie().value((d) => d.value);
    let arcGenerator = d3.arc().innerRadius(0).outerRadius(50);
      
    let arcData = sliceGenerator(newData);
    let legend = d3.select('.legend');
      
      
    newData.forEach((d, idx) => {
      legend.append('li')
        .attr('style', `--color:${colors(idx)}`) // set the style attribute while passing in parameters
        .html(`<span class='swatch'"></span> ${d.label} <em>(${d.value})</em>`); // set the inner html of <li>
      })

    let clickedIndex;
      
    newSVG.selectAll('path')
      .data(arcData)
      .enter()
      .append('path')
      .attr('d', arcGenerator)
      .attr('fill', (d, idx) => colors(idx))
      .attr('transform', 'translate(0,0)')
      .attr('cursor', 'pointer')  // Makes wedges visually clickable
      .on('click', function (_, d) {  // Click event to handle selection

          clickedIndex = arcData.indexOf(d);

          

          // Toggle selection
          selectedIndex = selectedIndex === clickedIndex ? -1 : clickedIndex;

          // Apply CSS class for highlighting
          newSVG.selectAll('path')
              .attr('class', (_, idx) => (idx === selectedIndex ? 'selected' : ''));

           d3.selectAll('.legend li')
          .attr('class', (_, idx) => (idx === selectedIndex ? 'selected' : ''));


          if (selectedIndex === -1) {
            renderProjects(projects, projectsContainer, 'h2');
          } else {
            // TODO: filter projects and project them onto webpage
            // Hint: `.label` might be useful
            let selectedYear = newData[selectedIndex].label;
            let filteredProjects = projects.filter(project => project.year === selectedYear);
            renderProjects(filteredProjects, projectsContainer, 'h2');
          }

          

        });  
      
      
}


// let query = ''; 
renderPieChart(projects);



searchInput.addEventListener('input', (event) => {
  // update query value
  let query = event.target.value.toLowerCase();
  // TODO: filter the projects
  let filteredProjects = projects.filter((project) => {
    let values = Object.values(project).join('\n').toLowerCase();
    return values.includes(query.toLowerCase());
  });

  // TODO: render updated projects!
  renderProjects(filteredProjects, projectsContainer, 'h2');
  renderPieChart(filteredProjects);

});

