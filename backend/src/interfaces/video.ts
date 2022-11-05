import { videoFormat } from 'ytdl-core';
import { IBase } from './share/base';

export interface IVideo extends IBase {
   title?: string;
   description?: string;
   image?: string;
   videoId?: string;
   videoLength?: string;
   profile?: string;
   category?: any;
   publishDate?: string;
   viewCount?: string;
   formats?: Array<videoFormat>;
   videoUrl?: string;
   url?: string;
   files?: Array<IFile>;

   //req
   youtubeFileLink?: string;
}
export interface IFile {
   itag?: string;
   file?: string;
}
