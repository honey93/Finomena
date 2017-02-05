


var app = angular.module('myApp', ['ui.router','ngMaterial']);


app.config(function($interpolateProvider,$stateProvider,$urlRouterProvider){

                       // $scope.authenticated = false;
                       // $scope.name = "";
                       // $authProvider.loginUrl = '/latitude/public/api/authenticate';
                      // $authProvider.loginUrl = '/api/authenticate';

                       // $interpolateProvider.startSymbol('[[').endSymbol(']]');

                    
                        $urlRouterProvider.otherwise('/home');

                        $stateProvider

                        .state('home',{

                          url: '/home',
                          templateUrl: 'templates/front.html',
                          controller:'home'

                        })

                        .state('questions',{

                          url: '/ques',
                          templateUrl: 'templates/questions.html',
                          controller:'myCtrl'

                        })

                        .state('report',{
                          url: '/completereport',
                          templateUrl: 'templates/report.html',
                          controller:'myreport'
                          
                        })


                    });


app.controller('myreport',function($scope,$rootScope,$state){

$scope.user = localStorage.name;	

$scope.questions = JSON.parse(localStorage.questions);

$scope.homepage = function () {

	$state.go("home");

}

//alert(localStorage.name);

});


app.controller('home',function($scope,$state){

	$scope.name = "";
	$scope.invalid = false;

$scope.show_questions = function(valid){

	if(valid){  

		//alert("success");
	$scope.invalid = false

	localStorage.name = $scope.name;
		$state.go('questions');
	}

	else{

		$scope.invalid = true;
	}
}

});


app.controller('myCtrl', function($scope,$state,$timeout) {



$('.bubble').bind('click', function (ev) {

   //	alert("hello");
   // var $div = $(ev.target);
   // var $display = $div.find('.parent');
   // alert($('.parent').offset().top);
    //alert(ev.clientY);
   // var offset = $div.offset();
    var x = ev.clientX - $('.parent').offset().left;
    var y =  -40;
    
   var x = x +'px';
   var y  = y +'px';

   var p = '200px';
   var q = '-400px';
   	//alert(x);
   	//alert(y);
   $('.circle').css({"-webkit-transform":'translate(' + x + ',' + y +')'});
   $('.box').css({"-webkit-transform":'translate(' + p + ',' + q +')'});
    
    //$display.text('x: ' + x + ', y: ' + y);
});



	


	$scope.username = localStorage.name;

	

	$scope.show_report = function(){

		localStorage.questions = JSON.stringify($scope.questions);

		$state.go('report');
	}

	$scope.show_ques = true;
    
    $scope.data = [ {
    "title": "True",
    "value":0
	  }, {
	    "title": "False",
	    "value": 0
	  } ];
	    
    $scope.current_question = {id:"",que:"",options:[],img:"",correct:"",response:"",visited:""};
    
    
	$scope.questions = [{
		id: "1",
		que: "Guess the location?",
		options: ["IIT Delhi", "IIT Mumbai"],
		img: "images/ted.jpeg",
		correct: 0,
		response: "",
		visited: "no"
	}, {
		id: "2",
		que: "Man who made the investment in Finomena?",
		options: ["Tarun Davda", "Rajat Agarwal"],
		img: "images/investor.png",
		correct: 1,
		response: "",
		visited: "no"
	}, {
		id: "3",
		que: "When was this company Founded?",
		options: ["4 Feb 2004", "5 March 2003"],
		img: "images/facebook.jpg",
		correct: 0,
		response: "",
		visited: "no"
	}, {
		id: "4",
		que: "Dream, Dream Dream Dreams transform into thoughts And thoughts result in action.",
		options: ["Barack Obama", "Abdul Kalam"],
		img: "images/kalam-obama.jpg",
		correct: 1,
		response: "",
		visited: "no"
	}, {
		id: "5",
		que: "This famous book is written by ?",
		options: ["Peter Thiel", "Jason Fried"],
		img: "images/zero_to_one.jpg",
		correct: 0,
		response: "",
		visited: "no"
	}];
$scope.current_question = $scope.questions[0];
$scope.count = 0;




$scope.fetch_next = function(val){

	//alert(event.offsetX);

	$scope.boxClass = true;

	$timeout(function(){
		$scope.boxClass = false;

			$scope.questions[$scope.count].response = val;
	$scope.questions[$scope.count].visited = "yes";	
	$scope.count++;
	$scope.current_question = $scope.questions[$scope.count];


	if($scope.count >4){

		var i =0;	
		for(i=0;i<$scope.questions.length;i++){

				if($scope.questions[i].correct == $scope.questions[i].response){
					$scope.data[0].value = $scope.data[0].value + 1;
					//alert("correct");
				}

				else{

					$scope.data[1].value = $scope.data[1].value + 1;
				}

				//console.log(JSON.stringify($scope.data));

		}

		$scope.show_ques = false;

		var chart = AmCharts.makeChart( "chartdiv", {
		  "type": "pie",
		  "theme": "light",
		  "dataProvider": $scope.data,
		  "titleField": "title",
		  "valueField": "value",
		  "labelRadius": 5,

		  "radius": "42%",
		  "innerRadius": "60%",
		  "labelText": "[[title]]",
		  "export": {
		    "enabled": true
		  }
		} );

		//$scope.$digest();
		console.log(JSON.stringify($scope.questions));
	}




	},1000);

	


}







    

});