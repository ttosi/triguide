var app = {
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
        app.receivedEvent('deviceready');

        // const coords = new Coordinates()
        // const div = document.getElementById('coords')
        // div.innerText = JSON.stringify("hello!")

        navigator.geolocation.getCurrentPosition(app.onSuccess, app.onError, { enableHighAccuracy: true })
    },
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
    onSuccess: function(position) {
      console.log('in success')
      const div = document.getElementById('coords')
      div.innerText = JSON.stringify(position.coords.latitude + " " + position.coords.longitude)
    },
    onError: function(err) {
      console.log('in error')
      console.log(err)
    }
};
