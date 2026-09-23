/* =========================================
   CREATE MODULES
   CAPACITY CONNECT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* AUTH */
    const loggedIn =
        localStorage.getItem("capacityConnectLoggedIn");

    const role =
        localStorage.getItem("capacityConnectRole");

    if (loggedIn !== "true" || role !== "trainer") {
        window.location.href = "../login.html";
        return;
    }


    /* TRAINER */
    const trainerName =
        localStorage.getItem("capacityConnectName") ||
        localStorage.getItem("capacityConnectUser") ||
        "Trainer";

    document.getElementById("headerName").textContent =
        trainerName;

    document.getElementById("headerAvatar").textContent =
        trainerName
            .split(" ")
            .filter(Boolean)
            .slice(0, 2)
            .map(word => word[0].toUpperCase())
            .join("") || "TR";


    /* COURSE DATA */
    const savedCourse =
        JSON.parse(
            localStorage.getItem("capacityConnectNewCourse") || "null"
        );

    if (savedCourse) {

        document.getElementById("courseTitle").textContent =
            savedCourse.title || "New Training Course";

        document.getElementById("courseCategory").textContent =
            savedCourse.category || "Capacity Building Training";
    }


    /* ELEMENTS */
    const modulesContainer =
        document.getElementById("modulesContainer");

    const moduleCount =
        document.getElementById("moduleCount");

    const sideModuleCount =
        document.getElementById("sideModuleCount");

    const addModuleBtn =
        document.getElementById("addModuleBtn");

    const largeAddModule =
        document.getElementById("largeAddModule");


    /* UPDATE COUNT */
    function updateModuleCount() {

        const cards =
            modulesContainer.querySelectorAll(".module-card");

        const count = cards.length;

        moduleCount.textContent = count;
        sideModuleCount.textContent = count;

        cards.forEach((card, index) => {

            const number =
                card.querySelector(".module-number");

            if (number) {
                number.textContent =
                    String(index + 1).padStart(2, "0");
            }

        });
    }


    /* CREATE MODULE */
    function createModule() {

        const card =
            document.createElement("div");

        card.className = "module-card";

        card.innerHTML = `

            <div class="module-top">

                <div class="module-number">
                    01
                </div>

                <div class="module-title-area">

                    <input
                        type="text"
                        class="module-title"
                        placeholder="Enter module title"
                    >

                    <span>
                        Module title
                    </span>

                </div>

                <button
                    type="button"
                    class="delete-module"
                    title="Delete module"
                >
                    ×
                </button>

            </div>


            <div class="module-fields">

                <div class="module-field">

                    <label>
                        Module Description
                    </label>

                    <textarea
                        class="module-description"
                        rows="4"
                        placeholder="Describe what this module covers..."
                    ></textarea>

                </div>


                <div class="module-field-row">

                    <div class="module-field">

                        <label>
                            Estimated Duration
                        </label>

                        <div class="duration-input">

                            <input
                                type="number"
                                class="module-duration"
                                value="1"
                                min="1"
                            >

                            <span>Hours</span>

                        </div>

                    </div>


                    <div class="module-field">

                        <label>
                            Learning Focus
                        </label>

                        <select class="module-focus">

                            <option>
                                Technical Competency
                            </option>

                            <option>
                                Professional Skill
                            </option>

                            <option>
                                Leadership & Management
                            </option>

                            <option>
                                Environmental Awareness
                            </option>

                        </select>

                    </div>

                </div>

            </div>


            <div class="module-resources">

                <div class="resources-header">

                    <div>

                        <strong>
                            Learning Resources
                        </strong>

                        <span>
                            Add presentations, study materials or recorded lectures.
                        </span>

                    </div>

                    <button
                        type="button"
                        class="add-resource-btn"
                    >
                        + Add Resource
                    </button>

                </div>


                <div class="resource-list">

                </div>

            </div>
        `;

        modulesContainer.appendChild(card);

        updateModuleCount();

        card.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

        const titleInput =
            card.querySelector(".module-title");

        if (titleInput) {
            titleInput.focus();
        }
    }


    /* ADD MODULE */
    addModuleBtn.addEventListener(
        "click",
        createModule
    );

    largeAddModule.addEventListener(
        "click",
        createModule
    );


    /* DELETE MODULE */
    modulesContainer.addEventListener(
        "click",
        event => {

            const deleteButton =
                event.target.closest(".delete-module");

            if (!deleteButton) {
                return;
            }

            const cards =
                modulesContainer.querySelectorAll(".module-card");

            if (cards.length === 1) {

                alert(
                    "At least one training module is required."
                );

                return;
            }

            deleteButton
                .closest(".module-card")
                .remove();

            updateModuleCount();
        }
    );


    /* ADD RESOURCE */
    modulesContainer.addEventListener(
        "click",
        event => {

            const button =
                event.target.closest(".add-resource-btn");

            if (!button) {
                return;
            }

            const moduleCard =
                button.closest(".module-card");

            const resourceList =
                moduleCard.querySelector(".resource-list");


            const resource =
                document.createElement("div");

            resource.className =
                "resource-item";

            resource.innerHTML = `

                <div class="resource-icon">
                    DOC
                </div>

                <div class="resource-info">

                    <strong>
                        New Learning Resource
                    </strong>

                    <span>
                        Presentation & Study Material
                    </span>

                </div>

                <button
                    type="button"
                    class="remove-resource"
                >
                    ×
                </button>
            `;

            resourceList.appendChild(resource);
        }
    );


    /* REMOVE RESOURCE */
    modulesContainer.addEventListener(
        "click",
        event => {

            const button =
                event.target.closest(".remove-resource");

            if (!button) {
                return;
            }

            button
                .closest(".resource-item")
                .remove();
        }
    );


    /* SAVE DATA */
    function collectModules() {

        const cards =
            modulesContainer.querySelectorAll(".module-card");

        return Array.from(cards).map((card, index) => {

            return {

                moduleNumber: index + 1,

                title:
                    card
                        .querySelector(".module-title")
                        .value
                        .trim(),

                description:
                    card
                        .querySelector(".module-description")
                        .value
                        .trim(),

                duration:
                    card
                        .querySelector(".module-duration")
                        .value,

                focus:
                    card
                        .querySelector(".module-focus")
                        .value,

                resources:
                    Array.from(
                        card.querySelectorAll(".resource-item")
                    ).map(resource => {

                        return {
                            title:
                                resource
                                    .querySelector(".resource-info strong")
                                    .textContent
                                    .trim(),

                            type:
                                resource
                                    .querySelector(".resource-info span")
                                    .textContent
                                    .trim()
                        };

                    })

            };

        });
    }


    /* SAVE DRAFT */
    document
        .getElementById("saveDraftBtn")
        .addEventListener("click", () => {

            const modules =
                collectModules();

            localStorage.setItem(
                "capacityConnectModules",
                JSON.stringify(modules)
            );

            alert(
                "Training modules saved as draft."
            );
        });


    /* CONTINUE */
    document
        .getElementById("continueBtn")
        .addEventListener("click", () => {

            const modules =
                collectModules();


            const invalid =
                modules.some(module => !module.title);


            if (invalid) {

                alert(
                    "Please enter a title for every training module."
                );

                return;
            }


            localStorage.setItem(
                "capacityConnectModules",
                JSON.stringify(modules)
            );


            window.location.href =
                "trainer-library.html";

        });


    /* MOBILE SIDEBAR */
    const mobileMenuBtn =
        document.getElementById("mobileMenuBtn");

    const sidebar =
        document.getElementById("sidebar");

    if (mobileMenuBtn && sidebar) {

        mobileMenuBtn.addEventListener(
            "click",
            () => {

                sidebar.classList.toggle("active");

            }
        );
    }


    /* LOGOUT */
    document
        .getElementById("logoutBtn")
        .addEventListener("click", () => {

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


    /* INITIAL COUNT */
    updateModuleCount();

});