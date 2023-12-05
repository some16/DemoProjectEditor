document.addEventListener("DOMContentLoaded", function() {
    // Get the URL parameter "code"
    const urlParams = new URLSearchParams(window.location.search);
    const codeParam = urlParams.get("code");

    // Check if the "code" parameter is present in the URL
    if (codeParam) {
        // GitHub OAuth parameters
        const clientId = "Iv1.e80a483cdfdf3391";
        const redirectUri = "https://some16.github.io/DemoProjectEditor/";
        const oauthUrl = "https://github.com/login/oauth/access_token";

        // Create a data object to send in the POST request
        const data = {
            client_id: clientId,
            code: codeParam,
            redirect_uri: redirectUri
        };

        // Send a POST request to the GitHub OAuth access_token endpoint
        fetch(oauthUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            // Display the result in the "codeContent" div
            const codeContentElement = document.getElementById("codeContent");
            codeContentElement.textContent = JSON.stringify(data);
        })
        .catch(error => {
            console.error("Error:", error);
            // Display an error message
            const codeContentElement = document.getElementById("codeContent");
            codeContentElement.textContent = "Error occurred while fetching access_token.";
        });
    } else {
        // If the "code" parameter is not found, display a message
        const codeContentElement = document.getElementById("codeContent");
        codeContentElement.textContent = "Code Parameter not found in the URL.";
    }
});
