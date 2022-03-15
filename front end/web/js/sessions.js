
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

function loadDataToTable(){
    let response = getSessions();
    response.then(json=>{
        console.log(json);
        for(let i=0; i<json.length; i++){
            let jsonObj = json[i];
            let questionJsonObj = jsonObj["question"];
            let title = questionJsonObj["title"];

            let instructor_name = jsonObj["instructor_name"];
            if(instructor_name == null) instructor_name = "-";

            let datetime_str = jsonObj["date_time"];

            let date_val = "-";
            let time_val = "-";
            if(datetime_str != null){
                let dateObj = new Date(datetime_str)
                date_val = dateObj.getDate() + "/" + (dateObj.getMonth() + 1) + "/" + dateObj.getFullYear();
                time_val = dateObj.getHours() + ":" + dateObj.getMinutes();
            }


            let table = document.getElementById("session-table-body");

            let row = table.insertRow(table.length);

            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            let cell3 = row.insertCell(2);
            let cell4 = row.insertCell(3);

            cell1.innerHTML = title;
            cell1.className = "column1";

            cell2.innerHTML = date_val;
            cell2.className = "column2";

            cell3.innerHTML = time_val;
            cell3.className = "column3";

            cell4.innerHTML = jsonObj["instructor_name"]?"Confirmed":"Pending";
            cell4.className = "column4";


            console.log(title + " " + instructor_name + " " + date_val + " " + time_val);
        }
    }).catch(err => {
        console.log(err);
    });
};

window.onload = function (){ loadDataToTable(); }



function appendDataToTable(){

}

