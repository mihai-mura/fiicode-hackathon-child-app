import { LoadingOverlay } from '@mantine/core';
import { useEffect, useState } from 'react';
import uuid from 'react-uuid';
import Main from './components/Main';
import QRCode from './components/QRCode';
import socket from './services/socketio';

function App() {
	const [uid, setUid] = useState(null);
	const [uuidRegistered, setUuidRegistered] = useState(false);
	const [loadingOverlay, setLoadingOverlay] = useState(true);

	useEffect(() => {
		if (localStorage.getItem('uuid')) {
			socket.emit('uuid', localStorage.getItem('uuid'));
			setUid(localStorage.getItem('uuid'));
		} else {
			const id = uuid();
			socket.emit('uuid', id);
			localStorage.setItem('uuid', id);
			setUid(id);
		}

		socket.on('uuidRegistered', (data) => {
			if (data) setUuidRegistered(true);
			setLoadingOverlay(false);
		});

		return () => {
			socket.off('uuidRegistered');
		};
	}, []);

	return (
		<div className='App'>
			<LoadingOverlay visible={loadingOverlay} />
			{uuidRegistered ? <Main /> : <QRCode uid={uid} />}
		</div>
	);
}

export default App;
