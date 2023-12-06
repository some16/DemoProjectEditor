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
