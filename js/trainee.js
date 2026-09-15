/* =========================================
   CAPACITY CONNECT
   TRAINEE DASHBOARD JS
========================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================
       GET LOGIN DATA
    ===================================== */

    const isLoggedIn =
        localStorage.getItem("capacityConnectLoggedIn");

    const role =
        localStorage.getItem("capacityConnectRole");

    const savedUser =
        localStorage.getItem("capacityConnectUser");


    /* =====================================
       LOGIN PROTECTION
    ===================================== */

    if (
        isLoggedIn !== "true" ||
        role !== "trainee"
    ) {

        window.location.href = "../login.html";

        return;
    }


    /* =====================================
       USER NAME
    ===================================== */

    let userName =
        savedUser || "Trainee";


    /*
       Demo purpose:
       Agar login ID email ya roll number hai,
       toh dashboard par readable name show hoga.
    */

    if (
        userName.includes("@") ||
        /^[0-9]+$/.test(userName)
    ) {

        userName = "Shivam Kumar";

    }


    const firstName =
        userName.split(" ")[0];


    /* =====================================
       UPDATE USER INFORMATION
    ===================================== */

    const welcomeName =
        document.getElementById("welcomeName");

    const sidebarUserName =
        document.getElementById("sidebarUserName");

    const headerUserName =
        document.getElementById("headerUserName");


    if (welcomeName) {

        welcomeName.textContent =
            firstName;

    }


    if (sidebarUserName) {

        sidebarUserName.textContent =
            userName;

    }


    if (headerUserName) {

        headerUserName.textContent =
            userName;

    }


    /* =====================================
       MOBILE SIDEBAR
    ===================================== */

    const mobileMenu =
        document.getElementById("mobileMenu");

    const sidebar =
        document.getElementById("sidebar");


    if (
        mobileMenu &&
        sidebar
    ) {

        mobileMenu.addEventListener(
            "click",
            function () {

                sidebar.classList.toggle("open");

            }
        );

    }


    /* =====================================
       LOGOUT
    ===================================== */

    const logoutBtn =
        document.getElementById("logoutBtn");


    if (logoutBtn) {

        logoutBtn.addEventListener(
            "click",
            function () {

                const confirmLogout =
                    confirm(
                        "Are you sure you want to logout?"
                    );


                if (!confirmLogout) {
                    return;
                }


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
                    "capacityConnectRemember"
                );


                window.location.href =
                    "../login.html";

            }
        );

    }


    /* =====================================
       NAVIGATION ACTIVE STATE
    ===================================== */

    const navItems =
        document.querySelectorAll(".nav-item");


    navItems.forEach(function (item) {

        item.addEventListener(
            "click",
            function () {

                navItems.forEach(
                    function (nav) {

                        nav.classList.remove(
                            "active"
                        );

                    }
                );


                this.classList.add(
                    "active"
                );

            }
        );

    });

});