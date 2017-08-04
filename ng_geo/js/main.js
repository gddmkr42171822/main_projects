var markers = [];
var lines = [];
var map, currentMarker;
var allMapFeaturesVisible = "off";
var districtBoundary;
var showBoundary = true;
var numCorrectTextBoxes = 0;

var districts = {
    "district1": {
        "landmarks": [
            [], district1Landmarks
        ],
        "streets": [
            [], district1Locations
        ],
        "color": "red",
        "coordinates": district1Coordinates,
        "districtBoundary": null
    },
    "district2": {
        "landmarks": [
            [], district2Landmarks
        ],
        "streets": [
            [], district2Locations
        ],
        "color": "green",
        "coordinates": district2Coordinates,
        "districtBoundary": null
    },
    "district3": {
        "landmarks": [
            [], district3Landmarks
        ],
        "streets": [
            [], district3Locations
        ],
        "color": "purple",
        "coordinates": district3Coordinates,
        "districtBoundary": null
    },
    "district4": {
        "landmarks": [
            [], district4Landmarks
        ],
        "streets": [
            [], district4Locations
        ],
        "color": "blue",
        "coordinates": district4Coordinates,
        "districtBoundary": null
    },
};

// Add listener to detect the changes of the districts and streets or landmarks
$("#districtchoice, #landmarkchoice").change(function() {
    changeMarkersOnMap();
});

$("#textBoxOrdering").change(function() {
    changeTextBoxOrdering();
});

function changeTextBoxOrdering() {
    sessionStorage.setItem("selectedTextBoxOrdering", $("input[name='ordering']:checked").attr("id"));
    showWholeTest();
}

function removeMarkersFromMap() {
    // Get rid of the markers on the map
    for (i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
}

function changeMarkersOnMap() {
    removeMarkersFromMap();
    resetMarkersOnMap();
    removeDistrictBoundariesFromMap();
    showBoundary = true;
    markers = [];

    var selectedDistrict = $("input[name='district']:checked").attr("id");
    var selectedGeoType = $("input[name='landmark']:checked").attr("id");

    sessionStorage.setItem('selectedDistrict', selectedDistrict);
    sessionStorage.setItem('selectedGeoType', selectedGeoType);

    // Draw the markers for the selected district and landmarks or streets
    createAndDrawDistrictBoundaryOnMap(districts[selectedDistrict].color, districts[selectedDistrict].coordinates, selectedDistrict);
    createAndAddMarkersToMap(districts[selectedDistrict][selectedGeoType][0], districts[selectedDistrict][selectedGeoType][1]);

    showWholeTest();
}

function resetMarkersOnMap() {
    var i, marker;
    for (i = 0; i < markers.length; i++) {
        marker = markers[i];
        // Reset each marker so it has the default color
        marker.setIcon();
        // Close each markers infowindow
        marker.info.opened = false;
        marker.info.close(map, marker);
    }
}

function removeDistrictBoundariesFromMap() {
    for (var district in districts) {
        if (districts.hasOwnProperty(district)) {
            if (districts[district].districtBoundary !== null) {
                districts[district].districtBoundary.setMap(null);
            }
        }
    }
}

function createAndDrawDistrictBoundaryOnMap(color, coordinates, selectedDistrict) {
    if (districts[selectedDistrict].districtBoundary === null) {
        districts[selectedDistrict].districtBoundary = new google.maps.Polygon({
            paths: coordinates,
            fillColor: color,
            fillOpacity: 0.20,
            strokeColor: color,
            strokeOpacity: 0.25,
            strokeWeight: 3,
            zIndex: 0
        });
    }
    districts[selectedDistrict].districtBoundary.setMap(map);
}

function showDistrictBoundary() {
    var selectedDistrict = $("input[name='district']:checked").attr("id");
    // Turn off district boundary
    if (showBoundary === true) {
        showBoundary = false;
        // Remove the district boundary from the map
        districts[selectedDistrict].districtBoundary.setMap(null);
    } else {
        // Turn on district boundary
        showBoundary = true;
        createAndDrawDistrictBoundaryOnMap(districts[selectedDistrict].color, districts[selectedDistrict].coordinates, selectedDistrict);
    }
}

function showAllMapFeatures() {
    if (allMapFeaturesVisible === "off") {
        allMapFeaturesVisible = "on";
    } else {
        allMapFeaturesVisible = "off";
    }
    map.setOptions({
        styles: [{
            featureType: "all",
            elementType: "labels",
            stylers: [{
                visibility: allMapFeaturesVisible
            }]
        }]
    });
}

function initMap() {

    // Center on Northglenn
    var uluru = {
        lat: 39.895258,
        lng: -104.981006
    };
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: uluru,
        styles: [{
            featureType: "all",
            elementType: "labels",
            stylers: [{
                visibility: allMapFeaturesVisible
            }]
        }]
    });

    var selectedDistrict = sessionStorage.getItem("selectedDistrict");
    var selectedGeoType = sessionStorage.getItem("selectedGeoType");
    // If the program has already been run before look for the district it was using at the time
    // You want to do this to keep the district set if the page is refreshed
    if (selectedDistrict && selectedGeoType) {
        $("#" + selectedDistrict).prop("checked", true);
        $("#" + selectedGeoType).prop("checked", true);
        createAndAddMarkersToMap(districts[selectedDistrict][selectedGeoType][0], districts[selectedDistrict][selectedGeoType][1]);
        createAndDrawDistrictBoundaryOnMap(districts[selectedDistrict].color, districts[selectedDistrict].coordinates, selectedDistrict);
    } else {
        $("#district1").prop("checked", true);
        $("#streets").prop("checked", true);
        // Initialize the map to have district 1 streets
        createAndAddMarkersToMap(districts.district1.streets[0], districts.district1.streets[1]);
        // Draw the district boundaries for district 1
        createAndDrawDistrictBoundaryOnMap(districts.district1.color, districts.district1.coordinates, "district1");
    }

    showWholeTest();
}

