function updateProfile(event) {

    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;

    alert(
        "Profile Updated Successfully!\n\n" +
        "Name: " + name +
        "\nEmail: " + email +
        "\nPhone: " + phone +
        "\nAddress: " + address
    );
}


function changePassword() {

    const newPassword = prompt("Enter new password:");

    if (newPassword) {
        alert("Password changed successfully!");
    }
}


function changePhoto() {

    const photo = prompt(
        "Enter profile image file name:",
        "profile.jpg"
    );

    if (photo) {
        document.querySelector(".profile-image img").src = photo;
    }
}