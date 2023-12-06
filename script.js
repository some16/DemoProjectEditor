document.addEventListener("DOMContentLoaded", function() {
    // Get the URL parameter "code"
    const urlParams = new URLSearchParams(window.location.search);
    const codeParam = urlParams.get("code");

    // Check if the "code" parameter is present in the URL
    if (codeParam) {
        // Define the Gatekeeper URL
        const gatekeeperUrl = `https://gatekeeper-n0qw.onrender.com/authenticate/${codeParam}`;

        // Send a GET request to the Gatekeeper URL to request the token
        fetch(gatekeeperUrl)
        .then(response => response.json())
        .then(data => {
            // Display the token on the page
            const codeContentElement = document.getElementById("codeContent");
            codeContentElement.textContent = `Token: ${data.token}`;
        })
        .catch(error => {
            // Handle any errors that occur during the fetch request
            console.error("Error:", error);
        });
    } else {
        // If the "code" parameter is not found, display a message
        const codeContentElement = document.getElementById("codeContent");
        codeContentElement.textContent = "Code Parameter not found in the URL.";
    }
});
