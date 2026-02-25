function getTodayKey() {
  const now = new Date();
  return `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()}`;
}

const todayKey = getTodayKey();
const attendance = localStorage.getItem(todayKey);

// ❌ No attendance → block access
if (!attendance) {
  alert("Please mark attendance first.");
  window.location.href = "attendance.html";
}

const commentsDiv = document.getElementById("Comments");
const input = document.getElementById("commentInput");
const button = document.getElementById("addComment");

button.onlick = () =>{
    if(input.ariaValueMax.trim()=="")return;

    const comment = document.createElement("div");
    comment.innerText = input.value ;
    
    commentsDiv.prepend(comment);
    input.value="";

    
};