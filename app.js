var myApp = angular.module("myModule",[]);

myApp.controller('myControllerLogin', ['$scope', '$http', '$window', function($scope,$http,$window){
	
	var loginIcon = {
		name : "Login",
		loginPngLoc : "/Images/login.png",
		message : "Sign In"
	};
	$scope.loginIcon = loginIcon ;
			
	$scope.submitLoginData = function(){
	var data = {
		username: $scope.userName,
		password : $scope.password
	}
		
	$http(
		{
		   method: 'POST',
		   url: 'http://localhost:8080/loginData/', 
		   data: data  
		}).then(function successCallback(response) {
			if(JSON.stringify(response) != '{}' && response.data.status == "200"){
					window.location.replace("http://localhost:8080/requestTable.html");
			}else{
				alert(response.data.message);
			}				
		});
	}
	
}]);

myApp.controller('myControllerRequest', ['$scope', '$http', '$window', function($scope,$http,$window){
	
	$http(
		{
		   method: 'POST',
		   url: 'http://localhost:8080/requestTableData/', 
		}).then(function successCallback(response) {
			console.log(response);
						console.log(response.data.status);			
			if(JSON.stringify(response) != '{}' && response.data.status == "200"){
					$scope.requestTableData = response.data.message.rows;
			}else{
				alert(response.data.message);
			}				
		});
		
	$scope.getApplicantData = function(clickedData){
	
		var data = {
				id: clickedData.doc.digitalId,
		};
	$http(
		{
		   method: 'POST',
		   url: 'http://localhost:8080/applicantData/', 
		   data: data  
		}).then(function successCallback(response) {
			if(JSON.stringify(response) != '{}' && response.data.status == "200"){
				var applicantData = response.data.message;
				applicantData["requestId"] = clickedData.doc._id;
				console.log(applicantData);
				$window.sessionStorage.setItem("Mydata",JSON.stringify(applicantData));
				window.location.replace("http://localhost:8080/StudentDetails.html");				
			}else{
				alert(response.data.message);
			}				
		});		
	}
}]);

myApp.controller('myControllerStudent', ['$scope', '$http', '$window', function($scope,$http,$window){

	$scope.selectedApplicantData = JSON.parse($window.sessionStorage.getItem("Mydata"));
	$scope.attachment = Object.keys($scope.selectedApplicantData._attachments)[0];
	$scope.dateOfBirth = new Date($scope.selectedApplicantData.dob);
	console.log($scope.selectedApplicantData);

	$scope.updateStatus = function(buttonValue){
	
		var data = {
				id: $scope.selectedApplicantData._id,
				status : buttonValue
		};
	$http(
		{
		   method: 'POST',
		   url: 'http://localhost:8080/applicantDataStatus/', 
		   data: data  
		}).then(function successCallback(response) {
			if(JSON.stringify(response) != '{}' && response.data.status == "200"){
				window.location.replace("http://localhost:8080/requestTable.html");				
			}else{
				alert(response.data.message);
			}				
		});		
	}
	
	$scope.moveToRequestTable = function(clickedData){
		window.location.replace("http://localhost:8080/requestTable.html");						
	}
}]);