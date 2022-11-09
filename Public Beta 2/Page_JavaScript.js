/*
	Doodle Launcher 2022
	This .js file contains the JavaScript codes for Doodle Launcher.
	
	Code by Elmer F.
	
*/

var currentVersionNumber = "1.11 BETA"; //Version number
var VersionTitle = "1.11 BETA"; //Title that appears in the page title
var CompilationDate = "December 16, 2021"; //Latest compilation date
var ELMSUIVersion = "1.3.2"; //Version of the UI
var CopyrightTitle = "Content By ElmerF 2022"; //Text value for the footer copyright


function onloadEvents(){
	checkConnectivity();
	checkWindowSize();
	closeLoadingScreen(); 
	var path = window.location.pathname;
	var page = path.split("/").pop();
	switch (page){
		case "Info.html":
		setCompilationDate();
		setELMSUIVersion();
		break;
	}
	
	var Sidebar_Fullscreen = document.getElementById("Sidebar_Fullscreen");
	Sidebar_Fullscreen.style.display = "none";
}


function setCompilationDate(){
	document.getElementById("CompilationDate").innerHTML="Last compiled: "+CompilationDate;
}

var sessionScreenState;
function sessionCheck(){
	if (sessionStorage.getItem("DL_UserOpened") === null) {
		console.log("Session key does not exist");
		sessionStorage.setItem("DL_UserOpened", "yes");
		console.log("Added session key");
		sessionScreenState = "visible";
		console.log(sessionScreenState);
		
		var today = new Date();
		var dd = String(today.getDate()).padStart(2, '0');
		var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
		var yyyy = today.getFullYear();
		today = mm + '/' + dd + '/' + yyyy;
		date = today;
		var d = new Date();
		var n = d.getDay();
		if (n == 0){
			var day = "Sunday";
		}
		if (n == 1){
			var day = "Monday";
		}
		if (n == 2){
			var day = "Tuesday";
		}
		if (n == 3){
			var day = "Wednesday";
		}
		if (n == 4){
			var day = "Thursday";
		}
		if (n == 5){
			var day = "Friday";
		}
		if (n == 6){
			var day = "Saturday";
		}
			document.getElementById("SessionScreen_Date").innerHTML = date+", "+day;
			console.log("Date updated");
		} else {
		var SessionScreen = document.getElementById("SessionScreen");
		SessionScreen.style.display = "none";
		sessionScreenState = "invisible";
	}
}

console.log(sessionScreenState);

function sessionScreenClose(){
	sessionScreenState = "invisible";
	console.log(sessionScreenState);
	var x = document.getElementById("SessionScreen");
	x.style.animationName = "loading";
	x.style.animationDuration = "0.5s";
	x.addEventListener("animationend",sessionScreenRemove);
	
}

function sessionScreenRemove(){
	var x = document.getElementById("SessionScreen");
	x.parentNode.removeChild(x);
}

console.log(sessionScreenState);


function setELMSUIVersion(){
	document.getElementById("ELMSUIVer").innerHTML = "ELMS UI Version "+ELMSUIVersion;
}

function setVersion2(){
	document.getElementById("CompilationDate").innerHTML = "Compiled last "+CompilationDate+".";
	document.getElementById("VersionTitle2").innerHTML="You're using Elmer's Launcher "+VersionTitle;
	document.getElementById("VersionTitle3").innerHTML="Elmer's Launcher "+VersionTitle;
}
function setVersion3(){
	document.getElementById("VersionTitle3").innerHTML="Elmer's Launcher "+VersionTitle;
}

function checkForUpdate(){
	var x = document.getElementById("UpdateNotif");
	if (window.getComputedStyle(x).display === "none") {
		document.getElementById('textbox_wifiStatus_icon').src =  "Icons/icon_download.png";
		document.getElementById("textbox_wifiStatus_text").innerHTML = "A new launcher update is available to download";
	}
}

function checkConnectivity(){
	
	var path = window.location.pathname;
	var page = path.split("/").pop();
	if (page == "Main.html"){
		if (navigator.onLine) {
			document.getElementById('InternetStatusImg').src =  "Icons/icon_wifi_online.png";
			document.getElementById('textbox_wifiStatus_icon').src =  "Icons/icon_wifi_online.png";
			var x = document.getElementById("Notif_InternetStatus");
			x.style.display = "none";
			document.getElementById("textbox_wifiStatus_text").innerHTML = "You're connected to the internet";
			} else {
			
			document.getElementById('InternetStatusImg').src =  "Icons/icon_wifi_offline.png";
			document.getElementById('textbox_wifiStatus_icon').src =  "Icons/icon_wifi_offline.png";
			var x = document.getElementById("Notif_InternetStatus");
			x.style.display = "grid";
			document.getElementById("textbox_wifiStatus_text").innerHTML = "You're not connected to the internet";
		}
		} else {
		if (navigator.onLine) {
			document.getElementById('InternetStatusImg').src =  "Icons/icon_wifi_online.png";
			var x = document.getElementById("Notif_InternetStatus");
			x.style.display = "none";
			} else {
			
			document.getElementById('InternetStatusImg').src =  "Icons/icon_wifi_offline.png";
			var x = document.getElementById("Notif_InternetStatus");
			x.style.display = "grid";
		}
	}
	
}






