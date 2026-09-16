/* =========================================
   CAPACITY CONNECT
   TRAINING COURSES JS
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================
       LOGIN CHECK
    ===================================== */

    const isLoggedIn =
        localStorage.getItem("capacityConnectLoggedIn");

    const role =
        localStorage.getItem("capacityConnectRole");


    if (
        isLoggedIn !== "true" ||
        role !== "trainee"
    ) {

        window.location.href = "../login.html";

        return;
    }


    /* =====================================
       USER DATA
    ===================================== */

    let userName =
        localStorage.getItem("capacityConnectUser")
        || "Shivam Kumar";


    if (
        userName.includes("@") ||
        /^[0-9]+$/.test(userName)
    ) {

        userName = "Shivam Kumar";

    }


    const sidebarUserName =
        document.getElementById("sidebarUserName");

    const headerUserName =
        document.getElementById("headerUserName");


    if (sidebarUserName) {
        sidebarUserName.textContent = userName;
    }

    if (headerUserName) {
        headerUserName.textContent = userName;
    }


    /* =====================================
       MOBILE MENU
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
       COURSE SEARCH
    ===================================== */

    const searchInput =
        document.getElementById("courseSearch");

    const courseCards =
        document.querySelectorAll(".course-card");

    const courseCount =
        document.getElementById("courseCount");

    const noResults =
        document.getElementById("noResults");


    let selectedCategory = "all";


    function filterCourses() {

        const searchValue =
            searchInput.value
            .toLowerCase()
            .trim();


        let visibleCount = 0;


        courseCards.forEach(function (card) {

            const category =
                card.dataset.category;

            const title =
                card.dataset.title.toLowerCase();


            const categoryMatch =
                selectedCategory === "all" ||
                category === selectedCategory;


            const searchMatch =
                title.includes(searchValue);


            if (
                categoryMatch &&
                searchMatch
            ) {

                card.style.display = "";

                visibleCount++;

            } else {

                card.style.display = "none";

            }

        });


        courseCount.textContent =
            visibleCount +
            (visibleCount === 1
                ? " Course"
                : " Courses");


        if (visibleCount === 0) {

            noResults.style.display = "block";

        } else {

            noResults.style.display = "none";

        }

    }


    if (searchInput) {

        searchInput.addEventListener(
            "input",
            filterCourses
        );

    }


    /* =====================================
       CATEGORY FILTER
    ===================================== */

    const filterButtons =
        document.querySelectorAll(".filter-btn");


    filterButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                filterButtons.forEach(
                    function (btn) {

                        btn.classList.remove(
                            "active"
                        );

                    }
                );


                this.classList.add("active");


                selectedCategory =
                    this.dataset.category;


                filterCourses();

            }
        );

    });


    /* =====================================
       NAVIGATION ACTIVE STATE
    ===================================== */

    const navItems =
        document.querySelectorAll(".nav-item");


    navItems.forEach(function (item) {

        item.addEventListener(
            "click",
            function () {

                if (
                    this.getAttribute("href") === "#"
                ) {

                    return;

                }


                navItems.forEach(
                    function (nav) {

                        nav.classList.remove(
                            "active"
                        );

                    }
                );


                this.classList.add("active");

            }
        );

    });

});