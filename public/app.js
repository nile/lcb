'use strict';
var Router  = ReactRouter;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;

var Layout = React.createClass({displayName: "Layout",
    mixins: [Router.State],
    getInitialState: function(){
      return {active: 0}
    },
    handleSelect: function(i){
      this.setState({active: i});
    },
    render: function() {
        var currentRoutes = this.context.router.getCurrentRoutes();
        var lastRoute = currentRoutes[currentRoutes.length - 1];
        var currentPath = lastRoute.path.substr(1);
        if(currentPath.indexOf('/') > 0)
          currentPath = currentPath.substr(0, currentPath.indexOf('/'));
        console.log(lastRoute);
        return (React.createElement("div", null,
                React.createElement(Header, {left: this.props.left, right: this.props.right, title: this.props.title}),
                React.createElement(DeviceContent, null,
                    this.props.children
                ),
                React.createElement(NavBar, {onSelect: this.handleSelect, active: currentPath, items: [
                    {href:'book',icon:'home',label:'预约'},
                    {href:'mine',icon:'person',label:'我的'},
                    {href:'contacts',icon:'star-filled',label:'联系人'},
                    {href:'trips',icon:'search',label:'行程'}
                    ]})
                ));
    }
});

var AddContact = React.createClass({displayName: "AddContact",
    render: function() {
        return (React.createElement(Layout, {left: {text:'保存',href:'contacts'}, right: {text:'取消',href:'contacts'}, title: "新增联系人"},
              React.createElement("form", null,
                React.createElement(GText, {label: "手机号码", placeholder: "请输入您的手机号码"}),
                React.createElement(GTextWithButton, {label: "验证码", placeholder: "请输入您收到的短信验证码", button: "发送验证码"}),
                React.createElement(GBar, null),
                React.createElement(GText, {label: "姓名", placeholder: "请输入您的名字"}),
                React.createElement(GSelect, {label: "称谓", opts: ["先生","女士"]}),
                React.createElement(GBar, null),
                React.createElement(GMainbutton, {text: "保存", href: "mine"})
              )));
    }
});

var Index = React.createClass({displayName: "Index",
    render: function() {
        return (React.createElement(Layout, {title: "来乘吧"},
          React.createElement("h1", null, "来乘吧")
              ));
    }
});

var Book = React.createClass({displayName: "Book",
  mixins: [Router.State,Router.Navigation],
  getInitialState: function(){
    console.log("init....");
    console.log(LcbStore.getState().booking);
    return LcbStore.getState().booking;
  },
  doBook: function(e) {
    e.preventDefault();
    console.log(e);
    TripsActions.addTrip({
      date: '2015-11-01',
      time: '12:11',
      flight: 'CA2201',
      status: '代付款',
      start: {name: '文一路',address:'文一西路5号'},
      end: {name: '萧山机场T2航站楼',address:'萧山机场路1号'}
    });
    this.transitionTo('/trips');
  },
  flightUpdate: function(e) {
    console.log(e.target.value);
    this.setState({flight:e.target.value});
    TripsActions.updateBooking({flight:e.target.value});
  },
  dateUpdate: function(e) {
    console.log(e.target.value);
    this.setState({date:e.target.value});
    TripsActions.updateBooking({date:e.target.value});
  },
  render : function() {
    return (React.createElement(Layout, {right: {text:'预约',onClick:this.doBook}, left: {text:'取消',href:'trips'}, title: "行程"},
      React.createElement("form", null,
        React.createElement(GDatetime, {onChange: this.dateUpdate, value: this.state.date, label: "送机时间", placeholder: "送机时间"}),
        React.createElement(GText, {onChange: this.flightUpdate, value: this.state.flight, label: "航班号", placeholder: "航班号"}),
        React.createElement(GLocation, {text: this.state.loc.name, label: "上车地址", placeholder: "上车地址", href: "/book/map"}),
        React.createElement(GBar, null),
        React.createElement(GNumber, {label: "乘客"}),
        React.createElement(GNumber, {label: "大件行李"}),
        React.createElement(GBar, null),
        React.createElement(GMainbutton, {text: "预约", href: "trips", onClick: this.doBook})
      )
            ));
  }
});

var Contacts = React.createClass({displayName: "Contacts",
  render : function() {
    return (React.createElement(Layout, {left: {text:'返回',href:'ok'}, right: {text:'增加',href:'/contacts/add'}, title: "联系人管理"},
      React.createElement(GTableView, null,
        React.createElement(GTableCell, null, "薄瓜瓜 12345678901", React.createElement("span", {className: "badge"}, "4")), 
        React.createElement(GTableCell, null, "Item 2 ", React.createElement("span", {className: "badge"}, "1")),
        React.createElement(GTableCell, null, "Item 2 ", React.createElement("span", {className: "badge"}, "1"))
      )
    ));
  }
});

var Trips = React.createClass({displayName: "Trips",
  getInitialState: function() {
    return LcbStore.getState();
  },
  componentDidMount: function() {
    TripsActions.loadTrips();
    LcbStore.listen(this.onChange);
  },
  componentWillUnmount: function() {
    LcbStore.unlisten(this.onChange);
  },
  onChange: function(state) {
    this.setState(state);
  },
  render: function() {
    var trips = this.state.trips;
    return (React.createElement(Layout, {left: {text:'返回',href:'ok'}, right: {text:'预定',href:'book'}, title: "行程"},
      React.createElement(GTableView, null,
        trips.map(function(e,i){
          return React.createElement(GTableCell, {key: e.id}, React.createElement(GTripView, {date: e.date, time: e.time, flight: e.flight, status: e.status,
             start: {name:e.start.name,address:e.start.address},
             end: {name:e.end.name,address:e.end.address}}))
        }),
         React.createElement(GTableViewDivider, null)
      )
      ));
  }
});

var LocationSelector = React.createClass({displayName: "LocationSelector",
  mixins: [Router.Navigation],
  onLocSelected: function(e){
    e.preventDefault();
    TripsActions.setLoc(this.refs.map.state);
    this.transitionTo('/book');
  },
  getInitialState: function(){
    return {startPoint:LcbStore.state.booking.loc};
  },
  render : function(){
    return React.createElement(Layout, {left: {text:'返回',href:'book'}, right: {text:'选定', onClick:this.onLocSelected}, title: "地图选择"},
        React.createElement(GBDMap, {ref: "map", startPoint: this.state.startPoint})
      )
  }
});

var LaiCB = React.createClass({displayName: "LaiCB",
  render:function () {
    return React.createElement(RouteHandler, null)
  }
});

var routes = (
  React.createElement(Route, {handler: LaiCB},
    React.createElement(Route, {path: "/book", handler: Book}),
    React.createElement(Route, {path: "/book/map", handler: LocationSelector}),
    React.createElement(Route, {path: "contacts", handler: Contacts}),
    React.createElement(Route, {path: "contacts/add", handler: AddContact}),
    React.createElement(Route, {path: "mine", handler: Index}),
    React.createElement(Route, {path: "trips", handler: Trips}),
    React.createElement(DefaultRoute, {handler: Index}),
    React.createElement(NotFoundRoute, {handler: Index})
  )
);

Router.run(routes, Router.HashLocation, function(Root) {
  React.render(React.createElement(Root, null), document.body);
});
