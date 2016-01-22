(function(angular) {
    'use strict';

    function MirrorCtrl(WeatherService, $scope, $timeout, $interval) {
        var _this = this;
        $scope.listening = false;
        $scope.debug = false;
        $scope.complement = "Hi, sexy!"
        $scope.focus = "default";
        $scope.user = {};

        $scope.colors=["#6ed3cf", "#9068be", "#e1e8f0", "#e62739"];

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

        _this.init = function() {
            var tick = $interval(updateTime, 1000);
            var tickMinutes = $interval(updateCalendar, 1 * 60 * 1000);
            var tickFiveMinutes = $interval(updateWeather, 5 * 60 * 1000);

            updateTime();
            updateWeather();

            _this.clearResults();

            var defaultView = function() {
                console.debug("Ok, going to default view...");
                $scope.focus = "default";
            }

        };

        _this.addResult = function(result) {
            _this.results.push({
                content: result,
                date: new Date()
            });
        };

        _this.clearResults = function() {
            _this.results = [];
        };

        _this.init();
    }

    angular.module('SmartMirror')
        .controller('MirrorCtrl', MirrorCtrl);

}(window.angular));
