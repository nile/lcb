'use strict';


var DeviceContent = React.createClass({displayName: "DeviceContent",
    render: function(){
        return (
            React.createElement("div", {className: "content device-content"}, 
            this.props.children
            )
        );
    }
});

var GRow = React.createClass({displayName: "GRow",
  render: function(){
        return (React.createElement("div", {className: "input-row"}, 
          this.props.children
        ));
  }
});

var GLabel = React.createClass({displayName: "GLabel",
  render: function(){
    return (React.createElement("label", null, React.createElement("span", {className: "icon icon-search", style: {fontSize:'16px'}}), this.props.label));
  }
});
var GText = React.createClass({displayName: "GText",
    render: function() {
        return (React.createElement(GRow, null, 
            React.createElement(GLabel, {label: this.props.label}), 
            React.createElement("input", {onChange: this.props.onChange, value: this.props.value, type: "text", placeholder: this.props.placeholder})
            ));
    }
});

var GLocation = React.createClass({displayName: "GLocation",
    render: function() {
        return (React.createElement(GRow, null, 
            React.createElement(GLabel, {label: this.props.label}), 
            React.createElement("a", {onClick: this.props.onLoc, href: '#'+this.props.href, style: {float:"right","marginTop":"5px","position":"absolute",right:"5px","zIndex":10}}, React.createElement("span", {className: "icon icon-location"})), 
            React.createElement("input", {defaultValue: this.props.text, type: "text", placeholder: this.props.placeholder})
            ));
    }
});


var GDatetime = React.createClass({displayName: "GDatetime",
    render: function() {
        return (React.createElement(GRow, null, 
            React.createElement(GLabel, {label: this.props.label}), 
            React.createElement("input", {onChange: this.props.onChange, value: this.props.value, type: "datetime", placeholder: this.props.placeholder})
            ));
    }
});

var GNumber = React.createClass({displayName: "GNumber",
    getInitialState: function() {
     return {value: 1};
    },
    getDefaultProps: function() {
      return {max: 10,min:1};
    },
    addClick : function(e) {
      e.preventDefault();
      var newVal = Math.min(this.state.value + 1, this.props.max);
      this.setState({value: newVal });
    },
    minusClick : function(e) {
      e.preventDefault();
      var newVal = Math.max(this.state.value - 1, this.props.min);
      this.setState({value: newVal });
    },
    valueChanged: function(e) {
      this.setState({ value: parseInt(e.target.value) });
    },
    render: function() {
        return (React.createElement(GRow, null, 
          React.createElement(GLabel, {label: this.props.label}), 
          React.createElement("div", {className: "input-group2"}, 
            React.createElement("button", {onClick: this.minusClick, className: "btn btn-positive btn-block"}, "-"), 
            React.createElement("input", {type: "text", value: this.state.value, onChange: this.valueChanged}), 
            React.createElement("button", {onClick: this.addClick, className: "btn btn-positive btn-block"}, "+")
          )
            ));
    }
});


var GTextWithButton = React.createClass({displayName: "GTextWithButton",
  render: function() {
    return (React.createElement(GRow, null, 
        React.createElement("label", null, this.props.label), 
        React.createElement("div", {className: "input-group"}, 
          React.createElement("input", {type: "text", placeholder: this.props.placeholder}), 
          React.createElement("button", {className: "btn btn-positive btn-block"}, this.props.button)
        )
        ));
  }
});

var GMainbutton = React.createClass({displayName: "GMainbutton",
  render: function(){
    return (React.createElement("div", {className: "lrspace"}, 
      React.createElement(GButton, {href: this.props.href, text: this.props.text, onClick: this.props.onClick})
    ));
  }
});

var GSelect = React.createClass({displayName: "GSelect",
  render: function() {
    var opts = this.props.opts;
    return (React.createElement(GRow, null, 
                  React.createElement("label", null, this.props.label), 
                  React.createElement("select", null, 
                  opts.map(function(e){
                    return (React.createElement("option", null, e));
                  })
                  )
    ));
  }
});
var GBar = React.createClass({displayName: "GBar",
  render: function() {
    return React.createElement("div", {style: {'height':'20px'}})
  }
});

var GButton = React.createClass({displayName: "GButton",
  render: function() {
    return React.createElement("a", {onClick: this.props.onClick, className: "btn btn-positive btn-block", href: '#'+this.props.href}, this.props.text);
  }
});
var NavBarItem = React.createClass({displayName: "NavBarItem",
  propTypes: {
   onSelect: React.PropTypes.func,
   active: React.PropTypes.bool,
   href: React.PropTypes.string,
   icon: React.PropTypes.string,
   text: React.PropTypes.node
  },
  render: function(){
    return (React.createElement("a", {className: this.props.active ? 'active tab-item' : 'tab-item', 
      href: '#'+this.props.href, onClick: this.props.onSelect}, 
      React.createElement("span", {className: 'icon icon-'+this.props.icon}), 
      React.createElement("span", {className: "tab-label"}, this.props.text)
    ));
  }
});

var NavBar = React.createClass({displayName: "NavBar",
  propTypes: {
        active:     React.PropTypes.string,
        onSelect:   React.PropTypes.func
  },
  render : function() {
    var items = this.props.items;
    var props = this.props;
  return(React.createElement("nav", {className: "bar bar-tab"}, 
    items.map(function(v,i) {
      console.log(props.active);
      return (React.createElement(NavBarItem, {key: v.href, text: v.label, href: v.href, icon: v.icon, active: props.active === v.href, 
         onSelect: props.onSelect.bind(null, i)}));
    })
    ));
  }
});

