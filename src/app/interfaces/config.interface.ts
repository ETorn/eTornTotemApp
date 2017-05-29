export interface Config {
    totem: any;
    node: any;
    caesar: any;
    angularNode: any;
    minAproxTime: Number;
    minTimeToShowConfirmation: Number;
    // MQTT queues
    publish: string[];
    subscribe: string[];
}