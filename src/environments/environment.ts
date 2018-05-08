// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  httpProvider : 'http://localhost:7545',
  carteiraAlice: '0x1Dc8f94107B0Dc7Be5738886d803b42Ef843f1eC',
  carteiraOperadora: '0x614AA5941787042136B6Df49aA903413a3Fa2a08'
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
