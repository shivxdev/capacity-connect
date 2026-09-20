/* =====================================================
   CAPACITY CONNECT
   TRAINEE PROFILE JS
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       AUTH CHECK
    ========================================== */

    const isLoggedIn =
        localStorage.getItem("capacityConnectLoggedIn");

    const role =
        localStorage.getItem("capacityConnectRole");

    if (isLoggedIn !== "true" || role !== "trainee") {
        window.location.href = "../login.html";
        return;
    }


    /* =========================================
       USER DATA
    ========================================== */

    const storedUser =
        localStorage.getItem("capacityConnectUser");

    const storedName =
        localStorage.getItem("capacityConnectName");

    const userName =
        storedName ||
        storedUser ||
        "Shivam Kumar";


    const storedEmail =
        localStorage.getItem("capacityConnectEmail") ||
        "shivam@example.com";


    /* =========================================
       PROFILE ELEMENTS
    ========================================== */

    const headerName =
        document.getElementById("headerName");

    const profileName =
        document.getElementById("profileName");

    const fullName =
        document.getElementById("fullName");

    const profileEmail =
        document.getElementById("profileEmail");

    const emailAddress =
        document.getElementById("emailAddress");

    const headerAvatar =
        document.getElementById("headerAvatar");

    const profileAvatar =
        document.getElementById("profileAvatar");


    /* =========================================
       SET USER DATA
    ========================================== */

    if (headerName) {
        headerName.textContent = userName;
    }

    if (profileName) {
        profileName.textContent = userName;
    }

    if (fullName) {
        fullName.textContent = userName;
    }

    if (profileEmail) {
        profileEmail.textContent = storedEmail;
    }

    if (emailAddress) {
        emailAddress.textContent = storedEmail;
    }


    /* =========================================
       AVATAR
    ========================================== */

    const firstLetter =
        userName.trim().charAt(0).toUpperCase();

    if (headerAvatar) {
        headerAvatar.textContent = firstLetter;
    }

    if (profileAvatar) {
        profileAvatar.textContent = firstLetter;
    }


    /* =========================================
       EDIT PROFILE
    ========================================== */

    const editProfileBtn =
        document.getElementById("editProfileBtn");


    if (editProfileBtn) {

        editProfileBtn.addEventListener(
            "click",
            () => {

                alert(
                    "Profile editing will be connected to the backend later."
                );

            }
        );

    }


    /* =========================================
       MOBILE SIDEBAR
    ========================================== */

    const mobileMenu =
        document.getElementById("mobileMenu");

    const sidebar =
        document.getElementById("sidebar");


    if (mobileMenu && sidebar) {

        mobileMenu.addEventListener(
            "click",
            () => {

                sidebar.classList.toggle("open");

            }
        );

    }


    /* =========================================
       LOGOUT
    ========================================== */

    const logoutBtn =
        document.getElementById("logoutBtn");


    if (logoutBtn) {

        logoutBtn.addEventListener(
            "click",
            () => {

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

});