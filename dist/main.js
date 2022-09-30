(function(graph){
        function require(moduleId){ 
          function localRequire(relativePath){
            return require(graph[moduleId].dependecies[relativePath])
          }
          var exports = {};
          (function(require,exports,code){
            eval(code)
          })(localRequire,exports,graph[moduleId].code);
          return exports;
        }
        require('./src/index.js')
      })({"./src/index.js":{"dependecies":{"./hello.js":"./src/hello.js"},"code":"\"use strict\";\n\nvar _hello = require(\"./hello.js\");\n\ndocument.write((0, _hello.say)(\"webpack\"));"},"./src/hello.js":{"dependecies":{"./tool1.js":"./src/tool1.js","./tool2.js":"./src/tool2.js"},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.say = say;\n\nvar _tool = require(\"./tool1.js\");\n\nvar _tool2 = require(\"./tool2.js\");\n\nfunction say(name) {\n  var num = (0, _tool.randomNum)(1, 100);\n  (0, _tool2.printTxt)(num);\n  return \"hello \".concat(name);\n}"},"./src/tool1.js":{"dependecies":{},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.randomNum = randomNum;\n\nfunction randomNum(min, max) {\n  return Math.floor(Math.random() * (max - min + 1) + min);\n}"},"./src/tool2.js":{"dependecies":{},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.printTxt = printTxt;\n\nfunction printTxt(txt) {\n  console.log(txt);\n}"}})