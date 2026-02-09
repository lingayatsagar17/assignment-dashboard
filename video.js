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