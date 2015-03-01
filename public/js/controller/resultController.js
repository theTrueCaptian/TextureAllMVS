/**
 * Created by mh4047 on 2/28/15.
 * resultController controls the result div in the main page
 */


//Controls resultsContainer.html
//Load in data into the results table
app.controller('resultController', function($scope, $http){
    //This contains a list of unique keywords e.g. Name, Address, etc
    $scope.keyword_list = [{ field: 'name', enableCellEdit: true }, { field: 'gender', enableCellEdit: true  }];
    $scope.gridOptions = {
        enableSorting: true,
        columnDefs: $scope.keyword_list,
        onRegisterApi: function(gridApi) {
            $scope.gridApi = gridApi;
        }
    };

    $scope.addData = function() {
        var n = $scope.gridOptions.data.length + 1;
        $scope.gridOptions.data.push({

        });
    };

    $scope.removeRow = function(index) {
        //if($scope.gridOpts.data.length > 0){
        $scope.gridOptions.data.splice(index,1);
        //}
    };

    //Adds a unique keyword, $scope.search_box, to the list of keywords
    $scope.submit_keyword = function(){
        if(isExists($scope.keyword_list, $scope.search_box)){   //Check for uniqueness of $scope.search_box within $scope.keyword_list
            $scope.keyword_list.push({field:$scope.search_box, enableSorting: false, enableCellEdit: true });
        }else{
            //Alert user of already existing keyword
            $scope.addAlert("Keyword "+$scope.search_box+" already exists!");
        }
        //Clear textbox
        $scope.search_box = "";

    };

    $scope.alerts = [ ];

    $scope.addAlert = function(msg) {
        $scope.alerts.push({ type: 'danger', msg: msg});
        var ind = $scope.alerts.length-1;
        setTimeout(function(){ $scope.closeAlert(ind); console.log("close alert at "+ind);  }, 5000);
    };

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };
});
