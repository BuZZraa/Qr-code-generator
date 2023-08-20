/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
import inquirer from 'inquirer';
import fs from "fs";
import qr from 'qr-image';
inquirer
  .prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Type your url:',
    },
  ])
  .then((answers) => {
    const url = answers.name;
    fs.writeFile("user-url.txt", url, (err) => {
        if (err) throw err;
        console.log("The file has been saved!");
    })
    var qr_svg = qr.image(url, { type: 'png' });
    qr_svg.pipe(fs.createWriteStream('qr.png'));
  })
  .catch(error => {
    console.error('Error:', error);
  });
