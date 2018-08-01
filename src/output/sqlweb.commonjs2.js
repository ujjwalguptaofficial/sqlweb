/*!
 * @license :sqlweb - V1.0.0 - 01/08/2018
 * https://github.com/ujjwalguptaofficial/JsStore
 * Copyright (c) 2018 @Ujjwal Gupta; Licensed MIT
 */
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _instance__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Instance", function() { return _instance__WEBPACK_IMPORTED_MODULE_0__["Instance"]; });

/* harmony import */ var _query__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Query", function() { return _query__WEBPACK_IMPORTED_MODULE_1__["Query"]; });





/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Instance", function() { return Instance; });
/* harmony import */ var _output_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _output_parser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_output_parser__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);


var Instance = /** @class */ (function () {
    function Instance(workerPath) {
        this.connection_ = workerPath == null ? new JsStore.Instance() :
            new JsStore.Instance(new Worker(workerPath));
    }
    Instance.prototype.isString_ = function (value) {
        return _util__WEBPACK_IMPORTED_MODULE_1__["Util"].isString(value);
    };
    Instance.prototype.runQuery = function (query) {
        try {
            var result = void 0;
            if (this.isString_(query) === true) {
                result = _output_parser__WEBPACK_IMPORTED_MODULE_0__["parse"](query);
            }
            else {
                result = query.query_;
            }
            return this.connection_[result.api](result.data);
        }
        catch (ex) {
            return new Promise(function (resolve, reject) {
                reject(ex);
            });
        }
    };
    return Instance;
}());



/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * Generated by PEG.js 0.10.0.
 *
 * http://pegjs.org/
 */



function peg$subclass(child, parent) {
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor();
}

function peg$SyntaxError(message, expected, found, location) {
  this.message  = message;
  this.expected = expected;
  this.found    = found;
  this.location = location;
  this.name     = "SyntaxError";

  if (typeof Error.captureStackTrace === "function") {
    Error.captureStackTrace(this, peg$SyntaxError);
  }
}

peg$subclass(peg$SyntaxError, Error);

peg$SyntaxError.buildMessage = function(expected, found) {
  var DESCRIBE_EXPECTATION_FNS = {
        literal: function(expectation) {
          return "\"" + literalEscape(expectation.text) + "\"";
        },

        "class": function(expectation) {
          var escapedParts = "",
              i;

          for (i = 0; i < expectation.parts.length; i++) {
            escapedParts += expectation.parts[i] instanceof Array
              ? classEscape(expectation.parts[i][0]) + "-" + classEscape(expectation.parts[i][1])
              : classEscape(expectation.parts[i]);
          }

          return "[" + (expectation.inverted ? "^" : "") + escapedParts + "]";
        },

        any: function(expectation) {
          return "any character";
        },

        end: function(expectation) {
          return "end of input";
        },

        other: function(expectation) {
          return expectation.description;
        }
      };

  function hex(ch) {
    return ch.charCodeAt(0).toString(16).toUpperCase();
  }

  function literalEscape(s) {
    return s
      .replace(/\\/g, '\\\\')
      .replace(/"/g,  '\\"')
      .replace(/\0/g, '\\0')
      .replace(/\t/g, '\\t')
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '\\r')
      .replace(/[\x00-\x0F]/g,          function(ch) { return '\\x0' + hex(ch); })
      .replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) { return '\\x'  + hex(ch); });
  }

  function classEscape(s) {
    return s
      .replace(/\\/g, '\\\\')
      .replace(/\]/g, '\\]')
      .replace(/\^/g, '\\^')
      .replace(/-/g,  '\\-')
      .replace(/\0/g, '\\0')
      .replace(/\t/g, '\\t')
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '\\r')
      .replace(/[\x00-\x0F]/g,          function(ch) { return '\\x0' + hex(ch); })
      .replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) { return '\\x'  + hex(ch); });
  }

  function describeExpectation(expectation) {
    return DESCRIBE_EXPECTATION_FNS[expectation.type](expectation);
  }

  function describeExpected(expected) {
    var descriptions = new Array(expected.length),
        i, j;

    for (i = 0; i < expected.length; i++) {
      descriptions[i] = describeExpectation(expected[i]);
    }

    descriptions.sort();

    if (descriptions.length > 0) {
      for (i = 1, j = 1; i < descriptions.length; i++) {
        if (descriptions[i - 1] !== descriptions[i]) {
          descriptions[j] = descriptions[i];
          j++;
        }
      }
      descriptions.length = j;
    }

    switch (descriptions.length) {
      case 1:
        return descriptions[0];

      case 2:
        return descriptions[0] + " or " + descriptions[1];

      default:
        return descriptions.slice(0, -1).join(", ")
          + ", or "
          + descriptions[descriptions.length - 1];
    }
  }

  function describeFound(found) {
    return found ? "\"" + literalEscape(found) + "\"" : "end of input";
  }

  return "Expected " + describeExpected(expected) + " but " + describeFound(found) + " found.";
};

