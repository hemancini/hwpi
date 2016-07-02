var BIOSManufacturer, BIOSVersion, SMBIOSVerison, BIOSCaption;
var BaseBoardManufacturer, BaseBoardModel;
var ChipsetManufacturer, ChipsetModel;
var VideoControllerName, SoundDeviceName, NetworkAdapterName, WirelessNetworkAdapterName, ModemName, HDDControllerName=[];
var CDROMName, CDBurnerName, KeyboardName, PointingDeviceName;
var PNPDID_VideoController, PNPDID_SoundDevice, PNPDID_NetworkAdapter, PNPDID_WirelessNetworkAdapter, PNPDID_Modem, PNPDID_HDDController=[], PNPDID_SystemEnclosureType;
var PNPDID_CDROM, PNPDID_CDBurner, PNPDID_Keyboard, PNPDID_PointingDevice;
var SystemEnclosureType;
var sysManufacturer, sysModel, sysPCType, sysType;
var sysArch;
var OSBits=32;
var sysPath64, sysPath32;
var TotalRAM, FreeRAM;
var IEver;
var hasDVDROMDrive=false, hasDVDBurnerDrive=false;
var DesktopLoaded;
var objWMIService, SWBemlocator, colItems, objItem, enumItems;
var OSProps, winMgts;
var wbemFlagReturnImmediately=0x10, wbemFlagForwardOnly=0x20;
var NOT_FOUND="Not found";
var szOSVerCache=NOT_FOUND, szEditionIDCache=NOT_FOUND, szServicePackCache=NOT_FOUND;
var PF_Drive, PF_InitialSize, PF_MaximumSize;

//************************************************
// wmi.js
//************************************************

function getOSBuildID() 
{ 
 position="wmi.js"; 
 whatfunc="getOSBuildID()"; 
 
        try 
 { 
      return WshShell.RegRead("HKLM\\Software\\Microsoft\\Windows NT\\CurrentVersion\\CurrentBuildNumber"); 
 } 
 catch(ex1) 
        {  
        }  
        return NOT_FOUND; 

}

function getOSvernum() { 
       position="wmi.js";  
		whatfunc="getOSvernum()"; 

	try 
        { 
                return WshShell.RegRead("HKLM\\Software\\Microsoft\\Windows NT\\CurrentVersion\\CurrentVersion"); 
        } 
        catch(ex1) 
        { 
        } 
        return NOT_FOUND; 
}

function getOSver() { 
        position="wmi.js"; 
        whatfunc="getOSver()"; 
 
        if (szOSVerCache==NOT_FOUND) // this function is called often - get it once and cache the result 
        { 
                try { 
                        objWMIService=GetObject("winmgmts:\\\\" + "." + "\\root\\CIMV2"); 
                        colItems=objWMIService.ExecQuery("SELECT * FROM Win32_OperatingSystem", "WQL", wbemFlagReturnImmediately | wbemFlagForwardOnly); 
                        enumItems=new Enumerator(colItems); 
                        objItem=enumItems.item(); 
 
                        var Caption=objItem.Caption; 
 
                        if (Caption.indexOf("8") != -1) 
                                szOSVerCache="Win8"; 
                        if (Caption.indexOf("7") != -1) 
                                szOSVerCache="Win7"; 
                        if (Caption.indexOf("2008") != -1) 
                                szOSVerCache="08"; 
                        if (Caption.indexOf("Vista") != -1) 
                                szOSVerCache="Vista"; 
                        if (Caption.indexOf("2003") != -1) 
                                szOSVerCache="03"; 
                        if (Caption.indexOf("XP") != -1) 
                                szOSVerCache="XP"; 
                        if (Caption.indexOf("2000") != -1) 
                                szOSVerCache="2K"; 
                } catch(ex) { 
					alert("getOSver(): " + ex.description);
                } 
        } 
        return szOSVerCache; 
}

function getOSeditionID() {
	position="wmi.js";
	whatfunc="getOSeditionID()";

	var Caption, OSSKU;

	if (szEditionIDCache==NOT_FOUND) // this function is called often - get it once and cache the result
	{
		try {
			objWMIService=GetObject("winmgmts:\\\\" + "." + "\\root\\CIMV2");
			colItems=objWMIService.ExecQuery("SELECT * FROM Win32_OperatingSystem", "WQL", wbemFlagReturnImmediately | wbemFlagForwardOnly);
			enumItems=new Enumerator(colItems);
			objItem=enumItems.item();

			Caption=objItem.Caption;
			OSSKU=objItem.OperatingSystemSKU;
			if (szOSVerCache=="Win8") 
				szEditionIDCache=getOSsku(OSSKU);
			if (szOSVerCache=="Win7")
				szEditionIDCache=getOSsku(OSSKU);
			if (szOSVerCache=="08")
				szEditionIDCache=getOSsku(OSSKU);
			if (szOSVerCache=="Vista")
				szEditionIDCache=getOSsku(OSSKU);
			if (szOSVerCache=="03")
			{
				if (Caption.indexOf("Standard") != -1)
					szEditionIDCache="Standard Edition";
				if (Caption.indexOf("Enterprise") != -1)
					szEditionIDCache="Enterprise Edition";
				if (Caption.indexOf("Web") != -1)
					szEditionIDCache="Web Edition";
				if (Caption.indexOf("Datacenter") != -1)
					szEditionIDCache="Datacenter Edition";
				if (Caption.indexOf("Itanium") != -1)
					szEditionIDCache="Itanium Edition";
			}
			if (szOSVerCache=="XP")
			{
				if (Caption.indexOf("Home") != -1)
					szEditionIDCache="Home Edition";
				if (Caption.indexOf("Professional") != -1)
					szEditionIDCache="Professional Edition";
			}
			if (szOSVerCache=="2K")
			{
				if (Caption.indexOf("Professional") != -1)
					szEditionIDCache="Professsional Edition";
				if (Caption.indexOf("2000 Server") != -1)
					szEditionIDCache="Server Edition";
				if (Caption.indexOf("2000 Advanced Server") != -1)
					szEditionIDCache="Advanced Server Edition";
				if (Caption.indexOf("Datacenter") != -1)
					szEditionIDCache="Datacenter Edition";
			}
		} catch(ex) { 
			alert("getOSeditionID(): " + ex.description);
		}
	}

	return szEditionIDCache;
}

