const fs = require("fs");
const express = require("express");
const { title } = require("process");
const app = express();

app.use(express.json());

let todos = [];