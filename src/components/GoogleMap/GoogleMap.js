import React, { Component } from 'react';
import { connect } from 'react-redux';
import GoogleMapReact from 'google-map-react';
import { googleApiKey } from '../../apiCalls/apiKeys/googleApiKey';
import UserMarker from '../UserMarker/UserMarker';

class GoogleMap extends Component {
  constructor() {
    super();

    this.state = {
      zoom: 13
    };
  }
 
  render() {
    const { latitude, longitude } = this.props.location;

    const center =  {
      lat: latitude,
      lng: longitude
    }

    return (
      <div style={{ height: '400px', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: googleApiKey }}
          defaultCenter={ center }
          defaultZoom={this.state.zoom}
        >
          <UserMarker
            key={0}
          />
          <UserMarker 
            key={1}
            lat={39.752816}
            lng={-104.993984}
            className="brothers"
          />
          <UserMarker 
            key={2}
            lat={39.750934}
            lng={-104.999928}
            className="brothers"
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export const mapStateToProps = (state) => ({
  location: state.location
});

export default connect(mapStateToProps)(GoogleMap);
