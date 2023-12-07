import { Octokit, App } from "https://esm.sh/octokit";
import { checkToken } from "./checkToken.js"


document.addEventListener("DOMContentLoaded", function() {
    checkToken()
    .then(result => {
        if (result) {window.location.replace("https://some16.github.io/DemoProjectEditor/editor.html")}
    })
    .catch(error => {
        console.log(error)
    });



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