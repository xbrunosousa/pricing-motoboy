import React from 'react'
import { GoogleMap, withGoogleMap, DirectionsRenderer } from 'react-google-maps';

const Map = (withGoogleMap(props => {
	return <GoogleMap defaultZoom={22}>
		<DirectionsRenderer
			directions={props.directions}
		/>
	</GoogleMap>
}))

export default Map
