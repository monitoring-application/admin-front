import { environment } from 'src/environments/environment';

export class requestRoutes {
  //private mainUrl: string = environment.apiProtocol + "://" + environment.apiUrl + ":" + environment.apiPort;
  private mainUrl: string =
    environment.apiProtocol + '://' + environment.backendUrl;
  private apiVersion: string = '/api/' + environment.apiVersion + '/';

  public baseUrl: string = this.mainUrl + this.apiVersion;
  public baseBackendUrl: string = environment.backendUrl + this.apiVersion;

  public contactUs: string = 'contact-us';
  public signUp: string = 'sign-up';
  public user: string = 'user';
  public payoutRequest: string = 'request-payout';
  public downloadLink: string = 'dl-link';
  public responder: string = 'responder';
  public apiKey: string = '6885ab74-d692-4ad2-a6dc-8690ff3e7a24';
}
