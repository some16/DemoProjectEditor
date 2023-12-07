import { Octokit, App } from "https://esm.sh/octokit";
import { checkToken } from "./checkToken.js"


document.addEventListener("DOMContentLoaded", function() {
    checkToken()
    .then(result => {
        console.debug("Token is good, redirecting to editor")
        if (result) {window.location.replace("https://some16.github.io/DemoProjectEditor/editor.html")}
    })
    .catch(error => {
        console.debug("Token is bad")
        console.log(error)
    });



    const urlParams = new URLSearchParams(window.location.search);
    const codeParam = urlParams.get("code");

    if (codeParam) {
        console.log("codeParam exists!")
        console.debug(`Code Param: ${codeParam}`)

        const proxyUrl = `https://gatekeeper-n0qw.onrender.com/authenticate/${codeParam}`;
        fetch(proxyUrl)
        .then(response => response.json())
        .then(data => {
            console.log("TOKEN GOTTEN")
            document.cookie = `githubToken=${data.token}`;
            console.debug(`Data: ${data}`)
            // window.location.replace("https://some16.github.io/DemoProjectEditor/editor.html");
        })
        .catch(error => {
            console.log("TOKEN NOT GOTTEN")
            console.error("Error:", error);
        });
    }
});