const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const enquiryForm = document.querySelector("#enquiry-form");
const formMessage = document.querySelector("#form-message");
const dateInputs = document.querySelectorAll('input[type="date"]');

if (dateInputs.length) {
  const today = new Date();
  const minDate = today.toISOString().split("T")[0];
  dateInputs.forEach((input) => {
    input.min = minDate;
  });
}

if (navToggle && header) {
  navToggle.addEventListener("click", () => {
    const isOpen = header.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });

  document.querySelectorAll(".site-nav a").forEach((link) => {
    link.addEventListener("click", () => {
      header.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Open navigation");
    });
  });
}

if (enquiryForm && formMessage) {
  enquiryForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(enquiryForm);
    const name = data.get("name");
    const phone = data.get("phone");
    const company = data.get("company");
    const date = data.get("date");
    const passengers = data.get("passengers");
    const pickup = data.get("pickup");
    const details = data.get("details") || "No extra details provided.";

    const subject = encodeURIComponent(`Eeshan Group enquiry from ${name}`);
    const body = encodeURIComponent(
      `New Eeshan Group enquiry\n\n` +
        `Name: ${name}\n` +
        `Phone: ${phone}\n` +
        `Requirement: ${company}\n` +
        `Date: ${date}\n` +
        `Passengers: ${passengers}\n` +
        `Pickup location: ${pickup}\n` +
        `Details: ${details}`
    );

    formMessage.textContent = "Your enquiry email is ready. Opening an email draft now.";
    window.location.href = `mailto:eeshanlogistics@gmail.com?subject=${subject}&body=${body}`;
    enquiryForm.reset();
  });
}