function getOSsku(sku)
{
	position="wmi.js";
	whatfunc="getOSsku()";

	var OSSKU="Not found";

	switch (sku)
	{
		case 0:
			OSSKU="Not found";
			break;

		case 1:
			OSSKU="Ultimate Edition";
			break;

		case 2:
			OSSKU="Home Basic Edition";
			break;

		case 3:
			OSSKU="Home Basic Premium Edition";
			break;

		case 4:
			OSSKU="Enterprise Edition";
			break;

		case 5:
			OSSKU="Home Basic N Edition";
			break;

		case 6:
			OSSKU="Business Edition";
			break;

		case 7:
			OSSKU="Standard Server Edition";
			break;

		case 8:
			OSSKU="Datacenter Server Edition";
			break;

		case 9:
			OSSKU="Small Business Server Edition";
			break;

		case 10:
			OSSKU="Enterprise Server Edition";
			break;

		case 11:
			OSSKU="Starter Edition";
			break;

		case 12:
			OSSKU="Datacenter Server Core Edition";
			break;

		case 13:
			OSSKU="Standard Server Core Edition";
			break;

		case 14:
			OSSKU="Enterprise Server Core Edition";
			break;

		case 15:
			OSSKU="Enterprise Server Edition for Itanium-Based Systems";
			break;

		case 16:
			OSSKU="Business N Edition";
			break;

		case 17:
			OSSKU="Web Server Edition";
			break;

		case 18:
			OSSKU="Cluster Server Edition";
			break;

		case 19:
			OSSKU="Home Server Edition";
			break;

		case 20:
			OSSKU="Storage Express Server Edition";
			break;

		case 21:
			OSSKU="Storage Standard Server Edition";
			break;

		case 22:
			OSSKU="Storage Workgroup Server Edition";
			break;

		case 23:
			OSSKU="Storage Enterprise Server Edition";
			break;

		case 24:
			OSSKU="Server For Small Business Edition";
			break;

		case 25:
			OSSKU="Small Business Server Premium Edition";
			break;
			
		case 27:
			OSSKU="Enterprise N Edition";
			break;

		case 48:
			OSSKU="Pro Edition";
			break;

		case 49:
			OSSKU="Professional N Edition";
			break;

		case 72:
			OSSKU="Enterprise Evaluation Edition";
			break;

		case 98:
			OSSKU="8 N Edition";
			break;

		case 99:
			OSSKU="8 China Edition";
			break;

		case 100:
			OSSKU="8 Single Language Edition";
			break;

		case 101:
			OSSKU="8 Core Edition";
			break; 

		case 103:
			OSSKU="Professional Edition with Media Center";
			break;
               
 }

 return OSSKU;
}


function getSPver()
{
	position="wmi.js";
	whatfunc="getSPver()";

	if (szServicePackCache==NOT_FOUND) // this function is called often - get it once and cache the result
	{
		try
		{
			objWMIService=GetObject("winmgmts:\\\\" + "." + "\\root\\CIMV2");
			colItems=objWMIService.ExecQuery("SELECT * FROM Win32_OperatingSystem", "WQL", wbemFlagReturnImmediately | wbemFlagForwardOnly);
			enumItems=new Enumerator(colItems);
			objItem=enumItems.item();

			szServicePackCache=objItem.ServicePackMajorVersion;
		}
		catch(ex)
		{
			var sp="";

			try
			{
				sp=WshShell.RegRead("HKLM\\Software\\Microsoft\\Windows NT\\CurrentVersion\\CSDVersion");
			}
			catch(ex)
			{ ; }

			if (sp != "")
			{
				szServicePackCache=sp.substr(sp.length-1,1);
			}
		}
	}

	return szServicePackCache;
}

// function getOSlang()
// {
// 	position="wmi.js";
// 	whatfunc="getOSlang()";

// 	return oslang;
// }

// function getOSlocale()
// {
// 	position="wmi.js";
// 	whatfunc="getOSlocale()";

// 	return oslocale;
// }

function getIEver()
{
	position="wmi.js";
	whatfunc="getIEver()";

	IEver=WshShell.RegRead("HKLM\\Software\\Microsoft\\Internet Explorer\\Version");

	if (IEver.substr(0,4) == "9.10")
	{
		IEver=WshShell.RegRead("HKLM\\Software\\Microsoft\\Internet Explorer\\svcVersion").substr(0,4);
	}
	else
	{
		if (IEver.substr(1,1) == ".")
		{
			IEver=IEver.substr(0,3);
		}
		else
		{
			IEver=IEver.substr(0,4);
		}
	}

	return IEver;
}

function getArch() { 
 position="wmi.js"; 
 whatfunc="getArch()"; 
 
 sysArch=WshShell.RegRead("HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Environment\\PROCESSOR_ARCHITECTURE"); 
 
 return sysArch; 
} 
 
