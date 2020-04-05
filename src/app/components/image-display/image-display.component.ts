import { Component, OnInit } from '@angular/core';
import { ImageDataService } from 'src/app/image-data.service';
import { Photo } from 'src/app/interface/Photo';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-image-display',
  templateUrl: './image-display.component.html',
  styleUrls: ['./image-display.component.scss']
})
export class ImageDisplayComponent implements OnInit {
  public images: Observable<Array<Photo>> = of([]);

  constructor(
    private svc: ImageDataService
  ) { }


  ngOnInit(): void {
    this.images = this.svc.getImages();
  }

}
