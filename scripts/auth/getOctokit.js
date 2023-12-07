import { Octokit, App } from "https://esm.sh/octokit";

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

function getOctokit() {
    var token = getCookie('githubToken');
    var octokit = new Octokit({ auth: `token ${token}` });
    return octokit;
}