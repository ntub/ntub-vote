// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyA9H3FjbhSExysAnO4nYOT3fDRyIylBsCA',
    authDomain: 'ntub-vote.firebaseapp.com',
    databaseURL: 'https://ntub-vote.firebaseio.com',
    projectId: 'ntub-vote',
    storageBucket: 'ntub-vote.appspot.com',
    messagingSenderId: '180728485009'
  },
  apiServer: 'https://vote-server.ntub.edu.tw'
  // apiServer: 'https://c923db7c.ngrok.io'
  // apiServer: ''
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
