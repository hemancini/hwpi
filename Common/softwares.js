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
	},
	{  
	   "ID":"03",
	   "Name":"AIMP",
	   "Description":"Reproductor de audio",
	   "Path32":"Install\\AIMP\\aimp_4.02.1721.exe",
	   "Argument":"/AUTO='%programfiles%\\AIMP'",
	   "URL":"http://www.aimp.ru/",
	   "CheckedDefault":true,
	   "Version":"4.02",
	   "UnistallRegistry":"AIMP",
	   "Icon":"Install\\AIMP\\icon.png"
	},
	{  
	   "ID":"04",
	   "Name":"WinRAR",
	   "Description":"Poderoso compresor",
	   "Path32":"Install\\WinRAR\\wrar530.exe",
	   "Path64":"Install\\WinRAR\\winrar-x64-530.exe",
	   "Argument":"/s",
	   "URL":"http://www.winrar.es/",
	   "CheckedDefault":true,
	   "Version":"5.30",
	   "UnistallRegistry":"WinRAR archiver",
	   "Icon":"Install\\WinRAR\\icon.png"
	},
	{  
	   "ID":"05",
	   "Name":"Mozilla Firefox",
	   "Description":"Un navegador web gratuito que te permite navegar por Internet de forma segura y rápida",
	   "Path32":"Install\\Mozilla Firefox\\Firefox Setup 40.0\\setup.exe",
	   "Argument":"/s",
	   "URL":"https://www.mozilla.org/es-CL/firefox/new/",
	   "CheckedDefault":true,
	   "Version":"40.0",
	   "UnistallRegistry":"Mozilla Firefox 40.0 (x86 es-CL)",
	   "Icon":"Install\\Mozilla Firefox\\icon.png"
	},
	{  
	   "ID":"06",
	   "Name":"Clover",
	   "Description":"Clover is an extension of the Windows Explorer, to add multi-tab functionality similar to Google Chrome browser.",
	   "Path32":"Install\\Clover\\Clover_Setup.exe",
	   "Argument":"/S",
	   "Options": [
	   		{
				"Description":"Quitar acceso directo del escritorio",
				"CheckedDefault":true,
				"Command":"{DELETE} \"%public%\\Desktop\\Clover.lnk\""
			}],
	   "URL":"http://ejie.me/",
	   "CheckedDefault":true,
	   "Version":"3.0.406",
	   "UnistallRegistry":"Clover",
	   "Icon":"Install\\Clover\\icon.png"
	},
	{  
	   "ID":"07",
	   "Name":"Google Chrome",
	   "Description":"Navegador Web Optimizado",
	   "Path32":"Install\\Google Chrome\\googlechromestandaloneenterprise.msi",
	   "Path64":"Install\\Google Chrome\\googlechromestandaloneenterprise64.msi",
	   "Argument":"",
	   "URL":"http://www.google.cl/chrome/business/browser/admin/",
	   "CheckedDefault":true,
	   "Version":"51.0.2704.79",
	   "UnistallRegistry":"{22309BC7-E8B7-3172-BBAE-6787B2DB89FA}",
	   "Icon":"Install\\Google Chrome\\icon.png"
	},
	{  
	   "ID":"08",
	   "Name":"Notepad++",
	   "Description":"Un editor de texto y de código fuente libre con soporte para varios lenguajes de programación",
	   "Path32":"Install\\Notepad++\\npp.6.8.2.Installer.exe",
	   "Argument":"/S",
	   "URL":"https://notepad-plus-plus.org/",
	   "CheckedDefault":true,
	   "Version":"6.8.2",
	   "UnistallRegistry":"Notepad++",
	   "Icon":"Install\\Notepad++\\icon.png"
	},
	{  
	   "ID":"09",
	   "Name":"Unchecky",
	   "Description":"Desactive la publicidad de los instaladores de los programas",
	   "Path32":"Install\\Unchecky\\unchecky_setup.exe",
	   "Argument":"-install",
	   "Options": [
			{
				"Description":"Quitar acceso directo del escritorio",
				"CheckedDefault":true,
				"Command":"{DELETE} \"%public%\\Desktop\\Unchecky.lnk\""
			}],
	   "URL":"https://unchecky.com/",
	   "CheckedDefault":true,
	   "Version":"0.4.1 Beta",
	   "UnistallRegistry":"Unchecky",
	   "Icon":"Install\\Unchecky\\icon.png"
	},
	{  
	   "ID":"10",
	   "Name":"VLC media player",
	   "Description":"El mejor reproductor gratuito de vídeo",
	   "Path32":"Install\\VLC media player\\vlc-2.2.1-win32.exe",
	   "Path64":"Install\\VLC media player\\vlc-2.2.1-win64.exe",
	   "Argument":"/S",
	   "URL":"http://www.videolan.org/",
	   "CheckedDefault":true,
	   "Version":"2.2.1",
	   "UnistallRegistry":"VLC media player",
	   "Icon":"Install\\VLC media player\\icon.png"
	},
	{  
	   "ID":"11",
	   "Name":"VSO Image Resizer",
	   "Description":"Redimensione imágenes fácilmente",
	   "Path32":"Install\\VSO Image Resizer\\vso_image_resizer4_setup.exe",
	   "Argument":"/silent",
	   "Options": [
	   		{
				"Description":"Registrar",
				"CheckedDefault":true,
				"Command":"REGEDIT /S \"Install\\VSO Image Resizer\\Keygen.reg\""
			},
			{
				"Description":"Quitar acceso directo del escritorio",
				"CheckedDefault":true,
				"Command":"{DELETE} \"%userprofile%\\Desktop\\VSO Image Resizer 4.lnk\""
			}],
	   "URL":"http://www.vso-software.fr/",
	   "CheckedDefault":true,
	   "Version":"4.0.2.5 ML",
	   "UnistallRegistry":"{8969CD6F-5B75-40B9-8701-86ECA4C1F263}_is1",
	   "Icon":"Install\\VSO Image Resizer\\icon.png"
	},
	{  
	   "ID":"12",
	   "Name":"Virtual CloneDrive",
	   "Description":"Monte archivos ISO con Vitrual CloneDrive y úselos como si fueran unidades físicas",
	   "Path32":"Install\\Virtual CloneDrive\\SetupVirtualCloneDrive5480.exe",
	   "Argument":"/S /noreboot",
	   "Options": [
			{
				"Description":"Quitar acceso directo del escritorio",
				"CheckedDefault":true,
				"Command":"{DELETE} \"%public%\\Desktop\\Virtual CloneDrive.lnk\""
			}],
	   "URL":"http://www.elby.ch",
	   "CheckedDefault":true,
	   "Version":"2.2.1",
	   "UnistallRegistry":"VirtualCloneDrive",
	   "Icon":"Install\\Virtual CloneDrive\\icon.png"
	},
	{  
	   "ID":"UNLOCKER",
	   "Name":"Unlocker",
	   "Description":"Liberate de esos archivos que no se dejan eliminar",
	   "Path32":"Install\\Unlocker\\Unlocker1.9.2.exe",
	   "Condition":"getOSver()=='Win7'",
	   "Argument":"/S",
	   "URL":"http://www.emptyloop.com/unlocker/",
	   "CheckedDefault":true,
	   "Version":"1.9.2",
	   "UnistallRegistry":"Unlocker",
	   "Icon":"Install\\Unlocker\\icon.png"
	},
	{  
	   "ID":"14",
	   "Name":"Flash Player ActiveX",
	   "Description":"Flash Player Internet Explorer - ActiveX",
	   "Path32":"Install\\Flash Player\\flashplayer_21_ax_debug.exe",
	   "Argument":"-install",
	   "URL":"http://www.adobe.com/support/flashplayer/debug_downloads.html",
	   "CheckedDefault":true,
	   "Version":"21.0.0.242",
	   "UnistallRegistry":"Adobe Flash Player ActiveX",
	   "Icon":"Install\\Flash Player\\icon.png"
	},
	{  
	   "ID":"15",
	   "Name":"Flash Player NPAPI",
	   "Description":"Flash Player Firefox - NPAPI",
	   "Path32":"Install\\Flash Player\\flashplayer_21_plugin_debug.exe",
	   "Argument":"-install",
	   "URL":"http://www.adobe.com/support/flashplayer/debug_downloads.html",
	   "CheckedDefault":true,
	   "Version":"21.0.0.242",
	   "UnistallRegistry":"Adobe Flash Player NPAPI",
	   "Icon":"Install\\Flash Player\\icon.png"
	},
	{  
	   "ID":"16",
	   "Name":"UltraISO Premium Edition",
	   "Description":"Cree y edite archivos ISO fácilmente",
	   "Path32":"Install\\UltraISO\\uiso96pes.exe",
	   "Argument":"/silent",
	   "Options": [
	   		{
				"Description":"Registrar",
				"CheckedDefault":true,
				"Command":"{FILECOPY} \"Install\\UltraISO\\uikey.ini\", \"%programfiles(x86)%\\UltraISO\\uikey.ini\""
			}],
	   "URL":"http://www.ezbsystems.com/ultraiso/",
	   "CheckedDefault":true,
	   "Version":"9.6.5.3237",
	   "UnistallRegistry":"UltraISO_is1",
	   "Icon":"Install\\UltraISO\\icon.png"
	}
];