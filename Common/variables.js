var version = "0.1";
var title = "Install pilso";
var showIncompatible = true;
document.title = title;

var HKLM = 0x80000002;
var shell = new ActiveXObject("Shell.Application");
var fso = new ActiveXObject("Scripting.FileSystemObject");
var WshShell = new ActiveXObject("WScript.Shell");
var WshEnv = WshShell.Environment("PROCESS");
var is64 = false;
if (WshShell.ExpandEnvironmentStrings("%PROCESSOR_ARCHITECTURE%")=="AMD64"
        ||WshShell.ExpandEnvironmentStrings("%PROCESSOR_ARCHITEW6432%")!="%PROCESSOR_ARCHITEW6432%"){
        is64 = true;
}
var architectureType = (is64 == true ? 64 : 32);
var programfiles = WshEnv("PROGRAMFILES");
var programfilesx86 = WshEnv("PROGRAMFILES(x86)");
var env_windir = WshEnv("WINDIR");
var env_SystemRoot = WshEnv("SystemRoot");
var env_SystemDrive = WshEnv("SystemDrive");
var temp = WshEnv("TEMP");

var CMD  = [];	// Command Line
var REG  = [];	// Register
var FILECOPY = [];	// Copy files
var DELETE = [];	// Delete files

var registry32 = "SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\";
var registry64 = "SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\";

