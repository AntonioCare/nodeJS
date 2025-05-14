import { writeFile } from "node:fs";

writeFile(
  "message.txt",
  "This is a text write with the writeFile Method",
  "utf8",
  function (error) {
    if (error) {
      console.error("Errore durante la scrittura del file :", error);
      return;
    }
    console.log("File scritto con successo!!");
  }
);
