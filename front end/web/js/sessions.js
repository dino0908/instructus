
let sessions_endpoint = 'http://127.0.0.1:3000/sessions';

async function getSessions(){
    const response = await fetch(sessions_endpoint, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Accept': 'application/json'
        }
    });
    return response.json();
}

const STATUS_COMPLETED = "Completed";
const STATUS_CANCELLED = "Cancelled";
const STATUS_PENDING = "Pending";
const STATUS_CONFRIMED = "Confirmed";


function loadDataToTable(){
    let response = getSessions();
    response.then(json=>{
        console.log(json);
        for(let i=0; i<json.length; i++){
            let jsonObj = json[i];
            let questionJsonObj = jsonObj["question"];

            let datetime_str = jsonObj["date_time"];

            let date_val = null;
            let time_val = null;
            let dateObj = null;
            if(datetime_str != null){
                dateObj = new Date(datetime_str)
                date_val = dateObj.getDate() + "/" + (dateObj.getMonth() + 1) + "/" + dateObj.getFullYear();
                let hrs = dateObj.getHours();
                let suffix;
                if(hrs > 12){
                    hrs -= 12;
                    suffix = "PM";
                } else if(hrs == 0){
                    hrs = 12;
                    suffix = "AM";
                } else if(hrs == 12){
                    suffix = "PM";
                } else{
                    suffix = "AM";
                }
                time_val = hrs + ":" + dateObj.getMinutes() + suffix;
            }

            const session = {
                questionId: jsonObj["question_id"],
                title: questionJsonObj["title"],
                desc: questionJsonObj["content"],
                instructorName: jsonObj["instructor_name"] ? jsonObj["instructor_name"] : "",
                dt_object: dateObj,
                date: date_val,
                time: time_val,
                meetingLink: jsonObj["meeting_link"] ? jsonObj["meeting_link"] : "",
                status: jsonObj["instructor_name"] ?
                    Date.now() >= dateObj ? STATUS_COMPLETED : STATUS_CONFRIMED :
                    Date.now() >= dateObj ? STATUS_CANCELLED : STATUS_PENDING
            };


            let table = document.getElementById("session-table-body");

            let row = table.insertRow(table.length);
            row.onclick = function (){
                expandDetails(session);
            }
            // row.onclick(expandDetails(session));

            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            let cell3 = row.insertCell(2);
            let cell4 = row.insertCell(3);

            cell1.innerHTML = session.title;
            cell1.className = "column1";

            cell2.innerHTML = session.date;
            cell2.className = "column2";

            cell3.innerHTML = session.time;
            cell3.className = "column3";

            cell4.innerHTML = session.status;
            cell4.className = "column4";
        }
    }).catch(err => {
        console.log(err);
    });
};

window.onload = function (){ loadDataToTable(); }


function expandDetails(session) {
    document.getElementById("overlay-content-title").innerHTML = session.title;
    document.getElementById("overlay-content-content").innerHTML = session.desc;
    document.getElementById("details-date").innerHTML = session.date;
    document.getElementById("details-time").innerHTML = session.time;
    document.getElementById("details-instructor-name").innerHTML = session.instructorName;
    document.getElementById("details-meeting-link").innerHTML = session.meetingLink;
    document.getElementById("details-meeting-link").href = session.meetingLink;
    document.getElementById("details-status").innerHTML = session.status;
    if(session.status === STATUS_COMPLETED) showFeedbackButton();
    else if(session.status === STATUS_PENDING || session.status === STATUS_CONFRIMED) showModifyButton();
    showOverlay();
}

function showOverlay(){
    document.getElementById("overlay").style.display = "flex";
}

function hideOverlay(){
    document.getElementById("overlay").style.display = "none";
    hideCancelRescheduleButton();
    hideFeedbackButton();
}

function showModifyButton(){
    document.getElementById("modify-button").style.display = "inline-block";
}

function hideCancelRescheduleButton(){
    document.getElementById("modify-button").style.display = "none";
}

function showFeedbackButton(){
    document.getElementById("feedback-button").style.display = "inline-block";
}

function hideFeedbackButton(){
    document.getElementById("feedback-button").style.display = "none";
}


