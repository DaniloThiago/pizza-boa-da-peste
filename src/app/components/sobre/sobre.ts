import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, PLATFORM_ID, ViewChild } from '@angular/core';

@Component({
  selector: 'app-sobre',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sobre.html',
  styleUrl: './sobre.css',
})
export class SobreComponent implements AfterViewInit {
  @ViewChild('sobreSection') sobreSection!: ElementRef<HTMLElement>;

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

    gsap.from(this.sobreSection.nativeElement.querySelectorAll('.js-reveal'), {
      y: 34,
      opacity: 0,
      duration: 0.85,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: this.sobreSection.nativeElement,
        start: 'top 78%',
      },
    });
  }
}
