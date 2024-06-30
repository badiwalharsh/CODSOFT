function sendMessage() {
    var userInput = document.getElementById("userInput").value;
    var chatbox = document.getElementById("chatbox");

    if (userInput.trim() === "") {
        return;
    }

    // Add user message to chatbox
    var userMessage = `<div class="message user"><div class="avatar"></div><div class="text">${userInput}</div></div>`;
    chatbox.innerHTML += userMessage;

    // Clear the input field
    document.getElementById("userInput").value = "";

    // Process user input
    var lowerCaseInput = userInput.toLowerCase();
    var response = "";

    if (lowerCaseInput === "hi" || lowerCaseInput === "hello" || lowerCaseInput === "hey") {
        response = "Hello! How can I assist you?";
    } else if (lowerCaseInput.includes("your name")) {
        response = "I am a simple chatbot. I am here to assist you.";
    } else if (lowerCaseInput.includes("how are you")) {
        response = "I am just a bunch of code, but I can help you!";
    } else if (lowerCaseInput.includes("translate this in")) {
        response = "I can't do that, but I can help you with other queries.";
    } else if (lowerCaseInput === "bye") {
        response = "Goodbye! Have a nice day!";
    } else if (lowerCaseInput.includes("time")) {
        response = "I can't tell the time, but you can check your device for the current time.";
    } else if (lowerCaseInput.includes("help")) {
        response = "I am here to help you with some basic inputs. You can say 'hi', ask about my name, or say 'bye' to end the conversation.";
    } else {
        response = "I'm sorry, I don't understand that. Please type again clearly.";
    }

    // Add bot response to chatbox
    var botMessage = `<div class="message bot"><div class="avatar"></div><div class="text">${response}</div></div>`;
    chatbox.innerHTML += botMessage;

    // Scroll to the bottom of the chatbox
    chatbox.scrollTop = chatbox.scrollHeight;
}
