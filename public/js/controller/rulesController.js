/**
 * Created by mh4047 on 2/28/15.
 * productionController controls the production div in the main page index.html
 */


app.controller('productionController', function($scope, $http,  $rootScope, learningService){

    $scope.learningService      = learningService;
    $scope.showSuggestedRules   = learningService.isLearning; //false;
    $scope.showLoadLearning     = false;

    $scope.toggleShowSuggestedRules = function (){
        $scope.showLoadLearning = true;
        console.log("showloadlearning progress bar:"+$scope.showLoadLearning)
        /*setTimeout(function(){

            $scope.showSuggestedRules   = true; //!$scope.showSuggestedRules;
            $scope.showLoadLearning     = false;
            console.log("Toggle show for suggested rules! "+$scope.showSuggestedRules)

        //}, 3000);*/
        setTimeout(function (){
            $scope.$apply(function(){
                $scope.showSuggestedRules   = true; //!$scope.showSuggestedRules;
                $scope.showLoadLearning     = false;
                console.log("Toggle show for suggested rules! "+$scope.showSuggestedRules)
            });
        }, 1000);

    }

    $rootScope.$on('BeginLearning', function(event, args) {
        console.log("Event has been detected")
        $scope.toggleShowSuggestedRules();
    });

    // Figure out how to detect change on isLearning, in order to figure out when to show the suggested rules
    /*$rootScope.$watch(function() {
        console.log("checking islearning:"+learningService.isLearning)
        return learningService.isLearning;
    }, function() {
        console.log("CHANGE in isLearning:"+$scope.learningService.isLearning)
        if($scope.learningService.isLearning){
            $scope.toggleShowSuggestedRules()
        }
    });*/


    /*$scope.extraction_rules = [
        {
            rule:   "Degree := /[\\w+]@[\\w\\.]+/\n"            +
                    "from Lines\n"                              +
                    "after Line /Education/\n"
        },{
            rule:   "Author := /[A-Z][a-z]+\\s*[A-Z][a-z]+/g\n"   +
                    "from Line\n"                                 +
                    "after Heading #1\n"
        }
    ];

    $scope.gridOptions  = {                                                     // Load data and options into the table
        data            :  $scope.extraction_rules,
        headerTemplate  :  "<div class='ui-grid-top-panel' style='text-align: center'></div>",
        onRegisterApi   :  function( gridApi ) {
            $scope.gridApi = gridApi;
        }
    };*/

});
