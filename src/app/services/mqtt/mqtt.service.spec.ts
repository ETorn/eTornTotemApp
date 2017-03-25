import { TestBed, inject } from '@angular/core/testing';

import { MQTTService } from './mqtt.service';

describe('MqttService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MQTTService]
    });
  });

  it('should ...', inject([MQTTService], (service: MQTTService) => {
    expect(service).toBeTruthy();
  }));
});
