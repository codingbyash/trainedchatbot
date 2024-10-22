// app.js

function sendMessage() {
     const userMessage = document.getElementById('userInput').value;
     const chatbox = document.getElementById('chatbox');
 
     // Append user message
     const userMsgDiv = document.createElement('div');
     userMsgDiv.classList.add('message', 'user');
     userMsgDiv.textContent = `User: ${userMessage}`;
     chatbox.appendChild(userMsgDiv);
 
     // Clear the input box
     document.getElementById('userInput').value = '';
 
     // Send message to backend
     fetch(`http://localhost:5000/website?text=${userMessage}&mysession=12345`)
         .then(response => response.text())
         .then(data => {
             // Append bot response
             const botMsgDiv = document.createElement('div');
             botMsgDiv.classList.add('message', 'bot');
             botMsgDiv.textContent = `Bot: ${data}`;
             chatbox.appendChild(botMsgDiv);
             
             // Scroll to the bottom of the chatbox
             chatbox.scrollTop = chatbox.scrollHeight;
         })
         .catch(error => {
             console.error('Error:', error);
         });
 }
 