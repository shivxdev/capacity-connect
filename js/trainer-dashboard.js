/* =========================================================
   CAPACITY CONNECT
   TRAINER DASHBOARD JS
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       AUTH CHECK
    ===================================================== */

    const isLoggedIn =
        localStorage.getItem("capacityConnectLoggedIn");

    const userRole =
        localStorage.getItem("capacityConnectRole");

    if (
        isLoggedIn !== "true" ||
        userRole !== "trainer"
    ) {
        window.location.href = "../login.html";
        return;
    }


    /* =====================================================
       TRAINER INFORMATION
    ===================================================== */

    const storedName =
        localStorage.getItem("capacityConnectName");

    const storedUser =
        localStorage.getItem("capacityConnectUser");

    const trainerName =
        storedName ||
        storedUser ||
        "Trainer";


    /* =====================================================
       HEADER NAME
    ===================================================== */

    const trainerNameElement =
        document.getElementById("trainerName");

    const headerTrainerName =
        document.getElementById("headerTrainerName");

    const headerAvatar =
        document.getElementById("headerAvatar");


    if (trainerNameElement) {
        trainerNameElement.textContent = trainerName;
    }

    if (headerTrainerName) {
        headerTrainerName.textContent = trainerName;
    }


    /* =====================================================
       CREATE INITIALS
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


    if (headerAvatar) {
        headerAvatar.textContent =
            getInitials(trainerName);
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
       CLOSE SIDEBAR AFTER LINK CLICK
    ===================================================== */

    if (sidebar) {

        const sidebarLinks =
            sidebar.querySelectorAll(".nav-item");

        sidebarLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                if (
                    window.innerWidth <= 900
                ) {
                    sidebar.classList.remove("open");
                }

            });

        });

    }


    /* =====================================================
       LOGOUT
    ===================================================== */

    const logoutBtn =
        document.getElementById("logoutBtn");


    if (logoutBtn) {

        logoutBtn.addEventListener("click", function () {

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

        });

    }


    /* =====================================================
       RESPONSIVE SIDEBAR
    ===================================================== */

    window.addEventListener("resize", function () {

        if (
            window.innerWidth > 900 &&
            sidebar
        ) {
            sidebar.classList.remove("open");
        }

    });

});