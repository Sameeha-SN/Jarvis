function getDay(){
    var myDate = new Date();

    let daysList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    


    let date = myDate.getDate();
    
    let year = myDate.getFullYear();
    let day = daysList[myDate.getDay()];
    let hour = new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" });

    console.log("Today is "+day);
}

getDay();

function getMonth() {
    let monthsList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Aug', 'Oct', 'Nov', 'Dec'];
    let month = monthsList[myDate.getMonth()];
    console.log("It is " + month);
}
getMonth();