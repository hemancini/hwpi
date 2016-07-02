var fontDir, fontList="fonts.txt";

//************************************************
// registry_dos.js
//************************************************

function CreateRegKey(KeyBase)
{
	position="registry_dos.js";
	whatfunc="CreateRegKey()";

	var Hive;

	try
	{
		Hive=KeyBase.substring(0,KeyBase.indexOf("\\"));
		if (Hive=="HKEY_CLASSES_ROOT" || Hive=="HKCR")
		{
			Hive="HKCR";
			KeyBase=KeyBase.replace("HKEY_CLASSES_ROOT\\","").replace("HKCR\\","");
		}
		if (Hive=="HKEY_CURRENT_USER" || Hive=="HKCU")
		{
			Hive="HKCU";
			KeyBase=KeyBase.replace("HKEY_CURRENT_USER\\","").replace("HKCU\\","");
		}
		if (Hive=="HKEY_LOCAL_MACHINE" || Hive=="HKLM")
		{
			Hive="HKLM";
			KeyBase=KeyBase.replace("HKEY_LOCAL_MACHINE\\","").replace("HKLM\\","");
		}
		if (Hive=="HKEY_USERS" || Hive=="HKU")
		{
			Hive="HKU";
			KeyBase=KeyBase.replace("HKEY_USERS\\","").replace("HKU\\","");
		}
		if (Hive=="HKEY_CURRENT_CONFIG" || Hive=="HKCC")
		{
			Hive="HKCC";
			KeyBase=KeyBase.replace("HKEY_CURRENT_CONFIG\\","").replace("HKCC\\","");
		}

		registryToolsCreateKey(".",Hive,KeyBase)

		return true;
	}
	catch(ex)
	{
		return false;
	}
}

function RegKeyExists(KeyBase) 
{ 
        position="registry_dos.js"; 
        whatfunc="RegKeyExists()"; 
 
        try 
        { 
          WshShell.RegRead(KeyBase + '\\'); 
          return true; 
        } 
        catch(ex) 
        { 
           return false; 
        } 
} 
 
function RegValueExists(ValueBase) 
{ 
        position="registry_dos.js"; 
        whatfunc="RegValueExists()"; 
 
        try 
        { 
          WshShell.RegRead(ValueBase); 
          return true; 
        } 
        catch(ex) 
        { 
                return false; 
        } 
}

function RegKeyValue(KeyBase)
{
	position="registry_dos.js";
	whatfunc="RegKeyValue()";

	try
	{
	return WshShell.RegRead(KeyBase);
	}
	catch(ex)
	{
	return "";
	}
}

function WriteRegKey(KeyBase,KeyValue,KeyType)
{
	position="registry_dos.js";
	whatfunc="WriteRegKey()";

	var Hive, Key, SubKey;

	try
	{
		Hive=KeyBase.substring(0,KeyBase.indexOf("\\"));
		if (Hive=="HKEY_CLASSES_ROOT" || Hive=="HKCR")
		{
			Hive="HKCR";
			KeyBase=KeyBase.replace("HKEY_CLASSES_ROOT\\","").replace("HKCR\\","");
		}
		if (Hive=="HKEY_CURRENT_USER" || Hive=="HKCU")
		{
			Hive="HKCU";
			KeyBase=KeyBase.replace("HKEY_CURRENT_USER\\","").replace("HKCU\\","");
		}
		if (Hive=="HKEY_LOCAL_MACHINE" || Hive=="HKLM")
		{
			Hive="HKLM";
			KeyBase=KeyBase.replace("HKEY_LOCAL_MACHINE\\","").replace("HKLM\\","");
		}
		if (Hive=="HKEY_USERS" || Hive=="HKU")
		{
			Hive="HKU";
			KeyBase=KeyBase.replace("HKEY_USERS\\","").replace("HKU\\","");
		}
		if (Hive=="HKEY_CURRENT_CONFIG" || Hive=="HKCC")
		{
			Hive="HKCC";
			KeyBase=KeyBase.replace("HKEY_CURRENT_CONFIG\\","").replace("HKCC\\","");
		}
		Key=KeyBase.substring(0,KeyBase.lastIndexOf("\\"));
		SubKey=KeyBase.substring(KeyBase.lastIndexOf("\\")+1);

		registryToolsCreateKey(".",Hive,Key)
		registryToolsWriteValue(".", Hive,Key,SubKey,KeyType,KeyValue);

		return true;
	}
	catch(ex)
	{
		return false;
	}
}

