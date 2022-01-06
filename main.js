status_object="";
input_object="";
objects=[];
function setup(){
    canvas=createCanvas(480,300);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(480,300);
    video.hide();
}
function start(){
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status :Detecting Objects";
    input_object=document.getElementById("object").value;
}
function draw(){
    image(video,0,0,480,300);
    if(status_object!=""){
        objectDetector.detect(video,gotResult);
        for(var i=0;i<objects.length;i++){
            document.getElementById("status").innerHTML="Status:Objects Detected";
            document.getElementById("number_of_objects").innerHTML="Number of objects detected:"+objects.length;
            fill("#ff0000");
            percentage=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percentage+"%",objects[i].x+15,objects[i].y+15);
            noFill();
            stroke("#ff0000");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            if(objects[i].label==input_object){
                document.getElementById("status").innerHTML=input_object+" found";
                video.stop();
                synth=window.speechSynthesis;
                utterThis=new SpeechSynthesisUtterance(input_object+" found");
                synth.speak(utterThis);
            }
            else{
                document.getElementById("status").innerHTML=input_object+" not found";  
            }
        }
    }
}
function modelLoaded(){
    console.log("Model Loaded");
    status_object=true;
}
function gotResult(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects=results;
    }
}