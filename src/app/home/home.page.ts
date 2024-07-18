import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import {
  FirebaseMessaging,
  GetTokenOptions,
} from "@capacitor-firebase/messaging";

import { environment } from 'src/environments/environment';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class HomePage {
  public token = "";

  constructor() {
    FirebaseMessaging.addListener("notificationReceived", (event) => {
      console.log("notificationReceived: ", { event });
    });
    FirebaseMessaging.addListener("notificationActionPerformed", (event) => {
      console.log("notificationActionPerformed: ", { event });
    });
    if (Capacitor.getPlatform() === "web") {
      navigator.serviceWorker.addEventListener("message", (event: any) => {
        console.log("serviceWorker message: ", { event });
        const notification = new Notification(event.data.notification.title, {
          body: event.data.notification.body,
        });
        notification.onclick = (event) => {
          console.log("notification clicked: ", { event });
        };
      });
    }
  }

  public async requestPermissions(): Promise<void> {
    await FirebaseMessaging.requestPermissions().then(
      (perm)=>{
        console.log("Permission recus: "+perm.receive);
      }
    );
  }

  public async getToken(): Promise<void> {
    const options: GetTokenOptions = {
      vapidKey: environment.firebase.vapidKey,
    };
    if (Capacitor.getPlatform() === "web") {
      options.serviceWorkerRegistration =
        await navigator.serviceWorker.register("firebase-messaging-sw.js");
    }
    const { token } = await FirebaseMessaging.getToken(options);
    this.token = token;
    console.log("Token Recu: "+this.token);
  }
}
