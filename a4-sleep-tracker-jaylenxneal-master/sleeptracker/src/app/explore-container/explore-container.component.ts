import { JsonPipe } from '@angular/common';
import { Component, Input, OnInit} from '@angular/core';
import sleepDataInterface from "../data/sleepData";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import * as database from "firebase/database";
//import { atabase } from "firebase/database";
import * as firebase from 'firebase-admin';
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Initialize Firebase
@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
})
export class ExploreContainerComponent implements OnInit{
  current_seg : number = 0b0;
  @Input() tab2? : string;
  name?: string;
  @Input() button_label? : string;
  @Input() route? : string;
  @Input() placeholder_text? : string;
  @Input() date_choose? : string;
  @Input() start_time?: string;
  @Input() end_time?: string;
  @Input() scale_label? : string;
  sleep_time : string | undefined;
  sleep_time_date_obj? : Date;
  wake_time : string | undefined;
  array : string[][] = [["worst", "worst-tint"], ["bad", "bad-tint"], ["below", "below-tint"], ["mid", "mid-tint"], 
  ['aavg', 'aavg-tint'], ['good', 'good-tint'], ['best', 'best-tint']]

  array_length :number = this.array.length -1 
  finite_states: {[k:string] : number} = {"Atrocious": 0b0,"Bad": 0b0,"Below Average" : 0b0,"Mid":0b0,"Above average" : 0b0,"Good": 0b0,"Amazing" :0b0}  
  datetime? : string;
  date_class : Date = new Date();
  rating :string = ""
  notes: string = ""
  app :any;
  firebase_database : any;
  all_entries : any ;
  color : string[] = [];
  sleep_index = "sleep_time"
  wake_index = "wake_time"

  view_date? : string;
  //database : firebase.Database | undefined ;
  firebaseConfig = {
    apiKey: "AIzaSyBlTcchE776SreodTscpRhORgoRhghkRso",
    authDomain: "ionic-sleep-tracker-inf-133.firebaseapp.com",
    projectId: "ionic-sleep-tracker-inf-133",
    storageBucket: "ionic-sleep-tracker-inf-133.appspot.com",
    messagingSenderId: "268861290173",
    appId: "1:268861290173:web:adef1609d50d8a8912e9d4",
    measurementId: "G-STSSHPEQY1"
  };
  

  ngOnInit(): void {
    

    this.app = initializeApp(this.firebaseConfig);
    console.log("name of firebase : ", this.app.name)
    this.firebase_database = database.getDatabase(this.app)
    //database -> database ref -< push
    // Set the value of the datetime to the day
    // calculated above
    this.date_class.setDate(this.date_class.getDate() );
    this.datetime = this.date_class.toISOString().split('T')[0];
    
    this.sleep_time = this.date_class.toTimeString().split(" ")[0];
    this.wake_time = this.date_class.toTimeString().split(" ")[0];

    if (this.tab2 == "y"){
      let ret : string = "";
      let arr = this.date_class.toDateString().split(" ").slice(1)
      let num : string =("JanFebMarAprMayJunJulAugSepOctNovDec".indexOf(arr[0]) / 3 + 1).toString();
      console.log(arr[0].toString())
      if(num.length == 1) num = "0" +num

      ret = arr[2] + "-"+num  + "-"+arr[1]
      console.log(ret)

      let document : string = "";
      if (this.current_seg == 0b0) {
        document = "sleep-data"
        
        this.wake_index = "wake_time"
  
        this.sleep_index = "sleep_time"
      }
      else {
        
        document = "daytime-sleep-data"
        this.wake_index = "end_time"
  
        this.sleep_index = "start_time"
      }
  
      let _ref = database.ref(this.firebase_database, document +'/' + ret)
      let view_data = database.onValue(_ref, (snapshot) => {
        const key = snapshot.key;
        const value = snapshot.val();
        console.log(key, value);
  
        if (value == null)this.all_entries = null
        else{
          this.color = []
          this.all_entries = Object.entries(value).map(([k,v]) => {
            this.color.push(this.rand_gen())
            return v
          })
        }
  
      })
      
    }


  }

