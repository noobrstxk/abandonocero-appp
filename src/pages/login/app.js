.controller('SignupCtrl', function($scope, $http) {
    $scope.signup = function () {
    var request = $http({
        method: "post",
        url: "http://localhost/signup.php",
        crossDomain : true,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data: {
            username: $scope.userdata.username,
            email: $scope.userdata.email,
            password: $scope.userdata.password
            edad: $scope.userdata.edad

        },
    });
        request.success(function(data) {
        if(data == "1"){
         $scope.responseMessage = "Account Created Successfully!";
        }
        if(data == "2"){
         $scope.responseMessage = "Can not Create Account";
        }
        else if(data == "0") {
         $scope.responseMessage = "Email Already Exists"
        }  
    });
}
});