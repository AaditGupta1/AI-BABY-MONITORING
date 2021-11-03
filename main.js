alert_sound = "";
status = "";
objects = [];

function preload(){
    alert_sound = loadSound("alert_tone.mp3");
}

function setup(){
    canvas = createCanvas(600,420);
    canvas.center();

    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById('status').innerHTML = "Status : Objects are being detected";

    video = createCapture(VIDEO);
    video.hide();
    video.size(600,420);
}

function draw(){
    image(video,0,0,600,420);

    if(status != ""){

        objectDetector.detect(video,gotResults);

        for (let i = 0; i < objects.length; i++) {

            document.getElementById('status').innerHTML = 'Status : Objects detected';
            fill('#FF0000');
            stroke('#FF0000');
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%" , objects[i].x + 15 , objects[i].y + 15);
            noFill();
            rect(objects[i].x , objects[i].y , objects[i].width, objects[i].height);

            if(objects[i].label == 'person'){
                alert_sound.stop();
                document.getElementById('status').innerHTML = "Status : Baby detected";
            }
            else{
                alert_sound.play();
                document.getElementById('status').innerHTML = 'Status : Baby not detected';
            }
        }

        if(objects.length == 0){
            alert_sound.play();
            document.getElementById('status').innerHTML = 'Status : Baby not detected';
        }
    }
}

function modelLoaded(){
    console.log("Model has been initialized");
    status = true;
}

function gotResults(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}
