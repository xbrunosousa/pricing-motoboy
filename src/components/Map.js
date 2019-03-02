import React from 'react'
import { GoogleMap, withGoogleMap, DirectionsRenderer } from 'react-google-maps';

const Map = (withGoogleMap(props => {
	return (
		<GoogleMap defaultZoom={1}>
			<DirectionsRenderer
				directions={props.directions}
			/>
		</GoogleMap>
	)
}))

export default Map
