import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

let adminClient = null;

export const connectAdminWebSocket = (adminToken) => {
    const socket = new SockJS(`http://10.5.5.4/ws-stomp?token=${adminToken}`);

    adminClient = new Client({
        webSocketFactory: () => socket,
        connectHeaders: { Authorization: `Bearer ${adminToken}` },
        debug: (str) => console.log('[Admin STOMP]', str),
        reconnectDelay: 5000,
        onConnect: () => console.log('Admin WebSocket Connected'),
        onStompError: (frame) => console.error('STOMP ERROR:', frame)
    });

    adminClient.activate();
};

export const sendAdminMessage = (destination, payload) => {
    if (adminClient && adminClient.connected) {
        adminClient.publish({
            destination,
            body: JSON.stringify(payload)
        });
    } else {}
};
