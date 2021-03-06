import React from 'react';
//import ReactDOM from 'react';
import '../Forecast.css';

class DSForecast extends React.Component {  
    render(){        
        return(
            <div>
                <DSSearch />
                <ol className="minutelyData">
                    {''}
                </ol>
            </div>
        );
    }
}

class DSSearch extends React.Component {  
    constructor(props) {
        super(props);
        this.handleSearchClick = this.handleSearchClick.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.setState = this.setState.bind(this);
        this.state = {
            isSearchClick: false,
            value: '',
            forecast: []
        };
        
    }

    handleTextChange(event) {
        this.setState({value: event.target.value});
    }

    handleSearchClick() {
        this.setState({isSearchClick: true});
        var textValue = this.state.value;                                                                  //todo: onError display error msg "Course not found." 
        var myRequest = new Request('/api/course/' + textValue);
        //var output = '';
        var FORECAST = [];
        fetch(myRequest)
            .then(function(response) { return response.json(); })
            .then(function(json) {
                FORECAST = json;
                console.log(FORECAST);
                console.log(this);
                /*
                for (var i = 0; i <= FORECAST.minutely.data.length; i++) {                              // Guide: https://www.youtube.com/watch?v=HWdLisBrlV8 array at 13:30
                    for (var key in FORECAST.minutely.data[i]) {
                        if (FORECAST.minutely.data[i].hasOwnProperty(key)) {
                            output += '<li>' + FORECAST.minutely.data[i][key] + '</li>';
                        }   // hasOwnProperty check
                    }       //for each object
                }           //for each array element
                console.log(output);
                */
                this.setState({forecast: FORECAST});
            })
    }
    render(){
        var displayWeekly = '';
        if (this.state.isSearchClick) {
            displayWeekly = <DSWeekly name={this.state.value}/>;
        } else {
            displayWeekly = '';
        }
        
        return (
            <div>
                <form>
                    <input type="text" placeholder="Course Search..." value={this.state.value} onChange={this.handleTextChange} />
                    <button className="reqForecast" onClick={this.handleSearchClick}>Search</button>
                </form>
                <div className="Weekly">
                    {displayWeekly}
                </div>
            </div>
        );
    }
}

class DSWeekly extends React.Component {
    render(){
        return(
            <div className="container">
                <h3>Course Forecast for: {this.props.name}</h3><h4>Bowling Green, OH</h4>
                <Tile heading="Today" attr1="75 degrees" attr2="5-10 mph winds" attr3="20% chance of rain" attr4="Course Condition: Muddy" />
                <Tile heading="Saturday" attr1="77 degrees" attr2="10-14 mph winds" attr3="15% chance of rain" attr4="Course Condition: Partially Flooded" />
                <Tile heading="Sunday" attr1="79 degrees" attr2="3-8 mph winds" attr3="25% chance of rain" attr4="Course Condition: Muddy" />
                <Tile heading="Monday" attr1="77 degrees" attr2="6-12 mph winds" attr3="40% chance of rain" attr4="Course Condition: Muddy" />
                <Tile heading="Tuesday" attr1="77 degrees" attr2="6-12 mph winds" attr3="40% chance of rain" attr4="Course Condition: Muddy" />
                <Tile heading="Wednesday" attr1="77 degrees" attr2="6-12 mph winds" attr3="40% chance of rain" attr4="Course Condition: Muddy" />
                <Tile heading="Thursday" attr1="77 degrees" attr2="6-12 mph winds" attr3="40% chance of rain" attr4="Course Condition: Muddy" />
            </div>
        );
    }
}

function Tile(props) {
  return (
    <div className="tile">         {/* Cleanup Steps: could convert the attributes into a loop */}
        <h3>{props.heading}</h3>    {/* tile heading: for dg-weather = course name in playable forecast, otherwise blank as the course name is displayed elsewhere (parent usually) */}
        <p>{props.attr1}</p>        {/* Attribute 1: for dg-weather = temperature */}
        <p>{props.attr2}</p>        {/* Attribute 2: for dg-weather = wind */}
        <p>{props.attr3}</p>        {/* Attribute 3: for dg-weather = % chance of rain for the day */}
        <p>{props.attr4}</p>        {/* Attribute 4: for dg-weather = any community generated alerts for that course, ie. holes are flooded, course is muddy/snow covered, etc. */}
    </div>
  );
}

/*
ReactDOM.render(
    <DSForecast />,
    document.getElementById('root')
);
*/

export default DSForecast;