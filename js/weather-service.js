(function() {
    'use strict';

    function WeatherService($http) {
        var service = {};
        service.forcast = null;

        service.init = function() {
            return $http.jsonp('https://api.forecast.io/forecast/'+FORCAST_API_KEY+'/41.8369,-87.6847?callback=JSON_CALLBACK').
                then(function(response) {
                    return service.forcast = response;
                });
        };

        //Returns the current forcast along with high and low tempratures for the current day 
        service.currentForcast = function() {
            if(service.forcast === null){
                return null;
            }
            service.forcast.data.currently.day = moment.unix(service.forcast.data.currently.time).format('ddd')
            service.forcast.data.currently.temperature = Math.round(service.forcast.data.currently.temperature);
            service.forcast.data.currently.apparentTemperature = Math.round(service.forcast.data.currently.apparentTemperature);
            return service.forcast.data.currently;
        }

        service.weeklyForcast = function(){
            if(service.forcast === null){
                return null;
            }
            // Add human readable info to info
            for (var i = 0; i < service.forcast.data.daily.data.length; i++) {
                service.forcast.data.daily.data[i].day = moment.unix(service.forcast.data.daily.data[i].time).format('ddd');
                service.forcast.data.daily.data[i].temperatureMin = Math.round(service.forcast.data.daily.data[i].temperatureMin);
                service.forcast.data.daily.data[i].temperatureMax = Math.round(service.forcast.data.daily.data[i].temperatureMax);
            };
            return service.forcast.data.daily;
        }

        service.hourlyForcast = function(){
            if(service.forcast === null){
                return null;
            }

            // Add human readable info to info

            // remove first hourly data if it's not even
            var currentHour = moment.unix(service.forcast.data.hourly.data[0].time).format('h');
            if ( currentHour%2 != 0) {
                service.forcast.data.hourly.data.splice(0,1);
            }

            for (var i = 0; i < service.forcast.data.hourly.data.length; i++) {
                service.forcast.data.hourly.data[i].hour = moment.unix(service.forcast.data.hourly.data[i].time).format('ha');
                service.forcast.data.hourly.data[i].temperature = Math.round(service.forcast.data.hourly.data[i].temperature);
            };
            return service.forcast.data.hourly;
        }

        service.refreshWeather = function(){
            return service.init();
        }
        
        return service;
    }

    angular.module('SmartMirror')
        .factory('WeatherService', WeatherService);

}());
