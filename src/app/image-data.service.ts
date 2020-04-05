import { Injectable,  } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Photo } from 'src/app/interface/Photo';
import { take } from 'rxjs/operators';
import { JsonPipe } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class ImageDataService {

  public _images: Subject<Array<Photo>> = new Subject();
  public get images() {
    return this._images.asObservable();
  }
  constructor(private http: HttpClient) {

  }

  getImages() {
    this.http.get( '/imagedata', {
      headers: {
        accept: 'application/json'
      },
    })
    .pipe(
      take(1)
    )
    .subscribe((res: Array<Photo>) => {
      const images =  res ? res : [];
      this._images.next( images  );
    });
    return this.images;
  }
}
