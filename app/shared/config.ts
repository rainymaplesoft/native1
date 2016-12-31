export class Config {
  static apiPostUrl = "https://httpbin.org/post";
  static get token():string {
    return <string>localStorage.getItem("token");
  }
  static set token(theToken: string) {
    localStorage.setItem("token", theToken);
  }
  static hasActiveToken() {
    return !!localStorage.getItem("token");
  }
}