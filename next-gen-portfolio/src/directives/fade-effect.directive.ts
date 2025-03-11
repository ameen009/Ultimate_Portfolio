import { Directive, ElementRef, HostListener, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[appFadeEffect]',
  standalone: true
})
export class FadeEffectDirective implements OnChanges{

  @Input() fadeInDirection: string = '';
  @Input() fadeInType: string = 'vertical'

  constructor(private el: ElementRef) {
    this.el.nativeElement.style.opacity = '0'; // Initially hidden
    this.el.nativeElement.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
  }

  ngOnChanges(): void {
    this.determineFadeType();
  }

  @HostListener('window:scroll', [])
  onScroll() {
    const elementTop = this.el.nativeElement.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementTop < windowHeight - 100) { // Adjust threshold
      this.el.nativeElement.style.opacity = '1';
      this.el.nativeElement.style.transform = 'translateY(0)';
      this.el.nativeElement.style.transform = 'translateX(0)';
    } else {
      this.el.nativeElement.style.opacity = '0';
      this.determineFadeType();
    }
  }

  determineFadeType(){
    if(this.fadeInType === 'vertical'){
      this.el.nativeElement.style.transform = 'translateY(-50px)';
     }
     if(this.fadeInType === 'horizontal'){
      if(this.fadeInDirection === 'left'){
        this.el.nativeElement.style.transform = 'translateX(-200px)';
      }
      if(this.fadeInDirection === 'right'){
        this.el.nativeElement.style.transform = `translateX(200px)`;
      }  
     }
  }

}
