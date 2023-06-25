export class RegisterDto{
    username: String;
    names: String;
    lastNames: String
    email: String;
    age: Number;
    dni: String;
    password: String;

    constructor(username: String, names: String, lastNames: String, email:String, age:Number, dni:String, password: String ){
        this.username = username;
        this.names = names;
        this.lastNames = lastNames;
        this.email = email;
        this.age = age;
        this.dni = dni;
        this.password = password;
    }
}