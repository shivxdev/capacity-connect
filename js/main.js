


// Mobile Navigation

const menuBtn = document.getElementById("menuBtn");

if (menuBtn) {

    menuBtn.addEventListener("click", function () {

        alert("Mobile navigation will be available here.");

    });

}


// Simple scroll effect

const navLinks = document.querySelectorAll(".nav-links a");

navLinks.forEach(link => {

    link.addEventListener("click", function () {

        navLinks.forEach(item => {
            item.classList.remove("active");
        });

        this.classList.add("active");

    });

});