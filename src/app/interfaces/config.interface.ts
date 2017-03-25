export interface Config {
    totem: any;
    node: any;

    // MQTT queues
    publish: string[];
    subscribe: string[];
}