function createAndAddMarkersToMap(districtMarkers, locations) {
    var i;
    // Create the markers if they haven't been created yet
    if (districtMarkers.length === 0) {
        for (i = 0; i < locations.length; i++) {
            var location = locations[i];
            var marker = new google.maps.Marker({
                position: {
                    lat: location[1],
                    lng: location[2]
                },
                map: map,
                label: location[3],
                title: location[0],
            });
            marker.info = new google.maps.InfoWindow({
                content: marker.title
            });
            marker.info.opened = false;
            marker.setAnimation(null);
            // Add event handlers to markers
            //marker.addListener("click", animateMarkerOnMap);
            marker.addListener("click", detectMarkerClick);
            districtMarkers.push(marker);
        }
    }

    markers = districtMarkers;

    // Add the markers to the map
    for (i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }

    currentMarker = 0;

}

function detectMarkerClick() {
    var that = this;
    // Using settimeout because it is necessary to focus on input box
    // I think this is a bug
    setTimeout(function(){
        focusOnInputBox(that);
    },0);
}

function animateMarkerOnMap() {
    resetMarkersOnMap();

    // Keep track of which marker has been selected
    currentMarker = markers.indexOf(this);

    // Set the current marker to a different icon
    this.setIcon({
        url: "images/yellow.png",
        scaledSize: new google.maps.Size(40, 40),
        labelOrigin: new google.maps.Point(19, 11)
    });

    // Center the map on the selected marker
    map.panTo(this.position);
}

function focusOnInputBox(marker) {
    var i = markers.indexOf(marker);
    // Focus on the input box corresponding to the clicked marker
    if ($("#streets").is(":checked")) {
        $("#" + i).focus();
    } else {
        $("#" + i + " #lname").focus();
    }
}

function showWholeTest() {
    var i;
    //resetMarkersOnMap();
    numCorrectTextBoxes = 0;
    $("#testScore").html(
        `<h3>Total Correct: ${numCorrectTextBoxes} out of ${markers.length}</h3>`);

    // Remove all text inputs from form 2
    $("#form2").empty();

    var selectedTextBoxOrdering = sessionStorage.getItem("selectedTextBoxOrdering");
    if (selectedTextBoxOrdering) {
        $("#" + selectedTextBoxOrdering).prop("checked", true);
    }

    if ($("#randomOrder").is(":checked")) {
        randomOrderTextBoxGeneration();
    } else if ($("#inOrder").is(":checked")) {
        inOrderTextBoxGeneration();
    }

    addEventHandlersToTextBoxes();

    google.maps.event.trigger(markers[currentMarker], "click");
    map.setZoom(14);

}

