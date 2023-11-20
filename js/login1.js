const postLogin = async () => {
    const email = getValue("emaillogin");
    const password = getValue("passwordlogin");
    const loadingElement = document.getElementById("loading");
    const loginButton = document.getElementById("buttonlogin");

    loginButton.style.display = "none";
    loadingElement.style.display = "block";

    if (!email || !password) {
        Swal.fire({
            icon: "error",
            title: "Login Failed",
            text: "Please fill in both email and password fields.",
        });
        loadingElement.style.display = "none";
        loginButton.style.display = "block";
        return;
    }

    const target_url = "https://asia-southeast2-urse-project.cloudfunctions.net/urse-login";
    const tokenkey = "token";
    const tokenvalue = "c49482e6de1fa07a349f354c2277e11bc7115297a40a1c09c52ef77b905d07c4";
    const datainjson = {
        email,
        password,
    };

    try {
        const result = await postWithToken(target_url, tokenkey, tokenvalue, datainjson);
        responseData(result);
    } catch (error) {
        console.error("Error during login:", error);
        Swal.fire({
            icon: "error",
            title: "Login Failed",
            text: "An unexpected error occurred during login.",
        });
        loginButton.style.display = "block";
    } finally {
        loadingElement.style.display = "none";
    }
};

function responseData(result) {
    if (result.token) {
        setCookieWithExpireHour("token", result.token, 2);

        const loginButton = document.getElementById("buttonlogin");
        const email = getValue("emaillogin");

        loginButton.style.display = "none";

        Swal.fire({
            icon: "success",
            title: "Login Successful",
            text: "You have successfully logged in.",
        }).then((result) => {
            if (result.isConfirmed || result.isDismissed) {
                window.location.href = "../user/dashboard.html";
                // Store the email in localStorage
                localStorage.setItem("userEmail", email);
            }
        });
    } else {
        const loginButton = document.getElementById("buttonlogin");
        Swal.fire({
            icon: "error",
            title: "Login Failed",
            text: result.message || "An unexpected error occurred.",
        });
        loginButton.style.display = "block";
    }
}
window.postLogin = postLogin;