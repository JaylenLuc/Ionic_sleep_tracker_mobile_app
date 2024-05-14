 export default  class sleepDataInterface {
    sleep_time? : string;
    wake_time? : string;
    datetime? : string;
    rating? :string
    notes?: string
    date_obj? : Date;

    constructor( data : {sleep_time : string, wake_time : string, datetime : string, 
        rating : string, notes : string, date_obj : Date}){

        this.sleep_time = data.sleep_time
        this.wake_time = data.wake_time
        this.datetime = data.datetime
        this.rating = data.rating
        this.notes = data.notes
        this.date_obj = data.date_obj
    }



   get getDateObj(){
        return this.date_obj;
    }

}