var Header = React.createClass({displayName: "Header",
    propTypes: {
          onClick: React.PropTypes.func
    },
    render: function() {
        var leftButton, rightButton;
        if(this.props.left) {
          leftButton = React.createElement("a", {className: "btn btn-link btn-nav pull-left", href: '#'+this.props.left.href}, 
            React.createElement("span", {className: "icon icon-left-nav"}), 
            this.props.left.text
          );
        }
        if(this.props.right) {
          rightButton = React.createElement("a", {className: "btn btn-link btn-nav pull-right", onClick: this.props.right.onClick, href: '#'+this.props.right.href}, 
            this.props.right.text, 
            React.createElement("span", {className: "icon icon-right-nav"})
          );
        }
        return (
        React.createElement("header", {className: "bar bar-nav"}, 
            leftButton, 
            rightButton, 
            React.createElement("h1", {className: "title"}, this.props.title)
        ));
    }
});

var GTableView = React.createClass({displayName: "GTableView",
  render: function() {
    return (React.createElement("ul", {className: "table-view"}, this.props.children));
  }
});
var GTableCell = React.createClass({displayName: "GTableCell",
  render: function() {
    return (React.createElement("li", {className: "table-view-cell"}, this.props.children));
  }
});
var GTableViewDivider = React.createClass({displayName: "GTableViewDivider",
  render: function() {
    return (React.createElement("li", {className: "table-view-divider"}));
  }
});



var GTripView = React.createClass({displayName: "GTripView",
  render : function() {
    return (React.createElement("a", {className: "navigate-right"}, 
        React.createElement("div", null, React.createElement("h4", null, this.props.date, " ", this.props.flight, " ", React.createElement("div", {style: {float:'right'}}, this.props.status))), 
        React.createElement("div", {style: {float:'left'}}, 
          React.createElement("div", null, 
            React.createElement("div", {style: {color:'rgb(109, 202, 210)',float:'left',position:'relative'}}, 
              React.createElement("span", {className: "icon icon-location", style: {"fontSize":'40px'}}), 
              React.createElement("span", {style: {"fontSize":'15px',position:'absolute',left:'12px',top:'2px',color:'white'}}, "起")
            ), 
            React.createElement("div", {style: {float:"left"}}, 
              React.createElement("div", null, this.props.start.name), 
              React.createElement("div", {style: {color:'gray',"fontSize":'13px'}}, this.props.start.address)
            )
          ), 
          React.createElement("div", {style: {clear:'both'}}), 
          React.createElement("div", null, 
            React.createElement("div", {style: {color:'rgb(211, 161, 30)',float:'left',position:'relative'}}, 
                React.createElement("span", {className: "icon icon-location", style: {"fontSize":'40px'}}), 
                React.createElement("span", {style: {"fontSize":'15px',position:'absolute',left:'12px',top:'2px',color:'white'}}, "终")
            ), 
            React.createElement("div", {style: {float:'left'}}, 
                  React.createElement("div", null, this.props.end.name), 
                  React.createElement("div", {style: {color:"gray","fontSize":"13px"}}, this.props.address)
            )
          ), 
          React.createElement("div", {style: {clear:'both'}})
        ), 
        React.createElement("div", {style: {float:'right',"fontSize":'28px'}}, this.props.time)
    ));
  }
});

var GBDMap = React.createClass({displayName: "GBDMap",
  getInitialState:function() {
    return ({lng:116.404,lat:39.915,name:"",address:""});
  },
  componentDidMount: function() {
    var cmp = this;
    var map = new BMap.Map("bdmapcontainer");
    var point = new BMap.Point(cmp.props.startPoint.lng,cmp.props.startPoint.lat);
    map.centerAndZoom(point, 15);
    map.addControl(new BMap.NavigationControl({offset: new BMap.Size(20, 70), anchor: BMAP_ANCHOR_BOTTOM_RIGHT, type: BMAP_NAVIGATION_CONTROL_ZOOM}));
    var geo = new BMap.GeolocationControl({offset: new BMap.Size(20, 70)});
    map.addControl(geo);
    var marker = new BMap.Marker(point);        // 创建标注
    map.addOverlay(marker);
    var label = new BMap.Label("");
    marker.setLabel(label);
    var geocoder = new BMap.Geocoder();

    var makerUpdater = function(e){
      console.log(e);
      label.setContent(e.business);
      cmp.setState({name:e.business, address:e.address});
    };
    var updateLoc = function(cp) {
      marker.setPosition(cp);
      geocoder.getLocation(cp, makerUpdater);
      cmp.setState({lng:cp.lng, lat: cp.lat});
    };
    map.addEventListener("moving", function(e) {
      var cp = map.getCenter();
      updateLoc(cp);
    });
    map.addEventListener("longpress", function(e) {
      var cp = e.point;
      updateLoc(cp);
    });
    /*定位*/
    geo.addEventListener("locationSuccess", function(e) {
      var cp = e.point;
      updateLoc(cp);
    });
    geo.addEventListener("locationError", function(e){
      label.setContent(e.StatusCode);
    });
    updateLoc(point);
    geo.location();
  },
  render : function() {
    return React.createElement("div", {id: "bdmapcontainer"}) ;
  }
});
