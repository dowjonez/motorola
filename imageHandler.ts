import { existsSync } from 'fs';
import { createWriteStream } from 'fs';
import * as fs from 'fs';
import * as http from 'http';
import * as https from 'https';
import * as lineReader from 'line-reader';
import { Type } from '@angular/core';
import { Photo } from 'src/app/interface/Photo';


const moment = require( 'moment');
const protocols: any ={
    'http': http, 
    'https': https
}


export class ImageHandler{
    private _photos:Array<Photo>; 

    constructor() {
    
    }

    public get photos() {
        return this._photos;
    }
    public  getImages():void {
        lineReader.eachLine( './dates.txt', ( dateFromFile, isLast) => {
            // console.log( dateFromFile );
            const date: Date = new Date( Date.parse(dateFromFile) );
            //if the line of text used to instantiate this text object is not a valid date - then skip it;
            if( isNaN(date.getDate()) ){
                console.error( 'Invalid Date', dateFromFile)
                return;
            }

            const dateString: string = date.toISOString().split('T')[0];
            //const url = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2015-6-3&api_key=eHL7pqlZvaeqMsTn2bda4Ibq4WgFfhkTHhZ3Fxbr';
              const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${dateString}&api_key=eHL7pqlZvaeqMsTn2bda4Ibq4WgFfhkTHhZ3Fxbr`;


            https.get( url, (response:any ) => {
                var body = '';
                response.on('data', (chunk: any) => {
                    body+=chunk;
                });
                response.on('end', () =>{
                    this._photos = JSON.parse( body ).photos;

                    this.photos.forEach( (photo:Photo, id:number, arr:Array<Photo>) => {
                      const filename: string = <string>photo.img_src.split('/').pop();
                      getFile(photo.img_src, filename, photo, );

                        
                    });
                    
                });
            }).on( 'error', (e: any) => {
                console.log( e, 'something went wrong ' )
            });
    });
     function getFile( url: string, filename:string, photo: Photo){
        const dirPath: string = './dist/motorola-test/browser/images'; 

        if( !fs.existsSync(dirPath)){
           fs.mkdirSync(dirPath);
         }
      
         const filepath:    string = `${dirPath}/${filename}`;
         const protocolStr: string = url.split(':')[0];
         const protocol:    string = protocolStr.substring(0, protocolStr.length);
         let file:          any;
        
      
        /** 
         * images have been moved from an http endpoint to one that uses https
         * so we need to use both node classes to accomodate redirected images :F
         */
        
         protocols[protocol]?.request(url)
         .on( 'response',  (res: any) => {
             file = fs.createWriteStream(filepath);
             if( res.statusCode === 301 && res.headers.location ){
                getFile( res.headers.location, res.headers.location.split('/').pop(), photo);
             } else if (res.statusCode === 200 ) {
                res.pipe( file );
                photo.img_src = `images/${filename}`;
             }
         })
         .on('error', (err: any) => {
             file.unlink( filepath );
         })
         .end();
      }
    }
}
