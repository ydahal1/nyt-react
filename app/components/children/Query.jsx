
var React = require("react");

// Search Component
var Query = React.createClass({

  // Here we set a generic state
  getInitialState: function() {
    return {
      topic: "",
      startYear: "",
      endYear: ""
    };
  },

  // when submit button is clicked
  _handleSubmit: function(event) {
    event.preventDefault();

    // Set the parent to have the search terms
    this.props._setSearchFeilds(this.state.topic, this.state.startYear, this.state.endYear);    
  },

  _handleTopicChange: function(e) {
    this.setState({topic: e.target.value});
  },

  _handleStartYearChange: function(e) {
    this.setState({startYear: e.target.value});
  },

  _handleEndYearChange: function(e) {
    this.setState({endYear: e.target.value});
  },


  // Here we render the Query User Form
  render: function() {
    return (

      <div className="col-lg-6  panel panel-default">

        <div className="panel-heading">
          <h3 className="panel-title text-center" style={ {fontSize: "20px"} }><i><b>Search</b></i> Test</h3>
        </div>

        <div className="panel-body text-center">
          <form role="form" onSubmit={this._handleSubmit}>

            <div className="form-group col-md-offset-3 col-md-6">
              <label htmlFor="topic" className="text-center">Topic</label>
              <input type="text" className="form-control text-center" id="topic" onChange={this._handleTopicChange} />
            </div>

            <br />

            <div className="form-group col-md-offset-3 col-md-6">
              <label htmlFor="startYear">Start Year</label>
              <input type="text" className="form-control text-center" id="startYear" onChange={this._handleStartYearChange} />
            </div>

            <br />

            <div className="form-group col-md-offset-3 col-md-6">
              <label htmlFor="endYear">End Year</label>
              <input type="text" className="form-control text-center" id="endYear" onChange={this._handleEndYearChange} />
            </div>

            <br />

            <button type="submit" className="btn btn-info col-md-offset-5 col-md-2" id="searchBtn">Search</button>

          </form>
        </div>

      </div>

    );
  }
});


// Export the component back for use in Main file
module.exports = Query;