function getArchNumProcs() { 
 position="wmi.js"; 
 whatfunc="getArchNumProcs()"; 
 
 try 
 { 
  objWMIService=GetObject("winmgmts:\\\\" + "." + "\\root\\CIMV2"); 
  colItems=objWMIService.ExecQuery("SELECT * FROM Win32_ComputerSystem", "WQL", wbemFlagReturnImmediately | wbemFlagForwardOnly); 
 
  enumItems=new Enumerator(colItems); 
  for (; !enumItems.atEnd(); enumItems.moveNext()) 
  { 
   objItem=enumItems.item(); 
   NumberOfProcessors=objItem.NumberOfProcessors; 
   break; 
  } 
 } 
 catch(ex) 
 { 
  NumberOfProcessors="n/a"; 
 } 
 
 return NumberOfProcessors; 
} 
 
function getArchNumOfCores() 
{ 
 position="wmi.js"; 
 whatfunc="getArchNumOfCores()"; 
 
 try 
 { 
  objWMIService=GetObject("winmgmts:\\\\" + "." + "\\root\\CIMV2"); 
  colItems=objWMIService.ExecQuery("SELECT * FROM Win32_Processor", "WQL", wbemFlagReturnImmediately | wbemFlagForwardOnly); 
 
  enumItems=new Enumerator(colItems); 
  for (; !enumItems.atEnd(); enumItems.moveNext()) 
  { 
   objItem=enumItems.item(); 
   NumberOfCores=objItem.NumberOfCores; 
   break; 
  } 
 } 
 catch(ex) 
 { 
  NumberOfCores="n/a"; 
 } 
 
 return NumberOfCores; 
} 
 
function getArchNumLogicalProcs() { 
 position="wmi.js"; 
 whatfunc="getArchNumLogicalProcs()"; 
 
 try 
 { 
  objWMIService=GetObject("winmgmts:\\\\" + "." + "\\root\\CIMV2"); 
  colItems=objWMIService.ExecQuery("SELECT * FROM Win32_ComputerSystem", "WQL", wbemFlagReturnImmediately | wbemFlagForwardOnly); 
 
  enumItems=new Enumerator(colItems); 
  for (; !enumItems.atEnd(); enumItems.moveNext()) 
  { 
   objItem=enumItems.item(); 
   NumberOfLogicalProcessors=objItem.NumberOfLogicalProcessors; 
   break; 
  } 
 } 
 catch(ex) 
 { 
  NumberOfLogicalProcessors="n/a"; 
 } 
 
 return NumberOfLogicalProcessors; 
}

function getBits() 
{ 
        position="wmi.js"; 
        whatfunc="getBits()"; 
 
        OSBits=(sysArch=="AMD64" || sysArch=="IA64") ? 64 : 32; 
 
        return OSBits; 
}

function setArchPaths() {
	position="wmi.js";
	whatfunc="setArchPaths()";

	if (OSBits == 32)
	{
		sysPath64="";
		sysPath32="";
	}
	else
	{
		sysPath64=windir+"\\System32\\";
		sysPath32=windir+"\\SysWOW64\\";
	}
}

function getArchName()
{
	position="wmi.js";
	whatfunc="getArchName()";

	return RegKeyValue("HKEY_LOCAL_MACHINE\\HARDWARE\\DESCRIPTION\\System\\CentralProcessor\\0\\VendorIdentifier");
}

function getArchNameString()
{
	position="wmi.js";
	whatfunc="getArchNameString()";

	return RegKeyValue("HKEY_LOCAL_MACHINE\\HARDWARE\\DESCRIPTION\\System\\CentralProcessor\\0\\ProcessorNameString");
}

function getArchIdentifier()
{
	position="wmi.js";
	whatfunc="getArchIdentifier()";

	return RegKeyValue("HKEY_LOCAL_MACHINE\\HARDWARE\\DESCRIPTION\\System\\CentralProcessor\\0\\Identifier");
}

function getArchMHz()
{
	position="wmi.js";
	whatfunc="getArchMHz()";

	return RegKeyValue("HKEY_LOCAL_MACHINE\\HARDWARE\\DESCRIPTION\\System\\CentralProcessor\\0\\~MHz");
}

function getBaseBoardManufacturer()
{
	position="wmi.js";
	whatfunc="getBaseBoardManufacturer()";

	BaseBoardManufacturer="n/a";

	try
	{
		objWMIService=GetObject("winmgmts:\\\\" + "." + "\\root\\CIMV2");
		colItems=objWMIService.ExecQuery("SELECT * FROM Win32_BaseBoard", "WQL", wbemFlagReturnImmediately | wbemFlagForwardOnly);

		enumItems=new Enumerator(colItems);
		for (; !enumItems.atEnd(); enumItems.moveNext())
		{
			objItem=enumItems.item();
			BaseBoardManufacturer=objItem.Manufacturer;
			break;
		}
	}
	catch(ex)
	{
		BaseBoardManufacturer="n/a";
	}

	return BaseBoardManufacturer;
}

function getBaseBoardModel()
{
	position="wmi.js";
	whatfunc="getBaseBoardModel()";

	BaseBoardModel="n/a";

	try
	{
		objWMIService=GetObject("winmgmts:\\\\" + "." + "\\root\\CIMV2");
		colItems=objWMIService.ExecQuery("SELECT * FROM Win32_BaseBoard", "WQL", wbemFlagReturnImmediately | wbemFlagForwardOnly);

		enumItems=new Enumerator(colItems);
		for (; !enumItems.atEnd(); enumItems.moveNext())
		{
			objItem=enumItems.item();
			BaseBoardModel=objItem.Product;
			break;
		}
	}
	catch(ex)
	{
		BaseBoardModel="n/a";
	}

	return BaseBoardModel;
}

