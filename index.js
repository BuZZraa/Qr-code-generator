/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
import inquirer from 'inquirer';
import fs from "fs";
import qr from 'qr-image';

//prompt method from inquirer package to get input of url from user.
inquirer
  .prompt([
    {
      type: 'input',
      name: 'url',
      message: 'Type your url:',
    },
  ])

  //then method from inquirer package to run callback function after user provides url input .
  .then((answers) => {
    const url = answers.url; //The value of name which is 'url'

    //fs built in module in node js to write the answer or url input written by user to an txt file.
    fs.writeFile("user-url.txt", url, (err) => {
        if (err) throw err;
        console.log("The file has been saved!");
    })

    //qr-image package to generate the qr code from the url input given by user and create a qr image with .png extension.
    var qr_png = qr.image(url, { type: 'png' }); //Here value of name from the object create in prompt is used to generate the qr.
    qr_png.pipe(fs.createWriteStream('qr.png'));
  })

  //catch method to print out errors if one occurs to the console.
  .catch(error => {
    console.error('Error:', error);
  });