var rootPath;
rootPath=unescape(document.location);
rootPath=rootPath.substring(0,rootPath.lastIndexOf("/"));
rootPath=rootPath.replace("file:///","").replace(/\//g,"\\");
rootPath=rootPath.replace("file:","").replace(/\//g,"\\");				// For network share
// rootPath=rootPath.substring(0,rootPath.lastIndexOf('\\'));				// Remove the 'Common' folder from rootPath

//	Reads a REG_SZ value from the local computer's registry using WMI.
//	Parameters:
//	RootKey - The registry hive (see http://msdn.microsoft.com/en-us/library/aa390788.aspx for possible values).
//	Key - The key that contains the needed value.
//	Value - The value to get.
//	RegType - The registry bitness: 32 or 64.
function ReadRegStr (RootKey, KeyName, ValueName, RegType) {
	var oCtx = new ActiveXObject("WbemScripting.SWbemNamedValueSet");
	oCtx.Add("__ProviderArchitecture", RegType);

	var oLocator = new ActiveXObject("WbemScripting.SWbemLocator");
	var oWMI = oLocator.ConnectServer("", "root\\default", "", "", "", "", 0, oCtx);
	var oReg = oWMI.Get("StdRegProv");

	var oInParams = oReg.Methods_("GetStringValue").Inparameters;
	oInParams.Hdefkey = RootKey;
	oInParams.Ssubkeyname = KeyName;
	oInParams.Svaluename = ValueName;

	var oOutParams = oReg.ExecMethod_("GetStringValue", oInParams, 0, oCtx);
	return oOutParams.SValue;
}
function installApp(id) {
	var appExecute, appArgument, appOption, appOptionCommand, _appOptionCommand, command;
	var fileCopy  = [];
	var filePatch = [];
	for(var i = 0; i < apps.length; i++) {
		if (apps[i].ID == id) {
			appExecute  = (is64 && typeof apps[i].Path64 != 'undefined' ? apps[i].Path64 : apps[i].Path32);
			appArgument = apps[i].Argument;
			appOption   = apps[i].Options;

			try {
				WshShell.run('"' + appExecute + '"' + " " + appArgument + "", 1, true);
			} catch(err) {
				alert("installApp: " + apps[i].Name + " " + appExecute);
			}

			if (typeof appOption != 'undefined') {
				for(var j = 0; j < appOption.length; j++) {
					appOptionCommand = appOption[j].Command;
					_appOptionCommand = appOptionCommand.indexOf('{') != -1 ? appOptionCommand.split(' ') : appOptionCommand;
					switch (_appOptionCommand[0]) {
						case '{CMD}':
							// cmd /c del /f /q
							break;
						case '{FILECOPY}':
							FILECOPY = appOptionCommand.replace(/{FILECOPY}/gi,'').replace(/"/g, '').replace(/\s/, '').split(", ");
							try {
								fso.CopyFile((rootPath + "\\" + FILECOPY[0]).replace(/\\/g, "\\\\"), environmentString(FILECOPY[1]).replace(/\\/g, "\\\\"));
							} catch(err) {
								alert("FILECOPY: " + err + "\n" + appOptionCommand);
							}
							break;
						case '{DELETE}':
							DELETE = appOptionCommand.replace(/{DELETE}/gi,'').replace(/"/g, '').replace(/\s/, '');
							try {
								fso.DeleteFile(environmentString(DELETE).replace(/\\/g, "\\\\"));
							} catch(err) {
								alert("DELETE: " + err.description + "\n" + appOptionCommand);
							}
							break;
						default:
							try {
								if (appOptionCommand.indexOf('"')) {
									WshShell.run('"' + appOptionCommand + "", 1, true);
								} else {
									WshShell.run(appOptionCommand, 1, true);
								}
							} catch(err) {
								alert("installOptions: " + appOptionCommand);
							}
					}
				}
			}
			break;
		}
		WshShell.Quit;
	}
}
function unistallApp(id) {
	var i;
	try {
		for(i = 0; i < apps.length; i++) {
			if (apps[i].ID == id) {
				var appRegUnistall = apps[i].UnistallRegistry;
				break;
			}
		}
		var unistall = (ReadRegStr(HKLM, registry32+appRegUnistall, "UninstallString", architectureType) != null ?
						ReadRegStr(HKLM, registry32+appRegUnistall, "UninstallString", architectureType) :
						ReadRegStr(HKLM, registry64+appRegUnistall, "UninstallString", architectureType));
		if (unistall.indexOf('"') == 0 || unistall.indexOf('/') > 0 || unistall.indexOf(' -') > 0) {
			WshShell.run(unistall, 1, true);
		} else {
			WshShell.run('"' + unistall + '"', 1, true);
		}
		WshShell.Quit;
	} catch(err) {
		alert("unistallApp: " + apps[i].Name +"\n Path: " + unistall);
	}
}
function unistallExist(key) {
	var exist        = false;
	var fileUnistall = (ReadRegStr(HKLM, registry32+key, "UninstallString", architectureType) != null ?
						ReadRegStr(HKLM, registry32+key, "UninstallString", architectureType) :
						ReadRegStr(HKLM, registry64+key, "UninstallString", architectureType));
	if (fileUnistall != null) {
		exist = true;
	}
	return exist;
}
function showOptions(optionId) {
	var id = optionId.replace("optionsImg", "");
	var optionShow = document.getElementsByName("options"+id);
	for (var i = 0; i < optionShow.length; i++){
		if (optionShow[i].style.display == 'none') {
			document.getElementById(optionId).src = "img/screens/icon-arrow-open.png";
			optionShow[i].style.display = '';
		} else {
			optionShow[i].style.display = 'none';
			document.getElementById(optionId).src = "img/screens/icon-arrow-close.png";
		}
	}
}
function showDetails(detailId) {
	var id = detailId.replace("icon", "");
	var detailShow = document.getElementsByName("detail"+id);
	for (var i = 0; i < detailShow.length; i++){
		(detailShow[i].style.display == 'none') ? detailShow[i].style.display = '' : detailShow[i].style.display = 'none';
	}
}
function environmentString(string) {
	var ret;
	if(string.indexOf('%programfiles%') != -1) {
		ret = string.replace('%programfiles%', '');
		ret = WshShell.ExpandEnvironmentStrings("%programfiles%") + ret;
	}
	if(string.indexOf('%programfiles(x86)%') != -1) {
		ret = string.replace('%programfiles(x86)%', '');
		ret = WshShell.ExpandEnvironmentStrings("%programfiles(x86)%") + ret;
	}
	if(string.indexOf('%public%') != -1) {
		ret = string.replace('%public%', '');
		ret = WshShell.ExpandEnvironmentStrings("%public%") + ret;
	}
	if(string.indexOf('%userprofile%') != -1) {
		ret = string.replace('%userprofile%', '');
		ret = WshShell.ExpandEnvironmentStrings("%userprofile%") + ret;
	}
return ret;
}
function openDirectory(id){
	for(var i = 0; i < apps.length; i++) {
		if (apps[i].ID == id) {
			var appDir = (is64 && typeof apps[i].Path64 != 'undefined' ? apps[i].Path64 : apps[i].Path32);
			break;
		}
	}
	var path = appDir.split("\\");
	var _path = "";
	for(var i = 0; i < path.length-1; i++) {
			_path += "\\" + path[i];
	}
	shell.Open (rootPath + _path);
}
//-------------------------------------------------------------
// function : regGetSubKeyNames(strComputer, strRegPath)
//
//  purpose : return an array with names of any subKeys
//-------------------------------------------------------------
function regGetSubKeys(strComputer, strRegPath) {
	try {
		var aNames = null;
		var objLocator     = new ActiveXObject("WbemScripting.SWbemLocator");
		var objService     = objLocator.ConnectServer(strComputer, "root\\default");
		var objReg         = objService.Get("StdRegProv");
		var objMethod      = objReg.Methods_.Item("EnumKey");
		var objInParam     = objMethod.InParameters.SpawnInstance_();
		objInParam.hDefKey = HKLM;
		objInParam.sSubKeyName = strRegPath;
		var objOutParam = objReg.ExecMethod_(objMethod.Name, objInParam);
		switch(objOutParam.ReturnValue) {
		  case 0:        // Success
			aNames = (objOutParam.sNames != null) ? objOutParam.sNames.toArray(): null;
			break;
		  case 2:        // Not Found
			aNames = null;
			break;
		}
		return { Results : 0, SubKeys : aNames };
	} catch(e) {
		return { Results: e.number, SubKeys : e.description }
	}
}

// var rtn = regGetSubKeys(".", "SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall");
// var patt = new RegExp(key, 'gi');
// if (rtn.Results == 0) {
	// for (var idx = 0; idx < rtn.SubKeys.length; idx++) {
		// if (patt.test(rtn.SubKeys[idx])) {
			// alert(rtn.SubKeys[idx]);
		// }
	// }
// }