function getVideoControllerID()
{
	position="wmi.js";
	whatfunc="getVideoControllerID()";

	VideoControllerName="n/a";
	PNPDID_VideoController="n/a";

	try
	{
		objWMIService=GetObject("winmgmts:\\\\" + "." + "\\root\\CIMV2");
		colItems=objWMIService.ExecQuery("SELECT * FROM Win32_VideoController", "WQL", wbemFlagReturnImmediately | wbemFlagForwardOnly);

		enumItems=new Enumerator(colItems);
		for (; !enumItems.atEnd(); enumItems.moveNext())
		{
			objItem=enumItems.item();
			if (objItem.PNPDeviceID.indexOf("PCI\\VEN_")==0)
			{
				VideoControllerName=objItem.Name;
				PNPDID_VideoController=objItem.PNPDeviceID;
				break;
			}
		}
	}
	catch(ex)
	{
		VideoControllerName="n/a";
		PNPDID_VideoController="n/a";
	}

	return PNPDID_VideoController;
}

function getSoundDeviceID()
{
	position="wmi.js";
	whatfunc="getSoundDeviceID()";

	SoundDeviceName="n/a";
	PNPDID_SoundDevice="n/a";

	try
	{
		objWMIService=GetObject("winmgmts:\\\\" + "." + "\\root\\CIMV2");
		colItems=objWMIService.ExecQuery("SELECT * FROM Win32_SoundDevice", "WQL", wbemFlagReturnImmediately | wbemFlagForwardOnly);

		enumItems=new Enumerator(colItems);
		for (; !enumItems.atEnd(); enumItems.moveNext())
		{
			objItem=enumItems.item();
			if (objItem.PNPDeviceID.indexOf("PCI\\VEN_") != 0)
			{
				SoundDeviceName=objItem.ProductName;
				PNPDID_SoundDevice=objItem.PNPDeviceID;
				break;
			}
		}
	}
	catch(ex)
	{
		SoundDeviceName="n/a";
		PNPDID_SoundDevice="n/a";
	}

	return PNPDID_SoundDevice;
}

function getNetworkAdapterID()
{
	position="wmi.js";
	whatfunc="getNetworkAdapterID()";

	NetworkAdapterName="n/a";
	PNPDID_NetworkAdapter="n/a";

	try
	{
		objWMIService=GetObject("winmgmts:\\\\" + "." + "\\root\\CIMV2");
		colItems=objWMIService.ExecQuery("SELECT * FROM Win32_NetworkAdapter", "WQL", wbemFlagReturnImmediately | wbemFlagForwardOnly);

		enumItems=new Enumerator(colItems);
		for (; !enumItems.atEnd(); enumItems.moveNext())
		{
			objItem=enumItems.item();
			if (objItem.AdapterType=="Ethernet 802.3" && objItem.PNPDeviceID.indexOf("PCI\\VEN_")==0 && objItem.ProductName.toUpperCase().indexOf("WIRELESS")==-1)
			{
				NetworkAdapterName=objItem.ProductName;
				PNPDID_NetworkAdapter=objItem.PNPDeviceID;
				break;
			}
		}
	}
	catch(ex)
	{
		NetworkAdapterName="n/a";
		PNPDID_NetworkAdapter="n/a";
	}

	return PNPDID_NetworkAdapter;
}

function getWirelessNetworkAdapterID()
{
	position="wmi.js";
	whatfunc="getWirelessNetworkAdapterID()";

	WirelessNetworkAdapterName="n/a";
	PNPDID_WirelessNetworkAdapter="n/a";

	try
	{
		objWMIService=GetObject("winmgmts:\\\\" + "." + "\\root\\CIMV2");
		colItems=objWMIService.ExecQuery("SELECT * FROM Win32_NetworkAdapter", "WQL", wbemFlagReturnImmediately | wbemFlagForwardOnly);

		enumItems=new Enumerator(colItems);
		for (; !enumItems.atEnd(); enumItems.moveNext())
		{
			objItem=enumItems.item();
			if (objItem.AdapterType=="Ethernet 802.3" && objItem.PNPDeviceID.indexOf("PCI\\VEN_")==0 && objItem.ProductName.toUpperCase().indexOf("WIRELESS") != -1)
			{
				WirelessNetworkAdapterName=objItem.ProductName;
				PNPDID_WirelessNetworkAdapter=objItem.PNPDeviceID;
				break;
			}
		}
	}
	catch(ex)
	{
		WirelessNetworkAdapterName="n/a";
		PNPDID_WirelessNetworkAdapter="n/a";
	}

	return PNPDID_WirelessNetworkAdapter;
}

function getModemID()
{
	position="wmi.js";
	whatfunc="getModemID()";

	ModemName="n/a";
	PNPDID_Modem="n/a";

	try
	{
		objWMIService=GetObject("winmgmts:\\\\" + "." + "\\root\\CIMV2");
		colItems=objWMIService.ExecQuery("SELECT * FROM Win32_POTSModem", "WQL", wbemFlagReturnImmediately | wbemFlagForwardOnly);

		enumItems=new Enumerator(colItems);
		for (; !enumItems.atEnd(); enumItems.moveNext())
		{
			objItem=enumItems.item();
			if (objItem.PNPDeviceID.indexOf("PCI\\VEN_")==0)
			{
				ModemName=objItem.Name;
				PNPDID_Modem=objItem.PNPDeviceID;
				break;
			}
		}
	}
	catch(ex)
	{
		ModemName="n/a";
		PNPDID_Modem="n/a";
	}

	return PNPDID_Modem;
}

function getHDDControllerID(id)
{
	position="wmi.js";
	whatfunc="getHDDControllerID()";

	for (var i=0; i<PNPDID_HDDController.length; i++)
	{
		if (PNPDID_HDDController[i].indexOf(id) != -1)
			return true;
	}

	return false;
}

