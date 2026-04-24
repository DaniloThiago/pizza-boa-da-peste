import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, PLATFORM_ID, ViewChild } from '@angular/core';

type Destaque = {
  icon: string;
  title: string;
  text: string;
};

@Component({
  selector: 'app-destaques',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './destaques.html',
  styleUrl: './destaques.css',
})
export class DestaquesComponent implements AfterViewInit {
  @ViewChild('destaquesSection') destaquesSection!: ElementRef<HTMLElement>;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  readonly destaques: readonly Destaque[] = [
    {
      icon: 'M',
      title: 'Massa artesanal',
      text: 'Fermentada com calma, aberta no braço e assada para ficar com estrutura e textura de verdade.',
    },
    {
      icon: 'I',
      title: 'Ingredientes selecionados',
      text: 'Queijo bom, tomate de respeito e tempero alinhado com o sabor que a casa quer entregar.',
    },
    {
      icon: 'S',
      title: 'Sabor marcante',
      text: 'Tempero nordestino no ponto, sem economia de personalidade e sem perfume genérico.',
    },
    {
      icon: 'A',
      title: 'Atendimento proximo',
      text: 'Pedido rápido, conversa direta e cuidado de quem sabe o valor de uma boa entrega.',
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

    gsap.from(this.destaquesSection.nativeElement.querySelectorAll('.destaque-item'), {
      y: 42,
      opacity: 0,
      duration: 0.75,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: this.destaquesSection.nativeElement,
        start: 'top 78%',
      },
    });
  }
}
