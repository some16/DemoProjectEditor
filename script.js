document.addEventListener("DOMContentLoaded", function() {
    // Get the URL parameter "code"
    const urlParams = new URLSearchParams(window.location.search);
    const codeParam = urlParams.get("code");

    // Check if the "code" parameter is present in the URL
    if (codeParam) {
        // Display the code parameter's value in the "codeContent" div
        const codeContentElement = document.getElementById("codeContent");
        codeContentElement.textContent = `Code Parameter: ${codeParam}`;
    } else {
        // If the "code" parameter is not found, display a message
        const codeContentElement = document.getElementById("codeContent");
        codeContentElement.textContent = "Code Parameter not found in the URL.";
    }
});
