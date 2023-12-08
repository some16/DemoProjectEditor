import { getOctokit } from '../auth/getOctokit.js'; // Adjust the path as needed


document.addEventListener("DOMContentLoaded", function() {
    const octokit = getOctokit();

    getWriteAccessRepos()
    .then((repositories) => {
      displayRepositories(repositories);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
});



async function getWriteAccessRepos(octokit) {
  const repositoriesWithWriteAccess = [];

  for await (const { data } of octokit.paginate.iterator(
    octokit.repos.listForAuthenticatedUser
  )) {
    const writeAccessRepositories = data.filter((repo) => {
      return repo.permissions.push;
    });
    repositoriesWithWriteAccess.push(...writeAccessRepositories);
  }
  return repositoriesWithWriteAccess;
}


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
