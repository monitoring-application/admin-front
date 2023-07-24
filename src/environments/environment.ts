// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // apiProtocol: 'https',
  apiProtocol: 'http',
  apiUrl: 'https://api.friendsofroselin.com',
  backendUrl: 'https://api.friendsofroselin.com',
  // apiUrl: '146.190.145.208:3005',
  // backendUrl: 'http://localhost:3000',
  // apiUrl: "commandcenterapi.agaplibon.com", // "167.172.94.94", "commandcenterapi.agaplibon.com", //"178.128.107.47"
  apiPort: '3000',
  apiVersion: 'v1',

  apkUrl:
    'https://download1323.mediafire.com/fkani4mkgqhg/vq9najyanqhbr1c/EERS-Responder_v2.3.apk',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
