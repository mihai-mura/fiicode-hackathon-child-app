import { Button } from '@mantine/core';
import { useEffect, useRef, useState } from 'react';
import socket from '../services/socketio';

const Main = () => {
	const [name, setName] = useState('');
	const prevLocation = useRef(null);

	useEffect(() => {
		(async () => {
			const res = await fetch(`${process.env.REACT_APP_API_URL}/children/${localStorage.getItem('uuid')}`);
			const response = await res.text();
			setName(response);
			navigator.geolocation.getCurrentPosition(function (position) {
				socket.emit('location', {
					uuid: localStorage.getItem('uuid'),
					latitude: position.coords.latitude,
					longitude: position.coords.longitude,
				});
				prevLocation.current = { lat: position.coords.latitude, lng: position.coords.longitude };
			});
		})();
	}, []);

	useEffect(() => {
		const interval = setInterval(() => {
			navigator.geolocation.getCurrentPosition(function (position) {
				if (
					position.coords.latitude !== prevLocation.current.lat ||
					position.coords.longitude !== prevLocation.current.lng
				) {
					socket.emit('location', {
						uuid: localStorage.getItem('uuid'),
						latitude: position.coords.latitude,
						longitude: position.coords.longitude,
					});
					prevLocation.current.lat = position.coords.latitude;
					prevLocation.current.lng = position.coords.longitude;
				}
			});
		}, 5000);

		return () => clearInterval(interval);
	}, []);

	return (
		<div>
			<div className='header'>{name}</div>
			<Button radius='lg' variant='gradient' gradient={{ from: 'orange', to: 'red' }}>
				Orange red
			</Button>
			<Button radius='lg' variant='gradient' gradient={{ from: 'orange', to: 'red' }}>
				Orange red
			</Button>
			<Button radius='lg' variant='gradient' gradient={{ from: 'orange', to: 'red' }}>
				Orange red
			</Button>
			<Button radius='lg' variant='gradient' gradient={{ from: 'orange', to: 'red' }}>
				Orange red
			</Button>
		</div>
	);
};
export default Main;
