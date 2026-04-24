import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Inject,
  PLATFORM_ID,
  ViewChild,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class HeroComponent implements AfterViewInit {
  @ViewChild('heroSection') heroSection!: ElementRef<HTMLElement>;
  menuOpen = signal(false);

  readonly navLinks = [
    { label: 'Início', href: '#topo' },
    { label: 'Sobre', href: '#sobre' },
    { label: 'Sabores', href: '#cardapio' },
    { label: 'Diferenciais', href: '#destaques' },
    { label: 'Depoimentos', href: '#depoimentos' },
    { label: 'Contato', href: '#contato' },
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  @HostListener('window:resize')
  onResize() {
    if (window.innerWidth > 1100) {
      this.menuOpen.set(false);
      this.setScrollLock(false);
    }
  }

  private setScrollLock(locked: boolean) {
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = locked ? 'hidden' : '';
    }
  }

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    void this.initGsap();
  }

  private async initGsap() {
    const { gsap } = await import('gsap');

    const scope = this.heroSection.nativeElement;
    const revealItems = scope.querySelectorAll('.js-reveal');

    gsap.from(revealItems, {
      y: 28,
      opacity: 0,
      duration: 0.9,
      stagger: 0.12,
      ease: 'power3.out',
      clearProps: 'all',
    });

    gsap.from(scope.querySelectorAll('.hero__sun--copy, .hero__bird, .hero__pizza, .hero__caju'), {
      y: 20,
      opacity: 0,
      duration: 1,
      stagger: 0.08,
      ease: 'power2.out',
      clearProps: 'all',
    });
  }

  toggleMenu() {
    this.menuOpen.update(v => !v);
    this.setScrollLock(this.menuOpen());
  }

  closeMenu() {
    this.menuOpen.set(false);
    this.setScrollLock(false);
  }
}