function getHDDControllerIDs()
{
	position="wmi.js";
	whatfunc="getHDDControllerIDs()";

	var i=0;

	HDDControllerName.splice(0,HDDControllerName.length);
	PNPDID_HDDController.splice(0,PNPDID_HDDController.length);

	HDDControllerName[0]="n/a";
	PNPDID_HDDController[0]="n/a";

	try
	{
		objWMIService=GetObject("winmgmts:\\\\" + "." + "\\root\\CIMV2");
		colItems=objWMIService.ExecQuery("SELECT * FROM Win32_IDEController", "WQL", wbemFlagReturnImmediately | wbemFlagForwardOnly);

		enumItems=new Enumerator(colItems);
		for (; !enumItems.atEnd(); enumItems.moveNext())
		{
			objItem=enumItems.item();
			if (objItem.PNPDeviceID.indexOf("PCI\\VEN_")==0)
			{
				HDDControllerName[i]=objItem.Name;
				PNPDID_HDDController[i]=objItem.PNPDeviceID;
				i++;
			}
		}
	}
	catch(ex)
	{
		if (i==0)
		{
			HDDControllerName[0]="n/a";
			PNPDID_HDDController[0]="n/a";
		}
	}

	try
	{
		objWMIService=GetObject("winmgmts:\\\\" + "." + "\\root\\CIMV2");
		colItems=objWMIService.ExecQuery("SELECT * FROM Win32_SCSIController", "WQL", wbemFlagReturnImmediately | wbemFlagForwardOnly);

		enumItems=new Enumerator(colItems);
		for (; !enumItems.atEnd(); enumItems.moveNext())
		{
			objItem=enumItems.item();
			if (objItem.PNPDeviceID.indexOf("PCI\\VEN_")==0 || objItem.PNPDeviceID.indexOf("SCSI\\DISK&VEN_")==0)
			{
				HDDControllerName[i]=objItem.Name;
				PNPDID_HDDController[i]=objItem.PNPDeviceID;
				i++;
			}
		}
	}
	catch(ex)
	{
		if (i==0)
		{
			HDDControllerName[0]="n/a";
			PNPDID_HDDController[0]="n/a";
		}
	}

	return PNPDID_HDDController[0];
}

function getCDROMID()
{
	position="wmi.js";
	whatfunc="getCDROMID()";

	CDROMName="n/a";
	PNPDID_CDROM="n/a";

	try
	{
		objWMIService=GetObject("winmgmts:\\\\" + "." + "\\root\\CIMV2");
		colItems=objWMIService.ExecQuery("SELECT * FROM Win32_CDROMDrive", "WQL", wbemFlagReturnImmediately | wbemFlagForwardOnly);

		enumItems=new Enumerator(colItems);
		for (; !enumItems.atEnd(); enumItems.moveNext())
		{
			objItem=enumItems.item();
			if (objItem.PNPDeviceID.indexOf("\\CDROM") != -1)
			{
				if (objItem.MediaType.toUpperCase().indexOf("CD-ROM") != -1 && objItem.PNPDeviceID.toUpperCase().indexOf("DVD")==-1)
				{
					CDROMName=objItem.Name;
					PNPDID_CDROM=objItem.PNPDeviceID;
					hasDVDROMDrive=false;
					break;
				}
				if (objItem.MediaType.toUpperCase().indexOf("DVD-ROM") != -1 || objItem.PNPDeviceID.toUpperCase().indexOf("DVD") != -1)
				{
					CDROMName=objItem.Name;
					PNPDID_CDROM=objItem.PNPDeviceID;
					hasDVDROMDrive=true;
					break;
				}
			}
		}
	}
	catch(ex)
	{
		CDROMName="n/a";
		PNPDID_CDROM="n/a";
		hasDVDROMDrive=false;
	}

	return PNPDID_CDROM;
}

function getCDBurnerID()
{
	position="wmi.js";
	whatfunc="getCDBurnerID()";

	CDBurnerName="n/a";
	PNPDID_CDBurner="n/a";

	try
	{
		objWMIService=GetObject("winmgmts:\\\\" + "." + "\\root\\CIMV2");
		colItems=objWMIService.ExecQuery("SELECT * FROM Win32_CDROMDrive", "WQL", wbemFlagReturnImmediately | wbemFlagForwardOnly);

		enumItems=new Enumerator(colItems);
		for (; !enumItems.atEnd(); enumItems.moveNext())
		{
			objItem=enumItems.item();
			if (objItem.PNPDeviceID.indexOf("\\CDROM") != -1)
			{
				if (objItem.MediaType.toUpperCase().indexOf("CD WRITER") != -1 || objItem.PNPDeviceID.toUpperCase().indexOf("CDRW") != -1)
				{
					CDBurnerName=objItem.Name;
					PNPDID_CDBurner=objItem.PNPDeviceID;
					hasDVDBurnerDrive=false;
					break;
				}
				if (objItem.MediaType.toUpperCase().indexOf("DVD WRITER") != -1)
				{
					CDBurnerName=objItem.Name;
					PNPDID_CDBurner=objItem.PNPDeviceID;
					hasDVDBurnerDrive=true;
					break;
				}
			}
		}
	}
	catch(ex)
	{
		CDBurnerName="n/a";
		PNPDID_CDBurner="n/a";
		hasDVDBurnerDrive=false;
	}

	return PNPDID_CDBurner;
}

function getKeyboardID()
{
	position="wmi.js";
	whatfunc="getKeyboardID()";

	KeyboardName="n/a";
	PNPDID_Keyboard="n/a";

	try
	{
		objWMIService=GetObject("winmgmts:\\\\" + "." + "\\root\\CIMV2");
		colItems=objWMIService.ExecQuery("SELECT * FROM Win32_Keyboard", "WQL", wbemFlagReturnImmediately | wbemFlagForwardOnly);

		enumItems=new Enumerator(colItems);
		for (; !enumItems.atEnd(); enumItems.moveNext())
		{
			objItem=enumItems.item();
			if (objItem.PNPDeviceID.indexOf("ACPI\\PNP") != 0 || objItem.PNPDeviceID.indexOf("HID\\VID_") != 0)
			{
				KeyboardName=objItem.Name;
				PNPDID_Keyboard=objItem.PNPDeviceID;
				break;
			}
		}
	}
	catch(ex)
	{
		KeyboardName="n/a";
		PNPDID_Keyboard="n/a";
	}

	return PNPDID_Keyboard;
}

