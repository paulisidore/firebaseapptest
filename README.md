This repository is for testig purpose.
Android 13 (API 33) only failed on Firebase getToken() after permission is granted.

Please add environnement class and firebase project setting like:

#generate environments class command:
ng g environments

#Your environment.ts must look like this. Please replace propertys acording with your firebase application informations
export const environment = {
  useEmulators: true,
  production: false,
  firebase: {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
  }
};

#run 
ionic capacitor update
npx ng build  --configuration=production && npx cap copy

#after open project in Android Studio and test the project in a device with Android 13 (API Level 33)

#After run, click on Request Permissions for get permission and then click on Get Token and check the console for error.
