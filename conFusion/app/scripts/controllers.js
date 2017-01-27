// JavaScript source code
'use strict';
angular.module('confusionApp')
    .controller('MenuController', ['$scope', 'menuFactory', function ($scope, menuFactory) {
        $scope.tab = 1;
        $scope.filtText = "";
        $scope.showDetails = false;
        $scope.dishes = menuFactory.getDishes();

        $scope.toggleDetails = function () {
            $scope.showDetails = !$scope.showDetails;
        }

        $scope.select = function (setTab) {
            $scope.tab = setTab;
            switch (setTab) {
                case 2:
                    $scope.filtText = "appetizer";
                    break;
                case 3:
                    $scope.filtText = "mains";
                    break;
                case 4:
                    $scope.filtText = "dessert";
                    break;
                default:
                    $scope.filtText = "";
            }
        };
        $scope.isSelected = function (checkTab) {
            return ($scope.tab === checkTab);
        };
    }])

    .controller('ContactController', ['$scope', function ($scope) {

        $scope.feedback = { mychannel: "", firstName: "", lastName: "", agree: false, email: "" };

        var channels = [{ value: "tel", label: "Tel." }, { value: "Email", label: "Email" }];

        $scope.channels = channels;
        $scope.invalidChannelSelection = false;
    }])

    .controller('FeedbackController', ['$scope', function ($scope) {
        $scope.sendFeedback = function () {

            console.log($scope.feedback);

            if ($scope.feedback.agree && ($scope.feedback.mychannel == "")) {
                $scope.invalidChannelSelection = true;
                console.log('incorrect');
            }
            else {
                $scope.invalidChannelSelection = false;
                $scope.feedback = { mychannel: "", firstName: "", lastName: "", agree: false, email: "" };
                $scope.feedback.mychannel = "";
                $scope.feedbackForm.$setPristine();
                console.log($scope.feedback);
            }
        };
    }])
    .controller('DishDetailController', ['$scope', 'menuFactory', function ($scope, menuFactory) {

        var dish = menuFactory.getDish(3);

        $scope.dish = dish;
        $scope.commentBy = "";
    }])

        .controller('DishCommentController', ['$scope', function ($scope) {

            //Step 1: Create a JavaScript object to hold the comment from the form
            $scope.newComment = { rating: 5, comment: "", author: "", date: new Date() };

            $scope.submitComment = function () {
                console.log($scope.newComment)
                $scope.newComment.rating = Number($scope.newComment.rating)
                //Step 2: This is how you record the date
                $scope.newComment.date = new Date().toISOString();
                // Step 3: Push your comment into the dish's comment array
                $scope.dish.comments.push($scope.newComment);
                //Step 4: reset your form to pristine
                $scope.commentForm.$setPristine();
                //Step 5: reset your JavaScript object that holds your comment
                $scope.newComment = { rating: 5, comment: "", author: "", date: new Date() };
            }
        }])

;