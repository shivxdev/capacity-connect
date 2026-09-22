/* =========================================
   CREATE TRAINING
   CAPACITY CONNECT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* -----------------------------------------
       AUTH CHECK
    ----------------------------------------- */

    const loggedIn = localStorage.getItem("capacityConnectLoggedIn");
    const role = localStorage.getItem("capacityConnectRole");

    if (loggedIn !== "true" || role !== "trainer") {
        window.location.href = "../login.html";
        return;
    }


    /* -----------------------------------------
       TRAINER NAME
    ----------------------------------------- */

    const storedName =
        localStorage.getItem("capacityConnectName") ||
        localStorage.getItem("capacityConnectUser") ||
        "Trainer";

    const headerName = document.getElementById("headerName");
    const headerAvatar = document.getElementById("headerAvatar");

    if (headerName) {
        headerName.textContent = storedName;
    }

    if (headerAvatar) {
        const initials = storedName
            .split(" ")
            .filter(Boolean)
            .slice(0, 2)
            .map(word => word.charAt(0).toUpperCase())
            .join("");

        headerAvatar.textContent = initials || "TR";
    }


    /* -----------------------------------------
       COURSE FORM ELEMENTS
    ----------------------------------------- */

    const courseTitle = document.getElementById("courseTitle");
    const description = document.getElementById("description");
    const duration = document.getElementById("duration");
    const modules = document.getElementById("modules");

    const previewTitle = document.getElementById("previewTitle");
    const previewDescription = document.getElementById("previewDescription");
    const previewDuration = document.getElementById("previewDuration");
    const previewModules = document.getElementById("previewModules");

    const charCount = document.getElementById("charCount");


    /* -----------------------------------------
       LIVE PREVIEW
    ----------------------------------------- */

    function updatePreview() {

        if (courseTitle.value.trim()) {
            previewTitle.textContent = courseTitle.value.trim();
        } else {
            previewTitle.textContent = "Your training title";
        }


        if (description.value.trim()) {
            previewDescription.textContent = description.value.trim();
        } else {
            previewDescription.textContent =
                "Your training description will appear here.";
        }


        previewDuration.textContent =
            duration.value.trim() || "--";

        previewModules.textContent =
            modules.value.trim() || "--";


        charCount.textContent =
            description.value.length;
    }


    courseTitle.addEventListener("input", updatePreview);
    description.addEventListener("input", updatePreview);
    duration.addEventListener("input", updatePreview);
    modules.addEventListener("input", updatePreview);


    /* -----------------------------------------
       TRAINING OUTCOMES
    ----------------------------------------- */

    const outcomesContainer =
        document.getElementById("outcomesContainer");

    const addOutcomeBtn =
        document.getElementById("addOutcomeBtn");


    function updateOutcomeNumbers() {

        const rows =
            outcomesContainer.querySelectorAll(".outcome-row");

        rows.forEach((row, index) => {

            const number = row.querySelector("span");

            if (number) {
                number.textContent = index + 1;
            }

        });
    }


    function addOutcome() {

        const row =
            document.createElement("div");

        row.className = "outcome-row";

        row.innerHTML = `
            <span>1</span>

            <input
                type="text"
                placeholder="Enter a measurable training outcome"
            >

            <button
                type="button"
                class="remove-outcome"
            >
                ×
            </button>
        `;

        outcomesContainer.appendChild(row);

        updateOutcomeNumbers();

        row.querySelector("input").focus();
    }


    addOutcomeBtn.addEventListener("click", addOutcome);


    outcomesContainer.addEventListener("click", (event) => {

        const removeButton =
            event.target.closest(".remove-outcome");

        if (!removeButton) {
            return;
        }

        const rows =
            outcomesContainer.querySelectorAll(".outcome-row");

        if (rows.length === 1) {
            rows[0].querySelector("input").value = "";
            return;
        }

        removeButton
            .closest(".outcome-row")
            .remove();

        updateOutcomeNumbers();
    });


    /* -----------------------------------------
       SAVE DRAFT
    ----------------------------------------- */

    const saveDraftBtn =
        document.getElementById("saveDraftBtn");


    saveDraftBtn.addEventListener("click", () => {

        const draft = {

            title: courseTitle.value.trim(),

            category:
                document.getElementById("category").value,

            level:
                document.getElementById("level").value,

            description:
                description.value.trim(),

            duration:
                duration.value.trim(),

            modules:
                modules.value.trim(),

            savedAt:
                new Date().toISOString()

        };


        localStorage.setItem(
            "capacityConnectCourseDraft",
            JSON.stringify(draft)
        );


        showMessage(
            "Training course saved as draft.",
            "success"
        );
    });


    /* -----------------------------------------
       CONTINUE
    ----------------------------------------- */

    const continueBtn =
        document.getElementById("continueBtn");


    continueBtn.addEventListener("click", () => {

        const title =
            courseTitle.value.trim();

        const category =
            document.getElementById("category").value;

        const level =
            document.getElementById("level").value;

        const descriptionValue =
            description.value.trim();


        if (!title) {
            showMessage(
                "Please enter a training course title.",
                "error"
            );

            courseTitle.focus();
            return;
        }


        if (!category) {
            showMessage(
                "Please select a training category.",
                "error"
            );

            document
                .getElementById("category")
                .focus();

            return;
        }


        if (!level) {
            showMessage(
                "Please select the training level.",
                "error"
            );

            document
                .getElementById("level")
                .focus();

            return;
        }


        if (!descriptionValue) {
            showMessage(
                "Please add a training description.",
                "error"
            );

            description.focus();
            return;
        }


        const selectedCompetencies =
            Array.from(
                document.querySelectorAll(
                    ".competency-option input:checked"
                )
            ).map(input => input.value);


        const outcomes =
            Array.from(
                outcomesContainer.querySelectorAll("input")
            )
            .map(input => input.value.trim())
            .filter(Boolean);


        const courseData = {

            title,

            category,

            level,

            description:
                descriptionValue,

            duration:
                duration.value.trim(),

            modules:
                modules.value.trim(),

            competencies:
                selectedCompetencies,

            outcomes,

            status:
                "draft",

            createdBy:
                storedName,

            createdAt:
                new Date().toISOString()

        };


        localStorage.setItem(
            "capacityConnectNewCourse",
            JSON.stringify(courseData)
        );


        /*
         * Next page will be:
         * Module creation / training structure.
         */

        window.location.href = "create-modules.html";

    });


    /* -----------------------------------------
       MESSAGE
    ----------------------------------------- */

    function showMessage(message, type) {

        const existing =
            document.querySelector(".form-message");

        if (existing) {
            existing.remove();
        }


        const messageBox =
            document.createElement("div");

        messageBox.className =
            `form-message ${type}`;

        messageBox.textContent = message;


        document
            .querySelector(".form-actions")
            .before(messageBox);


        setTimeout(() => {

            messageBox.remove();

        }, 3000);
    }


    /* -----------------------------------------
       MOBILE SIDEBAR
    ----------------------------------------- */

    const mobileMenuBtn =
        document.getElementById("mobileMenuBtn");

    const sidebar =
        document.getElementById("sidebar");


    if (mobileMenuBtn && sidebar) {

        mobileMenuBtn.addEventListener("click", () => {

            sidebar.classList.toggle("active");

        });

    }


    /* -----------------------------------------
       LOGOUT
    ----------------------------------------- */

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

});