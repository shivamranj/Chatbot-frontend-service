import { environmentLocal } from "../environment";

export const  formatMessage=(text)=>{
   const lines = text.split('\n');

   const formattedLines = [];

   let count = 1;

   for (let line of lines) {
       if (line.trim().startsWith('*')) {
           formattedLines.push(line.replace('*', `${count}.`).trim());
           count++;
       } else if (line.match(/^\d+\.\*/)) {
           formattedLines.push(line.replace(/^\d+\.\*/, `${count}.`).trim());
           count++;
       } else {
           formattedLines.push(line);
       }
   }
   return formattedLines.join('\n');
}

export const getEnviroment =
  process.env.REACT_APP_ENV == 'PROD'
    ? environmentLocal
    : environmentLocal;

