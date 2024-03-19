import { EventEmitter } from './eventsShim';

class WebSocketService {
    private readonly socket: WebSocket;
    private readonly eventEmitter: EventEmitter;
    private messageCallback: ((data: any) => void) | null = null; // Add messageCallback property

    constructor() {
        this.eventEmitter = new EventEmitter();
        this.socket = new WebSocket('ws://racemusaircrafttrafficgenerator.d0e6fvepbddreqau.francecentral.azurecontainer.io:8080/ws');
        this.socket.onopen = () => {
            // console.log('WebSocket connected');
            this.eventEmitter.emit('open');
        };

        this.socket.onmessage = (event) => {
            this.handleMessage(event.data);
        };

        this.socket.onerror = (error) => {
            console.error('WebSocket error:', error);
            this.eventEmitter.emit('error', error);
        };
    }

    sendMessage(message: string) {
        if (this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(message);
        } else {
            console.error('WebSocket connection not open.');
        }
    }

    on(event: string, listener: (...args: any[]) => void) {
        this.eventEmitter.on(event, listener);
    }

    // Implement onMessage method to register callback for incoming messages
    onMessage(callback: (data: any) => void) {
        this.messageCallback = callback;
    }

    private handleMessage(data: any) {
        if (this.messageCallback) {
            this.messageCallback(data);
        }
    }
}

export default WebSocketService;
