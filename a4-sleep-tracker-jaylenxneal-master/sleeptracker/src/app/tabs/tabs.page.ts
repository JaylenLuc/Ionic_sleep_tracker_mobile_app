import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  firebaseConfig : any ; 

  constructor() {


    this.firebaseConfig = {
      apiKey: "AIzaSyBlTcchE776SreodTscpRhORgoRhghkRso",
      authDomain: "ionic-sleep-tracker-inf-133.firebaseapp.com",
      projectId: "ionic-sleep-tracker-inf-133",
      storageBucket: "ionic-sleep-tracker-inf-133.appspot.com",
      messagingSenderId: "268861290173",
      appId: "1:268861290173:web:adef1609d50d8a8912e9d4",
      measurementId: "G-STSSHPEQY1"
    };
    


  }

}
