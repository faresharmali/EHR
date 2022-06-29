


const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInJvbGUiOiJhZG1pbiIsImlkIjoiYWRtaW4iLCJpYXQiOjE2NTA4NzkwMzIsImV4cCI6MTY1MjA3OTAzMn0.L0_Je2SNU4u9zIpXrTMH20-XLh5Nf-cJqPU_2wPc_dg";
const axios = require('axios');





axios.post('http://localhost:8080/api/user', {

    "email": "patient1@EHR.com",
    "password": "password",
    "role": "patient",
    "username": "nazih",
    "firstName": "nazih",
    "lastName": "belkesam",
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
    "Allergies": "Pollen Allergy.",
    "Allergiesprivate": false,
    "symptoms": "a sudden fever – a temperature of 38C (100.4F) or above ,a dry, chesty cough,a headache",
    "Diagnosisprivate": false,
    "treatment": "Antiviral medication,Antibiotics",
    "treatmentprivate": true,
    "doctorsWithpermission": "",
    "doctorsWithpermissionprivate": true,
    "radio": "",
    "report": "", "Diagnosis": "Flu"


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