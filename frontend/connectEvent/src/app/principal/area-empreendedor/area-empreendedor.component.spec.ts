import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaEmpreendedorComponent } from './area-empreendedor.component';

describe('AreaEmpreendedorComponent', () => {
  let component: AreaEmpreendedorComponent;
  let fixture: ComponentFixture<AreaEmpreendedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AreaEmpreendedorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AreaEmpreendedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
