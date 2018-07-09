import React from 'react'
import { Button, Col, InputGroup, Input, InputGroupText, InputGroupAddon } from 'reactstrap'

const Form = ({ searchOrigin, searchDestination, calc, submitEnter }) => (
	<div className='Form'>
		<Col sm={{ size: 6, offset: 3 }}>


			<InputGroup>
				<InputGroupAddon addonType="prepend">
					<InputGroupText>Origem</InputGroupText>
				</InputGroupAddon>

				<Input
					onChange={searchOrigin}
					placeholder={'Insira o endereço de origem'}
				/>

			</InputGroup>

			<br />

			<InputGroup>
				<InputGroupAddon addonType="prepend">
					<InputGroupText>Destino</InputGroupText>
				</InputGroupAddon>

				<Input
					onChange={searchDestination}
					placeholder={'Insira o endereço de destino'}
					onKeyDown={submitEnter}
				/>
			</InputGroup>

			<br />

			<Button color='primary' className='calc' onClick={calc}>Calcular</Button>
		</Col>
	</div>
)

export default Form
