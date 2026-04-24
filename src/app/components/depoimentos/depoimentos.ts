import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, PLATFORM_ID, ViewChild } from '@angular/core';

type Depoimento = {
  name: string;
  role: string;
  text: string;
  stars: number;
  initial: string;
};

@Component({
  selector: 'app-depoimentos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './depoimentos.html',
  styleUrl: './depoimentos.css',
})
export class DepoimentosComponent implements AfterViewInit {
  @ViewChild('depoimentosSection') depoimentosSection!: ElementRef<HTMLElement>;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  readonly depoimentos: readonly Depoimento[] = [
    {
      name: 'Maria das Dores',
      role: 'Cliente fiel',
      initial: 'M',
      stars: 5,
      text: 'Rapaz, essa pizza e boa demais. Massa leve, recheio caprichado e chega com cara de feito na hora.',
    },
    {
      name: 'Seu Jailson',
      role: 'Apreciador de respeito',
      initial: 'J',
      stars: 5,
      text: 'Meu neto me apresentou e agora eu que puxo a fila. Sabor marcante e atendimento sem enrolacao.',
    },
    {
      name: 'Ana Beatriz',
      role: 'Frequenta sempre',
      initial: 'A',
      stars: 5,
      text: 'O visual ja entrega que a casa tem personalidade. No paladar, a historia fica ainda melhor.',
    },
  ];

  starsArray(n: number): number[] {
    return Array(n).fill(0);
  }

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

    gsap.from(this.depoimentosSection.nativeElement.querySelectorAll('.depoimento-card'), {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.14,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: this.depoimentosSection.nativeElement,
        start: 'top 78%',
      },
    });
  }
}
