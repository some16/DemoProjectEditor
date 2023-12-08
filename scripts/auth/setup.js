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
        const proxyUrl = `https://gatekeeper-n0qw.onrender.com/authenticate/${codeParam}`;
        
        console.log(`Code Param: ${codeParam}`)
        console.log(`Fetching token with ${proxyUrl}`);


        fetch(proxyUrl)
        .then(response => response.json())
        .then(data => {
            console.log(`Token received: ${data.token}`);
            document.cookie = `githubToken=${data.token}`;
            window.location.replace("https://some16.github.io/DemoProjectEditor/editor.html");
        })
        .catch(error => {
            console.error("Error:", error);
        });

        setTimeout(() => {
        console.log("This is taking longer than expected, it appears the auth proxy has spun down. It will probably be about 15 seconds. Try reloading if nothing happens for a while.");
        }, 1000); // Adjust the time (in milliseconds) as needed


    }
});