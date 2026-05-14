const toggleBtn = document.getElementById("themeToggle");
const icon = document.getElementById("themeIcon");

// Detect system theme
const systemDark = window.matchMedia("(prefers-color-scheme: dark)");

// Load saved theme OR system theme
if(localStorage.getItem("theme")) {
  if(localStorage.getItem("theme") === "light") {
    document.body.classList.add("light-mode");
    icon.innerHTML = "☀️";
  }
} 
else if (!systemDark.matches) {
  document.body.classList.add("light-mode");
  icon.innerHTML = "☀️";
}

// Button click toggle
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");

  if(document.body.classList.contains("light-mode")) {
    icon.innerHTML = "☀️";
    localStorage.setItem("theme", "light");
  } 
  else {
    icon.innerHTML = "🌙";
    localStorage.setItem("theme", "dark");
  }
});



let words = document.querySelectorAll(".word");
words.forEach((word)=>{
    let letters = word.textContent.split("");
    word.textContent="";
    letters.forEach((letter)=>{
        let span = document.createElement("span");
        span.textContent = letter;
        span.className = "letter";
        word.append(span) 
    });

});
let currentWordIndex = 0;
let maxWordIndex = words.length -1;
words[currentWordIndex].style.opacity = "1";

let changeText = ()=>{
    let currentWord = words[currentWordIndex];
    let nextWord = currentWordIndex === maxWordIndex ? words[0] : words[currentWordIndex + 1];

    Array.from(currentWord.children).forEach((letter,i)=>{
        setTimeout(()=>{
            letter.className = "letter out";
        },i * 80);
    });
    nextWord.style.opacity="1";
    Array.from(nextWord.children).forEach((letter,i)=>{    
            letter.className = "letter behind";
            setTimeout(()=>{
                letter.className = "letter in";
            },340 + i *80);
        });
        currentWordIndex = currentWordIndex ===maxWordIndex ? 0 : currentWordIndex + 1;
};

changeText();
setInterval(changeText,3000)


require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/send", (req, res) => {
  const { name, email, message } = req.body;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL, // Use your email
      pass: process.env.PASSWORD, // App password or regular password
    },
  });

  let mailOptions = {
    from: email,
    to: process.env.EMAIL,
    subject: `Message from ${name}`,
    text: message,
  };

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Failed to send message." });
    }
    res.status(200).json({ success: "Message sent successfully!" });
  });
});

app.listen(5000, () => console.log("Server running on port 5000"));


document.addEventListener("DOMContentLoaded", () => {
    const progressBars = document.querySelectorAll('.progress-bar');
  
    progressBars.forEach(bar => {
      const progressValue = bar.getAttribute('data-progress');
      bar.style.width = progressValue;
      bar.textContent = progressValue;
    });
  });


// Scroll reveal animation
const revealElements = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
  revealElements.forEach(el => {
    let top = window.scrollY;
    let offset = el.offsetTop - 150;
    let height = el.offsetHeight;

    if (top >= offset && top < offset + height) {
      el.classList.add("show-section");
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const progressBars = document.querySelectorAll('.progress-bar');

  progressBars.forEach(bar => {
    const progressValue = bar.getAttribute('data-progress');
    bar.style.width = progressValue;
    bar.textContent = progressValue;
  });
});

