document.addEventListener("DOMContentLoaded", () => {
  //Loading effects
  const progressBar = document.getElementById("bar");
  const loadingGif = document.getElementById("loading_gif");
  const percentText = document.getElementById("percent");

  if (progressBar && loadingGif && percentText) {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 1;

      progressBar.style.width = progress + "%";
      loadingGif.style.left = progress + "%";
      percentText.innerText = progress + "%";

      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          window.location.href = "portfolio.html";
        }, 500);
      }
    }, 50);
  }

  //Navbar effects
  const links = document.querySelectorAll(".navbar .nav-link");
  const sections = document.querySelectorAll("section");
  const navbarHeight = document.querySelector(".navbar").offsetHeight;

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetID = link.getAttribute("href");
      const targetSection = document.querySelector(targetID);

      if (targetSection) {
        const sectionTop = targetSection.offsetTop - navbarHeight;

        window.scrollTo({
          top: sectionTop,
          behavior: "smooth",
        });

        links.forEach((l) => l.classList.remove("active"));
        link.classList.add("active");
      }
    });
  });

  const brand = document.querySelector(".navbar-brand");
  brand.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });

    links.forEach((l) => l.classList.remove("active"));
    document
      .querySelector('.navbar .nav-link[href="#about"]')
      .classList.add("active");
  });

  const updateActiveLink = () => {
    const scrollPos = window.scrollY + navbarHeight + 5;

    if (window.scrollY < 10) {
      links.forEach((l) => l.classList.remove("active"));
      document
        .querySelector('.navbar .nav-link[href="#about"]')
        .classList.add("active");
      return;
    }

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const id = section.getAttribute("id");

      const link = document.querySelector(`.navbar .nav-link[href="#${id}"]`);

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        links.forEach((l) => l.classList.remove("active"));
        link.classList.add("active");
      }
    });
  };

  window.addEventListener("scroll", updateActiveLink);

  updateActiveLink();

  //Typing effects
  const degreeText = "Bachelor of Science in Information Technology Graduate";
  const degreeElement = document.getElementById("degree");
  let i = 0;

  function typeDegree() {
    if (i < degreeText.length) {
      degreeElement.textContent += degreeText.charAt(i);
      i++;
      setTimeout(typeDegree, 50);
    }
  }

  setTimeout(typeDegree, 500);

  //AOS
  AOS.init({
    duration: 1000,
    once: true,
  });

  //Automatically go to top if refresh page
  history.scrollRestoration = "manual";
  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  };

  //EmailJs
  emailjs.init("ivq-LXUL3njryviHp");

  //Chatbot
  const chatBotButton = document.getElementById("chatBotButton");
  const chatWindow = document.getElementById("chatWindow");
  const closeChat = document.getElementById("closeChat");
  const sendMessage = document.getElementById("sendMessage");
  const userInput = document.getElementById("userInput");
  const chatBody = document.getElementById("chatBody");

  chatBotButton.addEventListener("click", () => {
    chatWindow.classList.toggle("d-none");
  });

  closeChat.addEventListener("click", () => {
    chatWindow.classList.add("d-none");
  });

  const handleChat = () => {
    const text = userInput.value.trim().toLowerCase();
    if (!text) return;

    appendMessage(userInput.value, "user-msg");
    userInput.value = "";

    setTimeout(() => {
      let response = "I can’t answer that accurately.";

      if (text.includes("hello") || text.includes("hi"))
        response = "Hello! How can I help you learn more about Mark today?";
      else if (text.includes("experience"))
        response =
          "His experience includes system development and providing IT-related solutions.";
      else if (text.includes("skills"))
        response =
          "His skills include programming, database administration, and clerical work.";
      else if (text.includes("education"))
        response =
          "His education is in Information Technology, where he gained knowledge in both software and hardware systems.";
      else if (text.includes("projects"))
        response =
          "His projects include web and mobile applications, such as the ALERT: Agriculturist Licensure Examination Review Tool, designed to help students prepare for exams. Other projects are not listed to maintain the privacy of the companies involved.";
      else if (text.includes("hobbies"))
        response =
          "His hobbies include gaming, fitness, and exploring new technologies.";
      else if (text.includes("contact"))
        response =
          "His contact information is available on the portfolio 'Get in Touch', and he can be reached via email or social media links provided.";
      else if (text.includes("location"))
        response = "His location is in the Philippines.";
      else if (text.includes("availability"))
        response =
          "His availability for work is flexible, and he is open to opportunities.";
      else if (text.includes("achievements"))
        response =
          "His achievements include developing practical software applications and gaining hands-on experience in IT and programming.";
      else if (text.includes("strength") || text.includes("strengths"))
        response =
          "His strengths are problem-solving, adaptability, and learning new technologies quickly.";
      else if (text.includes("weakness") || text.includes("weaknesses"))
        response =
          "His weakness is that he is continuously improving his communication skills, and he is enhancing them by interacting with different people regularly.";

      appendMessage(response, "bot-msg");
    }, 600);
  };

  function appendMessage(msg, className) {
    const div = document.createElement("div");
    div.className = className;
    div.textContent = msg;
    chatBody.appendChild(div);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  sendMessage.addEventListener("click", handleChat);
  userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleChat();
  });
});

//EmailJs
function sendMail() {
  const params = {
    name: document.getElementById("name").value,
    message: document.getElementById("message").value,
  };

  emailjs
    .send("service_e1kk2rh", "template_uj2p6jz", params)
    .then(() => {
      alert("Message sent!");
      document.getElementById("name").value = "";
      document.getElementById("message").value = "";
    })
    .catch((error) => {
      console.error(error);
      alert("Failed to send message.");
    });
}
