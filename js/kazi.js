var map = new L.map('map').setView([-6.164653, 39.208925], 14 );

var osmlayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);




 //layer style
 var style_shehia = {
     "color":"#cfcfcf",
     "weight": 0.5,
     "opacity": 0.5,
     "dashArray": '5,5',
    "fillColor": "#cfcfcf",
     "fillOpacity": 1
};
 var style_buildings = {
     "color":"#4f4e4d",
     "weight": 0.5,
     "opacity": 0.5,
     "dashArray": '5,5',
    "fillColor": "#4f4e4d",
     "fillOpacity": 1
};
var style_wastepoints = {
    "color":"#242322",
    "radius": 3.5,
    "weight": 0.5,
    "opacity": 0,
    "fillColor": "#242322",
    "fillOpacity": 1
};
var styleWater = {
    "color":"#4f4e4d",
    "weight": 0.5,
    "opacity": 0,
    "fillColor": "#8ADAFA",
    "fillOpacity": 1
};
var styleFloodpronearea = {
    "color":"#e66363",
    "weight": 0.5,
    "opacity": 0,
    "fillColor": "#e66363",
    "fillOpacity": 1
};

 function styleDrainage(b) {
     return b == 'yes' ? '#ff0505' :
            b == 'no'  ? '#00db37' :
                       '#07cdf0';
 }
 function drainageStyle(feature,map) {
     return { 
         opacity:1,
         weight:2,
		 color: styleDrainage(feature.properties.blockage),
         fillOpacity:1
     };
	}
	
var bufferStyle = {
    "color":"#ff0505",
    "weight": 0.5,
    "opacity": 1,
    "fillColor": "#ff0505",
    "fillOpacity": 0.5
};
	
 function styleBlockage(b) {
     return b == 'concrete' ? '#ff0505' :
            b == 'dirt'  ? '#00db37' :
			b == 'dirty'  ? '#00db37' :
			b == 'metal'  ? '#00db37' :
			b == 'grass or plant'  ? '#00db37' :
			b == 'grass or plants'  ? '#00db37' :
			b == 'grass_or_plant'  ? '#00db37' :
			b == 'rubish or solid_waste'  ? '#00db37' :
			b == 'rubish_or_solid_waste'  ? '#00db37' :
			b == 'solid waste or rubish'  ? '#00db37' :
			b == 'no'  ? '#00db37' :
                       '#07cdf0';
 }
 function blockStyle(feature,map) {
     return { 
         opacity:1,
         weight:2,
		 color: styleBlockage(feature.properties.blockage_m),
         fillOpacity:1
     };
	}

	
// data layers
var shehias = L.geoJson(shehias,{style:style_shehia}).addTo(map); //shehias
var buildings = L.geoJson(building,{style:style_buildings}).addTo(map); //buildings

//threats
var drainages = L.geoJson(drainage,{style:drainageStyle}) //drainage
//var wastepoints = L.geoJson(wastepoints,{style:style_wastepoints}) //wastepoints
var waterbodies = L.geoJson(waterbodies,{style:styleWater}) //waterbodies
var wastepoints = L.geoJson(wastepoints, {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, style_wastepoints);
    },
    //onEachFeature:onEachShop
});



//impact
var floodpronearea = L.geoJson(floodpronearea,{style:styleFloodpronearea}); //floodpronearea
var floodedbuffer = L.geoJson(floodbuffer,{style:bufferStyle}); //floodpronebuffer

//blockage material
var blocked = L.geoJson(drainage,{style:blockStyle}) //drainage


//groups
var threats= L.layerGroup([waterbodies,wastepoints,drainages]).addTo(map);
var impact= L.layerGroup([floodpronearea,floodedbuffer]).addTo(map);
var blockages= L.layerGroup([blocked]).addTo(map);


//layer control
 var overlays = {
             "Threat toward drainage blockage":threats,
			 "Impact":impact,
			 "Blockage material":blockages
			}; 
 var basemaps = {
             "OpenStreetMap":osmlayer
         };

L.control.layers(overlays,basemaps,{position:'topright'}).addTo(map);


//legends
var legend_drainage = L.control({position: 'bottomleft'});

legend_drainage.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend'),
        grades = ["ditch", "drain","stream","underground_drain"],
        labels = [];
    div.innerHTML += '<b>Blockage material</b><br><img src="./images/chammy.png">' 
    return div;
};
map.addControl(legend_drainage);





