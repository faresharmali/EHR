baseurl : localhost:8080/api/
## LOGIN  
 POST  `/api/login`
```
 {
  "email": "string",
  "password": "string"
}
 ```

### valide 
```
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInJvbGUiOiJhZG1pbiIsImlkIjoiYWRtaW4iLCJpYXQiOjE2NTA3NzgwMTQsImV4cCI6MTY1MTk3ODAxNH0.HcaNlGw9f-GyoKlpoqAyEABcJpM6Pb4vfL_6Shtc5pw"
}

```

### ERROR 
```
{
	"message": "user with this email not found!"
    
}

```

-----------


## CREATE USER  
 POST  `/api/user` 

Authorization : TOKEN


```
{
  "email": "patient1@EHR.com",
  "password": "password",
  "role": "patient",
  "username": "patientusername",
  "firstName": "firstname",
  "lastName": "lastname",
  "birthday": "10/11/1220",
  "contact": "0123456789",
  "address": "tuvirt",
	"org" :1,
  "FirstNameprivate": false,
  "LastNameprivate": false,
  "birthdayprivate": "string",
  "contactprivate": true,
  "addressprivate": false,
  "bloodGroup": "AB+",
  "bloodGroupprivate": false,
  "Allergies": "Pollen Allergy.",
  "Allergiesprivate": false,
  "Diagnosis": "headache",
  "Diagnosisprivate": false,
  "treatment": "doliprane",
  "treatmentprivate": true,
  "doctorsWithpermission": "",
  "doctorsWithpermissionprivate": true
	
	
}
 ```

### valide 
```
{
	"data": {
		"ok": true,
		"id": "patient@EHR.com",
		"rev": "1-e3bf79cf5384dd2e06356034d45d9bf1"
	},
	"message": "user  patientusername created"
}

```

### ERROR 
```
{
	"message": "user with this email not found!"
    
}


{
	"message": "Not authenticated."
}

{
	"message": "invalid token"
}


{
	"message": "org is require"
}
```











## GET ALL USERS  


 POST  `/api/user` 

Authorization : TOKEN




### valide 
```
{
	"data": {
		"docs": [
			{
				"_id": "admin@admin.com",
				"_rev": "1-e9b559c2a383b1859f86b9d066f82e63",
				"password": "$2a$12$IhAdXFIfNjwnm2Sn5LnDOeNzDmyK2zvZ2ZUIpu.SJ8XIdqQVRrg7S",
				"userID": "admin",
				"role": "admin",
				"username": "admin",
				"firstName": "admiin",
				"lastName": "admiiiiin",
				"birthday": "10/11/1220",
				"contact": "0123456789",
				"address": "tuvirt"
			},
			{
				"_id": "patient@EHR.com",
				"_rev": "1-e3bf79cf5384dd2e06356034d45d9bf1",
				"password": "$2a$12$y0cDTAnetq0qPNsdUjdHRecDZlhKDNa3oAHNF3eNQEgupjC0DS996",
				"role": "patient",
				"username": "patientusername",
				"firstName": "firstname",
				"lastName": "lastname",
				"birthday": "10/11/1220",
				"contact": "0123456789",
				"address": "tuvirt",
				"org": 1,
				"userID": "396a0d09-3b14-47a4-a1d6-a808687b7f29"
			}
		],
	
		"warning": "No matching index found, create an index to optimize query time."
	}
}

```

### ERROR 
```

{
	"message": "Not authenticated."
}

{
	"message": "invalid token"
}


{
	"message": "admin only"
}

```



## GET ONE USER



 GET  `/api/user/userEmail` 

Authorization : TOKEN




### valide 
```
{
	"data": {
		"_id": "patient@EHR.com",
		"_rev": "1-e3bf79cf5384dd2e06356034d45d9bf1",
		"role": "patient",
		"username": "patientusername",
		"firstName": "firstname",
		"lastName": "lastname",
		"birthday": "10/11/1220",
		"contact": "0123456789",
		"address": "tuvirt",
		"org": 1,
		"userID": "396a0d09-3b14-47a4-a1d6-a808687b7f29"
	}
}

```

### ERROR 
```

{
	"message": "Not authenticated."
}

{
	"message": "invalid token"
}


{
	"message": "admin only"
}

```



## UPDATE USER


 PUT  `/api/user` 

Authorization : TOKEN

```
{
  "email": "patient@EHR.com",
  "password": "password",
  "role": "update",
  "username": "updateusername",
  "firstName": "firstname",
  "lastName": "lastname",
  "birthday": "10/11/1220",
  "contact": "0123456789",
  "address": "tuvirt"
}
 ```



### valide 
```
{
	"data": {
		"ok": true,
		"id": "patient@EHR.com",
		"rev": "2-0e27cf7f736aa7d6bbb584668e664b0e"
	}
}
```

### ERROR 
```

{
	"message": "Not authenticated."
}

{
	"message": "invalid token"
}


{
	"message": "admin only"
}


{
	"message": "you are not allowed this action"
}

```





## DELETE USER


 DELETE  `/api/user` 

Authorization : TOKEN

```
{
  "email": "patient@EHR.com",
  "password": "password",
  "role": "update",
  "username": "updateusername",
  "firstName": "firstname",
  "lastName": "lastname",
  "birthday": "10/11/1220",
  "contact": "0123456789",
  "address": "tuvirt"
}
 ```