   public async SubmitSleepData(event : any) {
    if (this.rating != ''){

      console.log(this.date_class.toTimeString());
      console.log("curretn date ",this.datetime);
      console.log("sleep time ",this.sleep_time);
      console.log("wake time " ,this.wake_time);
      console.log(this.rating);
      console.log("Notes: ", this.notes)
    

      /* 
        {

          "2024-03-13" : [sleepDataInterface, sleepDataInterface sleepDataInterface sleepDataInterface],
          "2024-04-7" L [sleepDataInterface,sleepDataInterface,sleepDataInterface],
          
        }
      
      */

        /*
          rules_version = '2';

          service cloud.firestore {
            match /databases/{database}/documents {
              match /{document=**} {
                allow read, write: if false;
              }
            }
          }
        
        */


      if ( this.sleep_time && this.wake_time && this.datetime){
        
        
        //do the call to save to firebase

        /* 
          2024-3-15--> sleepDataInterfaceobj
        
        */
        let database_sleep_ref;
        switch(this.route){
          case "sleeptime" :
              console.log( this.datetime + "T" +this.date_class.getTime())
              database_sleep_ref = database.ref(this.firebase_database,'sleep-data/' + this.datetime + "/" +new Date().getTime())
                database.set(database_sleep_ref,{
                  "sleep_time": this.sleep_time,"wake_time" : this.wake_time, 
                  "datetime": this.datetime, "rating": this.rating,
                  "notes" : this.notes, "date_class " : this.date_class,
                  })

              break;

            

          case "daytime" :

            console.log( this.datetime + "T" +this.date_class.getTime())
            database_sleep_ref = database.ref(this.firebase_database,'daytime-sleep-data/' + this.datetime + "/" +new Date().getTime())
              database.set(database_sleep_ref,{
                "start_time": this.sleep_time,"end_time" : this.wake_time, 
                "datetime": this.datetime, "rating": this.rating,
                "notes" : this.notes, "date_class " : this.date_class,
                })

            break;

              




            
        }
        
      }
      
      
    }
    
  }

  
  onDatetimeChange(event : any):void  {
    this.datetime = event.detail.value.split('T')[0];
  }

  onSleepTimeChange(event : any):void  {
    this.sleep_time = event.detail.value.split('T')[1];
    this.sleep_time_date_obj = new Date(event.detail.value)
    console.log("sleep obj : ", this.sleep_time_date_obj)

    
  }


  onWakeTimeChange(event : any):void  {
    this.wake_time = event.detail.value.split('T')[1];
  
  }

  chipClick(event: any ):void{
    this.rating = event['srcElement']['innerText']
    
    if (this.finite_states[this.rating] == 0){
      console.log("in")
      for (let key in this.finite_states) {

        if (this.finite_states[key] == -1){
          console.log(key)
          this.finite_states[key] = ~this.finite_states[key]
          break
        }
        // Use `key` and `value`
      }
    }
    this.finite_states[this.rating] = ~this.finite_states[this.rating]
    console.log(this.finite_states[this.rating])
    




    

  }

  viewDateChange(event : any ){
    this.view_date = event.detail.value.split('T')[0];
    let document : string = "";
    if (this.current_seg == 0b0) {
      document = "sleep-data"
      
      this.wake_index = "wake_time"

      this.sleep_index = "sleep_time"
    }
    else {
      
      document = "daytime-sleep-data"
      this.wake_index = "end_time"

      this.sleep_index = "start_time"
    }

    let _ref = database.ref(this.firebase_database, document +'/' + this.view_date)
    let view_data = database.onValue(_ref, (snapshot) => {
      const key = snapshot.key;
      const value = snapshot.val();
      console.log(key, value);

      if (value == null)this.all_entries = null
      else{
        this.color = []
        this.all_entries = Object.entries(value).map(([k,v]) => {
          this.color.push(this.rand_gen())
          return v
        })
      }

    })

    




    // get(ref).then((snapshot) => {
    //   const key = snapshot.key;
    //   const value = snapshot.val();
    //   console.log(key, value);
    // });
  }


  segChange(event : any ){
      this.current_seg = ~this.current_seg
      console.log(this.current_seg)
      this.all_entries = null
  }

  rand_gen(){

    let rand_num =  Math.random();
    
    return this.array[Math.floor(rand_num * this.array_length + 0.5)][0]
  }


  
  

}
