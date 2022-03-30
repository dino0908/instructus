
const uri = 'http://127.0.0.1:3000';

async function getSessions(){
    let endpoint = uri + "/sessions";
    const response = await fetch(endpoint, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Accept': 'application/json'
        }
    });
    return response.json();
}

// async function getFeedback(id){
//     let endpoint = uri + "/feedback" + "?id=" + id;
//     const response = await fetch(endpoint, {
//         method: 'GET',
//         mode: 'cors',
//         headers: {
//             'Accept': 'application/json'
//         }
//     });
//     return response.json();
// }


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
                time_val = hrs + ":" + dateObj.getMinutes() + " " + suffix;
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
                    Date.now() >= dateObj ? STATUS_CANCELLED : STATUS_PENDING,
                rating: jsonObj["rating"]
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
    document.getElementById("feedback-button")
        .addEventListener("click", function (){showSessionFeedbackOverlay(session)});
    document.getElementById("modify-button")
        .addEventListener("click", function (){showSessionModificationOverlay(session)});
    showBaseOverlay();
}

function noScroll() {
    window.scrollTo(0, 0)
}

function showBaseOverlay(){
    document.getElementById("overlay-mask").style.display = "inline-block";
    document.getElementById("base-overlay").style.display = "flex";
    window.addEventListener('scroll', noScroll);
}

function hideOverlay(){
    document.getElementById("details-overlay").style.display = "inline-block";
    document.getElementById("base-overlay").style.display = "none";
    document.getElementById("overlay-mask").style.display = "none";
    document.getElementById("modify-session-overlay").style.display = "none";
    document.getElementById("session-feedback-overlay").style.display = "none";
    window.removeEventListener('scroll', noScroll);
    hideFeedbackButton();
    hideCancelFeedbackButton();
    hideCancelModificationButton();
    hideSubmitModificationButton();
    hideModifyButton();
    hideSubmitFeedbackButton();
}

function showModifyButton(){
    document.getElementById("modify-button").style.display = "inline-block";
}

function hideModifyButton(){
    document.getElementById("modify-button").style.display = "none";
}

function showFeedbackButton(){
    document.getElementById("feedback-button").style.display = "inline-block";
}

function hideFeedbackButton(){
    document.getElementById("feedback-button").style.display = "none";
}

function showSubmitModificationButton(){
    document.getElementById("submit-modification-button").style.display = "inline-block";
}

function hideSubmitModificationButton(){
    document.getElementById("submit-modification-button").style.display = "none";
}

function showCancelModificationButton(){
    document.getElementById("cancel-modification-button").style.display = "inline-block";
}

function hideCancelModificationButton(){
    document.getElementById("cancel-modification-button").style.display = "none";
}

function showSessionModificationOverlay(session){
    document.getElementById("details-overlay").style.display = "none";
    hideModifyButton();
    showSubmitModificationButton();
    showCancelModificationButton();

    let datePicker = document.getElementById("date-picker");
    datePicker.valueAsDate = session.dt_object;
    let timePicker = document.getElementById("time-picker");
    timePicker.value = session.dt_object.getHours() + ":" + session.dt_object.getMinutes();

    document.getElementById("modify-session-overlay").style.display = "flex";
}

function hideSessionModificationOverlay(){
    document.getElementById("modify-session-overlay").style.display = "none";
}

function cancelModifications(){
    // document.getElementById("details-overlay").style.display = "inline-block";
    hideCancelModificationButton();
    hideSubmitModificationButton();
    showModifyButton();
    hideSessionModificationOverlay();
}

function showSessionFeedbackOverlay(session) {
    // let response = getFeedback(session.questionId);
    // response.then(json=> {
    //
    //     if(response == null){
    //         document.getElementById("feedback-button").disabled = false;
    //     }
    //
    //     document.getElementById("details-overlay").style.display = "none";
    //     hideFeedbackButton();
    //     showSubmitFeedbackButton();
    //     showCancelFeedbackButton();
    //     document.getElementById("session-feedback-overlay").style.display = "flex";
    // });

    if(session.rating == null){
        enableStars();
        document.getElementById("submit-feedback-button").style.background = "#ff556e";
        document.getElementById("submit-feedback-button").style.color = "white";
        document.getElementById("submit-feedback-button").disabled = false;
    } else{
        let radio_id = session.rating + "star";
        document.getElementById(radio_id).checked = true;
        document.getElementById("submit-feedback-button").style.background = "lightgray";
        document.getElementById("submit-feedback-button").style.color = "black";
        document.getElementById("submit-feedback-button").disabled = true;
        disableStars();
    }

    document.getElementById("details-overlay").style.display = "none";
    hideFeedbackButton();
    showSubmitFeedbackButton();
    showCancelFeedbackButton();
    document.getElementById("session-feedback-overlay").style.display = "flex";
}

function disableStars(){
    for(let i=1; i<=5; i++){
        let radio_id = i + "star";
        document.getElementById(radio_id).disabled = true;
    }
}

function enableStars(){
    for(let i=1; i<=5; i++){
        let radio_id = i + "star";
        document.getElementById(radio_id).checked = false;
        document.getElementById(radio_id).disabled = false;
    }
}

function showSubmitFeedbackButton(){
    document.getElementById("submit-feedback-button").style.display = "inline-block"
}

function hideSubmitFeedbackButton(){
    document.getElementById("submit-feedback-button").style.display = "none"
}

function showCancelFeedbackButton(){
    document.getElementById("cancel-feedback-button").style.display = "inline-block"
}

function hideCancelFeedbackButton(){
    document.getElementById("cancel-feedback-button").style.display = "none"
}

function cancelFeedback(){
    document.getElementById("details-overlay").style.display = "inline-block";
    hideCancelFeedbackButton();
    hideSubmitFeedbackButton();
    showFeedbackButton();
    document.getElementById("session-feedback-overlay").style.display = "none";
}


