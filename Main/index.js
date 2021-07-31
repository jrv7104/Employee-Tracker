const { prompt } = require("inquirer");
const db = require("./db");
require("console.table");

init();

function init() {
    loadPrompts();
}

function loadPrompts() {
    prompt([
        {
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: [

            