function peg$parse(input, options) {
  options = options !== void 0 ? options : {};

  var peg$FAILED = {},

      peg$startRuleFunctions = { query: peg$parsequery },
      peg$startRuleFunction  = peg$parsequery,

      peg$c0 = function(table, insertValue, options) {
           var skipDataCheck = false;
           var returnValue = false;
           options.forEach(val=>{
                  var key = Object.keys(val)[0];
                  switch(key){
                      case 'skipDataCheck':
                          skipDataCheck = val[key]; break;
                      case 'return':
                          returnValue = val[key]; break;
                  }
           });
           return {
              api: 'insert',
              data: {
                  into: table,
                  values: insertValue,
                  skipDataCheck: skipDataCheck,
                  return : returnValue
              }
           }
      },
      peg$c1 = "({",
      peg$c2 = peg$literalExpectation("({", false),
      peg$c3 = "})",
      peg$c4 = peg$literalExpectation("})", false),
      peg$c5 = function(first, rest) {
      	var obj = {
          	[first.key]: first.value
          }
          if(rest!=null){
          	rest.forEach(item=>{
              	obj[item.key] = item.value
              })
          }
          return [obj];
      },
      peg$c6 = ",",
      peg$c7 = peg$literalExpectation(",", false),
      peg$c8 = function(val) {
      	return val;
      },
      peg$c9 = ":",
      peg$c10 = peg$literalExpectation(":", false),
      peg$c11 = function(key, val) {
      	return {
          	key:key,
              value:val
          }
      },
      peg$c12 = "=",
      peg$c13 = peg$literalExpectation("=", false),
      peg$c14 = function(insertValue) {
      	return insertValue;
      },
      peg$c15 = function(option) {
          return {
              [option]:true
          }
      },
      peg$c16 = function() {
          return 'skipDataCheck';
      },
      peg$c17 = function() {
          return 'return';
      },
      peg$c18 = "*",
      peg$c19 = peg$literalExpectation("*", false),
      peg$c20 = function(table, where, option) {
        var ignoreCase =false;
        var distinct = false;
        var groupBy = null;
        option.forEach(val=>{
        	var key = Object.keys(val)[0];
          switch(key){
              case 'ignoreCase':
              	ignoreCase = val[key]; break;
              case 'distinct':
              	distinct = val[key]; break;
               case 'groupBy':
              	groupBy = val[key]; break;
          }
        });
        return {
           api:'count',
           data:{
              from:table,
              where:where,
              ignoreCase: ignoreCase,
              distinct : distinct,
              groupBy:groupBy
           }
        }
      },
      peg$c21 = function(aggr, table, where, option) {
        var skip=null;
        var limit=null;
        var ignoreCase =false;
        var distinct = false;
        var order = null;
        var groupBy = null;
        var aggregate = aggr;
        option.forEach(val=>{
        	var key = Object.keys(val)[0];
          switch(key){
          	case 'skip':
               	skip= val[key]; break;
              case 'limit':
                  limit= val[key]; break;
              case 'ignoreCase':
              	ignoreCase = val[key]; break;
              case 'distinct':
              	distinct = val[key]; break;
              case 'order':
              	order = val[key]; break;
               case 'groupBy':
              	groupBy = val[key]; break;
          }
        });
        return {
           api:'select',
           data:{
              from:table,
              where:where,
              skip:skip,
              limit:limit,
              ignoreCase: ignoreCase,
              distinct : distinct,
              order:order,
              groupBy:groupBy,
              aggregate : aggr
           }
        }
      },
      peg$c22 = function(aggr) {
      	return aggr[0];
      },
      peg$c23 = "[",
      peg$c24 = peg$literalExpectation("[", false),
      peg$c25 = "]",
      peg$c26 = peg$literalExpectation("]", false),
      peg$c27 = function(first, rest) {
      	rest.splice(0,0,first);
          return rest;
      },
      peg$c28 = "(",
      peg$c29 = peg$literalExpectation("(", false),
      peg$c30 = ")",
      peg$c31 = peg$literalExpectation(")", false),
      peg$c32 = function(first, rest) {
      	rest.splice(0,0,first);
          return {
          	max : rest
          }
      },
      peg$c33 = function(first, rest) {
      	rest.splice(0,0,first);
          return {
          	min : rest
          }
      },
      peg$c34 = function(first, rest) {
      	rest.splice(0,0,first);
          return {
          	avg : rest
          }
      },
      peg$c35 = function(first, rest) {
      	rest.splice(0,0,first);
          return {
          	count : rest
          }
      },
      peg$c36 = function(first, rest) {
      	rest.splice(0,0,first);
          return {
          	sum : rest
          }
      },
      peg$c37 = function(first, rest) {
      	return {
          	groupBy:[first,...rest]
          } ;
      },
      peg$c38 = function(val) {
      	return val;
      },
      peg$c39 = function(by, type) {
      	return {
          	order: {
              	by:by,
                  type: type
              }
          };
      },
      peg$c40 = function(by) {
      	return by;
      },
      peg$c41 = function(type) {
      	return type;
      },
      peg$c42 = function() {
      	return {
          	distinct: true
          };
      },
      peg$c43 = function() {
      	return {
          	ignoreCase: true
          };
      },
      peg$c44 = function(val) {
      	return {
          	skip: val
          };
      },
      peg$c45 = function(val) {
      	return {
          	limit: val
          };
      },
      peg$c46 = function(where) {
      	return where;
      },
      peg$c47 = function(item1, item2) {
      	if(!Array.isArray(item1)){
          	item1=[item1];
          }
          if(item2!=null){
          	var pushInItem1=(item)=>{
               	item1.push(item);
              }
              if(Array.isArray(item1)){
              	item2.forEach(item=>{
                    if(Array.isArray(item)){
                      item.forEach(subItem=>{
                          pushInItem1(subItem);
                      });
                    }
                    else{
                        pushInItem1(item)
                    }
                });
              }
          }
          return item1;
      },
      peg$c48 = function(op, where) {
      	
          if(op==='|'){
          	var obj={};
              if(Array.isArray(where)){
                where.forEach(val=>{
                    obj={...obj,...val}
                });
              }
              else{
              	obj = where;
              }
              return {
              	or:obj
              }
          }
         
          return where;
      },
      peg$c49 = function(fw, jw) {
      	if(jw==null){
          	return fw
          }
          else{
           	jw.splice(0,0,fw);	
              return jw;
          }
      },
      peg$c50 = function(fw, jw) {
      	if(jw==null){
          	return fw;
          }
          else{
          	var query= fw;
              jw.forEach(qry=>{
              	var key = Object.keys(qry)[0];
              	if(key==='or'){
                  	if(query.or==null){
                      	query.or={};
                      }
                      var orKey = Object.keys(qry[key])[0];
                      query.or[orKey]= qry[key][orKey];
                  }
                  else{
                  	query[key]=qry[key];
                  }
              })
              return query;
          }
      },
      peg$c51 = function(op, item) {
      	if(op==='|'){
          	return {
              	or: item
              }
          }
          return item;
      },
      peg$c52 = function(col, val) { 
      	return {
          	[col]:val
      	}
      },
      peg$c53 = "!=",
      peg$c54 = peg$literalExpectation("!=", false),
      peg$c55 = ">=",
      peg$c56 = peg$literalExpectation(">=", false),
      peg$c57 = "<=",
      peg$c58 = peg$literalExpectation("<=", false),
      peg$c59 = ">",
      peg$c60 = peg$literalExpectation(">", false),
      peg$c61 = "<",
      peg$c62 = peg$literalExpectation("<", false),
      peg$c63 = function(col, op, val) { 
      	return {
          	[col]:{
              	[op]:val
              }
      	}
      },
      peg$c64 = function(col, low, high) {
      	return {
          	[col]:{
                  '-':{
                      low : low,
                      high : high
                  }
              }
      	}
      },
      peg$c65 = function(col, first, betweens) { 
      	return {
          	[col]:{
              	in:[first,...betweens]
              }
      	}
      },
      peg$c66 = function(col, val) { 
      	return {
          	[col]:{
              	like:val.join('')
              }
      	}
      },
      peg$c67 = "%",
      peg$c68 = peg$literalExpectation("%", false),
      peg$c69 = peg$otherExpectation("column value"),
      peg$c70 = function(val) {
        var value=val.join("");
        if(value[0]=== "'" && value[value.length-1] === "'"){
        	return value.substr(1,value.length-2);
        }
        var number = Number(value); 
        if(isNaN(number)) 
        	return value; 
        else 
        	return number;
      },
      peg$c71 = peg$otherExpectation("table name"),
      peg$c72 = peg$otherExpectation("column"),
      peg$c73 = peg$otherExpectation("order type"),
      peg$c74 = "asc",
      peg$c75 = peg$literalExpectation("asc", false),
      peg$c76 = "desc",
      peg$c77 = peg$literalExpectation("desc", false),
      peg$c78 = "&",
      peg$c79 = peg$literalExpectation("&", false),
      peg$c80 = "|",
      peg$c81 = peg$literalExpectation("|", false),
      peg$c82 = /^[a-zA-Z0-9@']/,
      peg$c83 = peg$classExpectation([["a", "z"], ["A", "Z"], ["0", "9"], "@", "'"], false, false),
      peg$c84 = function(l) {return l.join("");},
      peg$c85 = /^[a-zA-Z0-9]/,
      peg$c86 = peg$classExpectation([["a", "z"], ["A", "Z"], ["0", "9"]], false, false),
      peg$c87 = /^[a-zA-Z]/,
      peg$c88 = peg$classExpectation([["a", "z"], ["A", "Z"]], false, false),
      peg$c89 = function(d) {return Number(d.join(""))},
      peg$c90 = /^[0-9]/,
      peg$c91 = peg$classExpectation([["0", "9"]], false, false),
      peg$c92 = peg$otherExpectation("Whitespace"),
      peg$c93 = /^[ \t]/,
      peg$c94 = peg$classExpectation([" ", "\t"], false, false),
      peg$c95 = peg$otherExpectation("One or more whitespaces"),
      peg$c96 = function(space) {return null;},
      peg$c97 = /^[aA]/,
      peg$c98 = peg$classExpectation(["a", "A"], false, false),
      peg$c99 = /^[bB]/,
      peg$c100 = peg$classExpectation(["b", "B"], false, false),
      peg$c101 = /^[cC]/,
      peg$c102 = peg$classExpectation(["c", "C"], false, false),
      peg$c103 = /^[dD]/,
      peg$c104 = peg$classExpectation(["d", "D"], false, false),
      peg$c105 = /^[eE]/,
      peg$c106 = peg$classExpectation(["e", "E"], false, false),
      peg$c107 = /^[fF]/,
      peg$c108 = peg$classExpectation(["f", "F"], false, false),
      peg$c109 = /^[gG]/,
      peg$c110 = peg$classExpectation(["g", "G"], false, false),
      peg$c111 = /^[hH]/,
      peg$c112 = peg$classExpectation(["h", "H"], false, false),
      peg$c113 = /^[iI]/,
      peg$c114 = peg$classExpectation(["i", "I"], false, false),
      peg$c115 = /^[jJ]/,
      peg$c116 = peg$classExpectation(["j", "J"], false, false),
      peg$c117 = /^[kK]/,
      peg$c118 = peg$classExpectation(["k", "K"], false, false),
      peg$c119 = /^[lL]/,
      peg$c120 = peg$classExpectation(["l", "L"], false, false),
      peg$c121 = /^[mM]/,
      peg$c122 = peg$classExpectation(["m", "M"], false, false),
      peg$c123 = /^[nN]/,
      peg$c124 = peg$classExpectation(["n", "N"], false, false),
      peg$c125 = /^[oO]/,
      peg$c126 = peg$classExpectation(["o", "O"], false, false),
      peg$c127 = /^[pP]/,
      peg$c128 = peg$classExpectation(["p", "P"], false, false),
      peg$c129 = /^[qQ]/,
      peg$c130 = peg$classExpectation(["q", "Q"], false, false),
      peg$c131 = /^[rR]/,
      peg$c132 = peg$classExpectation(["r", "R"], false, false),
      peg$c133 = /^[sS]/,
      peg$c134 = peg$classExpectation(["s", "S"], false, false),
      peg$c135 = /^[tT]/,
      peg$c136 = peg$classExpectation(["t", "T"], false, false),
      peg$c137 = /^[uU]/,
      peg$c138 = peg$classExpectation(["u", "U"], false, false),
      peg$c139 = /^[vV]/,
      peg$c140 = peg$classExpectation(["v", "V"], false, false),
      peg$c141 = /^[wW]/,
      peg$c142 = peg$classExpectation(["w", "W"], false, false),
      peg$c143 = /^[xX]/,
      peg$c144 = peg$classExpectation(["x", "X"], false, false),
      peg$c145 = /^[yY]/,
      peg$c146 = peg$classExpectation(["y", "Y"], false, false),
      peg$c147 = /^[zZ]/,
      peg$c148 = peg$classExpectation(["z", "Z"], false, false),
      peg$c149 = peg$otherExpectation("min"),
      peg$c150 = peg$otherExpectation("max"),
      peg$c151 = peg$otherExpectation("avg"),
      peg$c152 = peg$otherExpectation("count"),
      peg$c153 = peg$otherExpectation("sum"),
      peg$c154 = peg$otherExpectation("aggregate"),
      peg$c155 = peg$otherExpectation("between"),
      peg$c156 = peg$otherExpectation("in"),
      peg$c157 = peg$otherExpectation("like"),
      peg$c158 = peg$otherExpectation("select"),
      peg$c159 = peg$otherExpectation("ignoreCase"),
      peg$c160 = peg$otherExpectation("distinct"),
      peg$c161 = peg$otherExpectation("order"),
      peg$c162 = peg$otherExpectation("by"),
      peg$c163 = peg$otherExpectation("from"),
      peg$c164 = peg$otherExpectation("group"),
      peg$c165 = peg$otherExpectation("limit"),
      peg$c166 = peg$otherExpectation("skip"),
      peg$c167 = peg$otherExpectation("where"),
      peg$c168 = peg$otherExpectation("insert"),
      peg$c169 = peg$otherExpectation("into"),
      peg$c170 = peg$otherExpectation("return"),
      peg$c171 = peg$otherExpectation("values"),
      peg$c172 = peg$otherExpectation("skipdatacheck"),

      peg$currPos          = 0,
      peg$savedPos         = 0,
      peg$posDetailsCache  = [{ line: 1, column: 1 }],
      peg$maxFailPos       = 0,
      peg$maxFailExpected  = [],
      peg$silentFails      = 0,

      peg$result;

  if ("startRule" in options) {
    if (!(options.startRule in peg$startRuleFunctions)) {
      throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
    }

    peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
  }

  function text() {
    return input.substring(peg$savedPos, peg$currPos);
  }

  function location() {
    return peg$computeLocation(peg$savedPos, peg$currPos);
  }

  function expected(description, location) {
    location = location !== void 0 ? location : peg$computeLocation(peg$savedPos, peg$currPos)

    throw peg$buildStructuredError(
      [peg$otherExpectation(description)],
      input.substring(peg$savedPos, peg$currPos),
      location
    );
  }

  function error(message, location) {
    location = location !== void 0 ? location : peg$computeLocation(peg$savedPos, peg$currPos)

    throw peg$buildSimpleError(message, location);
  }

  function peg$literalExpectation(text, ignoreCase) {
    return { type: "literal", text: text, ignoreCase: ignoreCase };
  }

  function peg$classExpectation(parts, inverted, ignoreCase) {
    return { type: "class", parts: parts, inverted: inverted, ignoreCase: ignoreCase };
  }

  function peg$anyExpectation() {
    return { type: "any" };
  }

  function peg$endExpectation() {
    return { type: "end" };
  }

  function peg$otherExpectation(description) {
    return { type: "other", description: description };
  }

  function peg$computePosDetails(pos) {
    var details = peg$posDetailsCache[pos], p;

    if (details) {
      return details;
    } else {
      p = pos - 1;
      while (!peg$posDetailsCache[p]) {
        p--;
      }

      details = peg$posDetailsCache[p];
      details = {
        line:   details.line,
        column: details.column
      };

      while (p < pos) {
        if (input.charCodeAt(p) === 10) {
          details.line++;
          details.column = 1;
        } else {
          details.column++;
        }

        p++;
      }

      peg$posDetailsCache[pos] = details;
      return details;
    }
  }

  function peg$computeLocation(startPos, endPos) {
    var startPosDetails = peg$computePosDetails(startPos),
        endPosDetails   = peg$computePosDetails(endPos);

    return {
      start: {
        offset: startPos,
        line:   startPosDetails.line,
        column: startPosDetails.column
      },
      end: {
        offset: endPos,
        line:   endPosDetails.line,
        column: endPosDetails.column
      }
    };
  }

  function peg$fail(expected) {
    if (peg$currPos < peg$maxFailPos) { return; }

    if (peg$currPos > peg$maxFailPos) {
      peg$maxFailPos = peg$currPos;
      peg$maxFailExpected = [];
    }

    peg$maxFailExpected.push(expected);
  }

  function peg$buildSimpleError(message, location) {
    return new peg$SyntaxError(message, null, null, location);
  }

  function peg$buildStructuredError(expected, found, location) {
    return new peg$SyntaxError(
      peg$SyntaxError.buildMessage(expected, found),
      expected,
      found,
      location
    );
  }

  function peg$parsequery() {
    var s0;

    s0 = peg$parseselectQuery();
    if (s0 === peg$FAILED) {
      s0 = peg$parsecountQuery();
      if (s0 === peg$FAILED) {
        s0 = peg$parseinsertQuery();
      }
    }

    return s0;
  }

  function peg$parseinsertQuery() {
    var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12;

    s0 = peg$currPos;
    s1 = peg$parseINSERT();
    if (s1 !== peg$FAILED) {
      s2 = peg$parse_();
      if (s2 !== peg$FAILED) {
        s3 = peg$parseINTO();
        if (s3 !== peg$FAILED) {
          s4 = peg$parse_();
          if (s4 !== peg$FAILED) {
            s5 = peg$parsetableName();
            if (s5 !== peg$FAILED) {
              s6 = [];
              s7 = peg$parse_();
              while (s7 !== peg$FAILED) {
                s6.push(s7);
                s7 = peg$parse_();
              }
              if (s6 !== peg$FAILED) {
                s7 = peg$parseVALUES();
                if (s7 !== peg$FAILED) {
                  s8 = [];
                  s9 = peg$parse_();
                  while (s9 !== peg$FAILED) {
                    s8.push(s9);
                    s9 = peg$parse_();
                  }
                  if (s8 !== peg$FAILED) {
                    s9 = peg$parsevalueTypes();
                    if (s9 !== peg$FAILED) {
                      s10 = [];
                      s11 = peg$parse_();
                      while (s11 !== peg$FAILED) {
                        s10.push(s11);
                        s11 = peg$parse_();
                      }
                      if (s10 !== peg$FAILED) {
                        s11 = [];
                        s12 = peg$parseinsertOptions();
                        while (s12 !== peg$FAILED) {
                          s11.push(s12);
                          s12 = peg$parseinsertOptions();
                        }
                        if (s11 !== peg$FAILED) {
                          peg$savedPos = s0;
                          s1 = peg$c0(s5, s9, s11);
                          s0 = s1;
                        } else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsevalueTypes() {
    var s0;

    s0 = peg$parseinsertWithEqual();
    if (s0 === peg$FAILED) {
      s0 = peg$parseinsertWithParanthesis();
    }

    return s0;
  }

  function peg$parseinsertWithParanthesis() {
    var s0, s1, s2, s3, s4, s5, s6, s7;

    s0 = peg$currPos;
    if (input.substr(peg$currPos, 2) === peg$c1) {
      s1 = peg$c1;
      peg$currPos += 2;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c2); }
    }
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$parse_();
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$parse_();
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$parsekeyValueSepByColumn();
        if (s3 !== peg$FAILED) {
          s4 = [];
          s5 = peg$parse_();
          while (s5 !== peg$FAILED) {
            s4.push(s5);
            s5 = peg$parse_();
          }
          if (s4 !== peg$FAILED) {
            s5 = [];
            s6 = peg$parseinsertWithParanthesisBetweenVal();
            while (s6 !== peg$FAILED) {
              s5.push(s6);
              s6 = peg$parseinsertWithParanthesisBetweenVal();
            }
            if (s5 !== peg$FAILED) {
              s6 = [];
              s7 = peg$parse_();
              while (s7 !== peg$FAILED) {
                s6.push(s7);
                s7 = peg$parse_();
              }
              if (s6 !== peg$FAILED) {
                if (input.substr(peg$currPos, 2) === peg$c3) {
                  s7 = peg$c3;
                  peg$currPos += 2;
                } else {
                  s7 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c4); }
                }
                if (s7 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c5(s3, s5);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseinsertWithParanthesisBetweenVal() {
    var s0, s1, s2, s3;

    s0 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 44) {
      s1 = peg$c6;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c7); }
    }
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$parse_();
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$parse_();
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$parsekeyValueSepByColumn();
        if (s3 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c8(s3);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsekeyValueSepByColumn() {
    var s0, s1, s2, s3, s4, s5;

    s0 = peg$currPos;
    s1 = peg$parsecolumn();
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$parse_();
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$parse_();
      }
      if (s2 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 58) {
          s3 = peg$c9;
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c10); }
        }
        if (s3 !== peg$FAILED) {
          s4 = [];
          s5 = peg$parse_();
          while (s5 !== peg$FAILED) {
            s4.push(s5);
            s5 = peg$parse_();
          }
          if (s4 !== peg$FAILED) {
            s5 = peg$parsevalue();
            if (s5 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c11(s1, s5);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseinsertWithEqual() {
    var s0, s1, s2;

    s0 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 61) {
      s1 = peg$c12;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c13); }
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$parsevalue();
      if (s2 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c14(s2);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseinsertOptions() {
    var s0, s1, s2, s3;

    s0 = peg$currPos;
    s1 = peg$parseskipDataCheck();
    if (s1 === peg$FAILED) {
      s1 = peg$parsereturn();
    }
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$parse_();
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$parse_();
      }
      if (s2 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c15(s1);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseskipDataCheck() {
    var s0, s1;

    s0 = peg$currPos;
    s1 = peg$parseSKIPDATACHECK();
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c16();
    }
    s0 = s1;

    return s0;
  }

  function peg$parsereturn() {
    var s0, s1;

    s0 = peg$currPos;
    s1 = peg$parseRETURN();
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c17();
    }
    s0 = s1;

    return s0;
  }

  function peg$parsecountQuery() {
    var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11;

    s0 = peg$currPos;
    s1 = peg$parseCOUNT();
    if (s1 !== peg$FAILED) {
      s2 = peg$parse_();
      if (s2 !== peg$FAILED) {
        s3 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 42) {
          s4 = peg$c18;
          peg$currPos++;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c19); }
        }
        if (s4 !== peg$FAILED) {
          s5 = peg$parse_();
          if (s5 !== peg$FAILED) {
            s4 = [s4, s5];
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
        if (s3 === peg$FAILED) {
          s3 = null;
        }
        if (s3 !== peg$FAILED) {
          s4 = peg$parseFROM();
          if (s4 !== peg$FAILED) {
            s5 = peg$parse_();
            if (s5 !== peg$FAILED) {
              s6 = peg$parsetableName();
              if (s6 !== peg$FAILED) {
                s7 = [];
                s8 = peg$parse_();
                while (s8 !== peg$FAILED) {
                  s7.push(s8);
                  s8 = peg$parse_();
                }
                if (s7 !== peg$FAILED) {
                  s8 = peg$parsewhereQry();
                  if (s8 === peg$FAILED) {
                    s8 = null;
                  }
                  if (s8 !== peg$FAILED) {
                    s9 = [];
                    s10 = peg$parse_();
                    while (s10 !== peg$FAILED) {
                      s9.push(s10);
                      s10 = peg$parse_();
                    }
                    if (s9 !== peg$FAILED) {
                      s10 = [];
                      s11 = peg$parsedistinct();
                      if (s11 === peg$FAILED) {
                        s11 = peg$parseignoreCase();
                        if (s11 === peg$FAILED) {
                          s11 = peg$parsegroupBy();
                        }
                      }
                      while (s11 !== peg$FAILED) {
                        s10.push(s11);
                        s11 = peg$parsedistinct();
                        if (s11 === peg$FAILED) {
                          s11 = peg$parseignoreCase();
                          if (s11 === peg$FAILED) {
                            s11 = peg$parsegroupBy();
                          }
                        }
                      }
                      if (s10 !== peg$FAILED) {
                        peg$savedPos = s0;
                        s1 = peg$c20(s6, s8, s10);
                        s0 = s1;
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseselectQuery() {
    var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11;

    s0 = peg$currPos;
    s1 = peg$parseSELECT();
    if (s1 !== peg$FAILED) {
      s2 = peg$parse_();
      if (s2 !== peg$FAILED) {
        s3 = peg$parseaggregateQry();
        if (s3 === peg$FAILED) {
          s3 = null;
        }
        if (s3 !== peg$FAILED) {
          s4 = peg$parseFROM();
          if (s4 !== peg$FAILED) {
            s5 = peg$parse_();
            if (s5 !== peg$FAILED) {
              s6 = peg$parsetableName();
              if (s6 !== peg$FAILED) {
                s7 = [];
                s8 = peg$parse_();
                while (s8 !== peg$FAILED) {
                  s7.push(s8);
                  s8 = peg$parse_();
                }
                if (s7 !== peg$FAILED) {
                  s8 = peg$parsewhereQry();
                  if (s8 === peg$FAILED) {
                    s8 = null;
                  }
                  if (s8 !== peg$FAILED) {
                    s9 = [];
                    s10 = peg$parse_();
                    while (s10 !== peg$FAILED) {
                      s9.push(s10);
                      s10 = peg$parse_();
                    }
                    if (s9 !== peg$FAILED) {
                      s10 = [];
                      s11 = peg$parseskip();
                      if (s11 === peg$FAILED) {
                        s11 = peg$parselimit();
                        if (s11 === peg$FAILED) {
                          s11 = peg$parsedistinct();
                          if (s11 === peg$FAILED) {
                            s11 = peg$parseignoreCase();
                            if (s11 === peg$FAILED) {
                              s11 = peg$parseorderBy();
                              if (s11 === peg$FAILED) {
                                s11 = peg$parsegroupBy();
                              }
                            }
                          }
                        }
                      }
                      while (s11 !== peg$FAILED) {
                        s10.push(s11);
                        s11 = peg$parseskip();
                        if (s11 === peg$FAILED) {
                          s11 = peg$parselimit();
                          if (s11 === peg$FAILED) {
                            s11 = peg$parsedistinct();
                            if (s11 === peg$FAILED) {
                              s11 = peg$parseignoreCase();
                              if (s11 === peg$FAILED) {
                                s11 = peg$parseorderBy();
                                if (s11 === peg$FAILED) {
                                  s11 = peg$parsegroupBy();
                                }
                              }
                            }
                          }
                        }
                      }
                      if (s10 !== peg$FAILED) {
                        peg$savedPos = s0;
                        s1 = peg$c21(s3, s6, s8, s10);
                        s0 = s1;
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseaggregateQry() {
    var s0, s1, s2;

    s0 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 42) {
      s1 = peg$c18;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c19); }
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$parse_();
      if (s2 !== peg$FAILED) {
        s1 = [s1, s2];
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    if (s0 === peg$FAILED) {
      s0 = peg$currPos;
      s1 = peg$parseaggregate();
      if (s1 !== peg$FAILED) {
        s2 = peg$parse_();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c22(s1);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    }

    return s0;
  }

  function peg$parseaggregate() {
    var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9;

    s0 = peg$currPos;
    s1 = peg$parseAGGREGATE();
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$parse_();
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$parse_();
      }
      if (s2 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 91) {
          s3 = peg$c23;
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c24); }
        }
        if (s3 !== peg$FAILED) {
          s4 = [];
          s5 = peg$parse_();
          while (s5 !== peg$FAILED) {
            s4.push(s5);
            s5 = peg$parse_();
          }
          if (s4 !== peg$FAILED) {
            s5 = peg$parseaggregateType();
            if (s5 !== peg$FAILED) {
              s6 = [];
              s7 = peg$parse_();
              while (s7 !== peg$FAILED) {
                s6.push(s7);
                s7 = peg$parse_();
              }
              if (s6 !== peg$FAILED) {
                s7 = [];
                s8 = peg$parseinBetweenAggregateColumn();
                while (s8 !== peg$FAILED) {
                  s7.push(s8);
                  s8 = peg$parseinBetweenAggregateColumn();
                }
                if (s7 !== peg$FAILED) {
                  s8 = [];
                  s9 = peg$parse_();
                  while (s9 !== peg$FAILED) {
                    s8.push(s9);
                    s9 = peg$parse_();
                  }
                  if (s8 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 93) {
                      s9 = peg$c25;
                      peg$currPos++;
                    } else {
                      s9 = peg$FAILED;
                      if (peg$silentFails === 0) { peg$fail(peg$c26); }
                    }
                    if (s9 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c27(s5, s7);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseaggregateType() {
    var s0;

    s0 = peg$parseminAggregate();
    if (s0 === peg$FAILED) {
      s0 = peg$parsemaxAggregate();
      if (s0 === peg$FAILED) {
        s0 = peg$parseavgAggregate();
        if (s0 === peg$FAILED) {
          s0 = peg$parsecountAggregate();
          if (s0 === peg$FAILED) {
            s0 = peg$parsesumAggregate();
          }
        }
      }
    }

    return s0;
  }

  function peg$parsemaxAggregate() {
    var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9;

    s0 = peg$currPos;
    s1 = peg$parseMAX();
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$parse_();
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$parse_();
      }
      if (s2 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 40) {
          s3 = peg$c28;
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c29); }
        }
        if (s3 !== peg$FAILED) {
          s4 = [];
          s5 = peg$parse_();
          while (s5 !== peg$FAILED) {
            s4.push(s5);
            s5 = peg$parse_();
          }
          if (s4 !== peg$FAILED) {
            s5 = peg$parsecolumn();
            if (s5 !== peg$FAILED) {
              s6 = [];
              s7 = peg$parse_();
              while (s7 !== peg$FAILED) {
                s6.push(s7);
                s7 = peg$parse_();
              }
              if (s6 !== peg$FAILED) {
                s7 = [];
                s8 = peg$parseinBetweenParanthesisColumn();
                while (s8 !== peg$FAILED) {
                  s7.push(s8);
                  s8 = peg$parseinBetweenParanthesisColumn();
                }
                if (s7 !== peg$FAILED) {
                  s8 = [];
                  s9 = peg$parse_();
                  while (s9 !== peg$FAILED) {
                    s8.push(s9);
                    s9 = peg$parse_();
                  }
                  if (s8 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s9 = peg$c30;
                      peg$currPos++;
                    } else {
                      s9 = peg$FAILED;
                      if (peg$silentFails === 0) { peg$fail(peg$c31); }
                    }
                    if (s9 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c32(s5, s7);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseminAggregate() {
    var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9;

    s0 = peg$currPos;
    s1 = peg$parseMIN();
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$parse_();
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$parse_();
      }
      if (s2 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 40) {
          s3 = peg$c28;
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c29); }
        }
        if (s3 !== peg$FAILED) {
          s4 = [];
          s5 = peg$parse_();
          while (s5 !== peg$FAILED) {
            s4.push(s5);
            s5 = peg$parse_();
          }
          if (s4 !== peg$FAILED) {
            s5 = peg$parsecolumn();
            if (s5 !== peg$FAILED) {
              s6 = [];
              s7 = peg$parse_();
              while (s7 !== peg$FAILED) {
                s6.push(s7);
                s7 = peg$parse_();
              }
              if (s6 !== peg$FAILED) {
                s7 = [];
                s8 = peg$parseinBetweenParanthesisColumn();
                while (s8 !== peg$FAILED) {
                  s7.push(s8);
                  s8 = peg$parseinBetweenParanthesisColumn();
                }
                if (s7 !== peg$FAILED) {
                  s8 = [];
                  s9 = peg$parse_();
                  while (s9 !== peg$FAILED) {
                    s8.push(s9);
                    s9 = peg$parse_();
                  }
                  if (s8 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s9 = peg$c30;
                      peg$currPos++;
                    } else {
                      s9 = peg$FAILED;
                      if (peg$silentFails === 0) { peg$fail(peg$c31); }
                    }
                    if (s9 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c33(s5, s7);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseavgAggregate() {
    var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9;

    s0 = peg$currPos;
    s1 = peg$parseAVG();
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$parse_();
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$parse_();
      }
      if (s2 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 40) {
          s3 = peg$c28;
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c29); }
        }
        if (s3 !== peg$FAILED) {
          s4 = [];
          s5 = peg$parse_();
          while (s5 !== peg$FAILED) {
            s4.push(s5);
            s5 = peg$parse_();
          }
          if (s4 !== peg$FAILED) {
            s5 = peg$parsecolumn();
            if (s5 !== peg$FAILED) {
              s6 = [];
              s7 = peg$parse_();
              while (s7 !== peg$FAILED) {
                s6.push(s7);
                s7 = peg$parse_();
              }
              if (s6 !== peg$FAILED) {
                s7 = [];
                s8 = peg$parseinBetweenParanthesisColumn();
                while (s8 !== peg$FAILED) {
                  s7.push(s8);
                  s8 = peg$parseinBetweenParanthesisColumn();
                }
                if (s7 !== peg$FAILED) {
                  s8 = [];
                  s9 = peg$parse_();
                  while (s9 !== peg$FAILED) {
                    s8.push(s9);
                    s9 = peg$parse_();
                  }
                  if (s8 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s9 = peg$c30;
                      peg$currPos++;
                    } else {
                      s9 = peg$FAILED;
                      if (peg$silentFails === 0) { peg$fail(peg$c31); }
                    }
                    if (s9 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c34(s5, s7);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsecountAggregate() {
    var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9;

    s0 = peg$currPos;
    s1 = peg$parseCOUNT();
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$parse_();
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$parse_();
      }
      if (s2 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 40) {
          s3 = peg$c28;
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c29); }
        }
        if (s3 !== peg$FAILED) {
          s4 = [];
          s5 = peg$parse_();
          while (s5 !== peg$FAILED) {
            s4.push(s5);
            s5 = peg$parse_();
          }
          if (s4 !== peg$FAILED) {
            s5 = peg$parsecolumn();
            if (s5 !== peg$FAILED) {
              s6 = [];
              s7 = peg$parse_();
              while (s7 !== peg$FAILED) {
                s6.push(s7);
                s7 = peg$parse_();
              }
              if (s6 !== peg$FAILED) {
                s7 = [];
                s8 = peg$parseinBetweenParanthesisColumn();
                while (s8 !== peg$FAILED) {
                  s7.push(s8);
                  s8 = peg$parseinBetweenParanthesisColumn();
                }
                if (s7 !== peg$FAILED) {
                  s8 = [];
                  s9 = peg$parse_();
                  while (s9 !== peg$FAILED) {
                    s8.push(s9);
                    s9 = peg$parse_();
                  }
                  if (s8 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s9 = peg$c30;
                      peg$currPos++;
                    } else {
                      s9 = peg$FAILED;
                      if (peg$silentFails === 0) { peg$fail(peg$c31); }
                    }
                    if (s9 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c35(s5, s7);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsesumAggregate() {
    var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9;

    s0 = peg$currPos;
    s1 = peg$parseSUM();
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$parse_();
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$parse_();
      }
      if (s2 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 40) {
          s3 = peg$c28;
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c29); }
        }
        if (s3 !== peg$FAILED) {
          s4 = [];
          s5 = peg$parse_();
          while (s5 !== peg$FAILED) {
            s4.push(s5);
            s5 = peg$parse_();
          }
          if (s4 !== peg$FAILED) {
            s5 = peg$parsecolumn();
            if (s5 !== peg$FAILED) {
              s6 = [];
              s7 = peg$parse_();
              while (s7 !== peg$FAILED) {
                s6.push(s7);
                s7 = peg$parse_();
              }
              if (s6 !== peg$FAILED) {
                s7 = [];
                s8 = peg$parseinBetweenParanthesisColumn();
                while (s8 !== peg$FAILED) {
                  s7.push(s8);
                  s8 = peg$parseinBetweenParanthesisColumn();
                }
                if (s7 !== peg$FAILED) {
                  s8 = [];
                  s9 = peg$parse_();
                  while (s9 !== peg$FAILED) {
                    s8.push(s9);
                    s9 = peg$parse_();
                  }
                  if (s8 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s9 = peg$c30;
                      peg$currPos++;
                    } else {
                      s9 = peg$FAILED;
                      if (peg$silentFails === 0) { peg$fail(peg$c31); }
                    }
                    if (s9 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c36(s5, s7);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsegroupBy() {
    var s0, s1, s2, s3, s4, s5, s6, s7, s8;

    s0 = peg$currPos;
    s1 = peg$parseGROUP();
    if (s1 !== peg$FAILED) {
      s2 = peg$parse_();
      if (s2 !== peg$FAILED) {
        s3 = peg$parseBY();
        if (s3 !== peg$FAILED) {
          s4 = peg$parse_();
          if (s4 !== peg$FAILED) {
            s5 = peg$parsecolumn();
            if (s5 !== peg$FAILED) {
              s6 = [];
              s7 = peg$parsegroupByRestValue();
              while (s7 !== peg$FAILED) {
                s6.push(s7);
                s7 = peg$parsegroupByRestValue();
              }
              if (s6 !== peg$FAILED) {
                s7 = [];
                s8 = peg$parse_();
                while (s8 !== peg$FAILED) {
                  s7.push(s8);
                  s8 = peg$parse_();
                }
                if (s7 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c37(s5, s6);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsegroupByRestValue() {
    var s0, s1, s2, s3, s4, s5, s6;

    s0 = peg$currPos;
    s1 = [];
    s2 = peg$parse_();
    while (s2 !== peg$FAILED) {
      s1.push(s2);
      s2 = peg$parse_();
    }
    if (s1 !== peg$FAILED) {
      if (input.charCodeAt(peg$currPos) === 44) {
        s2 = peg$c6;
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c7); }
      }
      if (s2 !== peg$FAILED) {
        s3 = [];
        s4 = peg$parse_();
        while (s4 !== peg$FAILED) {
          s3.push(s4);
          s4 = peg$parse_();
        }
        if (s3 !== peg$FAILED) {
          s4 = peg$parsecolumn();
          if (s4 !== peg$FAILED) {
            s5 = [];
            s6 = peg$parse_();
            while (s6 !== peg$FAILED) {
              s5.push(s6);
              s6 = peg$parse_();
            }
            if (s5 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c38(s4);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseorderBy() {
    var s0, s1, s2;

    s0 = peg$currPos;
    s1 = peg$parseorderByValue();
    if (s1 !== peg$FAILED) {
      s2 = peg$parseorderByType();
      if (s2 === peg$FAILED) {
        s2 = null;
      }
      if (s2 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c39(s1, s2);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseorderByValue() {
    var s0, s1, s2, s3, s4, s5;

    s0 = peg$currPos;
    s1 = peg$parseORDER();
    if (s1 !== peg$FAILED) {
      s2 = peg$parse_();
      if (s2 !== peg$FAILED) {
        s3 = peg$parseBY();
        if (s3 !== peg$FAILED) {
          s4 = peg$parse_();
          if (s4 !== peg$FAILED) {
            s5 = peg$parsecolumn();
            if (s5 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c40(s5);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseorderByType() {
    var s0, s1, s2, s3, s4;

    s0 = peg$currPos;
    s1 = peg$parse_();
    if (s1 !== peg$FAILED) {
      s2 = peg$parseOrderByTypes();
      if (s2 !== peg$FAILED) {
        s3 = [];
        s4 = peg$parse_();
        while (s4 !== peg$FAILED) {
          s3.push(s4);
          s4 = peg$parse_();
        }
        if (s3 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c41(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsedistinct() {
    var s0, s1, s2;

    s0 = peg$currPos;
    s1 = peg$parseDISTINCT();
    if (s1 !== peg$FAILED) {
      s2 = peg$parse_();
      if (s2 === peg$FAILED) {
        s2 = null;
      }
      if (s2 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c42();
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseignoreCase() {
    var s0, s1, s2;

    s0 = peg$currPos;
    s1 = peg$parseIGNORECASE();
    if (s1 !== peg$FAILED) {
      s2 = peg$parse_();
      if (s2 === peg$FAILED) {
        s2 = null;
      }
      if (s2 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c43();
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseskip() {
    var s0, s1, s2, s3, s4;

    s0 = peg$currPos;
    s1 = peg$parseSKIP();
    if (s1 !== peg$FAILED) {
      s2 = peg$parse_();
      if (s2 !== peg$FAILED) {
        s3 = peg$parseNumber();
        if (s3 !== peg$FAILED) {
          s4 = peg$parse_();
          if (s4 === peg$FAILED) {
            s4 = null;
          }
          if (s4 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c44(s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parselimit() {
    var s0, s1, s2, s3, s4;

    s0 = peg$currPos;
    s1 = peg$parseLIMIT();
    if (s1 !== peg$FAILED) {
      s2 = peg$parse_();
      if (s2 !== peg$FAILED) {
        s3 = peg$parseNumber();
        if (s3 !== peg$FAILED) {
          s4 = peg$parse_();
          if (s4 === peg$FAILED) {
            s4 = null;
          }
          if (s4 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c45(s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsewhereQry() {
    var s0, s1, s2, s3;

    s0 = peg$currPos;
    s1 = peg$parseWHERE();
    if (s1 !== peg$FAILED) {
      s2 = peg$parse_();
      if (s2 !== peg$FAILED) {
        s3 = peg$parsewhereitems();
        if (s3 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c46(s3);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsewhereitems() {
    var s0, s1, s2, s3;

    s0 = peg$currPos;
    s1 = peg$parsewhereQryWithoutParanthesis();
    if (s1 === peg$FAILED) {
      s1 = peg$parsewhereQryWithParanthesis();
    }
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$parsejoinWhereItems();
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$parsejoinWhereItems();
      }
      if (s2 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c47(s1, s2);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsejoinWhereItems() {
    var s0, s1, s2, s3, s4;

    s0 = peg$currPos;
    s1 = peg$parse_();
    if (s1 !== peg$FAILED) {
      s2 = peg$parseJoinOp();
      if (s2 !== peg$FAILED) {
        s3 = [];
        s4 = peg$parse_();
        while (s4 !== peg$FAILED) {
          s3.push(s4);
          s4 = peg$parse_();
        }
        if (s3 !== peg$FAILED) {
          s4 = peg$parsewhereQryWithoutParanthesis();
          if (s4 === peg$FAILED) {
            s4 = peg$parsewhereQryWithParanthesis();
          }
          if (s4 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c48(s2, s4);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsewhereQryWithoutParanthesis() {
    var s0, s1, s2, s3;

    s0 = peg$currPos;
    s1 = peg$parsewhereItem();
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$parsejoinWhereItem();
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$parsejoinWhereItem();
      }
      if (s2 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c49(s1, s2);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsewhereQryWithParanthesis() {
    var s0, s1, s2, s3, s4, s5, s6;

    s0 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 40) {
      s1 = peg$c28;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c29); }
    }
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$parse_();
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$parse_();
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$parsewhereItem();
        if (s3 !== peg$FAILED) {
          s4 = [];
          s5 = peg$parsejoinWhereItem();
          while (s5 !== peg$FAILED) {
            s4.push(s5);
            s5 = peg$parsejoinWhereItem();
          }
          if (s4 !== peg$FAILED) {
            s5 = [];
            s6 = peg$parse_();
            while (s6 !== peg$FAILED) {
              s5.push(s6);
              s6 = peg$parse_();
            }
            if (s5 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 41) {
                s6 = peg$c30;
                peg$currPos++;
              } else {
                s6 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c31); }
              }
              if (s6 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c50(s3, s4);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsejoinWhereItem() {
    var s0, s1, s2, s3, s4;

    s0 = peg$currPos;
    s1 = peg$parse_();
    if (s1 !== peg$FAILED) {
      s2 = peg$parseJoinOp();
      if (s2 !== peg$FAILED) {
        s3 = peg$parse_();
        if (s3 !== peg$FAILED) {
          s4 = peg$parsewhereItem();
          if (s4 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c51(s2, s4);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsewhereItem() {
    var s0;

    s0 = peg$parseequalToItem();
    if (s0 === peg$FAILED) {
      s0 = peg$parselikeItem();
      if (s0 === peg$FAILED) {
        s0 = peg$parseinItem();
        if (s0 === peg$FAILED) {
          s0 = peg$parseoperatorItem();
          if (s0 === peg$FAILED) {
            s0 = peg$parsebetweenItem();
          }
        }
      }
    }

    return s0;
  }

  function peg$parseequalToItem() {
    var s0, s1, s2, s3, s4, s5;

    s0 = peg$currPos;
    s1 = peg$parsecolumn();
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$parse_();
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$parse_();
      }
      if (s2 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 61) {
          s3 = peg$c12;
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c13); }
        }
        if (s3 !== peg$FAILED) {
          s4 = [];
          s5 = peg$parse_();
          while (s5 !== peg$FAILED) {
            s4.push(s5);
            s5 = peg$parse_();
          }
          if (s4 !== peg$FAILED) {
            s5 = peg$parsevalue();
            if (s5 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c52(s1, s5);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseoperatorItem() {
    var s0, s1, s2, s3, s4, s5;

    s0 = peg$currPos;
    s1 = peg$parsecolumn();
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$parse_();
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$parse_();
      }
      if (s2 !== peg$FAILED) {
        if (input.substr(peg$currPos, 2) === peg$c53) {
          s3 = peg$c53;
          peg$currPos += 2;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c54); }
        }
        if (s3 === peg$FAILED) {
          if (input.substr(peg$currPos, 2) === peg$c55) {
            s3 = peg$c55;
            peg$currPos += 2;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c56); }
          }
          if (s3 === peg$FAILED) {
            if (input.substr(peg$currPos, 2) === peg$c57) {
              s3 = peg$c57;
              peg$currPos += 2;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c58); }
            }
            if (s3 === peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 62) {
                s3 = peg$c59;
                peg$currPos++;
              } else {
                s3 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c60); }
              }
              if (s3 === peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 60) {
                  s3 = peg$c61;
                  peg$currPos++;
                } else {
                  s3 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c62); }
                }
              }
            }
          }
        }
        if (s3 !== peg$FAILED) {
          s4 = [];
          s5 = peg$parse_();
          while (s5 !== peg$FAILED) {
            s4.push(s5);
            s5 = peg$parse_();
          }
          if (s4 !== peg$FAILED) {
            s5 = peg$parsevalue();
            if (s5 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c63(s1, s3, s5);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsebetweenItem() {
    var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13;

    s0 = peg$currPos;
    s1 = peg$parsecolumn();
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$parse_();
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$parse_();
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$parseBETWEEN();
        if (s3 !== peg$FAILED) {
          s4 = [];
          s5 = peg$parse_();
          while (s5 !== peg$FAILED) {
            s4.push(s5);
            s5 = peg$parse_();
          }
          if (s4 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 40) {
              s5 = peg$c28;
              peg$currPos++;
            } else {
              s5 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c29); }
            }
            if (s5 !== peg$FAILED) {
              s6 = [];
              s7 = peg$parse_();
              while (s7 !== peg$FAILED) {
                s6.push(s7);
                s7 = peg$parse_();
              }
              if (s6 !== peg$FAILED) {
                s7 = peg$parsevalue();
                if (s7 !== peg$FAILED) {
                  s8 = [];
                  s9 = peg$parse_();
                  while (s9 !== peg$FAILED) {
                    s8.push(s9);
                    s9 = peg$parse_();
                  }
                  if (s8 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 44) {
                      s9 = peg$c6;
                      peg$currPos++;
                    } else {
                      s9 = peg$FAILED;
                      if (peg$silentFails === 0) { peg$fail(peg$c7); }
                    }
                    if (s9 !== peg$FAILED) {
                      s10 = [];
                      s11 = peg$parse_();
                      while (s11 !== peg$FAILED) {
                        s10.push(s11);
                        s11 = peg$parse_();
                      }
                      if (s10 !== peg$FAILED) {
                        s11 = peg$parsevalue();
                        if (s11 !== peg$FAILED) {
                          s12 = [];
                          s13 = peg$parse_();
                          while (s13 !== peg$FAILED) {
                            s12.push(s13);
                            s13 = peg$parse_();
                          }
                          if (s12 !== peg$FAILED) {
                            if (input.charCodeAt(peg$currPos) === 41) {
                              s13 = peg$c30;
                              peg$currPos++;
                            } else {
                              s13 = peg$FAILED;
                              if (peg$silentFails === 0) { peg$fail(peg$c31); }
                            }
                            if (s13 !== peg$FAILED) {
                              peg$savedPos = s0;
                              s1 = peg$c64(s1, s7, s11);
                              s0 = s1;
                            } else {
                              peg$currPos = s0;
                              s0 = peg$FAILED;
                            }
                          } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseinItem() {
    var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10;

    s0 = peg$currPos;
    s1 = peg$parsecolumn();
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$parse_();
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$parse_();
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$parseIN();
        if (s3 !== peg$FAILED) {
          s4 = [];
          s5 = peg$parse_();
          while (s5 !== peg$FAILED) {
            s4.push(s5);
            s5 = peg$parse_();
          }
          if (s4 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 40) {
              s5 = peg$c28;
              peg$currPos++;
            } else {
              s5 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c29); }
            }
            if (s5 !== peg$FAILED) {
              s6 = [];
              s7 = peg$parse_();
              while (s7 !== peg$FAILED) {
                s6.push(s7);
                s7 = peg$parse_();
              }
              if (s6 !== peg$FAILED) {
                s7 = peg$parsevalue();
                if (s7 !== peg$FAILED) {
                  s8 = [];
                  s9 = peg$parse_();
                  while (s9 !== peg$FAILED) {
                    s8.push(s9);
                    s9 = peg$parse_();
                  }
                  if (s8 !== peg$FAILED) {
                    s9 = [];
                    s10 = peg$parseinBetweenParanthesisItem();
                    while (s10 !== peg$FAILED) {
                      s9.push(s10);
                      s10 = peg$parseinBetweenParanthesisItem();
                    }
                    if (s9 !== peg$FAILED) {
                      if (input.charCodeAt(peg$currPos) === 41) {
                        s10 = peg$c30;
                        peg$currPos++;
                      } else {
                        s10 = peg$FAILED;
                        if (peg$silentFails === 0) { peg$fail(peg$c31); }
                      }
                      if (s10 !== peg$FAILED) {
                        peg$savedPos = s0;
                        s1 = peg$c65(s1, s7, s9);
                        s0 = s1;
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseinBetweenParanthesisColumn() {
    var s0, s1, s2, s3, s4, s5;

    s0 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 44) {
      s1 = peg$c6;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c7); }
    }
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$parse_();
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$parse_();
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$parsecolumn();
        if (s3 !== peg$FAILED) {
          s4 = [];
          s5 = peg$parse_();
          while (s5 !== peg$FAILED) {
            s4.push(s5);
            s5 = peg$parse_();
          }
          if (s4 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c38(s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseinBetweenAggregateColumn() {
    var s0, s1, s2, s3, s4, s5;

    s0 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 44) {
      s1 = peg$c6;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c7); }
    }
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$parse_();
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$parse_();
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$parseaggregateType();
        if (s3 !== peg$FAILED) {
          s4 = [];
          s5 = peg$parse_();
          while (s5 !== peg$FAILED) {
            s4.push(s5);
            s5 = peg$parse_();
          }
          if (s4 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c38(s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseinBetweenParanthesisItem() {
    var s0, s1, s2, s3, s4, s5;

    s0 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 44) {
      s1 = peg$c6;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c7); }
    }
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$parse_();
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$parse_();
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$parsevalue();
        if (s3 !== peg$FAILED) {
          s4 = [];
          s5 = peg$parse_();
          while (s5 !== peg$FAILED) {
            s4.push(s5);
            s5 = peg$parse_();
          }
          if (s4 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c38(s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parselikeItem() {
    var s0, s1, s2, s3, s4, s5;

    s0 = peg$currPos;
    s1 = peg$parsecolumn();
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$parse_();
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$parse_();
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$parseLIKE();
        if (s3 !== peg$FAILED) {
          s4 = [];
          s5 = peg$parse_();
          while (s5 !== peg$FAILED) {
            s4.push(s5);
            s5 = peg$parse_();
          }
          if (s4 !== peg$FAILED) {
            s5 = peg$parselikeType();
            if (s5 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c66(s1, s5);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parselikeType() {
    var s0, s1, s2, s3, s4, s5;

    s0 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 37) {
      s1 = peg$c67;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c68); }
    }
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$parse_();
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$parse_();
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$parsevalue();
        if (s3 !== peg$FAILED) {
          s4 = [];
          s5 = peg$parse_();
          while (s5 !== peg$FAILED) {
            s4.push(s5);
            s5 = peg$parse_();
          }
          if (s4 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 37) {
              s5 = peg$c67;
              peg$currPos++;
            } else {
              s5 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c68); }
            }
            if (s5 !== peg$FAILED) {
              s1 = [s1, s2, s3, s4, s5];
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    if (s0 === peg$FAILED) {
      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 37) {
        s1 = peg$c67;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c68); }
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$parse_();
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$parse_();
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parsevalue();
          if (s3 !== peg$FAILED) {
            s1 = [s1, s2, s3];
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parsevalue();
        if (s1 !== peg$FAILED) {
          s2 = [];
          s3 = peg$parse_();
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$parse_();
          }
          if (s2 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 37) {
              s3 = peg$c67;
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c68); }
            }
            if (s3 !== peg$FAILED) {
              s1 = [s1, s2, s3];
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      }
    }

    return s0;
  }

  function peg$parsevalue() {
    var s0, s1, s2;

    peg$silentFails++;
    s0 = peg$currPos;
    s1 = [];
    s2 = peg$parseColumnValue();
    if (s2 !== peg$FAILED) {
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        s2 = peg$parseColumnValue();
      }
    } else {
      s1 = peg$FAILED;
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c70(s1);
    }
    s0 = s1;
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c69); }
    }

    return s0;
  }

  function peg$parsetableName() {
    var s0, s1;

    peg$silentFails++;
    s0 = peg$parseWord();
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c71); }
    }

    return s0;
  }

  function peg$parsecolumn() {
    var s0, s1;

    peg$silentFails++;
    s0 = peg$parseWord();
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c72); }
    }

    return s0;
  }

  function peg$parseJoinOp() {
    var s0;

    s0 = peg$parseAnd();
    if (s0 === peg$FAILED) {
      s0 = peg$parseOr();
    }

    return s0;
  }

  function peg$parseOrderByTypes() {
    var s0, s1;

    peg$silentFails++;
    if (input.substr(peg$currPos, 3) === peg$c74) {
      s0 = peg$c74;
      peg$currPos += 3;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c75); }
    }
    if (s0 === peg$FAILED) {
      if (input.substr(peg$currPos, 4) === peg$c76) {
        s0 = peg$c76;
        peg$currPos += 4;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c77); }
      }
    }
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c73); }
    }

    return s0;
  }

  function peg$parseAnd() {
    var s0;

    if (input.charCodeAt(peg$currPos) === 38) {
      s0 = peg$c78;
      peg$currPos++;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c79); }
    }

    return s0;
  }

  function peg$parseOr() {
    var s0;

    if (input.charCodeAt(peg$currPos) === 124) {
      s0 = peg$c80;
      peg$currPos++;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c81); }
    }

    return s0;
  }

  function peg$parseColumnValue() {
    var s0;

    if (peg$c82.test(input.charAt(peg$currPos))) {
      s0 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c83); }
    }

    return s0;
  }

  function peg$parseWord() {
    var s0, s1, s2;

    s0 = peg$currPos;
    s1 = [];
    s2 = peg$parseLetter();
    if (s2 !== peg$FAILED) {
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        s2 = peg$parseLetter();
      }
    } else {
      s1 = peg$FAILED;
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c84(s1);
    }
    s0 = s1;

    return s0;
  }

  function peg$parseWordAndNumber() {
    var s0;

    if (peg$c85.test(input.charAt(peg$currPos))) {
      s0 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c86); }
    }

    return s0;
  }

  function peg$parseLetter() {
    var s0;

    if (peg$c87.test(input.charAt(peg$currPos))) {
      s0 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c88); }
    }

    return s0;
  }

  function peg$parseNumber() {
    var s0, s1, s2;

    s0 = peg$currPos;
    s1 = [];
    s2 = peg$parseDigit();
    if (s2 !== peg$FAILED) {
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        s2 = peg$parseDigit();
      }
    } else {
      s1 = peg$FAILED;
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c89(s1);
    }
    s0 = s1;

    return s0;
  }

  function peg$parseDigit() {
    var s0;

    if (peg$c90.test(input.charAt(peg$currPos))) {
      s0 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c91); }
    }

    return s0;
  }

  function peg$parseWs() {
    var s0, s1;

    peg$silentFails++;
    if (peg$c93.test(input.charAt(peg$currPos))) {
      s0 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c94); }
    }
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c92); }
    }

    return s0;
  }

  function peg$parse_() {
    var s0, s1, s2;

    peg$silentFails++;
    s0 = peg$currPos;
    s1 = [];
    s2 = peg$parseWs();
    if (s2 !== peg$FAILED) {
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        s2 = peg$parseWs();
      }
    } else {
      s1 = peg$FAILED;
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c96(s1);
    }
    s0 = s1;
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c95); }
    }

    return s0;
  }

  function peg$parseA() {
    var s0;

    if (peg$c97.test(input.charAt(peg$currPos))) {
      s0 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c98); }
    }

    return s0;
  }

  function peg$parseB() {
    var s0;

    if (peg$c99.test(input.charAt(peg$currPos))) {
      s0 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c100); }
    }

    return s0;
  }

  function peg$parseC() {
    var s0;

    if (peg$c101.test(input.charAt(peg$currPos))) {
      s0 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c102); }
    }

    return s0;
  }

  function peg$parseD() {
    var s0;

    if (peg$c103.test(input.charAt(peg$currPos))) {
      s0 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c104); }
    }

    return s0;
  }

  function peg$parseE() {
    var s0;

    if (peg$c105.test(input.charAt(peg$currPos))) {
      s0 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c106); }
    }

    return s0;
  }

  function peg$parseF() {
    var s0;

    if (peg$c107.test(input.charAt(peg$currPos))) {
      s0 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c108); }
    }

    return s0;
  }

  function peg$parseG() {
    var s0;

    if (peg$c109.test(input.charAt(peg$currPos))) {
      s0 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c110); }
    }

    return s0;
  }

  function peg$parseH() {
    var s0;

    if (peg$c111.test(input.charAt(peg$currPos))) {
      s0 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c112); }
    }

    return s0;
  }

  function peg$parseI() {
    var s0;

    if (peg$c113.test(input.charAt(peg$currPos))) {
      s0 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c114); }
    }

    return s0;
  }

  function peg$parseJ() {
    var s0;

    if (peg$c115.test(input.charAt(peg$currPos))) {
      s0 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c116); }
    }

    return s0;
  }

  function peg$parseK() {
    var s0;

    if (peg$c117.test(input.charAt(peg$currPos))) {
      s0 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c118); }
    }

    return s0;
  }

  function peg$parseL() {
    var s0;

    if (peg$c119.test(input.charAt(peg$currPos))) {
      s0 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c120); }
    }

    return s0;
  }

  function peg$parseM() {
    var s0;

    if (peg$c121.test(input.charAt(peg$currPos))) {
      s0 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c122); }
    }

    return s0;
  }

  function peg$parseN() {
    var s0;

    if (peg$c123.test(input.charAt(peg$currPos))) {
      s0 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c124); }
    }

    return s0;
  }

  function peg$parseO() {
    var s0;

    if (peg$c125.test(input.charAt(peg$currPos))) {
      s0 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c126); }
    }

    return s0;
  }

  function peg$parseP() {
    var s0;

    if (peg$c127.test(input.charAt(peg$currPos))) {
      s0 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c128); }
    }

    return s0;
  }

  function peg$parseQ() {
    var s0;

    if (peg$c129.test(input.charAt(peg$currPos))) {
      s0 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c130); }
    }

    return s0;
  }

  function peg$parseR() {
    var s0;

    if (peg$c131.test(input.charAt(peg$currPos))) {
      s0 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c132); }
    }

    return s0;
  }

  function peg$parseS() {
    var s0;

    if (peg$c133.test(input.charAt(peg$currPos))) {
      s0 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c134); }
    }

    return s0;
  }

  function peg$parseT() {
    var s0;

    if (peg$c135.test(input.charAt(peg$currPos))) {
      s0 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c136); }
    }

    return s0;
  }

  function peg$parseU() {
    var s0;

    if (peg$c137.test(input.charAt(peg$currPos))) {
      s0 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c138); }
    }

    return s0;
  }

  function peg$parseV() {
    var s0;

    if (peg$c139.test(input.charAt(peg$currPos))) {
      s0 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c140); }
    }

    return s0;
  }

  function peg$parseW() {
    var s0;

    if (peg$c141.test(input.charAt(peg$currPos))) {
      s0 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c142); }
    }

    return s0;
  }

  function peg$parseX() {
    var s0;

    if (peg$c143.test(input.charAt(peg$currPos))) {
      s0 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c144); }
    }

    return s0;
  }

  function peg$parseY() {
    var s0;

    if (peg$c145.test(input.charAt(peg$currPos))) {
      s0 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c146); }
    }

    return s0;
  }

  function peg$parseZ() {
    var s0;

    if (peg$c147.test(input.charAt(peg$currPos))) {
      s0 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c148); }
    }

    return s0;
  }

  function peg$parseMIN() {
    var s0, s1, s2, s3;

    peg$silentFails++;
    s0 = peg$currPos;
    s1 = peg$parseM();
    if (s1 !== peg$FAILED) {
      s2 = peg$parseI();
      if (s2 !== peg$FAILED) {
        s3 = peg$parseN();
        if (s3 !== peg$FAILED) {
          s1 = [s1, s2, s3];
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c149); }
    }

    return s0;
  }

  function peg$parseMAX() {
    var s0, s1, s2, s3;

    peg$silentFails++;
    s0 = peg$currPos;
    s1 = peg$parseM();
    if (s1 !== peg$FAILED) {
      s2 = peg$parseA();
      if (s2 !== peg$FAILED) {
        s3 = peg$parseX();
        if (s3 !== peg$FAILED) {
          s1 = [s1, s2, s3];
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c150); }
    }

    return s0;
  }

  function peg$parseAVG() {
    var s0, s1, s2, s3;

    peg$silentFails++;
    s0 = peg$currPos;
    s1 = peg$parseA();
    if (s1 !== peg$FAILED) {
      s2 = peg$parseV();
      if (s2 !== peg$FAILED) {
        s3 = peg$parseG();
        if (s3 !== peg$FAILED) {
          s1 = [s1, s2, s3];
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c151); }
    }

    return s0;
  }

  function peg$parseCOUNT() {
    var s0, s1, s2, s3, s4, s5;

    peg$silentFails++;
    s0 = peg$currPos;
    s1 = peg$parseC();
    if (s1 !== peg$FAILED) {
      s2 = peg$parseO();
      if (s2 !== peg$FAILED) {
        s3 = peg$parseU();
        if (s3 !== peg$FAILED) {
          s4 = peg$parseN();
          if (s4 !== peg$FAILED) {
            s5 = peg$parseT();
            if (s5 !== peg$FAILED) {
              s1 = [s1, s2, s3, s4, s5];
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c152); }
    }

    return s0;
  }

  function peg$parseSUM() {
    var s0, s1, s2, s3;

    peg$silentFails++;
    s0 = peg$currPos;
    s1 = peg$parseS();
    if (s1 !== peg$FAILED) {
      s2 = peg$parseU();
      if (s2 !== peg$FAILED) {
        s3 = peg$parseM();
        if (s3 !== peg$FAILED) {
          s1 = [s1, s2, s3];
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c153); }
    }

    return s0;
  }

  function peg$parseAGGREGATE() {
    var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9;

    peg$silentFails++;
    s0 = peg$currPos;
    s1 = peg$parseA();
    if (s1 !== peg$FAILED) {
      s2 = peg$parseG();
      if (s2 !== peg$FAILED) {
        s3 = peg$parseG();
        if (s3 !== peg$FAILED) {
          s4 = peg$parseR();
          if (s4 !== peg$FAILED) {
            s5 = peg$parseE();
            if (s5 !== peg$FAILED) {
              s6 = peg$parseG();
              if (s6 !== peg$FAILED) {
                s7 = peg$parseA();
                if (s7 !== peg$FAILED) {
                  s8 = peg$parseT();
                  if (s8 !== peg$FAILED) {
                    s9 = peg$parseE();
                    if (s9 !== peg$FAILED) {
                      s1 = [s1, s2, s3, s4, s5, s6, s7, s8, s9];
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c154); }
    }

    return s0;
  }

  function peg$parseBETWEEN() {
    var s0, s1, s2, s3, s4, s5, s6, s7;

    peg$silentFails++;
    s0 = peg$currPos;
    s1 = peg$parseB();
    if (s1 !== peg$FAILED) {
      s2 = peg$parseE();
      if (s2 !== peg$FAILED) {
        s3 = peg$parseT();
        if (s3 !== peg$FAILED) {
          s4 = peg$parseW();
          if (s4 !== peg$FAILED) {
            s5 = peg$parseE();
            if (s5 !== peg$FAILED) {
              s6 = peg$parseE();
              if (s6 !== peg$FAILED) {
                s7 = peg$parseN();
                if (s7 !== peg$FAILED) {
                  s1 = [s1, s2, s3, s4, s5, s6, s7];
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c155); }
    }

    return s0;
  }

  function peg$parseIN() {
    var s0, s1, s2;

    peg$silentFails++;
    s0 = peg$currPos;
    s1 = peg$parseI();
    if (s1 !== peg$FAILED) {
      s2 = peg$parseN();
      if (s2 !== peg$FAILED) {
        s1 = [s1, s2];
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c156); }
    }

    return s0;
  }

  function peg$parseLIKE() {
    var s0, s1, s2, s3, s4;

    peg$silentFails++;
    s0 = peg$currPos;
    s1 = peg$parseL();
    if (s1 !== peg$FAILED) {
      s2 = peg$parseI();
      if (s2 !== peg$FAILED) {
        s3 = peg$parseK();
        if (s3 !== peg$FAILED) {
          s4 = peg$parseE();
          if (s4 !== peg$FAILED) {
            s1 = [s1, s2, s3, s4];
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c157); }
    }

    return s0;
  }

  function peg$parseSELECT() {
    var s0, s1, s2, s3, s4, s5, s6;

    peg$silentFails++;
    s0 = peg$currPos;
    s1 = peg$parseS();
    if (s1 !== peg$FAILED) {
      s2 = peg$parseE();
      if (s2 !== peg$FAILED) {
        s3 = peg$parseL();
        if (s3 !== peg$FAILED) {
          s4 = peg$parseE();
          if (s4 !== peg$FAILED) {
            s5 = peg$parseC();
            if (s5 !== peg$FAILED) {
              s6 = peg$parseT();
              if (s6 !== peg$FAILED) {
                s1 = [s1, s2, s3, s4, s5, s6];
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c158); }
    }

    return s0;
  }

  function peg$parseIGNORECASE() {
    var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10;

    peg$silentFails++;
    s0 = peg$currPos;
    s1 = peg$parseI();
    if (s1 !== peg$FAILED) {
      s2 = peg$parseG();
      if (s2 !== peg$FAILED) {
        s3 = peg$parseN();
        if (s3 !== peg$FAILED) {
          s4 = peg$parseO();
          if (s4 !== peg$FAILED) {
            s5 = peg$parseR();
            if (s5 !== peg$FAILED) {
              s6 = peg$parseE();
              if (s6 !== peg$FAILED) {
                s7 = peg$parseC();
                if (s7 !== peg$FAILED) {
                  s8 = peg$parseA();
                  if (s8 !== peg$FAILED) {
                    s9 = peg$parseS();
                    if (s9 !== peg$FAILED) {
                      s10 = peg$parseE();
                      if (s10 !== peg$FAILED) {
                        s1 = [s1, s2, s3, s4, s5, s6, s7, s8, s9, s10];
                        s0 = s1;
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c159); }
    }

    return s0;
  }

  function peg$parseDISTINCT() {
    var s0, s1, s2, s3, s4, s5, s6, s7, s8;

    peg$silentFails++;
    s0 = peg$currPos;
    s1 = peg$parseD();
    if (s1 !== peg$FAILED) {
      s2 = peg$parseI();
      if (s2 !== peg$FAILED) {
        s3 = peg$parseS();
        if (s3 !== peg$FAILED) {
          s4 = peg$parseT();
          if (s4 !== peg$FAILED) {
            s5 = peg$parseI();
            if (s5 !== peg$FAILED) {
              s6 = peg$parseN();
              if (s6 !== peg$FAILED) {
                s7 = peg$parseC();
                if (s7 !== peg$FAILED) {
                  s8 = peg$parseT();
                  if (s8 !== peg$FAILED) {
                    s1 = [s1, s2, s3, s4, s5, s6, s7, s8];
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c160); }
    }

    return s0;
  }

  function peg$parseORDER() {
    var s0, s1, s2, s3, s4, s5;

    peg$silentFails++;
    s0 = peg$currPos;
    s1 = peg$parseO();
    if (s1 !== peg$FAILED) {
      s2 = peg$parseR();
      if (s2 !== peg$FAILED) {
        s3 = peg$parseD();
        if (s3 !== peg$FAILED) {
          s4 = peg$parseE();
          if (s4 !== peg$FAILED) {
            s5 = peg$parseR();
            if (s5 !== peg$FAILED) {
              s1 = [s1, s2, s3, s4, s5];
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c161); }
    }

    return s0;
  }

  function peg$parseBY() {
    var s0, s1, s2;

    peg$silentFails++;
    s0 = peg$currPos;
    s1 = peg$parseB();
    if (s1 !== peg$FAILED) {
      s2 = peg$parseY();
      if (s2 !== peg$FAILED) {
        s1 = [s1, s2];
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c162); }
    }

    return s0;
  }

  function peg$parseFROM() {
    var s0, s1, s2, s3, s4;

    peg$silentFails++;
    s0 = peg$currPos;
    s1 = peg$parseF();
    if (s1 !== peg$FAILED) {
      s2 = peg$parseR();
      if (s2 !== peg$FAILED) {
        s3 = peg$parseO();
        if (s3 !== peg$FAILED) {
          s4 = peg$parseM();
          if (s4 !== peg$FAILED) {
            s1 = [s1, s2, s3, s4];
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c163); }
    }

    return s0;
  }

  function peg$parseGROUP() {
    var s0, s1, s2, s3, s4, s5;

    peg$silentFails++;
    s0 = peg$currPos;
    s1 = peg$parseG();
    if (s1 !== peg$FAILED) {
      s2 = peg$parseR();
      if (s2 !== peg$FAILED) {
        s3 = peg$parseO();
        if (s3 !== peg$FAILED) {
          s4 = peg$parseU();
          if (s4 !== peg$FAILED) {
            s5 = peg$parseP();
            if (s5 !== peg$FAILED) {
              s1 = [s1, s2, s3, s4, s5];
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c164); }
    }

    return s0;
  }

  function peg$parseLIMIT() {
    var s0, s1, s2, s3, s4, s5;

    peg$silentFails++;
    s0 = peg$currPos;
    s1 = peg$parseL();
    if (s1 !== peg$FAILED) {
      s2 = peg$parseI();
      if (s2 !== peg$FAILED) {
        s3 = peg$parseM();
        if (s3 !== peg$FAILED) {
          s4 = peg$parseI();
          if (s4 !== peg$FAILED) {
            s5 = peg$parseT();
            if (s5 !== peg$FAILED) {
              s1 = [s1, s2, s3, s4, s5];
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c165); }
    }

    return s0;
  }

  function peg$parseSKIP() {
    var s0, s1, s2, s3, s4;

    peg$silentFails++;
    s0 = peg$currPos;
    s1 = peg$parseS();
    if (s1 !== peg$FAILED) {
      s2 = peg$parseK();
      if (s2 !== peg$FAILED) {
        s3 = peg$parseI();
        if (s3 !== peg$FAILED) {
          s4 = peg$parseP();
          if (s4 !== peg$FAILED) {
            s1 = [s1, s2, s3, s4];
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c166); }
    }

    return s0;
  }

  function peg$parseWHERE() {
    var s0, s1, s2, s3, s4, s5;

    peg$silentFails++;
    s0 = peg$currPos;
    s1 = peg$parseW();
    if (s1 !== peg$FAILED) {
      s2 = peg$parseH();
      if (s2 !== peg$FAILED) {
        s3 = peg$parseE();
        if (s3 !== peg$FAILED) {
          s4 = peg$parseR();
          if (s4 !== peg$FAILED) {
            s5 = peg$parseE();
            if (s5 !== peg$FAILED) {
              s1 = [s1, s2, s3, s4, s5];
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c167); }
    }

    return s0;
  }

  function peg$parseINSERT() {
    var s0, s1, s2, s3, s4, s5, s6;

    peg$silentFails++;
    s0 = peg$currPos;
    s1 = peg$parseI();
    if (s1 !== peg$FAILED) {
      s2 = peg$parseN();
      if (s2 !== peg$FAILED) {
        s3 = peg$parseS();
        if (s3 !== peg$FAILED) {
          s4 = peg$parseE();
          if (s4 !== peg$FAILED) {
            s5 = peg$parseR();
            if (s5 !== peg$FAILED) {
              s6 = peg$parseT();
              if (s6 !== peg$FAILED) {
                s1 = [s1, s2, s3, s4, s5, s6];
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c168); }
    }

    return s0;
  }

  function peg$parseINTO() {
    var s0, s1, s2, s3, s4;

    peg$silentFails++;
    s0 = peg$currPos;
    s1 = peg$parseI();
    if (s1 !== peg$FAILED) {
      s2 = peg$parseN();
      if (s2 !== peg$FAILED) {
        s3 = peg$parseT();
        if (s3 !== peg$FAILED) {
          s4 = peg$parseO();
          if (s4 !== peg$FAILED) {
            s1 = [s1, s2, s3, s4];
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c169); }
    }

    return s0;
  }

  function peg$parseRETURN() {
    var s0, s1, s2, s3, s4, s5, s6;

    peg$silentFails++;
    s0 = peg$currPos;
    s1 = peg$parseR();
    if (s1 !== peg$FAILED) {
      s2 = peg$parseE();
      if (s2 !== peg$FAILED) {
        s3 = peg$parseT();
        if (s3 !== peg$FAILED) {
          s4 = peg$parseU();
          if (s4 !== peg$FAILED) {
            s5 = peg$parseR();
            if (s5 !== peg$FAILED) {
              s6 = peg$parseN();
              if (s6 !== peg$FAILED) {
                s1 = [s1, s2, s3, s4, s5, s6];
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c170); }
    }

    return s0;
  }

  function peg$parseVALUES() {
    var s0, s1, s2, s3, s4, s5, s6;

    peg$silentFails++;
    s0 = peg$currPos;
    s1 = peg$parseV();
    if (s1 !== peg$FAILED) {
      s2 = peg$parseA();
      if (s2 !== peg$FAILED) {
        s3 = peg$parseL();
        if (s3 !== peg$FAILED) {
          s4 = peg$parseU();
          if (s4 !== peg$FAILED) {
            s5 = peg$parseE();
            if (s5 !== peg$FAILED) {
              s6 = peg$parseS();
              if (s6 !== peg$FAILED) {
                s1 = [s1, s2, s3, s4, s5, s6];
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c171); }
    }

    return s0;
  }

  function peg$parseSKIPDATACHECK() {
    var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13;

    peg$silentFails++;
    s0 = peg$currPos;
    s1 = peg$parseS();
    if (s1 !== peg$FAILED) {
      s2 = peg$parseK();
      if (s2 !== peg$FAILED) {
        s3 = peg$parseI();
        if (s3 !== peg$FAILED) {
          s4 = peg$parseP();
          if (s4 !== peg$FAILED) {
            s5 = peg$parseD();
            if (s5 !== peg$FAILED) {
              s6 = peg$parseA();
              if (s6 !== peg$FAILED) {
                s7 = peg$parseT();
                if (s7 !== peg$FAILED) {
                  s8 = peg$parseA();
                  if (s8 !== peg$FAILED) {
                    s9 = peg$parseC();
                    if (s9 !== peg$FAILED) {
                      s10 = peg$parseH();
                      if (s10 !== peg$FAILED) {
                        s11 = peg$parseE();
                        if (s11 !== peg$FAILED) {
                          s12 = peg$parseC();
                          if (s12 !== peg$FAILED) {
                            s13 = peg$parseK();
                            if (s13 !== peg$FAILED) {
                              s1 = [s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13];
                              s0 = s1;
                            } else {
                              peg$currPos = s0;
                              s0 = peg$FAILED;
                            }
                          } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c172); }
    }

    return s0;
  }

  peg$result = peg$startRuleFunction();

  if (peg$result !== peg$FAILED && peg$currPos === input.length) {
    return peg$result;
  } else {
    if (peg$result !== peg$FAILED && peg$currPos < input.length) {
      peg$fail(peg$endExpectation());
    }

    throw peg$buildStructuredError(
      peg$maxFailExpected,
      peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null,
      peg$maxFailPos < input.length
        ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1)
        : peg$computeLocation(peg$maxFailPos, peg$maxFailPos)
    );
  }
}

module.exports = {
  SyntaxError: peg$SyntaxError,
  parse:       peg$parse
};


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Util", function() { return Util; });
var Util = /** @class */ (function () {
    function Util() {
    }
    Util.isString = function (value) {
        return typeof value === 'string';
    };
    return Util;
}());



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Query", function() { return Query; });
/* harmony import */ var _output_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _output_parser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_output_parser__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);


var Query = /** @class */ (function () {
    function Query(qry) {
        this.topLevelKeys_ = ["skip", "limit"];
        this.query_ = _output_parser__WEBPACK_IMPORTED_MODULE_0__["parse"](qry);
    }
    Query.prototype.map = function (key, value) {
        var stringifiedValue = JSON.stringify(this.query_);
        this.query_ = JSON.parse(stringifiedValue.replace('"' + key + '"', JSON.stringify(value)));
    };
    Query.prototype.isString_ = function (value) {
        return _util__WEBPACK_IMPORTED_MODULE_1__["Util"].isString(value);
    };
    return Query;
}());



/***/ })
/******/ ]);
//# sourceMappingURL=sqlweb.commonjs2.js.map