function getPointingDeviceID()
{
	position="wmi.js";
	whatfunc="getPointingDeviceID()";

	PointingDeviceName="n/a";
	PNPDID_PointingDevice="n/a";

	try
	{
		objWMIService=GetObject("winmgmts:\\\\" + "." + "\\root\\CIMV2");
		colItems=objWMIService.ExecQuery("SELECT * FROM Win32_PointingDevice", "WQL", wbemFlagReturnImmediately | wbemFlagForwardOnly);

		enumItems=new Enumerator(colItems);
		for (; !enumItems.atEnd(); enumItems.moveNext())
		{
			objItem=enumItems.item();
			if (objItem.PNPDeviceID.indexOf("ACPI\\PNP") != 0 || objItem.PNPDeviceID.indexOf("HID\\VID_") != 0)
			{
				PointingDeviceName=objItem.Name;
				PNPDID_PointingDevice=objItem.PNPDeviceID;
				break;
			}
		}
	}
	catch(ex)
	{
		PointingDeviceName="n/a";
		PNPDID_PointingDevice="n/a";
	}

	return PNPDID_PointingDevice;
}

function getSystemEnclosureType() 
{ 
 position="wmi.js"; 
 whatfunc="getSystemEnclosureType()"; 
 
 var Chassis=0; 
 
 try 
 { 
  objWMIService=GetObject("winmgmts:\\\\" + "." + "\\root\\CIMV2"); 
  colItems=objWMIService.ExecQuery("SELECT * FROM Win32_SystemEnclosure", "WQL", wbemFlagReturnImmediately | wbemFlagForwardOnly); 
 
         enumItems=new Enumerator(colItems); 
  for (; !enumItems.atEnd(); enumItems.moveNext()) 
  { 
   objItem=enumItems.item(); 
   Chassis=objItem.ChassisTypes(0); 
 
              try  
              {  
                  Chassis=objItem.ChassisTypes(0);  
 
                  } 
                  catch(ex)  
                  {  
                     SystemEnclosureType:"null";  
                  } 
  
                        if (Chassis==null) 
    Chassis=0; 
   switch(Chassis) 
   { 
                           case 'undefined': 
             case 0: 
              SystemEnclosureType="Unspecified"; 
              break; 
 
             case 1: 
              SystemEnclosureType="Other"; 
              break; 
 
             case 2: 
              SystemEnclosureType="Unknown"; 
              break; 
 
             case 3: 
              SystemEnclosureType="Desktop"; 
              break; 
 
             case 4: 
              SystemEnclosureType="Low Profile Desktop"; 
              break; 
 
             case 5: 
              SystemEnclosureType="Pizza Box"; 
              break; 
 
             case 6: 
              SystemEnclosureType="Mini Tower"; 
              break; 
 
             case 7: 
              SystemEnclosureType="Tower"; 
              break; 
 
             case 8: 
              SystemEnclosureType="Portable"; 
              break; 
 
             case 9: 
              SystemEnclosureType="Laptop"; 
              break; 
 
             case 10: 
              SystemEnclosureType="Notebook"; 
              break; 
 
             case 11: 
              SystemEnclosureType="Handheld";   // WPI is not available for Handheld 
              break; 
 
             case 12: 
              SystemEnclosureType="Docking Station"; 
              break; 
                           } 
            break; 
            } 
        } 
        catch(ex) 
        { 
            SystemEnclosureType="Unspecified"; 
 } 
 
 return SystemEnclosureType; 
}

function getSysManufacturer()
{
	position="wmi.js";
	whatfunc="getSysManufacturer()";

	sysManufacturer="n/a";

	try
	{
		objWMIService=GetObject("winmgmts:\\\\" + "." + "\\root\\CIMV2");
		colItems=objWMIService.ExecQuery("SELECT * FROM Win32_ComputerSystem", "WQL", wbemFlagReturnImmediately | wbemFlagForwardOnly);

		enumItems=new Enumerator(colItems);
		for (; !enumItems.atEnd(); enumItems.moveNext())
		{
			objItem=enumItems.item();
			sysManufacturer=objItem.Manufacturer;
			break;
		}
	}
	catch(ex)
	{
		sysManufacturer="n/a";
	}

	return sysManufacturer;
}

function getSysModel()
{
	position="wmi.js";
	whatfunc="getSysModel()";

	sysModel="n/a";

	try
	{
		objWMIService=GetObject("winmgmts:\\\\" + "." + "\\root\\CIMV2");
		colItems=objWMIService.ExecQuery("SELECT * FROM Win32_ComputerSystem", "WQL", wbemFlagReturnImmediately | wbemFlagForwardOnly);

		enumItems=new Enumerator(colItems);
		for (; !enumItems.atEnd(); enumItems.moveNext())
		{
			objItem=enumItems.item();
			sysModel=objItem.Model;
			break;
		}
	}
	catch(ex)
	{
		sysModel="n/a";
	}

	return sysModel;
}

