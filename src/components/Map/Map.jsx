import React from 'react'

import { compose, withProps, lifecycle } from 'recompose'
import { withGoogleMap, GoogleMap, DirectionsRenderer } from 'react-google-maps'

const google = window.google

this.state = {
	distance: undefined
}

const Map = compose(
	withProps({
		googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBZJDUkG83bcVMgdRoJPOotgt0v305l6W4&v=3.exp&libraries=geometry,drawing,places',
		loadingElement: <div style={{ height: `50vh` }} />,
		containerElement: <div style={{ height: `50vh` }} />,
		mapElement: <div style={{ height: `50vh` }} />,
	}),
	withGoogleMap,
	lifecycle({
		componentDidMount() {
			const DirectionsService = new google.maps.DirectionsService()

			DirectionsService.route({
				origin: 'BRB, Planaltina DF',
				destination: 'Condominio Arapoangas, Planaltina DF',
				travelMode: google.maps.TravelMode.DRIVING,
			}, (res, status) => {
				if (status === google.maps.DirectionsStatus.OK) {
					this.setState({
						directions: res,
						distance: res.routes[0].legs[0].distance.value
					})
					console.log(`${res.routes[0].legs[0].distance.value} metros`)
				} else {
					console.error(`error fetching directions ${res}`)
				}
			})
		}
	})
)(props =>
	<GoogleMap defaultZoom={5}>
		{props.directions && <DirectionsRenderer directions={props.directions} />}

		{props.distance !== undefined &&
			<div>
				<p>Distância entre os pontos: {props.distance} metros</p>
				<p>Valor R${props.distance / 1000 * 1.9 + 5}</p>
			</div>
		}
	</GoogleMap>
)

export default Map