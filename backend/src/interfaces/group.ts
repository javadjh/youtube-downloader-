import { IVideo } from './video';

export interface IGroup {
   _id?: string;
   title: string;
   videoIds: Array<string> | Array<IVideo>;
}
