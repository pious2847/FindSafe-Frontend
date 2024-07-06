/* eslint-disable no-unused-vars */
// websocketUtils.js
import { useEffect, useCallback , useState} from 'react';
import useWebSocket, {ReadyState } from 'react-use-websocket';

const WEBSOCKET_URL = 'wss://findsafe-backend.onrender.com/666c6365db6047c5931510c0';

export const useWebSocketCommand = () => {
    const [socketUrl, setSocketUrl] = useState(WEBSOCKET_URL);
  const {
    sendMessage,
    lastMessage,
    readyState  } = useWebSocket(socketUrl,{
    onOpen: () => console.log('WebSocket connection established.'),
    onClose: () => console.log('WebSocket connection closed.'),
    onError: (error) => console.error('WebSocket error:', error),
    shouldReconnect: () => true, // Attempt to reconnect on all close events
  });

  useEffect(() => {
    if (lastMessage !== null) {
      // Handle incoming messages here
      console.log('Received message:', lastMessage.data);
    }
  }, [lastMessage]);

  const sendCommandToDevice = useCallback((deviceId, command) => {
    console.log('Device id ', deviceId, ' ', 'command', command);
    if (readyState === WebSocket.OPEN) {
      const message = JSON.stringify({
        deviceId: deviceId,
        command: command
      });
      sendMessage(message);
    } else {
      console.error('WebSocket is not connected');
      // You might want to queue the message or retry the connection here
      if (readyState !== ReadyState.CONNECTING) {
        setSocketUrl(WEBSOCKET_URL);
      }
    }
  }, [readyState, sendMessage]);

  return { sendCommandToDevice, readyState, lastMessage };
};
