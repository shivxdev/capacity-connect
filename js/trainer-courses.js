/* =========================================================
   CAPACITY CONNECT
   TRAINER COURSES JS
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* AUTH */

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


    /* TRAINER NAME */

    const trainerName =
        localStorage.getItem("capacityConnectName") ||
        localStorage.getItem("capacityConnectUser") ||
        "Trainer";


    const headerName =
        document.getElementById("headerName");

    if (headerName) {
        headerName.textContent = trainerName;
    }


    /* INITIALS */

    function getInitials(name) {

        const words =
            name.trim().split(/\s+/);

        if (words.length === 1) {
            return words[0]
                .substring(0, 2)
                .toUpperCase();
        }

        return (
            words[0][0] +
            words[words.length - 1][0]
        ).toUpperCase();
    }


    const avatar =
        document.getElementById("headerAvatar");

    if (avatar) {
        avatar.textContent =
            getInitials(trainerName);
    }


    /* SEARCH + FILTER */

    const searchInput =
        document.getElementById("courseSearch");

    const filter =
        document.getElementById("courseFilter");

    const courseCards =
        document.querySelectorAll(".trainer-course-card");

    const emptyState =
        document.getElementById("coursesEmpty");


    function filterCourses() {

        const searchValue =
            searchInput.value
                .trim()
                .toLowerCase();

        const filterValue =
            filter.value;

        let visibleCount = 0;


        courseCards.forEach(function (card) {

            const title =
                card.dataset.title.toLowerCase();

            const status =
                card.dataset.status;

            const matchesSearch =
                title.includes(searchValue);

            const matchesFilter =
                filterValue === "all" ||
                filterValue === status;


            if (
                matchesSearch &&
                matchesFilter
            ) {

                card.style.display = "";

                visibleCount++;

            } else {

                card.style.display = "none";

            }

        });


        if (emptyState) {

            emptyState.style.display =
                visibleCount === 0
                    ? "block"
                    : "none";

        }

    }


    if (searchInput) {
        searchInput.addEventListener(
            "input",
            filterCourses
        );
    }


    if (filter) {
        filter.addEventListener(
            "change",
            filterCourses
        );
    }


    /* MOBILE SIDEBAR */

    const mobileMenu =
        document.getElementById("mobileMenu");

    const sidebar =
        document.getElementById("sidebar");


    if (mobileMenu && sidebar) {

        mobileMenu.addEventListener(
            "click",
            function () {

                sidebar.classList.toggle("open");

            }
        );

    }


    /* LOGOUT */

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

});