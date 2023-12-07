import { getOctokit } from '../auth/getOctokit.js'; // Adjust the path as needed


document.addEventListener("DOMContentLoaded", function() {
    const octokit = getOctokit();

    octokit.rest.repos.listForAuthenticatedUser({
      // visibility: 'private',
    }).then(({ data }) => {
      console.log(data);
      displayRepositories(data);
    }).catch((error) => {
      console.error(error);
    });
});


function displayRepositories(repositories) {
    const repoListElement = document.getElementById("repoList");
    repoListElement.innerHTML = "";

    if (repositories.length === 0) {
        repoListElement.textContent = "No repositories found.";
        return;
    }

    const ul = document.createElement("ul");
    repositories.forEach((repo) => {
        const li = document.createElement("li");
        li.textContent = repo.name;
        ul.appendChild(li);
    });

    repoListElement.appendChild(ul);
}
