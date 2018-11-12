#!/usr/bin/env node
var fs = require('fs');
var wtf_parse = require('../src/index');
var args = process.argv.slice(2, process.argv.length);

// Usage: wtf_parse ./tests/cache/africaans.txt --ast

function from_file(page, options) {
  var str = fs.readFileSync('./tests/cache/' + page.toLowerCase() + '.txt', 'utf-8');
  return wtf_parse.getAST(page,"en","wikipedia",str, options);
}

function file4parse(pFilename, options) {
  var str = fs.readFileSync(pFilename, 'utf-8');
  var page = extractTitle4File(pFilename);
  return wtf_parse.getAST(page,"en","wikipedia",str, options);
}
function firstUpperCase(pString) {
    return pString.charAt(0).toUpperCase() + pString.slice(1);
}

function extractTitle4File(pFilename) {
  var vLastSlashPos = pFilename.lastIndexOf("/");
  var vTitle = pFilename;
  if (vLastSlashPos >= 0) {
    vTitle = vTitle.slice(vLastSlashPos+1)
  };
  var vWordArr = vTitle.split(/[ \t]+/);
  for (var i = 0; i < vWordArr.length; i++) {
    vWordArr[i] = firstUpperCase(vWordArr[i]);
  };
  vTitle = vWordArr.join(" ");
  console.log("Title: '"+vTitle+"' - File: '"+pFilename+"'");
  return vTitle
}

var modes = {
  '--json': 'json',
  '--ast': 'ast'
};
var mode = 'json';

args = args.filter((arg) => {
  if (modes.hasOwnProperty(arg) === true) {
    mode = modes[arg];
    return false;
  }
  return true;
});

var title = "WTF Parse Test";
var filename = args[0];
//var title = args.join(' ');
if (!filename) {
  throw new Error('Usage: node wtf_parse ./tests/cache/africaans.txt --ast');
} else {

}

options = {
  "absolute_links": true
}
console.log("Wiki File: "+filename);

var wikicode = "==Test==\nMy section\nnext line."
wikicode = fs.readFileSync(filename, 'utf-8');
var doc = wtf_parse.getAST(title, 'en', 'wikipedia',wikicode,options);
console.log(JSON.stringify(doc, null, 2));
