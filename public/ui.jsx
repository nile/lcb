'use strict';


var DeviceContent = React.createClass({
    render: function(){
        return (
            <div className="content device-content">
            {this.props.children}
            </div>
        );
    }
});

var GRow = React.createClass({
  render: function(){
        return (<div className="input-row">
          {this.props.children}
        </div>);
  }
});

var GLabel = React.createClass({
  render: function(){
    return (<label><span className="icon icon-search" style={{fontSize:'16px'}}></span>{this.props.label}</label>);
  }
});
var GText = React.createClass({
    render: function() {
        return (<GRow>
            <GLabel label={this.props.label}/>
            <input  onChange={this.props.onChange} value={this.props.value} type="text" placeholder={this.props.placeholder}/>
            </GRow>);
    }
});

var GLocation = React.createClass({
    render: function() {
        return (<GRow>
            <GLabel label={this.props.label}/>
            <a onClick={this.props.onLoc} href={'#'+this.props.href} style={{float:"right","marginTop":"5px","position":"absolute",right:"5px","zIndex":10}}><span className="icon icon-location"></span></a>
            <input defaultValue={this.props.text} type="text" placeholder={this.props.placeholder}/>
            </GRow>);
    }
});


var GDatetime = React.createClass({
    render: function() {
        return (<GRow>
            <GLabel label={this.props.label}/>
            <input onChange={this.props.onChange} value={this.props.value} type="datetime" placeholder={this.props.placeholder}/>
            </GRow>);
    }
});

var GNumber = React.createClass({
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
        return (<GRow>
          <GLabel label={this.props.label}/>
          <div className="input-group2">
            <button onClick={this.minusClick} className="btn btn-positive btn-block">-</button>
            <input type="text" value={this.state.value} onChange={this.valueChanged}/>
            <button onClick={this.addClick} className="btn btn-positive btn-block">+</button>
          </div>
            </GRow>);
    }
});


var GTextWithButton = React.createClass({
  render: function() {
    return (<GRow>
        <label>{this.props.label}</label>
        <div className="input-group">
          <input type="text" placeholder={this.props.placeholder}/>
          <button className="btn btn-positive btn-block">{this.props.button}</button>
        </div>
        </GRow>);
  }
});

var GMainbutton = React.createClass({
  render: function(){
    return (<div className="lrspace">
      <GButton href={this.props.href} text={this.props.text} onClick={this.props.onClick}/>
    </div>);
  }
});

var GSelect = React.createClass({
  render: function() {
    var opts = this.props.opts;
    return (<GRow>
                  <label>{this.props.label}</label>
                  <select>
                  {opts.map(function(e){
                    return (<option>{e}</option>);
                  })}
                  </select>
    </GRow>);
  }
});
var GBar = React.createClass({
  render: function() {
    return <div style={{'height':'20px'}}/>
  }
});

var GButton = React.createClass({
  render: function() {
    return <a onClick={this.props.onClick} className="btn btn-positive btn-block" href={'#'+this.props.href}>{this.props.text}</a>;
  }
});
var NavBarItem = React.createClass({
  propTypes: {
   onSelect: React.PropTypes.func,
   active: React.PropTypes.bool,
   href: React.PropTypes.string,
   icon: React.PropTypes.string,
   text: React.PropTypes.node
  },
  render: function(){
    return (<a className={this.props.active ? 'active tab-item' : 'tab-item'}
      href={'#'+this.props.href} onClick={this.props.onSelect}>
      <span className={'icon icon-'+this.props.icon}></span>
      <span className="tab-label">{this.props.text}</span>
    </a>);
  }
});

var NavBar = React.createClass({
  propTypes: {
        active:     React.PropTypes.string,
        onSelect:   React.PropTypes.func
  },
  render : function() {
    var items = this.props.items;
    var props = this.props;
  return(<nav className="bar bar-tab">
    {items.map(function(v,i) {
      console.log(props.active);
      return (<NavBarItem key={v.href} text={v.label} href={v.href} icon={v.icon} active={props.active === v.href}
         onSelect={props.onSelect.bind(null, i)}></NavBarItem>);
    })}
    </nav>);
  }
});

var Header = React.createClass({
    propTypes: {
          onClick: React.PropTypes.func
    },
    render: function() {
        var leftButton, rightButton;
        if(this.props.left) {
          leftButton = <a className="btn btn-link btn-nav pull-left" href={'#'+this.props.left.href}>
            <span className="icon icon-left-nav"></span>
            {this.props.left.text}
          </a>;
        }
        if(this.props.right) {
          rightButton = <a className="btn btn-link btn-nav pull-right" onClick={this.props.right.onClick} href={'#'+this.props.right.href}>
            {this.props.right.text}
            <span className="icon icon-right-nav"></span>
          </a>;
        }
        return (
        <header className="bar bar-nav">
            {leftButton}
            {rightButton}
            <h1 className="title">{this.props.title}</h1>
        </header>);
    }
});

var GTableView = React.createClass({
  render: function() {
    return (<ul className="table-view">{this.props.children}</ul>);
  }
});
var GTableCell = React.createClass({
  render: function() {
    return (<li className="table-view-cell">{this.props.children}</li>);
  }
});
var GTableViewDivider = React.createClass({
  render: function() {
    return (<li className="table-view-divider"></li>);
  }
});



var GTripView = React.createClass({
  render : function() {
    return (<a className="navigate-right">
        <div><h4>{this.props.date} {this.props.flight} <div style={{float:'right'}}>{this.props.status}</div></h4></div>
        <div style={{float:'left'}}>
          <div>
            <div style={{color:'rgb(109, 202, 210)',float:'left',position:'relative'}}>
              <span className="icon icon-location" style={{"fontSize":'40px'}}></span>
              <span style={{"fontSize":'15px',position:'absolute',left:'12px',top:'2px',color:'white'}}>起</span>
            </div>
            <div style={{float:"left"}}>
              <div>{this.props.start.name}</div>
              <div style={{color:'gray',"fontSize":'13px'}}>{this.props.start.address}</div>
            </div>
          </div>
          <div style={{clear:'both'}}></div>
          <div>
            <div style={{color:'rgb(211, 161, 30)',float:'left',position:'relative'}}>
                <span className="icon icon-location" style={{"fontSize":'40px'}}></span>
                <span style={{"fontSize":'15px',position:'absolute',left:'12px',top:'2px',color:'white'}}>终</span>
            </div>
            <div style={{float:'left'}}>
                  <div>{this.props.end.name}</div>
                  <div style={{color:"gray","fontSize":"13px"}}>{this.props.address}</div>
            </div>
          </div>
          <div style={{clear:'both'}}></div>
        </div>
        <div style={{float:'right',"fontSize":'28px'}}>{this.props.time}</div>
    </a>);
  }
});

var GBDMap = React.createClass({
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
    return <div id="bdmapcontainer"></div> ;
  }
});
