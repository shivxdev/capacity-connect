/* =========================================
   CAPACITY CONNECT
   NOTIFICATIONS JS
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================
       AUTH CHECK
    ===================================== */

    const isLoggedIn =
        localStorage.getItem("capacityConnectLoggedIn");

    const role =
        localStorage.getItem("capacityConnectRole");

    if (isLoggedIn !== "true" || role !== "trainee") {
        window.location.href = "../login.html";
        return;
    }


    /* =====================================
       USER DETAILS
    ===================================== */

    const storedName =
        localStorage.getItem("capacityConnectName") ||
        localStorage.getItem("capacityConnectUser") ||
        "Shivam Kumar";

    const userName = document.getElementById("userName");
    const userAvatar = document.getElementById("userAvatar");

    if (userName) {
        userName.textContent = storedName;
    }

    if (userAvatar) {
        userAvatar.textContent =
            storedName.charAt(0).toUpperCase();
    }


    /* =====================================
       ELEMENTS
    ===================================== */

    const notificationList =
        document.getElementById("notificationList");

    const notificationCards =
        document.querySelectorAll(".notification-card");

    const filterButtons =
        document.querySelectorAll(".filter-btn");

    const markAllBtn =
        document.getElementById("markAllBtn");

    const unreadCount =
        document.getElementById("unreadCount");

    const sidebarBadge =
        document.getElementById("sidebarBadge");

    const headerBadge =
        document.getElementById("headerBadge");

    const emptyState =
        document.getElementById("emptyState");


    /* =====================================
       UPDATE UNREAD COUNT
    ===================================== */

    function updateUnreadCount() {

        const unreadCards =
            document.querySelectorAll(
                '.notification-card[data-read="false"]'
            );

        const count = unreadCards.length;

        if (unreadCount) {
            unreadCount.textContent = count;
        }

        if (sidebarBadge) {
            sidebarBadge.textContent = count;

            sidebarBadge.style.display =
                count === 0 ? "none" : "inline-flex";
        }

        if (headerBadge) {
            headerBadge.textContent = count;

            headerBadge.style.display =
                count === 0 ? "none" : "flex";
        }

        if (count === 0) {
            markAllBtn.disabled = true;
            markAllBtn.style.opacity = "0.5";
            markAllBtn.style.cursor = "default";
        } else {
            markAllBtn.disabled = false;
            markAllBtn.style.opacity = "1";
            markAllBtn.style.cursor = "pointer";
        }
    }


    /* =====================================
       FILTER NOTIFICATIONS
    ===================================== */

    function filterNotifications(filter) {

        let visibleCount = 0;

        notificationCards.forEach(card => {

            const type = card.dataset.type;
            const isRead = card.dataset.read === "true";

            let shouldShow = false;

            if (filter === "all") {
                shouldShow = true;
            }

            else if (filter === "unread") {
                shouldShow = !isRead;
            }

            else {
                shouldShow = type === filter;
            }


            if (shouldShow) {

                card.style.display = "grid";
                visibleCount++;

            } else {

                card.style.display = "none";

            }

        });


        /* EMPTY STATE */

        if (visibleCount === 0) {

            emptyState.classList.add("show");

        } else {

            emptyState.classList.remove("show");

        }
    }


    /* =====================================
       FILTER BUTTON EVENTS
    ===================================== */

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            filterButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            const filter =
                button.dataset.filter;

            filterNotifications(filter);

        });

    });


    /* =====================================
       MARK ALL AS READ
    ===================================== */

    markAllBtn.addEventListener("click", () => {

        notificationCards.forEach(card => {

            card.dataset.read = "true";

            card.classList.remove("unread");

            const dot =
                card.querySelector(".unread-dot");

            if (dot) {
                dot.remove();
            }

        });

        updateUnreadCount();

        const activeFilter =
            document.querySelector(".filter-btn.active");

        if (activeFilter) {
            filterNotifications(
                activeFilter.dataset.filter
            );
        }

    });


    /* =====================================
       INDIVIDUAL NOTIFICATION CLICK
    ===================================== */

    notificationCards.forEach(card => {

        card.addEventListener("click", event => {

            /*
                Don't trigger when clicking
                the action button.
            */

            if (
                event.target.classList.contains(
                    "notification-action"
                )
            ) {
                return;
            }


            if (card.dataset.read === "false") {

                card.dataset.read = "true";

                card.classList.remove("unread");

                const dot =
                    card.querySelector(".unread-dot");

                if (dot) {
                    dot.remove();
                }

                updateUnreadCount();
            }

        });

    });


    /* =====================================
       ACTION BUTTONS
    ===================================== */

    const actionButtons =
        document.querySelectorAll(
            ".notification-action"
        );

    actionButtons.forEach(button => {

        button.addEventListener("click", event => {

            event.stopPropagation();

            const action =
                button.textContent.trim();


            /* Mark parent notification as read */

            const card =
                button.closest(".notification-card");

            if (card) {

                card.dataset.read = "true";

                card.classList.remove("unread");

                const dot =
                    card.querySelector(".unread-dot");

                if (dot) {
                    dot.remove();
                }

                updateUnreadCount();
            }


            /* Navigation */

            if (action.includes("Assessment")) {

                window.location.href =
                    "assessments.html";

            }

            else if (action.includes("Certificates")) {

                window.location.href =
                    "certificates.html";

            }

            else if (action.includes("Progress")) {

                window.location.href =
                    "progress.html";

            }

            else if (
                action.includes("Course") ||
                action.includes("Training")
            ) {

                window.location.href =
                    "courses.html";

            }

            else if (
                action.includes("Resources")
            ) {

                window.location.href =
                    "learning.html";

            }

        });

    });


    /* =====================================
       MOBILE SIDEBAR
    ===================================== */

    const menuBtn =
        document.getElementById("menuBtn");

    const sidebar =
        document.getElementById("sidebar");


    if (menuBtn && sidebar) {

        menuBtn.addEventListener("click", () => {

            sidebar.classList.toggle("open");

        });

    }


    /* =====================================
       CLOSE SIDEBAR ON NAVIGATION
    ===================================== */

    const navLinks =
        document.querySelectorAll(".sidebar-nav a");

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            if (window.innerWidth <= 900) {
                sidebar.classList.remove("open");
            }

        });

    });


    /* =====================================
       LOGOUT
    ===================================== */

    const logoutBtn =
        document.getElementById("logoutBtn");

    if (logoutBtn) {

        logoutBtn.addEventListener("click", () => {

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


    /* =====================================
       INITIALIZE
    ===================================== */

    updateUnreadCount();

    filterNotifications("all");

});