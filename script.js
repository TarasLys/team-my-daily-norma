function adjustTextareaHeight() {
    const textarea = document.getElementById("infoText");
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
}

window.addEventListener("resize", adjustTextareaHeight);
window.onload = adjustTextareaHeight;

document.querySelector(".close-button").onclick = function () {
    document.querySelector(".modal").style.display = "none";
};

document.querySelectorAll('input[name="gender"]').forEach((elem) => {
    elem.addEventListener("change", calculateWaterIntake);
});

document.getElementById("weight").addEventListener("blur", calculateWaterIntake);
document.getElementById("activity-time").addEventListener("blur", calculateWaterIntake);

document.getElementById("weight").addEventListener("focus", clearDefault);
document.getElementById("activity-time").addEventListener("focus", clearDefault);
document.getElementById("water-intake").addEventListener("focus", clearDefault);

document.getElementById("weight").addEventListener("blur", restoreDefault);
document.getElementById("activity-time").addEventListener("blur", restoreDefault);
document.getElementById("water-intake").addEventListener("blur", restoreDefault);

function calculateWaterIntake() {
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const weight = parseFloat(document.getElementById("weight").value);
    const activityTime = parseFloat(document.getElementById("activity-time").value);

    let V;
    if (gender === "woman") {
        V = (weight * 0.03) + (activityTime * 0.4);
    } else if (gender === "man") {
        V = (weight * 0.04) + (activityTime * 0.6);
    }

    if (isNaN(V)) {
        V = 0;
    }

    document.querySelector(".required-water").textContent = V === 0 ? "0 L" : V.toFixed(2) + " L";
}

function clearDefault(event) {
    if (event.target.value === "0") {
        event.target.value = "";
    }
}

function restoreDefault(event) {
    if (event.target.value === "") {
        event.target.value = "0";
    }
}

