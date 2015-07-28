'use strict';
var Router  = ReactRouter;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;

var Layout = React.createClass({
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
        return (<div>
                <Header left={this.props.left} right={this.props.right} title={this.props.title}/>
                <DeviceContent>
                    {this.props.children}
                </DeviceContent>
                <NavBar onSelect={this.handleSelect} active={currentPath} items={[
                    {href:'book',icon:'home',label:'预约'},
                    {href:'mine',icon:'person',label:'我的'},
                    {href:'contacts',icon:'star-filled',label:'联系人'},
                    {href:'trips',icon:'search',label:'行程'}
                    ]}/>
                </div>);
    }
});

var AddContact = React.createClass({
    render: function() {
        return (<Layout left={{text:'保存',href:'contacts'}} right={{text:'取消',href:'contacts'}} title="新增联系人">
              <form>
                <GText label="手机号码" placeholder="请输入您的手机号码"/>
                <GTextWithButton  label="验证码" placeholder="请输入您收到的短信验证码" button="发送验证码"/>
                <GBar/>
                <GText label="姓名" placeholder="请输入您的名字"/>
                <GSelect label="称谓" opts={["先生","女士"]}/>
                <GBar/>
                <GMainbutton text="保存" href="mine"/>
              </form></Layout>);
    }
});

var Index = React.createClass({
    render: function() {
        return (<Layout title="来乘吧">
          <h1>来乘吧</h1>
              </Layout>);
    }
});

var Book = React.createClass({
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
    return (<Layout right={{text:'预约',onClick:this.doBook}} left={{text:'取消',href:'trips'}} title="行程">
      <form>
        <GDatetime onChange={this.dateUpdate} value={this.state.date} label="送机时间" placeholder="送机时间"/>
        <GText onChange={this.flightUpdate} value={this.state.flight} label="航班号" placeholder="航班号"/>
        <GLocation text={this.state.loc.name} label="上车地址" placeholder="上车地址" href="/book/map"/>
        <GBar/>
        <GNumber label="乘客" />
        <GNumber label="大件行李" />
        <GBar/>
        <GMainbutton text="预约" href="trips" onClick={this.doBook}/>
      </form>
            </Layout>);
  }
});

var Contacts = React.createClass({
  render : function() {
    return (<Layout left={{text:'返回',href:'ok'}} right={{text:'增加',href:'/contacts/add'}} title="联系人管理">
      <GTableView>
        <GTableCell>薄瓜瓜 1234567890<span className="badge">4</span></GTableCell>
        <GTableCell>Item 2 <span className="badge">1</span></GTableCell>
        <GTableCell>Item 2 <span className="badge">1</span></GTableCell>
      </GTableView>
    </Layout>);
  }
});

var Trips = React.createClass({
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
    return (<Layout left={{text:'返回',href:'ok'}} right={{text:'预定',href:'book'}} title="行程">
      <GTableView>
        {trips.map(function(e,i){
          return <GTableCell key={e.id}><GTripView date={e.date} time={e.time} flight={e.flight} status={e.status}
             start={{name:e.start.name,address:e.start.address}}
             end={{name:e.end.name,address:e.end.address}}/></GTableCell>
        })}
         <GTableViewDivider/>
      </GTableView>
      </Layout>);
  }
});

var LocationSelector = React.createClass({
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
    return <Layout left={{text:'返回',href:'book'}} right={{text:'选定', onClick:this.onLocSelected}} title="地图选择">
        <GBDMap ref="map" startPoint={this.state.startPoint}/>
      </Layout>
  }
});

var LaiCB = React.createClass({
  render:function () {
    return <RouteHandler/>
  }
});

var routes = (
  <Route handler={LaiCB}>
    <Route path="/book" handler={Book}></Route>
    <Route path="/book/map" handler={LocationSelector}/>
    <Route path="contacts" handler={Contacts}/>
    <Route path="contacts/add" handler={AddContact}/>
    <Route path="mine" handler={Index}/>
    <Route path="trips" handler={Trips}/>
    <DefaultRoute handler={Index}/>
    <NotFoundRoute handler={Index}/>
  </Route>
);

Router.run(routes, Router.HashLocation, function(Root) {
  React.render(<Root/>, document.body);
});
