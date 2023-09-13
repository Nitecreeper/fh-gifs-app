import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html',
  styleUrls: ['./lazy-image.component.css']
})
export class LazyImageComponent implements OnInit{

  @Input()
  public enlace!: string;
  
  @Input()
  public alt: string = '';
  
  ngOnInit(): void {
    if(!this.enlace) throw new Error('URL property is required');
    
    console.log(this.enlace);
    
  }

}
