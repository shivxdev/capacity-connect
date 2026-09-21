/* =========================================================
   CAPACITY CONNECT
   TRAINER PROFILE JS
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       AUTH CHECK
    ===================================================== */

    const loggedIn =
        localStorage.getItem("capacityConnectLoggedIn");

    const role =
        localStorage.getItem("capacityConnectRole");

    if (
        loggedIn !== "true" ||
        role !== "trainer"
    ) {
        window.location.href = "../login.html";
        return;
    }


    /* =====================================================
       TRAINER DATA
    ===================================================== */

    const storedName =
        localStorage.getItem("capacityConnectName");

    const storedUser =
        localStorage.getItem("capacityConnectUser");

    const storedEmail =
        localStorage.getItem("capacityConnectEmail");


    const trainerName =
        storedName ||
        storedUser ||
        "Trainer";

    const trainerEmail =
        storedEmail ||
        "trainer@capacityconnect.org";


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const profileName =
        document.getElementById("profileName");

    const fullName =
        document.getElementById("fullName");

    const headerName =
        document.getElementById("headerName");

    const profileEmail =
        document.getElementById("profileEmail");

    const emailAddress =
        document.getElementById("emailAddress");

    const profileAvatar =
        document.getElementById("profileAvatar");

    const headerAvatar =
        document.getElementById("headerAvatar");


    /* =====================================================
       NAME
    ===================================================== */

    if (profileName) {
        profileName.textContent = trainerName;
    }

    if (fullName) {
        fullName.textContent = trainerName;
    }

    if (headerName) {
        headerName.textContent = trainerName;
    }


    /* =====================================================
       EMAIL
    ===================================================== */

    if (profileEmail) {
        profileEmail.textContent = trainerEmail;
    }

    if (emailAddress) {
        emailAddress.textContent = trainerEmail;
    }


    /* =====================================================
       INITIALS
    ===================================================== */

    function getInitials(name) {

        if (!name) {
            return "TR";
        }

        const words =
            name.trim().split(/\s+/);

        if (words.length === 1) {

            return words[0]
                .substring(0, 2)
                .toUpperCase();

        }

        return (
            words[0].charAt(0) +
            words[words.length - 1].charAt(0)
        ).toUpperCase();

    }


    const initials =
        getInitials(trainerName);


    if (profileAvatar) {
        profileAvatar.textContent = initials;
    }

    if (headerAvatar) {
        headerAvatar.textContent = initials;
    }


    /* =====================================================
       MOBILE SIDEBAR
    ===================================================== */

    const mobileMenu =
        document.getElementById("mobileMenu");

    const sidebar =
        document.getElementById("sidebar");


    if (mobileMenu && sidebar) {

        mobileMenu.addEventListener("click", function () {

            sidebar.classList.toggle("open");

        });

    }


    /* =====================================================
       SIDEBAR LINK CLICK
    ===================================================== */

    if (sidebar) {

        const links =
            sidebar.querySelectorAll(".nav-item");

        links.forEach(function (link) {

            link.addEventListener("click", function () {

                if (window.innerWidth <= 900) {

                    sidebar.classList.remove("open");

                }

            });

        });

    }


    /* =====================================================
       EDIT PROFILE
    ===================================================== */

    const editProfileBtn =
        document.getElementById("editProfileBtn");


    if (editProfileBtn) {

        editProfileBtn.addEventListener(
            "click",
            function () {

                alert(
                    "Profile editing will be connected with the backend later."
                );

            }
        );

    }


    /* =====================================================
       LOGOUT
    ===================================================== */

    const logoutBtn =
        document.getElementById("logoutBtn");


    if (logoutBtn) {

        logoutBtn.addEventListener(
            "click",
            function () {

                localStorage.removeItem(
                    "capacityConnectLoggedIn"
                );

                localStorage.removeItem(
                    "capacityConnectRole"
                );

                localStorage.removeItem(
                    "capacityConnectUser"
                );

                localStorage.removeItem(
                    "capacityConnectName"
                );

                localStorage.removeItem(
                    "capacityConnectEmail"
                );

                window.location.href =
                    "../login.html";

            }
        );

    }


    /* =====================================================
       RESIZE
    ===================================================== */

    window.addEventListener(
        "resize",
        function () {

            if (
                window.innerWidth > 900 &&
                sidebar
            ) {
                sidebar.classList.remove("open");
            }

        }
    );

});