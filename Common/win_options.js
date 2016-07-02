var apps = [
{  
	   "ID":"01",
	   "Name":"7-Zip",
	   "Description":"Potente Compresor de Ficheros",
	   "Path32":"Install\\7-Zip\\7z1602.exe",
	   "Path64":"Install\\7-Zip\\7z1602-x64.exe",
	   "Argument":"/S",
	   "URL":"http://www.7-zip.org/",
	   "CheckedDefault":true,
	   "Version":"16.02",
	   "UnistallRegistry":"7-Zip",
	   "Icon":"Install\\7-Zip\\icon.png"
	},
	{  
	   "ID":"02",
	   "Name":"Foxit Reader",
	   "Description":"La mejor alternativa PDF",
	   "Path32":"Install\\Foxit Reader\\FoxitReader708.1216_prom_L10N_Setup.exe",
	   "Argument":"/SILENT",
	   "URL":"https://www.foxitsoftware.com/",
	   "CheckedDefault":true,
	   "Version":"7.2.0.0722",
	   "UnistallRegistry":"Foxit Reader_is1",
	   "Options": [
	   		{
				"Description":"Quitar acceso directo del escritorio",
				"CheckedDefault":true,
				"Command": "{DELETE} \"%public%\\Desktop\\Foxit Reader.lnk\""
			},
			{
				"Description":"Unistall Foxy Cloud",
				"CheckedDefault":true,
				"Command":"\"C:\\Program Files (x86)\\Foxit Software\\Foxit Reader\\Foxit Cloud\\unins000.exe\" /SILENT"
			}],
	   "Icon":"Install\\Foxit Reader\\icon.png"
	}
];