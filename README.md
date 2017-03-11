# ES6 (ECMAScript 2015) Quick reference  - Mobile App

cordova platform add android

cordova build --release android
--------------------	Build APK steps	---------------------
Running Your App
To run your app, all you have to do is enable USB debugging and Developer Mode on your Android device, then run ionic run android --device from the command line.

ionic run android --device

------------------------------------------------

To build the app (create unsighed version)

ionic build android --prod --release

----------------------------------

Go to the output .apk directory:

cd app/platforms/android/build/outputs/apk/

Put your release.keystore in that folder, if you don't have, create new key file:

--------------------------------

If you already dont have release key

keytool -genkey -v -keystore release.keystore -alias ecmascript -keyalg RSA -keysize 2048 -validity 10000

---------------------

jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore release.keystore android-release-unsigned.apk ALIAS

------------------

set path:

C:\Users\sanatar2\AppData\Local\Android\sdk\build-tools\25.0.2

zipalign -v 4 android-release-unsigned.apk app.apk

------------------------