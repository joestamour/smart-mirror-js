(function(angular) {
    'use strict';

    function MirrorCtrl(WeatherService, ComplementService, $scope, $timeout, $interval) {
        var _this = this;
        $scope.listening = false;
        $scope.debug = false;

        //Update the time
        function updateTime(){
            $scope.date = new Date();
        }

        //Update the weather
        function updateWeather(){
            WeatherService.init().then(function(){
                $scope.currentForcast = WeatherService.currentForcast();
                $scope.hourlyForcast = WeatherService.hourlyForcast();
                $scope.weeklyForcast = WeatherService.weeklyForcast();
            });
        }

        //Update the calendar
        function updateCalendar(){

        }

        //Update the calendar
        function updateComplement(){
            $scope.complement = ComplementService.getComplement();
        }

        _this.init = function() {
            // update time every second
            $interval(updateTime, 1000);

            // update calendar every one minute
            $interval(updateCalendar, 1 * 60 * 1000);

            // update weather every 2 minutes
            $interval(updateWeather, 2 * 60 * 1000);

            // update complement every 30 minutes
            $interval(updateComplement, 15 * 60 * 1000);

            updateTime();
            updateComplement();

            WeatherService.init().then(function(){
                $scope.currentForcast = WeatherService.currentForcast();
                $scope.hourlyForcast = WeatherService.hourlyForcast();
                $scope.weeklyForcast = WeatherService.weeklyForcast();
                console.log($scope.currentForcast);
                console.log($scope.hourlyForcast);
                console.log($scope.weeklyForcast);
            });

            var defaultView = function() {
                console.debug("Ok, going to default view...");
                $scope.focus = "default";
            }

        };

        _this.init();
    }

    angular.module('SmartMirror')
        .controller('MirrorCtrl', MirrorCtrl);

}(window.angular));
