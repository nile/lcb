'use strict';
var alt = new Alt();

var TripsActions = alt.createActions({
  addTrip: function (item) {
    console.log('accTrip action')
    this.dispatch(item);
  },
  loadTrips: function() {
    console.log('loadTrips action')
    this.dispatch({});
  },
  setLoc: function(loc) {
    console.log(loc);
    this.dispatch(loc);
  },
  updateBooking: function(trip) {
    this.dispatch(trip);
  }
});


var LcbStore = alt.createStore({
  displayName: 'LcbStore',
  bindListeners: {
    addTrip: TripsActions.addTrip,
    loadTrips: TripsActions.loadTrips,
    updateBooking: TripsActions.updateBooking,
    setLoc: TripsActions.setLoc
  },
  state: {
    trips: [],
    booking: {loc:{name:'',address:'',lng:116.404, lat:39.915}}
  },
  getTrips: function () {
    return this.getState().trips;
  },
  updateTrips: function(trips) {
    this.setState({"trips":trips});
  },
  addTrip: function (item) {
    var trips = this.state.trips;
    trips.push(item);
    this.updateTrips(trips);
  },
  loadTrips: function () {
    console.log("load");
    var self = this;
    $.getJSON('/lcb/trips', function(data){
      console.log(data)
      self.updateTrips(data);
    });
  },
  setLoc: function(loc) {
    console.log("update store");
    console.log( loc);
    this.setState({booking:$.extend(this.state.booking,{loc:loc})});
  },
  updateBooking: function(trip) {
    this.setState({booking:$.extend(this.state.booking,trip)});
  }
});
