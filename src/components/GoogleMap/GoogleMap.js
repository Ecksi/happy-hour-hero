import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { googleApiKey } from '../../apiCalls/apiKeys/googleApiKey';
import UserMarker from '../UserMarker/UserMarker';

class GoogleMap extends Component {
  constructor() {
    super();

    this.state = {
      center: {
        lat: 39.750801,
        lng: -104.996595
      },
      zoom: 16
    };
  }
 
  render() {
    return (
      <div style={{ height: '400px', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: googleApiKey }}
          defaultCenter={this.state.center}
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
 
export default GoogleMap;