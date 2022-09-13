import { getDist } from 'config/storage';
import { IMiddlewareModel } from 'interfaces';
import { middleware } from 'middleware';
import fs from 'fs';
import axios from 'axios';
import readline from 'readline';
import { IGroup } from 'interfaces/group';
import GroupSchema from 'db/schema/group.schema';
import { mergeAll } from 'middleware/wrpper';
import { checkToken } from 'middleware/validate';
const insertGroup = middleware(async ({ res, req }: IMiddlewareModel) => {
   const fileName = req.body.fileName;
   //   const pathAddress = getDist() + `/${fileName}`;
   const pathAddress = getDist() + `/example.txt`;

   const txt = fs.createReadStream(pathAddress);
   const rl = readline.createInterface({
      input: txt,
      crlfDelay: Infinity,
   });

   interface ITest {
      title: string;
      links: Array<string>;
   }
   let parts: Array<ITest> = [];

   for await (const line of rl) {
      console.log(line);
      if (line.length <= 0) continue;

      if (line.includes('title:')) {
         parts.push({
            title: line.substr(line.indexOf('title:')),
            links: [],
         });
      } else {
         parts[parts.length - 1].links.push(line);
      }
   }
   console.log(parts);

   let resList = [];
   for (let i = 0; i < parts.length; i++) {
      const item = parts[i];
      let group: IGroup = {
         title: item.title,
         videoIds: [],
      };
      for (let j = 0; j < parts[i].links.length; j++) {
         const link = parts[i].links[j];
         const { data } = await axios.post(
            'http://localhost:4400/api/v1/fetch/video/info',
            {
               url: link,
            },
            {
               headers: {
                  token: `${req?.headers?.token}`,
               },
            }
         );
         await axios.get(
            `http://localhost:4400/api/v1/video/link/${data._id}/${data.formats[0].itag}`,
            {
               headers: {
                  token: `${req?.headers?.token}`,
               },
            }
         );
         console.log(data._id);

         group.videoIds.push(data._id);
      }
      console.log(group);
      const isGroupFind: any = await GroupSchema.findOne({
         title: item.title,
      });
      let groupSaved;
      if (isGroupFind) {
         let concated = isGroupFind.videoIds.concat(group.videoIds);
         isGroupFind.videoIds = concated;
         groupSaved = await isGroupFind.save();
      } else {
         groupSaved = await new GroupSchema(group).save();
      }
      resList.push(groupSaved);
   }
   res.send(resList);
});
export const insertGroupHandler = mergeAll([checkToken, insertGroup]);
