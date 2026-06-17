import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaComponent } from './mapa';

describe('Mapa', () => {
  let component: MapaComponent;
  let fixture: ComponentFixture<MapaComponent>;

  beforeEach(async () => {
    // Mock global de google maps para que la prueba no colapse
    (window as any).google = {
      maps: {
        Map: class {
          setCenter() {}
          setZoom() {}
          setOptions() {}
          addListener() { return { remove: () => {} }; }
        },
        Marker: class {
          setMap() {}
          setOptions() {}
          addListener() { return { remove: () => {} }; }
        },
        InfoWindow: class {
          close() {}
          setContent() {}
          open() {}
        },
        LatLng: class {},
        MapTypeId: { ROADMAP: 1 },
        event: {
          clearInstanceListeners: () => {},
          addListener: () => ({ remove: () => {} })
        }
      }
    };

    await TestBed.configureTestingModule({
      imports: [MapaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapaComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
