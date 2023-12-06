import { Octokit, App } from "https://esm.sh/octokit";

// Access the "test" cookie to retrieve the GitHub token
const cookieName = 'test'; // Change this to match your cookie name
const token = getCookie(cookieName); // Implement a function to get the cookie value

document.addEventListener("DOMContentLoaded", function() {
    // Get code from url
    const urlParams = new URLSearchParams(window.location.search);
    const codeParam = urlParams.get("code");

    // Get token
    if (codeParam) {
        const gatekeeperUrl = `https://gatekeeper-n0qw.onrender.com/authenticate/${codeParam}`;
        
        fetch(gatekeeperUrl)
        .then(response => response.json())
        .then(data => {
            document.cookie = `test=${data.token}`;
            console.log(data);
        })
        .catch(error => {
            console.error("Error:", error);
        });


    // If not token found
    } else {

        const codeContentElement = document.getElementById("codeContent");
        codeContentElement.textContent = "Code Parameter not found in the URL.";
    }
});

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

document.getElementById("getRepos").addEventListener("click", function () {
    // Retrieve the token from the cookie
    token = getCookie('test')

    if (!token) {
        console.error(`Token not found in the cookie. ${cookies}`);
        return;
    }

    const apiUrl = "https://api.github.com/user/repos";

    fetch(apiUrl, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    .then((response) => response.json())
    .then((data) => {
        displayRepositories(data);
    })
    .catch((error) => {
        console.error("Error fetching repositories:", error);
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

if (!token) {
  console.error(`Cookie "${cookieName}" not found or token is empty.`);
  process.exit(1);
}

// Initialize Octokit with the token
const octokit = new Octokit({
  auth: `token ${token}`,
});

// Fetch private repositories
async function getPrivateRepositories() {
  try {
    const response = await octokit.repos.listForAuthenticatedUser({
      visibility: 'private',
    });

    // Process the list of private repositories
    const privateRepos = response.data;
    console.log('Private Repositories:');
    privateRepos.forEach((repo) => {
      console.log(repo.full_name);
    });
  } catch (error) {
    console.error('Error fetching private repositories:', error.message);
  }
}

getPrivateRepositories();
