/**
 * Created by mh4047 on 2/28/15.
 * productionController controls the production div in the main page index.html
 */


app.controller('productionController', function($scope, $http){
    $scope.extraction_rules = [
        {
            rule:   "Degree := /[\\w+]@[\\w\\.]+/\n"            +
                    "from Lines\n"                              +
                    "after Line /Education/\n"
        },{
            rule:   "Author := /[A-Z][a-z]+\\s*[A-Z][a-z]+/g\n"   +
                    "from Line\n"                                 +
                    "after Heading #1\n"
        }/*,
        { rule: 'Organization' },
        { rule: 'JobTitle' },
        { rule: 'SYNONYM_OF' },
        { rule: 'Job' }*/
    ];

    $scope.gridOptions  = {                                                     // Load data and options into the table
        data            :  $scope.extraction_rules,
        headerTemplate  :  "<div class='ui-grid-top-panel' style='text-align: center'></div>",
        onRegisterApi   :  function( gridApi ) {
            $scope.gridApi = gridApi;
        }
    };

});
