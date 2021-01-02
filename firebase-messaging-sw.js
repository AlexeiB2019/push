// firebase_subscribe.js
firebase.initializeApp({
    messagingSenderId: '880657079842'
});

var messaging = firebase.messaging();

subscribe();


function subscribe() {
    // ask for notifications
    messaging.requestPermission()
        .then(function () {
            // get device  ID
            messaging.getToken()
                .then(function (currentToken) {
                    console.log(currentToken);

                    if (currentToken) {
                        sendTokenToServer(currentToken);
                    } else {
                        console.warn('Can not get token');
                        setTokenSentToServer(false);
                    }
                })
                .catch(function (err) {
                    console.warn('Server error on getting token', err);
                    setTokenSentToServer(false);
                });
    })
    .catch(function (err) {
        console.warn('Notifications disabled', err);
    });
}


// sending ID to the server
function sendTokenToServer(currentToken) {
    if (!isTokenSentToServer(currentToken)) {
        console.log('Sending token to the server...');

        var url = ''; // script address to save ID's
        $.post(url, {
            token: currentToken
        });

        setTokenSentToServer(currentToken);
    } else {
        console.log('Token sent to the server');
    }
}


// use localStorage to store notifications status
function isTokenSentToServer(currentToken) {
    return window.localStorage.getItem('sentFirebaseMessagingToken') == currentToken;
}


function setTokenSentToServer(currentToken) {
    window.localStorage.setItem(
        'sentFirebaseMessagingToken',
        currentToken ? currentToken : ''
    );
}
