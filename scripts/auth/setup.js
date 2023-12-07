import { Octokit, App } from "https://esm.sh/octokit";
import { checkToken } from "./checkToken.js"


document.addEventListener("DOMContentLoaded", function() {
    if (checkToken()) {
        window.location.replace("https://some16.github.io/DemoProjectEditor/editor.html");
    }

    const urlParams = new URLSearchParams(window.location.search);
    const codeParam = urlParams.get("code");

    if (codeParam) {
        console.log("codeParam exists!")

        const proxyUrl = `https://gatekeeper-n0qw.onrender.com/authenticate/${codeParam}`;
        fetch(proxyUrl)
        .then(response => response.json())
        .then(data => {
            document.cookie = `githubToken=${data.token}`;
            window.location.replace("https://some16.github.io/DemoProjectEditor/editor.html");
        })
        .catch(error => {
            console.error("Error:", error);
        });
    }
});


// document.addEventListener("DOMContentLoaded", function() {
//     const urlParams = new URLSearchParams(window.location.search);
//     const codeParam = urlParams.get("code");

//     // Get token
//     if (codeParam) {
//         const gatekeeperUrl = `https://gatekeeper-n0qw.onrender.com/authenticate/${codeParam}`;
        
//         fetch(gatekeeperUrl)
//         .then(response => response.json())
//         .then(data => {
//             document.cookie = `test=${data.token}`;
//             console.log(data);
//         })
//         .catch(error => {
//             console.error("Error:", error);
//         });


//     // If not token found
//     } else {

//         const codeContentElement = document.getElementById("codeContent");
//         codeContentElement.textContent = "Code Parameter not found in the URL.";
//     }
// });

// document.getElementById("getRepos").addEventListener("click", function () {
//     // Retrieve the token from the cookie
//     token = getCookie('test')

//     if (!token) {
//         console.error(`Token not found in the cookie. ${cookies}`);
//         return;
//     }

//     const apiUrl = "https://api.github.com/user/repos";

//     fetch(apiUrl, {
//         method: "GET",
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//     })
//     .then((response) => response.json())
//     .then((data) => {
//         displayRepositories(data);
//     })
//     .catch((error) => {
//         console.error("Error fetching repositories:", error);
//     });
// });

// function displayRepositories(repositories) {
//     const repoListElement = document.getElementById("repoList");
//     repoListElement.innerHTML = "";

//     if (repositories.length === 0) {
//         repoListElement.textContent = "No repositories found.";
//         return;
//     }

//     const ul = document.createElement("ul");
//     repositories.forEach((repo) => {
//         const li = document.createElement("li");
//         li.textContent = repo.name;
//         ul.appendChild(li);
//     });

//     repoListElement.appendChild(ul);
// }

// if (!token) {
//   console.error(`Cookie "${cookieName}" not found or token is empty.`);
// }

// // Initialize Octokit with the token
// const octokit = new Octokit({
//   auth: `token ${token}`,
// });

// octokit.rest.repos.listForAuthenticatedUser({
//   visibility: 'private',
// }).then(({ data }) => {
//   displayRepositories(data);
//   console.log(data);
// }).catch((error) => {
//   // handle any errors
//   console.error(error);
// });

// // octokit.rest.repos.listForAuthenticatedUser({
// //   affiliation: "owner,collaborator,organization_member"
// // }).then(({ data }) => {
// //   // Filter repositories with write or admin permission
// //   const reposWithWriteAccess = data.filter(repo => 
// //     repo.permissions.admin || repo.permissions.push
// //   );
// // displayRepositories(reposWithWriteAccess);

// //   console.log(reposWithWriteAccess);
// // }).catch(error => {
// //   console.error("Error fetching repositories:", error);
// // });

