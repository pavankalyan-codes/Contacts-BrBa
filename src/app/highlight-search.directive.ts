import { ElementRef, Input, OnInit } from '@angular/core';
import { Directive } from '@angular/core';

@Directive({
  selector: '[appHighlightSearch]'
})
export class HighlightSearchDirective implements OnInit {

  @Input() searchTerm:any;
  @Input() word:any;
  constructor(private elRef:ElementRef) {
   }

  ngOnInit() {
    this.elRef.nativeElement.innerHTML = this.searchTerm=`<span>${this.highlightMatches()}</span>`
  }

  highlightMatches(){
    const regex = new RegExp(this.searchTerm, 'gi');
    return this.word.replace(regex, (match:any) => `<span class="highlight">${match}</span>`);
  }

}
