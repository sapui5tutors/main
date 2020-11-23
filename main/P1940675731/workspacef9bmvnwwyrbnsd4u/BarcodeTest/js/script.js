function adSetter(){
var admobid = {};
// select the right Ad Id according to platform
if( /(android)/i.test(navigator.userAgent) ) { 
    admobid = { // for Android
        banner: 'ca-app-pub-2377379935274230/2835244502'
    };
} else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
    admobid = { // for iOS
        banner: 'ca-app-pub-2377379935274230/2835244502'
    };
} else {
    admobid = { // for Windows Phone
        banner: 'ca-app-pub-2377379935274230/2835244502'
    };
}
 
if(AdMob) AdMob.createBanner( {
    isTesting:true, //Remove this Before publishing your app
    adId:admobid.banner, 
    position:AdMob.AD_POSITION.BOTTOM_CENTER, 
    autoShow:true} );
 
}
  function onDeviceReady(){
      adSetter();
  }
 
 
function domLoaded(){
 document.addEventListener("deviceready", onDeviceReady, false);
}