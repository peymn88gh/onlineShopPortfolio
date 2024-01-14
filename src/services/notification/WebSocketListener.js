
import { showNotification } from './NotificationService';


const webSocket = new WebSocket('wss://example.com/socket');

webSocket.addEventListener('message', (event) => {
  const data = JSON.parse(event.data);

  if (data.type === 'notification') {
    showNotification(data.message);
  }
});