function getSysPCType()
{
	position="wmi.js";
	whatfunc="getSysPCType()";

	var type=0;

	sysPCType="n/a";

	try
	{
		objWMIService=GetObject("winmgmts:\\\\" + "." + "\\root\\CIMV2");
		colItems=objWMIService.ExecQuery("SELECT * FROM Win32_ComputerSystem", "WQL", wbemFlagReturnImmediately | wbemFlagForwardOnly);

		enumItems=new Enumerator(colItems);
		for (; !enumItems.atEnd(); enumItems.moveNext())
		{
			objItem=enumItems.item();
			type=objItem.PCSystemType;
			if (type==null)
				type=0;
			switch(type)
			{
				case 'undefined':
				case 0:
					sysPCType="Unspecified";
					break;

				case 1:
					sysPCType="Desktop";
					break;

				case 2:
					sysPCType="Mobile";
					break;

				case 3:
					sysPCType="Workstation";
					break;

				case 4:
					sysPCType="Enterprise Server";
					break;

				case 5:
					sysPCType="Small Office and Home Office (SOHO) Server";
					break;

				case 6:
					sysPCType="Appliance PC";
					break;

				case 7:
					sysPCType="Performance Server";
					break;

				case 8:
					sysPCType="Maximum";
					break;

			}
			break;
		}
	}
	catch(ex)
	{
		sysPCType="Unspecified";
	}

	return sysPCType;
}

function getSysType()
{
	position="wmi.js";
	whatfunc="getSysType()";

	sysType="n/a";

	try
	{
		objWMIService=GetObject("winmgmts:\\\\" + "." + "\\root\\CIMV2");
		colItems=objWMIService.ExecQuery("SELECT * FROM Win32_ComputerSystem", "WQL", wbemFlagReturnImmediately | wbemFlagForwardOnly);

		enumItems=new Enumerator(colItems);
		for (; !enumItems.atEnd(); enumItems.moveNext())
		{
			objItem=enumItems.item();
			sysType=objItem.SystemType;
			break;
		}
	}
	catch(ex)
	{
		sysType="Unknown";
	}

	return sysType;
}

function getTotalRAM()
{
	position="wmi.js";
	whatfunc="getTotalRAM()";

	TotalRAM=0;

	try
	{
		objWMIService=GetObject("winmgmts:\\\\" + "." + "\\root\\CIMV2");
		colItems=objWMIService.ExecQuery("SELECT * FROM Win32_OperatingSystem", "WQL", wbemFlagReturnImmediately | wbemFlagForwardOnly);

		enumItems=new Enumerator(colItems);
		for (; !enumItems.atEnd(); enumItems.moveNext())
		{
			objItem=enumItems.item();
			TotalRAM=parseInt(objItem.TotalVisibleMemorySize/1024);
			break;
		}
	}
	catch(ex)
	{
		TotalRAM=0;
	}

	return TotalRAM;
}

function getFreeRAM()
{
	position="wmi.js";
	whatfunc="getFreeRAM()";

	FreeRAM=0;

	try
	{
		objWMIService=GetObject("winmgmts:\\\\" + "." + "\\root\\CIMV2");
		colItems=objWMIService.ExecQuery("SELECT * FROM Win32_OperatingSystem", "WQL", wbemFlagReturnImmediately | wbemFlagForwardOnly);

		enumItems=new Enumerator(colItems);
		for (; !enumItems.atEnd(); enumItems.moveNext())
		{
			objItem=enumItems.item();
			FreeRAM=parseInt(objItem.FreePhysicalMemory/1024);
			break;
		}
	}
	catch(ex)
	{
		FreeRAM=0;
	}

	return FreeRAM;
}

function getBIOSManufacturer()
{
	position="wmi.js";
	whatfunc="getBIOSManufacturer()";

	BIOSManufacturer="n/a";

	try
	{
		objWMIService=GetObject("winmgmts:\\\\" + "." + "\\root\\CIMV2");
		colItems=objWMIService.ExecQuery("SELECT * FROM Win32_BIOS", "WQL", wbemFlagReturnImmediately | wbemFlagForwardOnly);

		enumItems=new Enumerator(colItems);
		for (; !enumItems.atEnd(); enumItems.moveNext())
		{
			objItem=enumItems.item();
			BIOSManufacturer=objItem.Manufacturer;
			break;
		}
	}
	catch(ex)
	{
		BIOSManufacturer="n/a";
	}

	return BIOSManufacturer;
}

function getBIOSVersion()
{
	position="wmi.js";
	whatfunc="getBIOSVersion()";

	BIOSVersion="n/a";

	try
	{
		objWMIService=GetObject("winmgmts:\\\\" + "." + "\\root\\CIMV2");
		colItems=objWMIService.ExecQuery("SELECT * FROM Win32_BIOS", "WQL", wbemFlagReturnImmediately | wbemFlagForwardOnly);

		enumItems=new Enumerator(colItems);
		for (; !enumItems.atEnd(); enumItems.moveNext())
		{
			objItem=enumItems.item();
			BIOSVersion=objItem.SMBIOSBIOSVersion;
			break;
		}
	}
	catch(ex)
	{
		BIOSVersion="n/a";
	}

	return BIOSVersion;
}

function getSMBIOSVersion()
{
	position="wmi.js";
	whatfunc="getSMBIOSVersion()";

	SMBIOSVersion="n/a";

	try
	{
		objWMIService=GetObject("winmgmts:\\\\" + "." + "\\root\\CIMV2");
		colItems=objWMIService.ExecQuery("SELECT * FROM Win32_BIOS", "WQL", wbemFlagReturnImmediately | wbemFlagForwardOnly);

		enumItems=new Enumerator(colItems);
		for (; !enumItems.atEnd(); enumItems.moveNext())
		{
			objItem=enumItems.item();
			SMBIOSVersion=objItem.SMBIOSMajorVersion+"."+objItem.SMBIOSMinorVersion;
			break;
		}
	}
	catch(ex)
	{
		SMBIOSVersion="n/a";
	}

	return SMBIOSVersion;
}

