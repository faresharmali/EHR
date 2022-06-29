


const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInJvbGUiOiJhZG1pbiIsImlkIjoiYWRtaW4iLCJpYXQiOjE2NTA4NzkwMzIsImV4cCI6MTY1MjA3OTAzMn0.L0_Je2SNU4u9zIpXrTMH20-XLh5Nf-cJqPU_2wPc_dg";
const axios = require('axios');





axios.post('http://localhost:8080/api/user', {

    "email": "doc2@EHR.com",
    "password": "password",
    "role": "doctor",
    "username": "doc2",
    "firstName": "hassan",
    "lastName": "boalam",
    "birthday": "10/11/1220",
    "contact": "0123456789",
    "address": "tuvirt",
    "org": 1,
    "firstNameprivate": false,
    "lastNameprivate": false,
    "birthdayprivate": "02/02/1980",
    "contactprivate": true,
    "addressprivate": false,
    "bloodGroup": "AB+",
    "bloodGroupprivate": false,
    "Allergies": "",
    "Allergiesprivate": false,
    "symptoms": "",
    "Diagnosisprivate": false,
    "treatment": "",
    "treatmentprivate": true,
    "doctorsWithpermission": "",
    "doctorsWithpermissionprivate": true,
    "radio": "",
    "report": "", "Diagnosis": ""


}, {
    headers: {
        'Authorization': `${token}`
    }
})



    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error.message);
    });