import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, PLATFORM_ID, ViewChild } from '@angular/core';

export type Pizza = {
  name: string;
  description: string;
  price: string;
  badge: string;
  tag: 'mais-pedida' | 'queridinha' | 'veggie' | 'premium';
};

@Component({
  selector: 'app-cardapio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cardapio.html',
  styleUrl: './cardapio.css',
})
export class CardapioComponent implements AfterViewInit {
  @ViewChild('cardapioSection') cardapioSection!: ElementRef<HTMLElement>;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  readonly pizzas: readonly Pizza[] = [
    {
      name: 'Boa da Peste',
      description: 'Calabresa nordestina, cebola roxa, muzzarela e molho da casa com cheiro de domingo bom.',
      price: 'R$ 49,90',
      badge: 'Queridinha',
      tag: 'queridinha',
    },
    {
      name: 'Carne de Sol do Sertao',
      description: 'Carne de sol desfiada, queijo coalho, manteiga de garrafa e coentro na medida certa.',
      price: 'R$ 57,90',
      badge: 'Mais pedida',
      tag: 'mais-pedida',
    },
    {
      name: 'Brasa Arretada',
      description: 'Frango temperado, catupiry, milho tostado e bacon artesanal com final levemente defumado.',
      price: 'R$ 54,90',
      badge: 'Premium',
      tag: 'premium',
    },
    {
      name: 'Mandacaru Veggie',
      description: 'Tomate confit, cebola roxa, pesto de coentro, muzzarela e toque de pimenta doce.',
      price: 'R$ 46,90',
      badge: 'Veggie',
      tag: 'veggie',
    },
    {
      name: 'Portuguesa da Peste',
      description: 'Presunto, ovo, cebola, pimentao e azeitona numa combinacao de respeito.',
      price: 'R$ 52,90',
      badge: 'Clássica',
      tag: 'queridinha',
    },
    {
      name: 'Quatro Queijos da Feira',
      description: 'Muzzarela, parmesao, provolone e gorgonzola em uma base cremosa e bem generosa.',
      price: 'R$ 58,90',
      badge: 'Especial',
      tag: 'premium',
    },
  ];

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.initGsap();
  }

  private async initGsap() {
    const { gsap } = await import('gsap');
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(this.cardapioSection.nativeElement.querySelectorAll('.js-card'), {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: this.cardapioSection.nativeElement,
        start: 'top 75%',
      },
    });
  }
}
