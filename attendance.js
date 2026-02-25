document.addEventListener("DOMContentLoaded", function () {

function updateClock() {
  const now = new Date();
  document.getElementById("clock").textContent = now.toLocaleTimeString();
}
setInterval(updateClock, 1000);
updateClock();


const SESSION_START_HOUR = 18;   // change time for testing according to you 
const SESSION_END_HOUR = 19;     // change time for testing according to you

const FULL_ATTENDANCE_LIMIT = 10;   // <=10 min = FULL
const HALF_ATTENDANCE_LIMIT = 30;   // <=30 min = HALF



const videoCard = document.getElementById("videoCard");
const statusText = document.getElementById("statusText");


function getTodayKey() {
  const now = new Date();
  return `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()}`;
}


function applyStatus(type, minute = null) {

  if (type === "full") {
    statusText.textContent = `✅ Present (Joined at ${minute} min)`;
    statusText.className = "status-full";
  }

  if (type === "half") {
    statusText.textContent = `⚠️ Half Attendance (Joined at ${minute} min)`;
    statusText.className = "status-half";
  }

  if (type === "absent") {
    statusText.textContent = `❌ Absent (Too Late - ${minute} min)`;
    statusText.className = "status-absent";
  }

  if (type === "locked") {
    statusText.textContent = `🔒 Access Only ${SESSION_START_HOUR}:00–${SESSION_END_HOUR}:00`;
    statusText.className = "status-locked";
  }

  if (type === "live") {
    statusText.textContent = `▶ Session Live — Click To Join`;
    statusText.className = "";
  }

  if (type === "closed") {
    statusText.textContent = `❌ Session Closed For Today`;
    statusText.className = "status-absent";
  }
}


function evaluateSessionState() {

  const todayKey = getTodayKey();
  const saved = localStorage.getItem(todayKey);

  if (saved) {
    const data = JSON.parse(saved);
    applyStatus(data.type, data.minute);
    return;
  }

  const now = new Date();
  const hour = now.getHours();

  if (hour < SESSION_START_HOUR) {
    applyStatus("locked");
  }
  else if (hour >= SESSION_START_HOUR && hour < SESSION_END_HOUR) {
    applyStatus("live");
  }
  else {
    applyStatus("closed");
  }
}

evaluateSessionState();


videoCard.addEventListener("click", () => {

  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();

  // ⛔ Outside allowed time
  if (hour < SESSION_START_HOUR || hour >= SESSION_END_HOUR) {
    applyStatus("locked");
    return;
  }

  const todayKey = getTodayKey();
  const saved = localStorage.getItem(todayKey);

  // ✅ If already marked today → just go to video page
  if (saved) {
    window.location.href = "video.html";
    return;
  }

  // ✅ Calculate attendance for first click
  let type;

  if (minute <= FULL_ATTENDANCE_LIMIT) {
    type = "full";
  } else if (minute <= HALF_ATTENDANCE_LIMIT) {
    type = "half";
  } else {
    type = "absent";
  }

  localStorage.setItem(todayKey, JSON.stringify({ type, minute }));
  applyStatus(type, minute);

  // ✅ Redirect instead of playing inside dashboard
  window.location.href = "video.html";
});



function loadVideo() {
  const wrapper = document.querySelector(".video-wrapper");

  wrapper.innerHTML = `
    <iframe width="100%" height="100%"
      src="https://www.youtube.com/embed/videoseries?list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz&autoplay=1"
      frameborder="0"
      allow="autoplay; encrypted-media"
      allowfullscreen>
    </iframe>
  `;
}

}); 
