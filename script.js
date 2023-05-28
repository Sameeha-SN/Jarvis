//elements
const startBtn = document.getElementById("start")
const stopBtn = document.getElementById("stop")
const speakBtn = document.getElementById("speak")

//NEWS
function getNews() {
    const allCategory = ["national", "business", "sports", "world", "politics", "technology", "startup", "entertainment", "miscellaneous", "hatke", "science", "automobile", "all"];
    const randomCategory = Math. floor(Math. random() * allCategory.length);
    const category = allCategory[randomCategory];
    let url= "http://inshorts.deta.dev/news?category="+category;
    let xml = new XMLHttpRequest()
    xml.open("GET", url, true);
    xml.onload= ()=>{
        if(xml.status === 200){
            let json = xml.response;
            json = JSON.parse(json);
            const randomNews= Math. floor(Math. random() * json.data.length)
            const news= json.data[randomNews].content;
            //console.log(news);
            readOut("Here's a news from the category of "+category+" the news is "+news+" ");
        } else{
            readOut("some error");
        }
    }
    xml.send();
}

//weather
function getData() {
    const country= "trichy"
    let url= "http://api.openweathermap.org/data/2.5/weather?q="+country+"&appid=1e943f47d89b26bf789ff0e65e1d9d27&units=metric"
    let xml = new XMLHttpRequest()
    xml.open("GET", url, true);
    xml.onload= ()=>{
        if(xml.status === 200){
            let json = xml.response;
            json = JSON.parse(json);
            const temp= json.main.temp;
            const description= json.weather[0].description;
            readOut("Weather in "+country+" is "+temp+" degree celcius and it is currently "+description+". ");
        } else{
            readOut("some error");
        }
    }
    xml.send();
}

//GETTING A JOKE
function getJoke() {
    let url= "http://icanhazdadjoke.com/slack";
    let xml = new XMLHttpRequest()
    xml.open("GET", url, true);
    xml.onload= ()=>{
        if(xml.status === 200){
            let json = xml.response;
            json = JSON.parse(json);
            let joke = json.attachments[0].text;
            //console.log(joke)
            readOut(joke);
        } else{
            readOut("some error");
        }
    }
    xml.send();
  }

//playing motivational video
function playVideo() {
    readOut("I will help you dear, here you go watch this")
    recognition.stop();
    let x = document.getElementById("myVideo");
    setTimeout(()=>{
        x.play()}, 5000);
}
//stoping the video
function stopVideo() {
    let x = document.getElementById("myVideo");
    x.pause();
    x.classList.add('video')
    x.classList.remove('afterVideo')
}


//speech recognition setup and commands
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.onstart = () => {
    console.log("I'm listening miss...")
}

recognition.onresult = (event) => {
    let current = event.resultIndex;
    let transcript = event.results[current][0].transcript;
    transcript = transcript.toLowerCase();
    console.log(transcript);
    if (transcript.includes("hello buddy")){
        readOut("Hey dear, what's up?");
    }
    if (transcript.includes("how are you")){
        readOut("I'm great, thanks for asking!");
    } 
    if (transcript.includes("open youtube")) {
        readOut("Opening youtube for you miss")
        window.open("https://www.youtube.com/")
        recognition.stop();
    }
    if (transcript.includes("can you open youtube for me")) {
        readOut("there you do miss")
        window.open("https://www.youtube.com/")
        recognition.stop();
    }
    if (transcript.includes("open google")) {
        readOut("opening google miss")
        window.open("https://www.google.com/")
        recognition.stop();
    }
    if (transcript.includes("google")) {
        let input = transcript.split("")
        input.splice(0,7);
        input = input.join("").split(" ").join("+");
        //console.log(input);
        window.open("https://www.google.com/search?q="+input);
        readOut("Here's what you are looking for dear!")
        recognition.stop();
    }
    if (transcript.includes("youtube search")) {
        let input2 = transcript.split("")
        input2.splice(0,15);
        input2 = input2.join("").split(" ").join("+");
        //console.log(input2);
        window.open("https://www.youtube.com/results?search_query="+input2);
        readOut("Playing it for you!")
        recognition.stop();
    }
    if (transcript.includes("what's the weather today")){
        getData();
    }
    if (transcript.includes("read a news")){
        recognition.stop();
        getNews();
    }
    if (transcript.includes("read some news")){
        recognition.stop();
        getNews();
        getNews();
    }
    if (transcript.includes("tell me a joke")){
        recognition.stop();
        getJoke();
        var audio = new Audio("sounds/mixkit-cartoon-voice-laugh-343.wav");
        setTimeout(function () {
            audio.play()
    }, 10000)
    }
    if (transcript.includes("motivate me")){
        let video = document.getElementById("myVideo")
        video.classList.remove("video")
        video.classList.add("afterVideo")
        playVideo();
    }
    if(transcript.includes("stop the video")){
        stopVideo();
        recognition.stop();
    }
    if(transcript.includes("are you listening")){
        readOut("I am listening dear")
        recognition.start();
    }
    if(transcript.includes("meet you soon")){
        window.close();
    }
}

recognition.onend = () => {
    console.log("Deactivated miss");
}


//Adding function to keys

recognition.continuous = true;

document.addEventListener("keypress", (keys)=>{
    let startKey = keys.code;
    if (startKey === "Enter") {
        recognition.start();   
    }
});

document.addEventListener("keypress", (keys)=>{
    let endKey = keys.code;
    if (endKey === "Space") {
        recognition.stop();
    }
});

//Jarvis's speech
function readOut(message) {
    const speech = new SpeechSynthesisUtterance();
    const allVoices = speechSynthesis.getVoices();
    speech.voice= allVoices[1];
    speech.text = message;
    speech.volume = 5;
    window.speechSynthesis.speak(speech);
    console.log(message);
}

window.onload = function() {
    setTimeout(function () {
        readOut('hey dear, how did the day go')
        recognition.start();
}, 5000)};
   