### valide 
```
{
	"data": {
		"ok": true,
		"id": "patient@EHR.com",
		"rev": "3-9bdc4e4d0958a48f012807b9db044360"
	}
}
```

### ERROR 
```

{
	"message": "Not authenticated."
}

{
	"message": "invalid token"
}


{
	"message": "admin only"
}


{
	"message": "you are not allowed this action"
}

```




-----------------------



baseurl : localhost:8080/api/

## GET ALL MR  


 POST  `/api/asset` 

Authorization : TOKEN




### valide 
```
{
{
	"data": [
		{
			"Key": "17a1f320-2455-4d0a-baa7-581d4d4636df",
			"Record": {
				"Allergies": "Pollen Allergy.",
				"Allergiesprivate": false,
				"Diagnosis": "headache",
				"Diagnosisprivate": false,
				"FirstNameprivate": false,
				"LastNameprivate": false,
				"address": "tuvirt",
				"addressprivate": false,
				"birthday": "10/11/1220",
				"birthdayprivate": "string",
				"bloodGroup": "AB+",
				"bloodGroupprivate": false,
				"contactprivate": true,
				"doctorsWithpermissionprivate": true,
				"treatmentprivate": true
			}
		},
		{
			"Key": "1e2a6a1f-5b1a-4f5f-b02f-71385561846c",
			"Record": {
				"Allergies": "Pollen Allergy.",
				"Allergiesprivate": false,
				"Diagnosis": "headache",
				"Diagnosisprivate": false,
				"FirstNameprivate": false,
				"LastNameprivate": false,
				"address": "tuvirt",
				"addressprivate": false,
				"birthday": "10/11/1220",
				"birthdayprivate": "string",
				"bloodGroup": "AB+",
				"bloodGroupprivate": false,
				"contactprivate": true,
				"doctorsWithpermissionprivate": true,
				"treatmentprivate": true
			}
		},
		{
			"Key": "396a0d09-3b14-47a4-a1d6-a808687b7f29",
			"Record": {
				"address": "tuvirt",
				"birthday": "10/11/1220",
				"contact": "0123456789"
			}
		}
	]
}
}

```

### ERROR 
```

{
	"message": "Not authenticated."
}

{
	"message": "invalid token"
}


{
	"message": "admin only"
}

```



## GET ONE MR



 GET  `/api/asset/:assetID` 

Authorization : TOKEN




### valide 
```
{
	"message": {
		"Allergies": "Pollen Allergy.",
		"Allergiesprivate": false,
		"Diagnosis": "headache",
		"Diagnosisprivate": false,
		"FirstNameprivate": false,
		"LastNameprivate": false,
		"address": "tuvirt",
		"addressprivate": false,
		"birthday": "10/11/1220",
		"birthdayprivate": "string",
		"bloodGroup": "AB+",
		"bloodGroupprivate": false,
		"contact": "0123456789",
		"contactprivate": true,
		"doctorsWithpermission": "",
		"doctorsWithpermissionprivate": true,
		"treatment": "doliprane",
		"treatmentprivate": true
	}
}

```

### ERROR 
```

{
	"message": "Not authenticated."
}

{
	"message": "invalid token"
}


{
	"message": "admin only"
}


{
	"message": "error with  id code : code if false or a  patient with this id don't exsite"
}
```



## UPDATE MR


 PUT  `/api/asset/assetID` 

Authorization : TOKEN

```
{

 "firstName": "firstName",
 "firstNameprivate": "firstNameprivate",
 "lastName": "lastName",
 "lastNameprivate": "lastNameprivate",
 "birthday": "birthday",
 "birthdayprivate": "birthdayprivate",
 "contact": "contact",
 "contactprivate": "contactprivate",
 "address": "address",
 "addressprivate": "addressprivate",
 "bloodGroup": "bloodGroup",
 "bloodGroupprivate": "bloodGroupprivate",
 "Allergies": "Allergies",
 "Allergiesprivate": "Allergiesprivate",
 "Diagnosis": "Diagnosis",
 "Diagnosisprivate": "Diagnosisprivate",
 "treatment": "treatment",
 "treatmentprivate": "treatmentprivate",
 "lastVisits": "lastVisits",
 "lastVisitsprivate": "lastVisitsprivate",
 "doctorsWithpermission": "doctorsWithpermission",
 "doctorsWithpermissionprivate": "doctorsWithpermissionprivate"
}
 ```



### valide 
```
{
	"message": "Transaction has been submitted"
}
```

### ERROR 
```

{
	"message": "Not authenticated."
}

{
	"message": "invalid token"
}


{
	"message": "admin only"
}


{
	"message": "you are not allowed this action"
}



{
	"message": "Transaction faild"
}

```





## DELETE USER


 DELETE  `/api/asset/assetid` 

Authorization : TOKEN

```

 ```



### valide 
```
{
	"message": "asset deleted"
}
```

### ERROR 
```

{
	"message": "Not authenticated."
}

{
	"message": "invalid token"
}


{
	"message": "admin only"
}


{
	"message": "you are not allowed this action"
}

```



## GET MR HEST



 GET  `/api/asset/hestuserID` 

Authorization : TOKEN

```

 ```



### valide 
```
{
	"message": "asset deleted"
}
```

### ERROR 
```

{
	"message": "Not authenticated."
}

{
	"message": "invalid token"
}


{
	"message": "admin only"
}


{
	"message": "you are not allowed this action"
}

```





-----------------------
