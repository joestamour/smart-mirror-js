(function() {
    'use strict';

    function CalendarService($http) {
      var service = {};
      service.calendar = null;

      var CLIENT_ID = '399836225200-n6mn1qg3ruoj2g4rth2mtva2asli84bt.apps.googleusercontent.com';
      var SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];

      service.init = function() {
        $http.post("https://apis.google.com/js/client.js?onload=checkAuth");
        service.checkAuth();
        service.handleAuthClick(null);
      };

      /**
       * Check if current user has authorized this application.
       */
      service.checkAuth = function() {
        gapi.auth.authorize(
          {
            'client_id': CLIENT_ID,
            'scope': SCOPES.join(' '),
            'immediate': true
          }, handleAuthResult);
      }

      /**
       * Handle response from authorization server.
       *
       * @param {Object} authResult Authorization result.
       */
      service.handleAuthResult = function(authResult) {
        var authorizeDiv = document.getElementById('authorize-div');
        if (authResult && !authResult.error) {
          // Hide auth UI, then load client library.
          authorizeDiv.style.display = 'none';
          loadCalendarApi();
        } else {
          // Show auth UI, allowing the user to initiate authorization by
          // clicking authorize button.
          authorizeDiv.style.display = 'inline';
        }
      }

      /**
       * Initiate auth flow in response to user clicking authorize button.
       *
       * @param {Event} event Button click event.
       */
      service.handleAuthClick = function(event) {
        gapi.auth.authorize(
          {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
          handleAuthResult);
        return false;
      }

      /**
       * Load Google Calendar client library. List upcoming events
       * once client library is loaded.
       */
      service.loadCalendarApi = function() {
        gapi.client.load('calendar', 'v3', listUpcomingEvents);
      }

      /**
       * Print the summary and start datetime/date of the next ten events in
       * the authorized user's calendar. If no events are found an
       * appropriate message is printed.
       */
      service.listUpcomingEvents = function() {
        var request = gapi.client.calendar.events.list({
          'calendarId': 'taylor-sutcliffe@fsm.northwestern.edu',
          'timeMin': (new Date()).toISOString(),
          'showDeleted': false,
          'singleEvents': true,
          'maxResults': 10,
          'orderBy': 'startTime'
        });

        request.execute(function(resp) {
          var events = resp.items;
          appendPre('Upcoming events:');

          if (events.length > 0) {
            for (i = 0; i < events.length; i++) {
              var event = events[i];
              var when = event.start.dateTime;
              if (!when) {
                when = event.start.date;
              }
              appendPre(event.summary + ' (' + when + ')')
            }
          } else {
            appendPre('No upcoming events found.');
          }

        });
      }

      return service;
  }

  angular.module('SmartMirror')
    .factory('CalendarService', CalendarService);

}());