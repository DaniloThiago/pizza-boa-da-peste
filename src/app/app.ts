import { Component } from '@angular/core';
import { HeroComponent } from './components/hero/hero';
import { SobreComponent } from './components/sobre/sobre';
import { CardapioComponent } from './components/cardapio/cardapio';
import { DestaquesComponent } from './components/destaques/destaques';
import { DepoimentosComponent } from './components/depoimentos/depoimentos';
import { CtaComponent } from './components/cta/cta';
import { FooterComponent } from './components/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeroComponent,
    SobreComponent,
    CardapioComponent,
    DestaquesComponent,
    DepoimentosComponent,
    CtaComponent,
    FooterComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
