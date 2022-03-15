const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {

    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
        'Access-Control-Max-Age': 2592000, // 30 days
        /** add other headers as per requirement */
    };

    if(req.url === '/sessions'){

        if(req.method === 'GET'){
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(200, headers);
            res.end(JSON.stringify([
                {
                    'question' : {
                        "title": "How to SQL?",
                        "content": "help i dont know how to SQL",
                    },
                    "question_id": 1011234,
                    "instructor_name": "Joshua Aw",
                    "meeting_link": "www.zoom.com/my-zoom-room",
                    "date_time": "2017-07-21T17:32:28"
                },
                {
                    'question' : {
                        "title": "How to Java?",
                        "content": "help i dont know how to Java",
                    },
                    "question_id": 1011235,
                    "instructor_name": "Jon Li",
                    "meeting_link": "www.zoom.com/jons-zoom-room",
                    "date_time": "2017-11-23T18:32:28"
                },
                {
                    'question' : {
                        "title": "How to Math?",
                        "content": "help i dont know how to Math",
                    },
                    "question_id": 1011236,
                    "instructor_name": "Jon Li",
                    "meeting_link": "www.zoom.com/jons-zoom-room",
                    "date_time": "2017-10-23T18:32:28"
                },
                {
                    'question' : {
                        "title": "Some super long title here jsut to see how the element reacts to large data?",
                        "content": "help i dont know how to SpringBoot this is just some placeholder data to see how the elements will react to long data ajkasbdjkvbsakjdbvkjsabdjkvbsajkdvbasjbdvkjasbkdjvbkasjbdvkasbkdvbsajdbvasbdjkvbskjdbvjsbdvjkbsajkdvbasjkbdvjkasbjlvbasjkdvbasjkbdvkjsabdjkvb",
                    },
                    "question_id": 1011237,
                    "instructor_name": "Jon Li",
                    "meeting_link": "www.zoom.com/jons-zoom-room",
                    "date_time": "2017-09-23T18:32:28"
                },
                {
                    'question' : {
                        "title": "How to Python?",
                        "content": "help i dont know how to Python",
                    },
                    "question_id": 1011238,
                    "instructor_name": "Jon Li",
                    "meeting_link": "www.zoom.com/jons-zoom-room",
                    "date_time": "2017-08-23T18:32:28"
                }
                ,
                {
                    'question' : {
                        "title": "Expired Search",
                        "content": "help i dont know how to Python",
                    },
                    "question_id": 6969691,
                    "instructor_name": null,
                    "meeting_link": null,
                    "date_time": "2017-09-23T18:32:28"
                },
                {
                    'question' : {
                        "title": "Not Expired Search?",
                        "content": "help i dont know how to Python",
                    },
                    "question_id": 6969692,
                    "instructor_name": null,
                    "meeting_link": null,
                    "date_time": "2022-04-23T18:32:28"
                },
                {
                    'question' : {
                        "title": "Confirmed Search",
                        "content": "help i dont know how to Python",
                    },
                    "question_id": 6969692,
                    "instructor_name": "Jon Jones",
                    "meeting_link": "www.zoom.com/my-zoom-room",
                    "date_time": "2022-04-23T18:32:28"
                }
            ]));

        } else{
            res.writeHead(404, headers);
            res.end('invalid method')
        }
    }

   else{
        res.writeHead(404, headers);
        res.end('invalid endpoint')
    }


});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});