// =========================
// MOBILE MENU
// =========================

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", function () {
    navLinks.classList.toggle("show");
});


// =========================
// CLOSE MENU AFTER CLICK
// =========================

const links = document.querySelectorAll(".nav-links a");

links.forEach(function (link) {

    link.addEventListener("click", function () {
        navLinks.classList.remove("show");
    });

});


// =========================
// ACTIVE NAV LINK
// =========================

window.addEventListener("scroll", function () {

    const sections = document.querySelectorAll("section");

    const scrollPosition = window.scrollY + 150;

    sections.forEach(function (section) {

        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id");

        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
        ) {

            links.forEach(function (link) {
                link.classList.remove("active");
            });

            const activeLink = document.querySelector(
                '.nav-links a[href="#' + sectionId + '"]'
            );

            if (activeLink) {
                activeLink.classList.add("active");
            }

        }

    });

});


// =========================
// SIMPLE SCROLL ANIMATION
// =========================

const revealElements = document.querySelectorAll(".reveal");

function revealOnScroll() {

    revealElements.forEach(function (element) {

        const position = element.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;

        if (position < screenHeight - 100) {
            element.classList.add("visible");
        }

    });

}

window.addEventListener("scroll", revealOnScroll);

revealOnScroll();


// =========================
// CONTACT FORM
// =========================

const contactForm = document.getElementById("contactForm");

const submitBtn = document.getElementById("submitBtn");

const formStatus = document.getElementById("formStatus");


contactForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();

    const email = document.getElementById("email").value.trim();

    const message = document.getElementById("message").value.trim();


    // Check empty fields

    if (!name || !email || !message) {

        formStatus.textContent = "Please fill in all fields.";

        formStatus.className = "form-status error";

        return;
    }


    // Loading state

    submitBtn.disabled = true;

    submitBtn.innerHTML =
        'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';

    formStatus.textContent = "";


    try {

        const response = await fetch(
            "http://localhost:3000/messages",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name: name,
                    email: email,
                    message: message
                })
            }
        );


        const data = await response.json();


        if (!response.ok) {
            throw new Error(
                data.message || "Something went wrong."
            );
        }


        // Success

        formStatus.textContent =
            "Message sent successfully! Thank you.";

        formStatus.className = "form-status success";


        contactForm.reset();


    } catch (error) {

        console.error("Contact form error:", error);

        formStatus.textContent =
            "Failed to send message. Please try again.";

        formStatus.className = "form-status error";


    } finally {

        submitBtn.disabled = false;

        submitBtn.innerHTML =
            'Send Message <i class="fa-solid fa-paper-plane"></i>';

    }

});