function getBIOSCaption()
{
	position="wmi.js";
	whatfunc="getBIOSCaption()";

	BIOSCaption="n/a";

	try
	{
		objWMIService=GetObject("winmgmts:\\\\" + "." + "\\root\\CIMV2");
		colItems=objWMIService.ExecQuery("SELECT * FROM Win32_BIOS", "WQL", wbemFlagReturnImmediately | wbemFlagForwardOnly);

		enumItems=new Enumerator(colItems);
		for (; !enumItems.atEnd(); enumItems.moveNext())
		{
			objItem=enumItems.item();
			BIOSCaption=objItem.Caption;
			break;
		}
	}
	catch(ex)
	{
		BIOSCaption="n/a";
	}

	return BIOSCaption;
}

function getFirewallProduct()
{
	position="wmi.js";
	whatfunc="getFirewallProduct()";

	var FirewallProductName="";

	try
	{
		objWMIService=GetObject("winmgmts:\\\\" + "." + "\\root\\SecurityCenter" + (getOSver() != "XP" ? "2" : ""));
		colItems=objWMIService.ExecQuery("SELECT * FROM FirewallProduct", "WQL", wbemFlagReturnImmediately | wbemFlagForwardOnly);

		enumItems=new Enumerator(colItems);
		for (; !enumItems.atEnd(); enumItems.moveNext())
		{
			objItem=enumItems.item();
			FirewallProductName=objItem.displayName;
			break;
		}
	}
	catch(ex)
	{ ;	}

	return FirewallProductName;
}

function getAntiVirusProduct()
{
	position="wmi.js";
	whatfunc="getAntiVirusProduct()";

	var AVProduct="";

	try
	{
		objWMIService=GetObject("winmgmts:\\\\" + "." + "\\root\\SecurityCenter" + (getOSver() != "XP" ? "2" : ""));
		colItems=objWMIService.ExecQuery("SELECT * FROM AntiVirusProduct", "WQL", wbemFlagReturnImmediately | wbemFlagForwardOnly);

		enumItems=new Enumerator(colItems);
		for (; !enumItems.atEnd(); enumItems.moveNext())
		{
			objItem=enumItems.item();
			AVProduct=objItem.displayName;
			break;
		}
	}
	catch(ex)
	{ ;	}

	return AVProduct;
}

function TerminateProcess(id)
{
	position="wmi.js";
	whatfunc="TerminateProcess()";

	try
	{
		objWMIService=GetObject("winmgmts:\\\\" + "." + "\\root\\CIMV2");
		colItems=objWMIService.ExecQuery("SELECT * FROM Win32_Process WHERE Name='"+id+"'");

		enumItems=new Enumerator(colItems);
		for (; !enumItems.atEnd(); enumItems.moveNext())
		{
		    objItem=enumItems.item();
		    objItem.Terminate();
		}
	}
	catch(ex)
	{ ; }
}

function isInstalled(prog)
{
	position="wmi.js";
	whatfunc="isInstalled()";

	try
	{
		objWMIService=GetObject("winmgmts:\\\\" + "." + "\\root\\CIMV2");
		colItems=objWMIService.ExecQuery("SELECT * FROM Win32_Product", "WQL", wbemFlagReturnImmediately | wbemFlagForwardOnly);

		enumItems=new Enumerator(colItems);
		for (; !enumItems.atEnd(); enumItems.moveNext())
		{
			objItem=enumItems.item();
		    if (objItem.Caption==prog)
				return true;
		}
	}
	catch(ex)
	{
	}

	return false;
}

function isDesktopLoaded()
{
	position="wmi.js";
	whatfunc="isDesktopLoaded()";

	return DesktopLoaded;
}

function getSID(User)
{
	position="wmi.js";
	whatfunc="getSID()";

	try
	{
		objWMIService=GetObject("winmgmts:\\\\" + "." + "\\root\\CIMV2");
		colItems=objWMIService.ExecQuery("SELECT * FROM Win32_Account", "WQL", wbemFlagReturnImmediately | wbemFlagForwardOnly);

		enumItems=new Enumerator(colItems);
		for (; !enumItems.atEnd(); enumItems.moveNext())
		{
			objItem=enumItems.item();
			if (objItem.Name==User)
				return objItem.SID;
		}
	}
	catch(ex)
	{
		return "";
	}

	return "";
}

function CheckPendingFileRenameOperations()
{
	position="wmi.js";
	whatfunc="CheckPendingFileRenameOperations()";

	try
	{
		return RegValueExists("HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\PendingFileRenameOperations");

	}
	catch(ex)
	{
		return false;
	}

	return false;
}

function getAutoLogonCount()
{
	position="wmi.js";
	whatfunc="getAutoLogonCount()";

	try
	{
		return RegKeyValue("HKEY_LOCAL_MACHINE\\Software\\Microsoft\\Windows NT\\CurrentVersion\\Winlogon\AutoLogonCount");
	}
	catch(ex)
	{
		return -1;
	}

	return -1;
}

function setAutoLogonCount(count)
{
	position="wmi.js";
	whatfunc="setAutoLogonCount()";

	try
	{
		WriteRegKey("HKEY_LOCAL_MACHINE\\Software\\Microsoft\\Windows NT\\CurrentVersion\\Winlogon\\AutoLogonCount",count,"REG_SZ");

		return true;
	}
	catch(ex)
	{
		return false;
	}

	return false;
}

function pingSite(site)
{
	position="wmi.js";
	whatfunc="pingSite()";

	try
	{
		objWMIService=GetObject("winmgmts:\\\\" + "." + "\\root\\CIMV2");
		colItems=objWMIService.ExecQuery("SELECT * FROM Win32_PingStatus WHERE Address='"+site+"'");

		enumItems=new Enumerator(colItems);
		for (; !enumItems.atEnd(); enumItems.moveNext())
		{
			objItem=enumItems.item();
			if (objItem.StatusCode==0)
				return true;
			else
				return false;
		}
	}
	catch(ex)
	{
		return false;
	}

	return false;
}
