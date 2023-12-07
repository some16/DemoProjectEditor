import { Octokit, App } from "https://esm.sh/octokit";

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}


document.addEventListener("DOMContentLoaded", function() {
    var token = getCookie('githubToken');
    var octokit = new Octokit({ auth: `token ${token}` });

    octokit.request('GET /user')
    .catch(error => {
        window.location.replace("https://some16.github.io/DemoProjectEditor/repos.html");
    })
    .then(() => {
        loadPage(octokit);
    });
});


function loadPage(octokit) {
    octokit.rest.repos.listForAuthenticatedUser({
    //   visibility: 'public',
    }).then(({ data }) => {
      console.log(data);
      displayRepositories(data);
    }).catch((error) => {
      console.error(error);
    });
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
