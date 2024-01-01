

export class GlobalConstants{

    //Message
    public static genericError:string = "Something went wrong. please try again later";
    
    public static unauthroized: string =" you are not authorised person to access this page."

    public static productExistError: string ="Product already exist";
    public static productAdded: string ="Product added successfully";

    // Regex
    public static nameRegex:string = "[a-zA-Z0-9 ]*";

    public static emailRegex:string = "[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}";

    public static contactNumberRegex:string = "^[e0-9]{10,10}$";
    public static numericRegex:string = "^(([1-9]*)|(([1-9]*)\.([0-9]*)))$"
    public static dateRegex:string = "((?:19|20)\\d\\d)-(0?[1-9]|1[012])-([12][0-9]|3[01]|0?[1-9])";
 

    //variable

    public static error:string ="error";
}