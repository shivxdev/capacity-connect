/* =====================================================
   CAPACITY CONNECT
   CERTIFICATES PAGE
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

    const userName =
        localStorage.getItem("capacityConnectName") ||
        "Shivam Kumar";


    const userNameElement =
        document.getElementById("userName");

    const certificateName =
        document.getElementById("certificateName");

    const userAvatar =
        document.getElementById("userAvatar");


    if (userNameElement) {
        userNameElement.textContent = userName;
    }

    if (certificateName) {
        certificateName.textContent = userName;
    }

    if (userAvatar) {
        userAvatar.textContent =
            userName.charAt(0).toUpperCase();
    }


    /* =========================================
       ASSESSMENT SCORE
    ========================================== */

    const savedScore =
        localStorage.getItem(
            "capacityConnectAssessmentScore"
        );

    const certificateScore =
        document.getElementById("certificateScore");


    if (savedScore && certificateScore) {

        /*
            Demo certificate currently belongs
            to Professional Communication Skills.

            The assessment score can be used here
            when the actual course assessment is
            connected later.
        */

        certificateScore.textContent =
            savedScore + "%";
    }


    /* =========================================
       VIEW CERTIFICATE
    ========================================== */

    const viewCertificateBtn =
        document.getElementById(
            "viewCertificateBtn"
        );


    if (viewCertificateBtn) {

        viewCertificateBtn.addEventListener(
            "click",
            () => {

                const certificate =
                    document.querySelector(
                        ".certificate-inner"
                    );

                if (!certificate) return;

                certificate.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            }
        );
    }


    /* =========================================
       PRINT CERTIFICATE
    ========================================== */

    const printCertificateBtn =
        document.getElementById(
            "printCertificateBtn"
        );


    if (printCertificateBtn) {

        printCertificateBtn.addEventListener(
            "click",
            () => {

                window.print();

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

                window.location.href =
                    "../login.html";

            }
        );
    }

});