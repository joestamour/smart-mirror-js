(function() {
    'use strict';

    var complements = {
        'morning': [
            'Good morning, my love!',
            'Enjoy your day!',
            'How was your sleep?',
            'Have a great day!'
        ],
        'afternoon': [
            'Hello, beautiful!',
            'You are sexy!',
            'Looking good today!',
            'You look wonderful!'
        ],
        'evening': [
            'Wow, you are hot!',
            'You look gorgeous!',
            'Hey, sexy!',
            'You look perfect!'
        ]
    }

    function ComplementService($http) {
        var service = {};
        service.complement = null;

        service.init = function() {
            // set up
            service.complement = "Mirror, Mirror"
        };

        //Returns one of the current time's complements
        service.getComplement = function() {
            service.complement = ""

            var _list = [];

            var hour = moment().hour();

            if (hour > 3 && hour < 12) {
                // Morning complements
                _list = complements['morning'].slice();
            } else if (hour >= 12 && hour < 17) {
                // Afternoon complements
                _list = complements['afternoon'].slice();
            } else if (hour >= 17 || hour <= 3) {
                // Evening complements
                _list = complements['evening'].slice();
            } else {
                // Edge case in case something weird happens
                // This will select a complement from all times of day
                Object.keys(complements).forEach(function (_curr) {
                    _list = _list.concat(complements).slice();
                });
            }

            // Search for the location of the current complement in the list
            var _spliceIndex = _list.indexOf(service.complement);

            // If it exists, remove it so we don't see it again
            if (_spliceIndex !== -1) {
                _list.splice(_spliceIndex, 1);
            }

            // Randomly select a location
            var _randomIndex = Math.floor(Math.random() * _list.length);
            service.complement = _list[_randomIndex];

            console.log(service.complement)
            return service.complement;
        }

        return service;
    }

    angular.module('SmartMirror')
        .factory('ComplementService', ComplementService);

}());
