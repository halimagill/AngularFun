export class User {
  static _id : number = 0;
  static email: string = '';
  static firstName: string = '';
  static lastName: string = '';
  static Name : { firstName: string, lastName: string } = { firstName: '', lastName: '' };
  static token: string = '';
  static roles: string[] = [];
  static exp: number = 0;
  static iat: number = 0;
  static nbf: number = 0;
  static unique_name: string = '';
   
  static mapLoginInfo(user: any) {
    this._id = user.id;
    this.email = user.email;
    this.token = user.token;
  }
  
  static mapUserToken(user: any) {    
    this.token = user.token;   
    this.exp = user.exp;
    this.iat = user.iat;
    this.nbf = user.nbf;
    this.unique_name = user.unique_name;
  }
}