//Use for subwindows
//In the button, add the ID to be used for the function then onclick="trigger_Open_SubWindow(this.id)"
function trigger_Open_SubWindow(ID){
	var subwindowID = ID;
	switch (subwindowID){
		case "launcherupdate":
		var windowElement = document.getElementById("UpdateBox");
		//document.getElementById("WindowContainer").appendChild(x);
		break;
		case "remindersbox":
		var windowElement = document.getElementById("RemindersBox");
		break;
		case "customLinkBox":
		var windowElement = document.getElementById("customLinkBoxContainer");
		break;
		case "removeLinkBox":
		var windowElement = document.getElementById("LinkRemoverBoxContainer");
		break;
	}
	//Common opening animation
	windowElement.style.display = "block";
	windowElement.style.animationFillMode = "forwards";
	windowElement.style.animationName = "windowOpening";
	windowElement.style.animationDuration = "var(--Element-Transition-Delay)";
}

//Closing mechanism
//Add the element ID in the case statement *add a 2 at the end to differentiate it with the opening trigger
//In the button, add the ID to be used for the function then onclick="trigger_Close_SubWindow(this.id)"
function trigger_Close_SubWindow(ID){
	var subwindowID = ID;
	switch (subwindowID){
		case "launcherupdate2":
		var windowElement = document.getElementById("UpdateBox");
		break;
		case "remindersbox2":
		var windowElement = document.getElementById("RemindersBox");
		break;
		case "customLinkBox2":
		var windowElement = document.getElementById("customLinkBoxContainer");
		break;
		case "removeLinkBox2":
		var windowElement = document.getElementById("LinkRemoverBoxContainer");
		break;
	}
	windowElement.style.animationName = "windowClosing";
	windowElement.style.animationDuration = "var(--Element-Transition-Delay)";
	windowElement.style.animationFillMode = "forwards";
	setTimeout(function(){windowElement.style.display = "none";}, 300);
}



function toggle_Sidebar(){
	
	var PageGrid = document.getElementById("PageGrid");
	var SidebarContainer = document.getElementById("SidebarContainer");
	var MainContainer = document.getElementById("MainContainer");
	var SidebarText = document.getElementById("SidebarText");
	var SidebarIcons = document.getElementById("SidebarIcons");
	var Sidebar_Fullscreen = document.getElementById("Sidebar_Fullscreen");
	/*document.getElementById("test").innerHTML = bh_sidebar_expansion +" "+toggleState_Sidebar;*/
	if (toggleState_Sidebar == 1){
		//Open state
		if (windowSizePreset == "normal"){
			SidebarContainer.style.width = "18%";
			MainContainer.style.marginLeft = "21%";
			MainContainer.style.width = "78%";
			SidebarText.style.display = "grid";
			SidebarIcons.style.display = "none";
			toggleState_Sidebar = 0;
			} else if (windowSizePreset == "small"){
			SidebarContainer.style.width = "50px";
			MainContainer.style.marginLeft = "6%";
			MainContainer.style.width = "92%";
			SidebarText.style.display = "none";
			SidebarIcons.style.display = "flex";
			
			Sidebar_Fullscreen.style.height = "96%";
			Sidebar_Fullscreen.style.display = "block";
			Sidebar_Fullscreen.style.animationName = "sidebar_FS_opening";
			Sidebar_Fullscreen.style.animationDuration = "var(--Element-Transition-Delay)";
			
			toggleState_Sidebar = 0;
		}
		} else if (toggleState_Sidebar == 0){
		//Close state
		SidebarContainer.style.width = "50px";
		MainContainer.style.marginLeft = "6%";
		MainContainer.style.width = "92%";
		SidebarText.style.display = "none";
		SidebarIcons.style.display = "flex";
		
		Sidebar_Fullscreen.style.animationName = "sidebar_FS_closing";
		Sidebar_Fullscreen.style.animationDuration = "var(--Element-Transition-Delay)";
		Sidebar_Fullscreen.style.animationFillMode = "forwards";
		setTimeout(function(){Sidebar_Fullscreen.style.display = "none";}, 300);
		
		
		toggleState_Sidebar = 1;
		
		
	}
	
}

var windowSizePreset = "normal";
window.addEventListener('resize', checkWindowSize);
function checkWindowSize(){
	windowWidth = window.innerWidth;
	
	var Header_Buttons_Div = document.getElementById("Header_Buttons_Div");
	var Header_PageTitle = document.getElementById("Header_PageTitle");
	var Header_Clock = document.getElementById("Header_Clock");
	var Sidebar = document.getElementById("SidebarContainer");
	
	if (windowWidth < 750){
		windowSizePreset = "small";
		Header_Buttons_Div.style.display = "none";
		Header_PageTitle.style.display = "none";
		Sidebar.style.display = "none";
		
		var SidebarContainer = document.getElementById("SidebarContainer");
		var MainContainer = document.getElementById("MainContainer");
		SidebarContainer.style.width = "50px";
		MainContainer.style.marginLeft = "30px";
		MainContainer.style.width = "92%";
		
		var BasicSelect_Text = document.querySelectorAll(".Category_BasicSelect_Item_Text");
		for (var i = 0; i < BasicSelect_Text.length; i++) {
			var textSelect = BasicSelect_Text[i];
			textSelect.style.fontSize = "17px";
		}
		
		} else {
		windowSizePreset = "normal";
		Header_Buttons_Div.style.display = "flex";
		Header_PageTitle.style.display = "flex";
		Sidebar.style.display = "block";
		
		
		var BasicSelect_Text = document.querySelectorAll(".Category_BasicSelect_Item_Text");
		for (var i = 0; i < BasicSelect_Text.length; i++) {
			var textSelect = BasicSelect_Text[i];
			textSelect.style.fontSize = "20px";
		}
		
		
		
		toggle_Sidebar();
	}
	console.log(windowSizePreset);
}


