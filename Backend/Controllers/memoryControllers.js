import { uploadFile, downloadFile } from '../aws/s3.js'
import Memory from '../Models/memoryModel.js';

export const addMemory = async (req, res, next) => {
    const { description } = req.body;
    console.log("Description:",  description);

    const file = req.file;
    const user = req.user;
    console.log('Information:', file);
    console.log("Information about user:", user);
    console.log("Probably key:", file.filename);


    const newMemory = new Memory({  
      imageKey: file.filename,
      userId: user.id,
      description: description
    });

    await newMemory.save();
    
    const result = await uploadFile(file);

    res.status(200).json({ data: newMemory /*req.file.location */});
  
};


export const downloadMemory = async (req, res, next) => {

  const key = req.params.key;
  const result = await downloadFile(key);
  res.setHeader('Content-Type', 'image/jpeg'); // або інший тип контенту, залежно від типу файлу

  //res.status(200).json({ data: result.pipe(res) /*req.file.location */});
  //console.log(result.pipe(res));
   result.pipe(res);

};