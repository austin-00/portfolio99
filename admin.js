document.addEventListener("DOMContentLoaded", function () {
    const correctPassword = "alan123"; // 🔐 Set your admin password
    const loginSection = document.getElementById("login-section");
    const messageSection = document.getElementById("message-section");
    const loginButton = document.getElementById("admin-login-btn");
    const passwordInput = document.getElementById("admin-password");

    if (loginButton) {
        loginButton.addEventListener("click", function () {
            const enteredPassword = passwordInput.value.trim();
            if (enteredPassword === correctPassword) {
                loginSection.style.display = "none";
                messageSection.style.display = "block";
                loadMessages();
            } else {
                alert("Incorrect password!");
            }
        });
    }

    function loadMessages() {
        const messages = JSON.parse(localStorage.getItem("contactMessages")) || [];
        const container = document.getElementById("messages-container");
        container.innerHTML = "";

        if (messages.length === 0) {
            container.innerHTML = "<p>No messages found.</p>";
            return;
        }

        messages.forEach((msg, index) => {
            const card = document.createElement("div");
            card.className = "message-card";
            card.innerHTML = `
                <strong>${msg.name}</strong><br>
                <em>${msg.email}</em><br>
                <p>${msg.message}</p>
                <small>${msg.timestamp}</small>
            `;
            container.appendChild(card);
        });
    }

    const clearBtn = document.getElementById("clear-btn");
    if (clearBtn) {
        clearBtn.addEventListener("click", function () {
            if (confirm("Are you sure you want to delete all messages?")) {
                localStorage.removeItem("contactMessages");
                loadMessages();
            }
        });
    }
});
