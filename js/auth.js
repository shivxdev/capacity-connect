/* =====================================================
   CAPACITY CONNECT
   Authentication JavaScript
===================================================== */


/* =====================================================
   ELEMENTS
===================================================== */

const roleTabs = document.querySelectorAll(".role-tab");

const selectedRole = document.getElementById("selectedRole");

const loginId = document.getElementById("loginId");

const loginIdLabel = document.getElementById("loginIdLabel");

const password = document.getElementById("password");

const togglePassword = document.getElementById("togglePassword");

const loginForm = document.getElementById("loginForm");

const loginButton = document.getElementById("loginButton");

const loginMessage = document.getElementById("loginMessage");


/* =====================================================
   ROLE SELECTION
===================================================== */

roleTabs.forEach(tab => {

    tab.addEventListener("click", () => {

        // Remove active class
        roleTabs.forEach(item => {
            item.classList.remove("active");
        });

        // Add active class
        tab.classList.add("active");

        // Get selected role
        const role = tab.dataset.role;

        selectedRole.value = role;


        // Change login field according to role

        if (role === "trainee") {

            loginIdLabel.textContent = "Email or University Roll Number";

            loginId.placeholder =
                "Enter email or university roll number";

        }


        else if (role === "trainer") {

            loginIdLabel.textContent = "Email or Trainer ID";

            loginId.placeholder =
                "Enter email or trainer ID";

        }


        else if (role === "admin") {

            loginIdLabel.textContent = "Admin Username";

            loginId.placeholder =
                "Enter admin username";

        }

    });

});


/* =====================================================
   SHOW / HIDE PASSWORD
===================================================== */

if (togglePassword) {

    togglePassword.addEventListener("click", () => {

        if (password.type === "password") {

            password.type = "text";

            togglePassword.textContent = "🙈";

        }

        else {

            password.type = "password";

            togglePassword.textContent = "👁";

        }

    });

}


/* =====================================================
   LOGIN
===================================================== */

loginForm.addEventListener("submit", function(event) {

    event.preventDefault();


    const role = selectedRole.value;

    const loginValue = loginId.value.trim();

    const passwordValue = password.value.trim();


    // Clear previous message

    loginMessage.className = "login-message";

    loginMessage.textContent = "";


    // Basic validation

    if (!loginValue || !passwordValue) {

        loginMessage.classList.add("error");

        loginMessage.textContent =
            "Please enter your login details.";

        return;

    }


    // Loading state

    loginButton.disabled = true;

    loginButton.querySelector("span:first-child").textContent =
        "Signing in...";


    /*
        Frontend demo delay
    */

    setTimeout(() => {


        // Store demo login information

        localStorage.setItem("capacityConnectLoggedIn", "true");

        localStorage.setItem("capacityConnectRole", role);

        localStorage.setItem("capacityConnectUser", loginValue);


        // Remember me

        const rememberMe =
            document.getElementById("rememberMe").checked;

        localStorage.setItem(
            "capacityConnectRemember",
            rememberMe
        );


        // Success message

        loginMessage.classList.add("success");

        loginMessage.textContent =
            "Login successful! Redirecting...";


        /*
            Redirect according to role
        */

        setTimeout(() => {

            if (role === "trainee") {

                window.location.href =
                    "trainee/dashboard.html";

            }

            else if (role === "trainer") {

                window.location.href =
                    "trainer/dashboard.html";

            }

            else if (role === "admin") {

                window.location.href =
                    "admin/dashboard.html";

            }

        }, 700);


    }, 700);

});