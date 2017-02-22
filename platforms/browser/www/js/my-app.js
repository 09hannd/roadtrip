// Initialize app
var myApp = new Framework7();

var $$ = Dom7;

var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

/* Roadtrip js */

var map,
    colors = {
        primary: "#ffcc00"
    },
    places_search_screen = document.getElementById("places-search-screen"),
    background_screen = document.getElementById("bg"),
    route = [],
    routeEl = document.getElementById("route-list");
    
var numbers = [{
        path: 'M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z',
        fillColor: colors.primary,
        fillOpacity: 1,
        scale: 0.15,
        strokeColor: 'gold',
        strokeWeight: 1
}];


function initMap() {
    styles = {
        default: null,
        night: [
          {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
          {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
          {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
          {
            featureType: 'administrative.locality',
            elementType: 'labels.text.fill',
            stylers: [{color: colors.primary}]
          },
          {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [{color: colors.primary}]
          },
          {
            featureType: 'poi.park',
            elementType: 'geometry',
            stylers: [{color: '#263c3f'}]
          },
          {
            featureType: 'poi.park',
            elementType: 'labels.text.fill',
            stylers: [{color: '#6b9a76'}]
          },
          {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{color: '#38414e'}]
          },
          {
            featureType: 'road',
            elementType: 'geometry.stroke',
            stylers: [{color: '#212a37'}]
          },
          {
            featureType: 'road',
            elementType: 'labels.text.fill',
            stylers: [{color: '#9ca5b3'}]
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [{color: '#746855'}]
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [{color: '#1f2835'}]
          },
          {
            featureType: 'road.highway',
            elementType: 'labels.text.fill',
            stylers: [{color: '#f3d19c'}]
          },
          {
            featureType: 'transit',
            elementType: 'geometry',
            stylers: [{color: '#2f3948'}]
          },
          {
            featureType: 'transit.station',
            elementType: 'labels.text.fill',
            stylers: [{color: colors.primary}]
          },
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{color: '#17263c'}]
          },
          {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [{color: '#515c6d'}]
          },
          {
            featureType: 'water',
            elementType: 'labels.text.stroke',
            stylers: [{color: '#17263c'}]
          }
        ]
    };
    
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 51.5074, lng: -0.1278},
        zoom: 8,
        mapTypeControl: false,
        styles: styles.night
    });  
    
    updateRouteList();
}

function searchPlaces(){
    var q = document.getElementById("search-q").value,
        places_el = document.getElementById("places"),
        element_html = "<li class='item-content color-white'>" +
                        //"<div class='item-media'><i class='icon icon-f7'></i></div>" + 
                        "<div class='item-inner'>" + 
                            "<div class='item-title'>{title} - {address}</div>" +
                            "<div class='item-after'><b class='color-primary' onclick=\"addToRoute('{title}',{lat},{long})\">ADD</b></div>" +
                        "</div>" +
                    "</li>";
    service = new google.maps.places.PlacesService(map);
    service.textSearch({
        query: q
    }, function(results, status){
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            places_el.innerHTML = "";
            for (var i = 0; i < results.length; i++) {
                var place = results[i];
                result = results[i];
                places_el.innerHTML += element_html.replaceAll("{title}", result.name)
                    .replace("{address}",result.formatted_address)
                    .replace("{lat}",result.geometry.location.lat())
                    .replace("{long}",result.geometry.location.lng());
            }
        } else {
            alert(status);
        }

    });
}

function addToRoute(name,lat,long){
    var myLatLng = {lat: lat, lng: long};
    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        icon: numbers[0],
    });
    
    unBlurBg();
    myApp.closeModal(places_search_screen);

    place = {};
    place.name = name;
    place.lat = lat;
    place.lng = long;
    route.push(place);
    updateRouteList();
}

function blurBg(){
    switch(device.platform){
        case "iOS":
            background_screen.style.webkitFilter = 'blur(15px)';
            background_screen.style.webkitTransform = 'scale(0.9)';
        case "Android":
            background_screen.style.opacity = 0.2;
    }
    
}
function unBlurBg(){
    switch(device.platform){
        case "iOS":
            background_screen.style.webkitFilter = 'blur(0px)';
            background_screen.style.webkitTransform = 'scale(1)';
        case "Android":
            background_screen.style.opacity = 1;
    }
}

function updateRouteList(){
    routeEl.innerHTML = "<h1 class='color-white'>Route</h1>";
    if(route.length == 0)routeEl.innerHTML += "<p>Add some places to see them here.</p>";
    else {
        for(var i = 0; i < route.length; i++){
            place = route[i];
            name = place.name;
            routeEl.innerHTML += "<h2>" + name.toUpperCase() + "</h2>";
        }
    }
}