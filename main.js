status_object="";
input_object="";
function setup(){
    canvas=createCanvas(480,300);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(480,300);
    video.hide();
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status :Detecting Objects";
    input_object=document.getElementById("object").value;
}
function draw(){
    image(video,0,0,480,300);
}
function modelLoaded(){
    console.log("Model Loaded");
    status_object=true;
}