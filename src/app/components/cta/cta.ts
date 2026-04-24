import { AfterViewInit, Component, ElementRef, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-cta',
  standalone: true,
  imports: [],
  templateUrl: './cta.html',
  styleUrl: './cta.css',
})
export class CtaComponent implements AfterViewInit {
  @ViewChild('ctaSection') ctaSection!: ElementRef<HTMLElement>;

  readonly whatsappNumber = '5584999999999';
  readonly whatsappMessage = encodeURIComponent('Ola! Quero pedir uma Pizza Boa da Peste.');

  get whatsappUrl(): string {
    return `https://wa.me/${this.whatsappNumber}?text=${this.whatsappMessage}`;
  }

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

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

    gsap.from(this.ctaSection.nativeElement.querySelectorAll('.js-reveal'), {
      y: 36,
      opacity: 0,
      duration: 0.8,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: this.ctaSection.nativeElement,
        start: 'top 80%',
      },
    });
  }
}
