let totalHours = 24;
let totalSeconds = totalHours * 60 * 60;

function updateCountdown() {
  let hours = Math.floor(totalSeconds / 3600);

  document.getElementById("countdown").textContent =
    `${hours} hours left`;

  if (totalSeconds > 0) {
    totalSeconds--;
  }
}

setInterval(updateCountdown, 1000);
updateCountdown();


// File Upload
const uploadBox = document.getElementById("uploadBox");
const fileInput = document.getElementById("fileInput");

uploadBox.addEventListener("click", () => {
  fileInput.click();
});

fileInput.addEventListener("change", () => {
  uploadBox.textContent = fileInput.files[0].name;
});