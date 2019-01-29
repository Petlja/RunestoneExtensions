"use strict";

$(document).ready(function() {
    var errorText = {};

    errorText.ParseError = "A parse error means that Python does not understand the syntax on the line the error message points out.  Common examples are forgetting commas beteween arguments or forgetting a : on a for statement";
    errorText.ParseErrorFix = "To fix a parse error you just need to look carefully at the line with the error and possibly the line before it.  Make sure it conforms to all of Python's rules.";
    errorText.TypeError = "Type errors most often occur when an expression tries to combine two objects with types that should not be combined.  Like raising a string to a power";
    errorText.TypeErrorFix = "To fix a type error you will most likely need to trace through your code and make sure the variables have the types you expect them to have.  It may be helpful to print out each variable along the way to be sure its value is what you think it should be.";
    errorText.NameError = "A name error almost always means that you have used a variable before it has a value.  Often this may be a simple typo, so check the spelling carefully.";
    errorText.NameErrorFix = "Check the right hand side of assignment statements and your function calls, this is the most likely place for a NameError to be found.";
    errorText.ValueError = "A ValueError most often occurs when you pass a parameter to a function and the function is expecting one type and you pass another.";
    errorText.ValueErrorFix = "The error message gives you a pretty good hint about the name of the function as well as the value that is incorrect.  Look at the error message closely and then trace back to the variable containing the problematic value.";
    errorText.AttributeError = "This error message is telling you that the object on the left hand side of the dot, does not have the attribute or method on the right hand side.";
    errorText.AttributeErrorFix = "The most common variant of this message is that the object undefined does not have attribute X.  This tells you that the object on the left hand side of the dot is not what you think. Trace the variable back and print it out in various places until you discover where it becomes undefined.  Otherwise check the attribute on the right hand side of the dot for a typo.";
    errorText.TokenError = "Most of the time this error indicates that you have forgotten a right parenthesis or have forgotten to close a pair of quotes.";
    errorText.TokenErrorFix = "Check each line of your program and make sure that your parenthesis are balanced.";
    errorText.TimeLimitError = "Your program is running too long.  Most programs in this book should run in less than 10 seconds easily. This probably indicates your program is in an infinite loop.";
    errorText.TimeLimitErrorFix = "Add some print statements to figure out if your program is in an infinte loop.  If it is not you can increase the run time with sys.setExecutionLimit(msecs)";
    errorText.Error = "Your program is running for too long.  Most programs in this book should run in less than 30 seconds easily. This probably indicates your program is in an infinite loop.";
    errorText.ErrorFix = "Add some print statements to figure out if your program is in an infinte loop.  If it is not you can increase the run time with sys.setExecutionLimit(msecs)";
    errorText.SyntaxError = "This message indicates that Python can't figure out the syntax of a particular statement.  Some examples are assigning to a literal, or a function call";
    errorText.SyntaxErrorFix = "Check your assignment statments and make sure that the left hand side of the assignment is a variable, not a literal or a function.";
    errorText.IndexError = "This message means that you are trying to index past the end of a string or a list.  For example if your list has 3 things in it and you try to access the item at position 3 or more.";
    errorText.IndexErrorFix = "Remember that the first item in a list or string is at index position 0, quite often this message comes about because you are off by one.  Remember in a list of length 3 the last legal index is 2";
    errorText.URIError = "";
    errorText.URIErrorFix = "";
    errorText.ImportError = "This error message indicates that you are trying to import a module that does not exist";
    errorText.ImportErrorFix = "One problem may simply be that you have a typo.  It may also be that you are trying to import a module that exists in 'real' Python, but does not exist in this book.  If this is the case, please submit a feature request to have the module added.";
    errorText.ReferenceError = "This is most likely an internal error, particularly if the message references the console.";
    errorText.ReferenceErrorFix = "Try refreshing the webpage, and if the error continues, submit a bug report along with your code";
    errorText.ZeroDivisionError = "This tells you that you are trying to divide by 0. Typically this is because the value of the variable in the denominator of a division expression has the value 0";
    errorText.ZeroDivisionErrorFix = "You may need to protect against dividing by 0 with an if statment, or you may need to rexamine your assumptions about the legal values of variables, it could be an earlier statment that is unexpectedly assigning a value of zero to the variable in question.";
    errorText.RangeError = "This message almost always shows up in the form of Maximum call stack size exceeded.";
    errorText.RangeErrorFix = "This always occurs when a function calls itself.  Its pretty likely that you are not doing this on purpose. Except in the chapter on recursion.  If you are in that chapter then its likely you haven't identified a good base case.";
    errorText.InternalError = "An Internal error may mean that you've triggered a bug in our Python";
    errorText.InternalErrorFix = "Report this error, along with your code as a bug.";
    errorText.IndentationError = "This error occurs when you have not indented your code properly.  This is most likely to happen as part of an if, for, while or def statement.";
    errorText.IndentationErrorFix = "Check your if, def, for, and while statements to be sure the lines are properly indented beneath them.  Another source of this error comes from copying and pasting code where you have accidentally left some bits of code lying around that don't belong there anymore.";
    errorText.NotImplementedError = "This error occurs when you try to use a builtin function of Python that has not been implemented in this in-browser version of Python.";
    errorText.NotImplementedErrorFix = "For now the only way to fix this is to not use the function.  There may be workarounds.  If you really need this builtin function then file a bug report and tell us how you are trying to use the function.";

    $('[data-component=karel]').each( function(index ) {
        var outerDiv = $(this)[0];
        var canvas = $(this).find(".world")[0];
        var textarea = $(this).find(".codeArea")[0];
        var configarea = $(this).find(".configArea")[0];

        var editor = CodeMirror.fromTextArea(textarea,{lineNumbers: true,
            mode: "python", indentUnit: 4,
            matchBrackets: true, autoMatchParens: true,
            extraKeys: {"Tab": "indentMore", "Shift-Tab": "indentLess"}});
	var config = (new Function('return '+configarea.value.replace('<!--x','').replace('x-->','')))();
	var code = config.setup().code;
	code = (code ?
		(code.length ? code.join("\n") : code)
		: "from karel import * \n");
	editor.setValue(code);

        $(this).find(".run-button").click(function () {
            var program = editor.getValue();

            $('.run-button').attr('disabled', 'disabled');
            $('.reset-button').attr('disabled', 'disabled');
            executeProgram(program);
        });

        $(this).find(".reset-button").click(function () {
            reset();
        });

        $(this).find(".blockly-button").click(function () {
            var code = editor.getValue().replace(/\?\?\?\s+/g, "___ ")
            .replace(/\?\?\?/g,"___");
            var bpm = new BlocklPyModal();
            bpm.open("Карел", 700, 500, code, '/_runestone/_static/blockly/',
               function(src) {
                  if(src) {
                    editor.setValue("from karel import * \n" + src.replace(/\_\_\_/g,"???"));
                  }
               });
        });

        function outf(text){
            console.log(text);
        }

        function builtinRead(x) {
            if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
                throw "File not found: '" + x + "'";
            return Sk.builtinFiles["files"][x];
        }
        function executeProgram(program, skipValidation) {
            Sk.configure({output: outf, read: builtinRead});
            Sk.canvas = canvas;
	        var drawer = new RobotDrawer(canvas, 500);

            Sk.Karel = {drawer: drawer, config: config};
            Sk.externalLibraries = {
                karel : {
                    path: '/_runestone/_static/karel.js',
                }
            };
            //Sk.pre = "edoutput";
            try {
                clearError();
                var myPromise = Sk.misceval.asyncToPromise(function() {
					drawer.start();
                    return Sk.importMainWithBody("<stdin>",false,program,true);
                });
                myPromise.then(
                    function(mod) {
						drawer.stop(function(){
							if(!skipValidation && Sk.Karel.config.isSuccess){
								var robot = Sk.Karel.robot;
								var world = robot.getWorld();
								var result = Sk.Karel.config.isSuccess(robot, world);
								if(result){
									showEndMessageSuccess();
								} else {
                                    showEndMessageError("Нетачно.");
								}
							}
						});
                    },
                    function (err) {
                        drawer.stop(function () {
                            var message = "";
                            var otherError = false;
                            if ((err.nativeError == "crashed") || (err.nativeError == "no_ball") || (err.nativeError == "out_of_bounds"))
                                message = $.i18n("msg_karel_" + err.nativeError);
                            else {
                                showError(err);
                                otherError = true;
                            }
                            if (!otherError)
                                showEndMessageError(message);

                        });
                    }
                );
            } catch(e) {
                outf("Error: " + e.toString() + "\n")
            }
        }

        function reset() {
            $('.run-button').removeAttr('disabled');
            $('.reset-button').removeAttr('disabled');
            executeProgram("import karel", true);
        }

		function showEndMessageSuccess(){
            var eContainer = outerDiv.appendChild(document.createElement('div'));
            eContainer.className = 'col-md-12 alert alert-success';
            var msgHead = $('<p>').html('Тачно!');
            eContainer.appendChild(msgHead[0]);
            $('.run-button').removeAttr('disabled')
            $('.reset-button').removeAttr('disabled');;
		}

		function showEndMessageError(message){
            var eContainer = outerDiv.appendChild(document.createElement('div'));
            eContainer.className = 'col-md-12 alert alert-danger';
            var msgHead = $('<p>').html(message);
            eContainer.appendChild(msgHead[0]);
            $('.run-button').removeAttr('disabled');
            $('.reset-button').removeAttr('disabled');
		}

        function showError(err) {
            //logRunEvent({'div_id': this.divid, 'code': this.prog, 'errinfo': err.toString()}); // Log the run event
            var errHead = $('<h3>').html('Error');
            var eContainer = outerDiv.appendChild(document.createElement('div'));
            eContainer.className = 'col-md-12 error alert alert-danger';
            eContainer.appendChild(errHead[0]);
            var errText = eContainer.appendChild(document.createElement('pre'));
            var errString = err.toString();
            var to = errString.indexOf(":");
            var errName = errString.substring(0, to);
            errText.innerHTML = errString;
			var desc = errorText[errName];
			var fix = errorText[errName+'Fix'];
			if(desc){
				$(eContainer).append('<h3>Description</h3>');
				var errDesc = eContainer.appendChild(document.createElement('p'));
				errDesc.innerHTML = desc;
			}
			if(fix){
				$(eContainer).append('<h3>To Fix</h3>');
				var errFix = eContainer.appendChild(document.createElement('p'));
				errFix.innerHTML = fix;
			}
            //var moreInfo = '../ErrorHelp/' + errName.toLowerCase() + '.html';
            console.log("Runtime Error: " + err.toString());
            $('.run-button').removeAttr('disabled');
            $('.reset-button').removeAttr('disabled');
        };

        function clearError(){
            $(outerDiv).find(".alert-success").remove();
            $(outerDiv).find(".alert-danger").remove();
        }

        reset();
    });
});
