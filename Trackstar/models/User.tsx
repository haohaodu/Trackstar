export default class User {
  estimationAccuracy: number;
  calendarId: string;
  private static instance: User;

  private constructor() {
    this.estimationAccuracy = 100;
    this.calendarId = null;
  }

  static getInstance() {
    if (!User.instance) {
      User.instance = new User()
    }
    return User.instance
  }

//add something for if the database is empty
  //static getdatabase() {}


}