function DeleteRegKey(KeyBase)
{
	position="registry_dos.js";
	whatfunc="DeleteRegKey()";

	try
	{
		WshShell.RegDelete(KeyBase);

		return true;
	}
	catch(ex)
	{
		return false;
	}
}

function FileExists(filespec)
{
	position="registry_dos.js";
	whatfunc="FileExists()";

	var val=filespec;

	val=val.replace(/\"/g,'');

	return fso.FileExists(val);
}

function fileVersionGreaterThan(fileVersion1,fileVersion2) 
{ 
    position="registry_dos.js"; 
    whatfunc="fileVersionGreaterThan()"; 
 
    var split1 = fileVersion1.toString().split("."), 
        split2 = fileVersion2.toString().split("."); 
 
    for (var i=0; i<split1.length; i++) 
    { 
        var split1int = parseInt(split1[i]), 
                split2int=parseInt(split2[i]); 
        if (!isNaN(split2int) && (split1int < split2int)) 
                return false; 
        else if (split1int > (isNaN(split2int) ? 0 : split2int)) 
                return true; 
    } 
 
    return false; 
}

function getFileVersion(filespec)
{
	position="registry_dos.js";
	whatfunc="getFileVersion()";

	var val=filespec;

	val=val.replace(/\"/g,'');

	try
	{
		return fso.getFileVersion(val);
	}
	catch(ex)
	{
		return 0;
	}
}

function GetFileVersion(filespec)
{
	position="registry_dos.js";
	whatfunc="GetFileVersion()";

	// Backward compatibility with upper case Get
	return getFileVersion(filespec);
}

function getFileSize(filespec)
{
	position="registry_dos.js";
	whatfunc="getFileSize()";

	try
	{
		tf=fso.GetFile(filespec);

		return tf.Size;
	}
	catch(ex)
	{ ; }

	return -1;
}

function getFileType(filespec)
{
	position="registry_dos.js";
	whatfunc="getFileType()";

	try
	{
		tf=fso.GetFile(filespec);

		return tf.Type;
	}
	catch(ex)
	{ ; }

	return "";
}

function FolderExists(filespec)
{
	position="registry_dos.js";
	whatfunc="FolderExists()";

	var val=filespec;

	val=val.replace(/\"/g,'');

	return fso.FolderExists(val);
}

function getFolderSize(filespec)
{
	position="registry_dos.js";
	whatfunc="getFolderSize()";

	try
	{
		tf=fso.GetFolder(filespec);

		return tf.Size;
	}
	catch(ex)
	{ ; }

	return -1;
}

function getDriveLetters(type)
{
	position="registry_dos.js";
	whatfunc="getDriveLetters()";

// types: 0=Unknown, 1=Removable, 2=Fixed Disk, 3=Network Share, 4=CDROM, 5=RAM Disk
	var da, en, ite;

	da=new Array();
	enumItems=new Enumerator(fso.Drives);
	for (; !enumItems.atEnd(); enumItems.moveNext())
	{
		ite=enumItems.item();
		if (ite.DriveType==type)
			da[da.length++]=(ite.DriveLetter + ":");
	}

	return da;
}

function GetDriveLetters(type)
{
	position="registry_dos.js";
	whatfunc="GetDriveLetters()";

	return getDriveLetters(type);
}

function DriveExists(letter)
{
	position="registry_dos.js";
	whatfunc="DriveExists()";

	return fso.DriveExists(letter);
}

function DriveType(letter)
{
	position="registry_dos.js";
	whatfunc="DriveType()";

// types: 0=Unknown, 1=Removable, 2=Fixed Disk, 3=Network Share, 4=CDROM, 5=RAM Disk
	var type, li=new Array();

	for (type=0; type<6; type++)
	{
		li=[];
		li=getDriveLetters(type);
		for (var i=0; i<li.length; i++)
		{
			if (li[i]==letter.toUpperCase())
				return driveTypes[type];
		}
	}

	return driveTypes[0];
}

function DriveVolumeName(letter)
{
	position="registry_dos.js";
	whatfunc="DriveVolumeName()";

	try
	{
		tf=fso.GetDrive(letter);

		return tf.VolumeName;
	}
	catch(ex)
	{ ; }

	return "";
}

function DriveShareName(letter)
{
	position="registry_dos.js";
	whatfunc="DriveShareName()";

	try
	{
		tf=fso.GetDrive(letter);

		return tf.ShareName;
	}
	catch(ex)
	{ ; }

	return "";
}

function DriveMappedLetter(share)
{
	position="registry_dos.js";
	whatfunc="DriveMappedLetter()";

	try
	{
		objWMIService=GetObject("winmgmts:\\\\" + "." + "\\root\\CIMV2");
		colItems=objWMIService.ExecQuery("SELECT * FROM Win32_LogicalDisk WHERE DriveType=4");

		enumItems=new Enumerator(colItems);
		for (; !enumItems.atEnd(); enumItems.moveNext())
		{
			objItem=enumItems.item();
			if (objItem.ProviderName==share)
				return objItem.DeviceID;
		}
	}
	catch(ex)
	{
		return "";
	}

	return "";
}

function DriveFileSystem(letter)
{
	position="registry_dos.js";
	whatfunc="DriveFileSystem()";

	try
	{
		tf=fso.GetDrive(letter);

		return tf.FileSystem;
	}
	catch(ex)
	{ ; }

	return "";
}

function DriveTotalSize(letter)
{
	position="registry_dos.js";
	whatfunc="DriveTotalSize()";

	try
	{
		tf=fso.GetDrive(letter);

		return parseInt(tf.TotalSize/1024000000);
	}
	catch(ex)
	{ ; }

	return -1;
}

function DriveAvailableSpace(letter)
{
	position="registry_dos.js";
	whatfunc="DriveAvailableSpace()";

	try
	{
		tf=fso.GetDrive(letter);

		return parseInt(tf.AvailableSpace/1024000000);
	}
	catch(ex)
	{ ; }

	return -1;
}

function getComSpec()
{
	position="registry_dos.js";
	whatfunc="getComSpec()";

	return WshShell.ExpandEnvironmentStrings("%COMSPEC%");
}

function hasDVDROM()
{
	position="registry_dos.js";
	whatfunc="hasDVDROM()";

	return hasDVDROMDrive;
}

function hasDVDBurner()
{
	position="registry_dos.js";
	whatfunc="hasDVDBurner()";

	return hasDVDBurnerDrive;
}

function hasDVDDrive()
{
	position="registry_dos.js";
	whatfunc="hasDVDDrive()";

	if (hasDVDROMDrive || hasDVDBurnerDrive)
		return true;
	else
		return false;
}

function getCDBurnerName()
{
	position="registry_dos.js";
	whatfunc="getCDBurnerName()";

	return CDBurnerName;
}

function MoveDirectory(cmd)
{
	position="registry_dos.js";
	whatfunc="MoveDirectory()";

	var fsoCmd=true;
	var cmd2, splits, src;

	cmd2=cmd;

	if (AlwaysShowOutputWindow)
		fsoCmd=false;

	try
	{
		RunCmd('CMD /C xcopy /C /I /E /Y /H /R '+cmd,fsoCmd ? 0 : 1,true);

		splits=cmd2.split('" "');
		src=splits[0]+'"';

		RunCmd('CMD /C rd /S /Q '+src,fsoCmd ? 0 : 1,true);
	}
	catch(ex)
	{
		return false;
	}

	return true;
}

function EjectCD(Drive)
{
	position="registry_dos.js";
	whatfunc="EjectCD()";

	var sa, fl;

	sa=new ActiveXObject("Shell.Application");

	try
	{
		fl=sa.NameSpace(Drive).Self;
		fl.InvokeVerb(getOSver()=="XP" ? "E&ject" : "Eject");
	}
	catch (ex)
	{ ;	}
}

function installFont(filename)
{
	position="registry_dos.js";
	whatfunc="installFont()";

	var fontName=filename.substring(filename.lastIndexOf("\\",filename.length));
	fontName=fontName.substr(1,fontName.length);

	if (FileExists(ReplacePath("%windir%\\Fonts\\"+fontName)))
		return;

	if (FileExists(filename))
		fontsFolder.CopyHere(filename);
}

function installFontsFromFile(filename)
{
	position="registry_dos.js";
	whatfunc="installFontsFromFile()";

	var f=fso.GetFile(filename)
	var strm=f.OpenAsTextStream(1,0);

	while(!strm.AtEndOfStream)
	{
		var thisFont=strm.ReadLine();
		if (thisFont != "" && thisFont.toUpperCase() != "[FONTS]") //skip header and blank lines
			installFont(fontDir + thisFont);
	}
	strm.close();
}

function installFontsFromFolder(folder)
{
	position="registry_dos.js";
	whatfunc="installFontsFromFolder()";

	var thisFolder=fso.GetFolder(folder);

	enumItems=new Enumerator(thisFolder.Files);

	for (; !enumItems.atEnd(); enumItems.moveNext())
	{
		var thisFont=enumItems.item();

		if (thisFont.name != fontList)
			installFont(thisFont.Path);
	}
}
