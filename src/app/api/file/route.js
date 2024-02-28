// import formidable from "formidable";
// import fs from "fs";

// export const config = {
//   api: {
//     bodyParser: false
//   }
// };

// export async function POST(request) {
//     const form = new formidable.IncomingForm();
//     form.parse(req, async function (err, fields, files) {
//       await saveFile(files.file);
//       return Response.json({'success' : true});
//     });

// }
  
  

// const saveFile = async (file) => {
//   const data = fs.readFileSync(file.path);
//   fs.writeFileSync(`./public/${file.name}`, data);
//   await fs.unlinkSync(file.path);
//   return;
// };