function randomOrderTextBoxGeneration() {
    // Randomize the text boxes for the markers
    var i = 0;
    var randIndices = [];
    while (i < markers.length) {
        randIndex = Math.floor(Math.random() * markers.length);
        if (!randIndices.includes(randIndex)) {
            if ($("#streets").is(":checked")) {
                $("#form2").append(`
                        <input type='text' id='${randIndex}' 
                        placeholder='Marker ${markers[randIndex].label}' 
                        class='form2Input' >`);
                $("#" + randIndex).on("input", checkTestAnswers);
            } else if ($("#landmarks").is(":checked")) {
                $("#form2").append(
                    `<div id="${randIndex}"><input type='text' id='lname' 
                    placeholder='${markers[randIndex].label} Name' class='form2Input' />
                    <input type='text' id='laddress' 
                    placeholder='${markers[randIndex].label} Address' class='form2Input' 
                    /></div>`);
                $("#" + randIndex + " #lname").on("input", checkTestAnswers);
                $("#" + randIndex + " #laddress").on("input", checkTestAnswers);
            }
            i = i + 1;
            randIndices.push(randIndex);
        }
    }
}

function inOrderTextBoxGeneration() {
    var i;
    // Create the test input boxes in order for each marker
    for (i = 0; i < markers.length; i++) {
        if ($("#streets").is(":checked")) {
            $("#form2").append(`
                <input type='text' id='${i}' 
                placeholder='Marker ${markers[i].label}' 
                class='form2Input' >`);
            $("#" + i).on("input", checkTestAnswers);
        } else if ($("#landmarks").is(":checked")) {
            $("#form2").append(
                `<div id="${i}"><input type='text' id='lname' 
                placeholder='${markers[i].label} Name' class='form2Input' />
                <input type='text' id='laddress' 
                placeholder='${markers[i].label} Address' class='form2Input' 
                /></div>`);
            $("#" + i + " #lname").on("input", checkTestAnswers);
            $("#" + i + " #laddress").on("input", checkTestAnswers);
        }
    }
}

function addEventHandlersToTextBoxes() {
    // Add event handlers to the text boxes
    if ($("#streets").is(":checked")) {
        $(":text.form2Input").focus(function() {
            // Animate the marker on the map that the text box relates to when you focus on it
            animateMarkerOnMap.call(markers[this.id]);
        });
    } else if ($("#landmarks").is(":checked")) {
        $(":text.form2Input").focus(function() {
            animateMarkerOnMap.call(markers[$(this).parent().attr("id")]);
        });
    }
}

function checkTestAnswers() {
    var expectedValue;
    var $providedValue = $(":text.form2Input:focus");
    // Check street answers on test
    if ($("#streets").is(":checked")) {
        expectedValue = markers[$providedValue.attr("id")].title;
        checkStreetAnswers($providedValue, expectedValue);
    } else if ($("#landmarks").is(":checked")) {
        expectedValue = markers[$providedValue.parent().attr("id")].title;
        checkLandMarkAnswers($providedValue, expectedValue);
    }
}

function checkStreetAnswers($providedValue, expectedValue) {
    if ($providedValue.val() === expectedValue) {
        $providedValue.addClass("correct").removeClass("incorrect");
        if (numCorrectTextBoxes < markers.length) {
            numCorrectTextBoxes = numCorrectTextBoxes + 1;
        }
    } else {
        $providedValue.addClass("incorrect").removeClass("correct");
    }

    $("#testScore").html(
        `<h3>Total Correct: ${numCorrectTextBoxes} out of ${markers.length}</h3>`);
}

function checkLandMarkAnswers($providedValue, expectedValue) {
    expectedValue = expectedValue.split(" - ");
    var expectedLandmarkName = expectedValue[0].trim();
    var expectedLandmarkAddress = expectedValue[1].trim();

    if ($providedValue.attr("id") === "lname") {
        if ($providedValue.val() === expectedLandmarkName) {
            $providedValue.addClass("correct").removeClass("incorrect");
        } else {
            $providedValue.addClass("incorrect").removeClass("correct");
        }
    } else {
        if ($providedValue.val() === expectedLandmarkAddress) {
            $providedValue.addClass("correct").removeClass("incorrect");
        } else {
            $providedValue.addClass("incorrect").removeClass("correct");
        }
    }

    // If both the name and address are correct then increase the total number
    // correct by one.
    if ($providedValue.parent().find("#lname").hasClass("correct") && $providedValue.parent().find("#laddress").hasClass("correct")) {
        numCorrectTextBoxes = numCorrectTextBoxes + 1;
    }

    $("#testScore").html(
            `<h3>Total Correct: ${numCorrectTextBoxes} out of ${markers.length}</h3>`);
}

function openInfoWindow() {
    var marker = markers[currentMarker];
    // Close the marker info window if it is open
    if (marker.info.opened) {
        marker.info.close(map, marker);
        marker.info.opened = false;
    } else {
        // Open the marker info window if it is closed
        marker.info.open(map, marker);
        marker.info.opened = true;
    }
}