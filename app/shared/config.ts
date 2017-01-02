
import { getString, setString } from "application-settings";

const apiUrl = "https://httpbin.org";
export class Config {
  //"https://api.everlive.com/v1/GWfRtXi1Lwt4jcqK";

  static urlRegister = apiUrl + '/post';
  static urlLogin = apiUrl + '/post';
  static urlGroceryList = apiUrl + '/post';

  static get token(): string {
    return getString("token");
  }
  static set token(theToken: string) {
    setString("token", theToken);
  }

  static isLoggedIn(): boolean {
    return !!getString("token");
  }
}