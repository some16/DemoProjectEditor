import { Octokit, App } from "https://esm.sh/octokit";

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

export function checkToken() {
    return new Promise((resolve, reject) => {
        var token = getCookie('githubToken');
        var octokit = new Octokit({ auth: `token ${token}` });

        octokit.request('GET /user')
            .then(response => {
                resolve(true);
            })
            .catch(error => {
                window.location.replace("https://some16.github.io/DemoProjectEditor/index.html");
                reject(false);
            });
    });
}
checkToken();