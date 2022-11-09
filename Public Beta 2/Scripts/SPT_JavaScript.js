/*
	DL_Javascript.js
	This file contains all the JavaScript functionality for Doodle Launcher
*/

var VersionTitle = "Searchable Periodic Table";
var VersionNumber = "Public Beta 2";
var ContinuityVersionNumber = "1.1"
var CopyrightTitle = "Content By ElmerF 2022";
var ELMSUIVersion = "1.4";
var CompilationDate = "Pending";
var path = window.location.pathname;
var PageName = path.split("/").pop();

var enableGreetings;
var pageProperty_enableGreetings;

var Behavior_DisplayCategoryNavigation = true;

function OnloadTasks_Onboarding(){
	var Onboarding_PageElements = document.querySelectorAll(".Onboarding_Process_Page");
	for (a = 1; a < Onboarding_PageElements.length; a++){
		Onboarding_PageElements[a].style.display = "none";
	}
}
function OnloadTasks(){	
	Settings_LoadAppearance();
	set_Version_General();
	close_LoadingScreen();
	sessionCheck();
	startTime();
	startDate();
	generate_Launcher_NavigationList();
	check_Connection();
	check_WindowSize();
	toggle_Navigator();
	var path = window.location.pathname;
	var PageName = path.split("/").pop();
	console.log("Welcome to "+VersionTitle+" "+VersionNumber+" ("+ContinuityVersionNumber+"). Copyright "+CopyrightTitle);
	switch (PageName){
		case "SPT_Main.html":
			var pageProperty_enableGreetings = 1;
			var pageProperty_showSidebarToggle = 0;
			var pageProperty_enableSidebar = 0;
			var pageProperty_enableCategoryLabelIcons = 0;
			var pageProperty_enableTabContainers = 0;
			enableGreetings = 1;
			break;
	}
	console.log("Setting page properties with the following values: "+pageProperty_showSidebarToggle+" | "+pageProperty_enableCategoryLabelIcons+" | "+pageProperty_enableSidebar+" | "+pageProperty_enableTabContainers);
	if (pageProperty_showSidebarToggle == 1){
		document.getElementById("pageElement_Header").style.gridTemplateColumns = "30px auto 1fr auto auto auto"; //Includes the sidebar toggle to the grid
		document.getElementById("pageElement_MainContent").style.paddingLeft = "50px"; //Changes the container padding
	} else {
		document.getElementById("toggle_Sidebar").style.display = "none";
	}
	if (pageProperty_enableCategoryLabelIcons == 1){
		var Category_Label = document.querySelectorAll(".Category_Label"); //The div for category labels
		var Category_Label_Icon = document.querySelectorAll(".Category_Label_Icon"); //The category icon
		for (var i = 0; i < Category_Label.length; i++) { //Changes the setting of category label div so the icon can appear
			var Label = Category_Label[i];
			var LabelIcon = Category_Label_Icon[i];
			Label.style.gridTemplateColumns = "30px 1fr 30px"; //Changes the label grid arrangement to take into account the icon
			LabelIcon.style.display = "block"; //Makes the label icon visible
		}
	}
	if (pageProperty_enableSidebar == 1){
		document.getElementById("pageElement_Sidebar").style.display = "grid"; //Shows the sidebar
		document.getElementById("pageElement_MainContent").style.paddingLeft = "50px"; //Changes the container padding 
		
	}
	if (pageProperty_enableTabContainers == 1){
		var tabs = document.querySelectorAll(".Tab_Container");
		for(a = 0; a < tabs.length; a++){
			tabs[a].style.display = "none";
		}
	}
	dev_update_RefreshNumber();
}

function apply_pageProperties(){
	document.getElementById("pageElement_Header").style.gridTemplateColumns = "auto 1fr auto auto auto"; //DOESN'T INCLUDE the sidebar toggle to the grid
	document.getElementById("toggle_Sidebar").style.display = "none"; //Hides the sidebar toggle
	console.log("Setting page properties with the following values: "+pageProperty_showSidebarToggle+" | "+pageProperty_enableCategoryLabelIcons+" | "+pageProperty_enableSidebar+" | "+pageProperty_enableTabContainers);
	if (pageProperty_showSidebarToggle == 1){
		document.getElementById("pageElement_Header").style.gridTemplateColumns = "30px auto 1fr auto auto auto"; //Includes the sidebar toggle to the grid
		document.getElementById("pageElement_MainContent").style.paddingLeft = "50px"; //Changes the container padding
	}
	if (pageProperty_enableCategoryLabelIcons == 1){
		var Category_Label = document.querySelectorAll(".Category_Label"); //The div for category labels
		var Category_Label_Icon = document.querySelectorAll(".Category_Label_Icon"); //The category icon
		for (var i = 0; i < Category_Label.length; i++) { //Changes the setting of category label div so the icon can appear
			var Label = Category_Label[i];
			var LabelIcon = Category_Label_Icon[i];
			Label.style.gridTemplateColumns = "30px 1fr 30px"; //Changes the label grid arrangement to take into account the icon
			LabelIcon.style.display = "block"; //Makes the label icon visible
		}
	}
	if (pageProperty_enableSidebar == 1){
		document.getElementById("pageElement_Sidebar").style.display = "grid"; //Shows the sidebar
		document.getElementById("pageElement_MainContent").style.paddingLeft = "50px"; //Changes the container padding 
		console.log(pageProperty_enableSidebar);
	}
	if (pageProperty_enableTabContainers == 1){
		var tabs = document.querySelectorAll(".Tab_Container");
		for(a = 0; a < tabs.length; a++){
			tabs[a].style.display = "none";
		}
	}
}

function dev_update_RefreshNumber(){
	var dev_refreshCount;
	var dev_refreshCount_File = localStorage.getItem("dev_DL_refreshCount");
	if (dev_refreshCount_File){ //Selected ite exists
		dev_refreshCount = localStorage.getItem("dev_DL_refreshCount");
		dev_refreshCount++;
		localStorage.setItem("dev_DL_refreshCount", JSON.stringify(dev_refreshCount));
		} else { //Selected item does not exist
		dev_refreshCount = 1;
		localStorage.setItem("dev_DL_refreshCount", JSON.stringify(dev_refreshCount));
	}
	document.getElementById("pageElement_Footer_VersionTitle").innerHTML = VersionTitle+" | Refreshes since 2/20/2022: "+dev_refreshCount;
	
}

function set_Version_General(){
	document.getElementById("pageElement_PageTitle").innerHTML = VersionTitle;
	document.getElementById("versionTitle").innerHTML = VersionTitle;
	document.getElementById("copyrightTitle").innerHTML = CopyrightTitle;
	document.getElementById("pageElement_SessionScreen_Copyright").innerHTML = VersionTitle+" | "+CopyrightTitle;
}

function close_LoadingScreen(){
	setTimeout( function() { wait_LoadingScreen(); }, 2000);
	
}

function wait_LoadingScreen(){
	document.getElementById("LoadingScreen_Text").innerHTML = "Welcome back!";
	var x = document.getElementById("LoadingScreen");
	x.style.animationName = "blurOut";
	x.style.animationDuration = "0.5s";
	x.addEventListener("animationend",remove_LoadingScreen);
}
function remove_LoadingScreen(){
	var x = document.getElementById("LoadingScreen");
	x.parentNode.removeChild(x);
	start_Animations();
}

function check_Connection(){
	if (navigator.onLine) {
		document.getElementById('button_Wifi').src = "Assets/Icons/icon_wifi_online.png";
		document.getElementById('textboxElement_Wifi').innerHTML = "You're connected";
		document.getElementById('pageElement_Connection').innerHTML = "You are connected to the internet. The launcher will function as intended and shortcuts will open properly."
		} else {
		document.getElementById('button_Wifi').src = "Assets/Icons/icon_wifi_offline.png";
		document.getElementById('textboxElement_Wifi').innerHTML = "No connection";
		document.getElementById('pageElement_Connection').innerHTML = "Since you're not connected to the internet, links will not open properly. Connect to a Wi-Fi network and refresh the page."
	}
}

function generate_Launcher_NavigationList(){
	let navigationListItems = ["Home", "Shortcut Editor", "Information", "Settings", "Old UI", "Welcome Screen", "Clock"]; //Launcher navigation text
	let navigationListItems_Link = ["DL_Main.html", "DL_ShortcutEditor.html", "DL_Settings.html#Information", "DL_Settings.html", "../Elmer's School Launcher/Main.html", "DL_Welcome.html", "DL_Clock.html"]; //Launcher navigation links
	
	for (var i = 0; i < navigationListItems.length; i++) {
		var navigationListItems_Select = navigationListItems[i]; //Contains the selected pagenavi text
		var navigationListItems_Link_Select = navigationListItems_Link[i]; //Contains the selected pagenavi link
		
		//Attaches to the page
		var listItemLink = document.createElement('a'); //Creates an a element
		listItemLink.href = navigationListItems_Link_Select; //Adds the link
		listItemLink.setAttribute("id", "pageElement_PageNaviList_Item_"+i); //Adds an id to attach the text
		document.getElementById("pageElement_PageNaviList").appendChild(listItemLink); //Attaches the a element to the page navi element
		
		var listItemLink_Text = document.createElement('p'); //Creates a text p element
		listItemLink_Text.innerHTML = navigationListItems_Select; //Sets text to selected page navi text
		listItemLink_Text.classList.add("Header_PageNavi_Textbox_List_Item"); //Adds the styling to the object
		document.getElementById("pageElement_PageNaviList_Item_"+i).appendChild(listItemLink_Text); //Attaches object to the a object
		
		//Creates the list on the header menu (only appears when the screen is small enough)
		
		//Attaches to the page
		var listItemLink = document.createElement('a'); //Creates an a element
		listItemLink.href = navigationListItems_Link_Select; //Adds the link
		listItemLink.setAttribute("id", "pageElement_PageNaviList_Item_"+i); //Adds an id to attach the text
		document.getElementById("pageElement_Header_Menu_PageNaviList").appendChild(listItemLink); //Attaches the a element to the page navi element
		
		var listItemLink_Text = document.createElement('p'); //Creates a text p element
		listItemLink_Text.innerHTML = navigationListItems_Select; //Sets text to selected page navi text
		listItemLink_Text.classList.add("Header_PageNavi_Textbox_List_Item"); //Adds the styling to the object
		document.getElementById("pageElement_PageNaviList_Item_"+i).appendChild(listItemLink_Text); //Attaches object to the a object
	}
}

var AnimationFinish = 0;

function start_Animations(){
	var Header_Buttons_Item = document.querySelectorAll(".Header_Buttons_Item");
	var Header_Clock = document.querySelectorAll(".Header_Clock");
	var Header_Battery = document.querySelectorAll(".Header_Battery");
	var Header_RightMenu = document.querySelectorAll("Header_RightMenu");
	var Shortcut_Item = document.querySelectorAll(".Shortcut_Item");
	var Shortcut_Folder = document.querySelectorAll(".Category_Folder_Item");
	var Category = document.querySelectorAll(".Category");
	
	for (var i = 0; i < Header_Buttons_Item.length; i++) {
		var Header_Button_Item = Header_Buttons_Item[i];
		Header_Button_Item.style.transform = "translateY(-100%)";
		Header_Button_Item.style.display = "block";
		Header_Button_Item.style.animationName = "opening_HeaderButtons";
		Header_Button_Item.style.animationDuration = "0.5s";
		var delay = 0.3 + i / 5;
		
		Header_Button_Item.style.animationDelay = delay + "s";
		Header_Button_Item.style.animationFillMode = "forwards";
	}
	for (var a = 0; a < Shortcut_Item.length; a++) {
		var Shortcut_Item_Select = Shortcut_Item[a];
		Shortcut_Item_Select.style.opacity = "0%";
		Shortcut_Item_Select.style.display = "block";
		Shortcut_Item_Select.style.animationName = "opening_ShortcutItems";
		Shortcut_Item_Select.style.animationDuration = "0.5s";
		var delay2 = 0.1 + a / 15;
		
		Shortcut_Item_Select.style.animationDelay = delay2 + "s";
		Shortcut_Item_Select.style.animationFillMode = "forwards";
		if(a == (Shortcut_Item.length - 1)){
			AnimationFinish++;
			check_AnimationFinish();
			console.log("Finished items"+AnimationFinish);
		}
	}
	for (var b = 0; b < Shortcut_Folder.length; b++) {
		var Shortcut_Folder_Select = Shortcut_Folder[b];
		Shortcut_Folder_Select.style.opacity = "0%";
		Shortcut_Folder_Select.style.display = "grid";
		Shortcut_Folder_Select.style.animationName = "opening_ShortcutItems";
		Shortcut_Folder_Select.style.animationDuration = "0.5s";
		var delay3 = 0.1 + b / 15;
		
		Shortcut_Folder_Select.style.animationDelay = delay3 + "s";
		Shortcut_Folder_Select.style.animationFillMode = "forwards";
		if(b == (Shortcut_Folder.length - 1)){
			AnimationFinish++;
			check_AnimationFinish();
			console.log("Finished items"+AnimationFinish);
		}
	}
	
}

function check_AnimationFinish(){
	if(AnimationFinish == 2){
		setTimeout(reset_toDefaultAnimations, 2500);
		console.log("Reset");
	}
}

function reset_toDefaultAnimations(){
	var Shortcut_Item = document.querySelectorAll(".Shortcut_Item");
	var Shortcut_Folder = document.querySelectorAll(".Category_Folder_Item");
	for (var a = 0; a < Shortcut_Item.length; a++) {
		var Shortcut_Item_Select = Shortcut_Item[a];
		Shortcut_Item_Select.style.opacity = "0%";
		Shortcut_Item_Select.style.display = "block";
		Shortcut_Item_Select.style.animationName = "tabOpening";
		Shortcut_Item_Select.style.animationDuration = "0s";
		var delay2 = 0;
		
		Shortcut_Item_Select.style.animationDelay = delay2 + "s";
		Shortcut_Item_Select.style.animationFillMode = "forwards";
	}
	for (var b = 0; b < Shortcut_Folder.length; b++) {
		var Shortcut_Folder_Select = Shortcut_Folder[b];
		Shortcut_Folder_Select.style.opacity = "0%";
		Shortcut_Folder_Select.style.display = "grid";
		Shortcut_Folder_Select.style.animationName = "tabOpening";
		Shortcut_Folder_Select.style.animationDuration = "0s";
		var delay3 = 0;
		
		Shortcut_Folder_Select.style.animationDelay = delay3 + "s";
		Shortcut_Folder_Select.style.animationFillMode = "forwards";
	}
}

var sessionScreenState;
function sessionCheck(){
	if (sessionStorage.getItem("DL2_UserOpened") === null) {
		console.log("Session key does not exist");
		sessionStorage.setItem("DL2_UserOpened", "yes");
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
		} else {
		var SessionScreen = document.getElementById("pageElement_SessionScreen");
		SessionScreen.style.display = "none";
		sessionScreenState = "invisible";
		//start_Animations();
	}
}

function open_SessionScreen(){
	sessionScreenState = "visible";
	console.log(sessionScreenState);
	var x = document.getElementById("pageElement_SessionScreen");
	x.style.animationName = "open_SessionScreen";
	x.style.animationDuration = "0.3s";
	x.style.animationFillMode = "forwards";
	setTimeout(function(){x.style.display = "block"; start_Animations();}, 500);
	
}

function close_SessionScreen(){
	sessionScreenState = "invisible";
	console.log(sessionScreenState);
	var x = document.getElementById("pageElement_SessionScreen");
	x.style.animationName = "close_SessionScreen";
	x.style.animationDuration = "0.3s";
	x.style.animationFillMode = "forwards";
	setTimeout(function(){x.style.display = "none"; start_Animations();}, 500);
	
}

var windowSizePreset = "normal";
window.addEventListener('resize', check_WindowSize);
function check_WindowSize(){
	windowWidth = window.innerWidth;
	
	var MainContent = document.getElementById("pageElement_MainContent");
	var Header_Buttons = document.getElementById("pageElement_Header_Buttons");
	var Header_PageTitle = document.getElementById("Header_PageTitle");
	var Header_Clock = document.getElementById("pageElement_Header_Clock");
	var Header_Battery = document.getElementById("pageElement_Header_Battery");
	var Sidebar = document.getElementById("SidebarContainer");
	
	if (windowWidth < 750){//Small size
		windowSizePreset = "small";
		MainContent.style.width = "auto";
		MainContent.style.margin = "0";
		Header_Buttons.style.display = "none";
		//Hides the small navigator
		var NavigatorElement = document.getElementById("button_PageNavi_textbox");
		if (NavigatorElement.style.display != "none"){
			NavigatorElement.style.display = "none";			
			NavigatorElementFull = document.getElementById("pageElement_Header_Menu");
			NavigatorElementFull.style.display = "block";
		}
		Header_Clock.style.visibility = "hidden";
		Header_Battery.style.visibility = "hidden";
		
		} else {//Normal size
		windowSizePreset = "normal";
		MainContent.style.width = "auto";
		MainContent.style.margin = "auto";
		Header_Buttons.style.display = "flex";
		//Hides the full screen navigator
		NavigatorElementFull = document.getElementById("pageElement_Header_Menu");
		if (NavigatorElementFull.style.display != "none"){
			NavigatorElementFull.style.display = "none";
			
			var NavigatorElement = document.getElementById("button_PageNavi_textbox");
			NavigatorElement.style.display = "block";
		}
		Header_Clock.style.visibility = "visible";
		Header_Battery.style.visibility = "visible";
	}
	console.log(windowSizePreset);
}

/*document.onkeypress = function (f) {
    //space = space || window.event;
	toggle_Category_All();
};*/

let keysPressed = {}; 
document.addEventListener('keydown', (event) => {
	keysPressed[event.key] = true;
	
	if (keysPressed['Control'] && event.key == 'q') {
		toggle_TableScale();
		
	}
	//if (PageName == "DL_ShortcutEditor.html"){
	if (keysPressed['Control'] && event.key == ' ') {
		open_Subwindow("AddItem");
		
	}
	if (keysPressed['Control'] && event.key == 'b') {
		open_SessionScreen();
		
	}
	
	if (keysPressed['Control'] && event.key == 'ArrowRight') {
		if(Behavior_DisplayCategoryNavigation == true){
			toggle_Sidebar_CategoryNavigation();
		}
		
	}
//}
});

document.addEventListener('keyup', (event) => {
	delete keysPressed[event.key];
});

//Toggle scale of periodic table
var PT_Table_ToggleState = 1;
function toggle_TableScale(){
	var PT_Table = document.getElementById("pageElement_PeriodicTableContainer");
	switch (PT_Table_ToggleState){
		case 0: //Zoom out
			PT_Table.style.transform = "scale(0.5)";
			PT_Table_ToggleState = 1;
			break;
		case 1: //Normal
			PT_Table.style.transform = "scale(1)";
			PT_Table_ToggleState = 2;
			break;
		case 2: //Zoom in
			PT_Table.style.transform = "scale(1.5)";
			PT_Table_ToggleState = 0;
			break;
	}
	
}

//Toggle sidebar
function toggle_Sidebar(){
	var Sidebar = document.getElementById("pageElement_Sidebar");
	if (Sidebar.style.width == "50px"){ //Expands the sidebar
		Sidebar.style.width = "250px";
		} else { //Closes the sidebar
		Sidebar.style.width = "50";
	}
}

//Toggle sidebar category navigation
function toggle_Sidebar_CategoryNavigation(){
	var Sidebar = document.getElementById("pageElement_Sidebar_CategoryNavigation");
	if (Sidebar.style.width == "0px"){ //Expands the sidebar
		Sidebar.style.width = "320px";
		Sidebar.style.paddingLeft = "10px";
		} else { //Closes the sidebar
		Sidebar.style.width = "0px";
		Sidebar.style.paddingLeft = "0px";
	}
}




//Toggle categories
function toggle_Category(catID){ //Gets the id of the element that runs the function and stores it in catID
	var categoryID = catID; //Set value of categoryID to the value of catID
	var container = document.getElementById("content_"+categoryID); //The id of the div container of the category
	var containerArrow = document.getElementById("arrow_"+categoryID); //The id of the arrow icon of the category
	
	var selectedCSSObject = categoryID.replace('category_','');
	
	container.style.animationName = "tabOpening"; //Opening animation
	container.style.animationDuration = "var(--Element-Transition-Delay)"; //Animation duration
	if (container.style.display != "none"){ //If the container is not closed
		container.style.animationName = "tabClosing"; //Closing animation
		container.style.animationFillMode = "forwards";
		container.style.animationDuration = "0.3s";
		setTimeout( function() { container.style.display = "none";}, 300);
		containerArrow.src = "Assets/Icons/icon_downArrow.png"	//Change arrow icon
		} else { //If the container is closed
		container.style.display = "block"; //then open it
		container.style.animationName = "tabOpening"; //Opening animation
		container.style.animationDuration = "0.3s"; //Animation duration
		containerArrow.src = "Assets/Icons/icon_upArrow.png" //Change arrow icon
	}
	
	
}

//Toggle all categories
var categoryToggleAll = 1;

function toggle_Category_All(){
	//var categoryID = document.querySelectorAll('[id^="category_"]');
	//console.log(categoryID);
	//var categoryCount = document.querySelectorAll('[id^="category_"]').length;
	//console.log(categoryCount);
	var Category = document.querySelectorAll(".Category_Content_Container");
	var categorySelect_Toggle = document.querySelectorAll(".Category_Label_Toggle");
	if (categoryToggleAll == 1){ //Hide all
		for (var a = 0; a < Category.length; a++) {			
			var categorySelect = Category[a];
			categorySelect.style.display = "none";
			
			var categorySelect_Toggle = Category[a];
			categorySelect_Toggle.src = "Assets/Icons/icon_downArrow.png"
			
			if(a == (Category.length - 1)){
				categoryToggleAll = 0;
			}
			
		}
		
		} else { //Show all
		for (var a = 0; a < Category.length; a++) {			
			var categorySelect = Category[a];
			categorySelect.style.display = "block";
			categorySelect.style.animationName = "tabOpening"; //Opening animation
			categorySelect.style.animationDuration = "var(--Element-Transition-Delay)";
			
			var categorySelect_Toggle = Category[a];
			categorySelect_Toggle.src = "Assets/Icons/icon_downArrow.png"
			
			if(a == (Category.length - 1)){
				categoryToggleAll = 1;
			}
		}
	}
}

function open_Subwindow(ID){
	var subwindowElement = document.getElementById("subwindow_"+ID);
	subwindowElement.style.display = "block";
	subwindowElement.style.animationFillMode = "forwards";
	subwindowElement.style.animationName = "opening_Subwindow";
	subwindowElement.style.animationDuration = "0.3s";
}

function close_Subwindow(ID){
	var subwindowElement = document.getElementById("subwindow_"+ID);
	subwindowElement.style.animationName = "closing_Subwindow";
	subwindowElement.style.animationDuration = "0.3s";
	subwindowElement.style.animationFillMode = "forwards";
	setTimeout(function(){subwindowElement.style.display = "none";}, 300);
}

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

function startTime() {
	const today = new Date();
	let h = today.getHours();
	let m = today.getMinutes();
	let s = today.getSeconds();
	m = checkTime(m);
	s = checkTime(s);
	//var = displayTime;
	
	var displayHour;
	
	switch(h){
		case 0:
		var displayHour = 12;
		break;
		case 13:
		var displayHour = 1;
		break;
		case 14:
		var displayHour = 2;
		break;
		case 15:
		var displayHour = 3;
		break;
		case 16:
		var displayHour = 4;
		break;
		case 17:
		var displayHour = 5;
		break;
		case 18:
		var displayHour = 6;
		break;
		case 19:
		var displayHour = 7;
		break;
		case 20:
		var displayHour = 8;
		break;
		case 21:
		var displayHour = 9;
		break;
		case 22:
		var displayHour = 10;
		break;
		case 23:
		var displayHour = 11;
		break;
		default:
		var displayHour = h;
	}
	if (pageProperty_enableGreetings == 1){
		if (h >= 0 && h<=6){
			document.getElementById('pageElement_Greeting').innerHTML = "Good Evening";
		}
		if (h >= 6 && h<=11){
			document.getElementById('pageElement_Greeting').innerHTML = "Good Morning";
		}
		if (h >= 12 && h<=18){
			document.getElementById('pageElement_Greeting').innerHTML = "Good Afternoon";
		}
		if (h >= 18 && h<=24){
			document.getElementById('pageElement_Greeting').innerHTML = "Good Evening";
		}
	}
	
	var AMPM;
	if (h <= 12 && h >= 0){
		var AMPM = "AM";
		} else {
		var AMPM = "PM";
	}
	document.getElementById('Clock_Time').innerHTML =  displayHour + ":" + m + " " + AMPM;
	document.getElementById('Clock_Time_2').innerHTML =  displayHour + ":" + m + " " + AMPM;
	
	if (sessionScreenState == "visible"){
		document.getElementById('Clock_Time_SessionScreen').innerHTML =  displayHour + ":" + m
	}
	
	
	var battery_level;
	navigator.getBattery()
	.then(function(battery) {
		var battery_level = Math.round((battery.level)*100);
		document.getElementById('Battery_Level').innerHTML =  battery_level+"%";
		document.getElementById('Battery_Level_2').innerHTML =  battery_level+"%";
	});
	
	if (battery_level <= 15){
		document.getElementById('Battery_Level').style.color = "#ff3c19";
	}
	
	setTimeout(startTime, 1000);
	
}

function checkTime(i) {
	if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
	return i;
}
var date;
function startDate(){
	var today = new Date();
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	var yyyy = today.getFullYear();
	today = mm + '/' + dd + '/' + yyyy;
	date = today;
	//document.write(today);
	//document.getElementById('DateClass').innerHTML =  today;
	displayDay();
}
var day;
function displayDay() {
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
	document.getElementById("Clock_Date").innerHTML = day + ", "+ date;
	document.getElementById("Clock_Date_2").innerHTML = day + ", "+ date;
	if (sessionScreenState == "visible"){
		document.getElementById("Clock_Date_SessionScreen").innerHTML = day + ", "+ date;
	}
}




function formatAMPM(date) {
	var hours = date.getHours();
	var minutes = date.getMinutes();
	var ampm = hours >= 12 ? 'pm' : 'am';
	hours = hours % 12;
	hours = hours ? hours : 12; // the hour '0' should be '12'
	minutes = minutes < 10 ? '0'+minutes : minutes;
	var strTime = hours + ':' + minutes + ' ' + ampm;
	return strTime;
	document.getElementById('ClockClass2').innerHTML =  strTime;
}

navigator.getBattery()
.then(function(battery) {
	var battery_level = Math.round((battery.level)*100);
	document.getElementById('Battery_Level').innerHTML =  battery_level+"%";
});

function toggle_Textbox(id){
	var textboxElement = document.getElementById(id+"_textbox");
	if (textboxElement.style.display == "none"){ //Opening
		textboxElement.style.display = "block";
		textboxElement.style.animationFillMode = "forwards";
		textboxElement.style.animationName = "open_Textbox";
		textboxElement.style.animationDuration = "0.3s";
		} else { //Closing
		textboxElement.style.animationName = "close_Textbox";
		textboxElement.style.animationDuration = "0.3s";
		textboxElement.style.animationFillMode = "forwards";
		setTimeout(function(){textboxElement.style.display = "none";}, 500);
	}	
}

function toggle_Navigator(id){
	var NavigatorElement = document.getElementById("button_PageNavi_textbox");
	var NavigatorElementFull = document.getElementById("pageElement_Header_Menu");
	if (windowSizePreset != "small"){ //Normal size
		if (NavigatorElement.style.display == "none"){
			NavigatorElement.style.display = "block";
			NavigatorElement.style.animationFillMode = "forwards";
			NavigatorElement.style.animationName = "opening_Navigator_Container_Normal";
			NavigatorElement.style.animationDuration = "0.3s";
			} else {
			NavigatorElement.style.animationName = "closing_Navigator_Container_Normal";
			NavigatorElement.style.animationDuration = "0.3s";
			NavigatorElement.style.animationFillMode = "forwards";
			setTimeout(function(){NavigatorElement.style.display = "none";}, 300);
		}
		} else { //Small size
		if (NavigatorElementFull.style.display == "none"){
			NavigatorElementFull = document.getElementById("pageElement_Header_Menu");
			NavigatorElementFull.style.display = "block";
			NavigatorElementFull.style.animationFillMode = "forwards";
			NavigatorElementFull.style.animationName = "opening_Navigator_Container_Full";
			NavigatorElementFull.style.animationDuration = "0.3s";
			} else {
			NavigatorElementFull = document.getElementById("pageElement_Header_Menu");
			NavigatorElementFull.style.animationName = "closing_Navigator_Container_Full";
			NavigatorElementFull.style.animationDuration = "0.3s";
			NavigatorElementFull.style.animationFillMode = "forwards";
			setTimeout(function(){NavigatorElementFull.style.display = "none";}, 300);
		}
	}	
}



var toast_Count = 1;
function trigger_createToast(type){
	var toast_Div = document.createElement('div');
	toast_Div.classList.add("ToastNotif_Toast");
	toast_Div.setAttribute("id", "toast_Div_"+toast_Count);
	toast_Div.style.transform = "translateX(-100%)";
	toast_Div.style.animationName = "opening_ToastNotif";
	toast_Div.style.animationDuration = "0.3s";
	toast_Div.style.animationFillMode = "forwards";
	setTimeout(function(){
		toast_Div.style.animationName = "closing_ToastNotif";
		toast_Div.style.animationDuration = "0.3s";
		toast_Div.style.animationFillMode = "forwards";
		setTimeout(function(){
			toast_Div.style.display = "none";
		}, 300);
	}, 3000);
	var toast_Icon = document.createElement('img');
	toast_Icon.classList.add("ToastNotif_Toast_Icon");
	toast_Icon.setAttribute("id", "toast_Icon_"+toast_Count);
	document.getElementById("pageElement_ToastDrawer").appendChild(toast_Div);
	
	var toast_Title = document.createElement('h1');
	toast_Title.classList.add("ToastNotif_Toast_Title");
	
	var toast_Subtitle = document.createElement('p');
	toast_Subtitle.classList.add("ToastNotif_Toast_URL");
	switch(type){
		case "success":
		toast_Icon.setAttribute("src", "Assets/Icons/icon_linkAdded.png");
		toast_Title.innerHTML = "I am success";
		toast_Subtitle.innerHTML = "LMAO its SuccessToastYT he's roasty toasty who would've thought it would make the news papers LMAO LOL FR FR TBH";
		break;
		case "failed":
		toast_Icon.setAttribute("src", "Assets/Icons/icon_linkError.png");
		toast_Title.innerHTML = "Fail :(";
		toast_Subtitle.innerHTML = "uncooked toast";
		break;
		case "NotImplemented": //When a shortcut in Shortcut Editor is successfully created
		toast_Icon.setAttribute("src", "Assets/Icons/favicon.png");
		toast_Title.innerHTML = "Not available";
		toast_Subtitle.innerHTML = "This feature is not implemented properly yet.";
		break;
	}
	document.getElementById("toast_Div_"+toast_Count).appendChild(toast_Icon);
	document.getElementById("toast_Div_"+toast_Count).appendChild(toast_Title);
	document.getElementById("toast_Div_"+toast_Count).appendChild(toast_Subtitle);
	toast_Count++;
}

function trigger_SelectionChosen(text){
	document.getElementById("Header_PT_SearchType").innerText = "Search for: "+text;
}

window.onscroll = function() {scrollFunction()};
function scrollFunction() {
	pageElement_BackToTop = document.getElementById("pageElement_BackToTop");
	if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 20) {
		pageElement_BackToTop.style.display = "block";
		} else {
		pageElement_BackToTop.style.display = "none";
	}
}

function trigger_toggleDropdown(ID){
	var dropdownMenu = document.getElementById("menu_"+ID);
	var dropdownButton = document.getElementById(ID);
	var dropdownItems = document.querySelectorAll(".Input_Dropdown_Item");	
	if (dropdownMenu.style.display == "none"){
		dropdownMenu.parentElement.style.height = "250px";
		dropdownMenu.style.display = "block";
		dropdownMenu.style.animationName = "opening_Dropdown";
		dropdownMenu.style.animationDuration = "0.3s";
		dropdownMenu.style.animationFillMode = "forwards";
		for (var a = 0; a < dropdownItems.length; a++){
			var dropdownItems_Select = dropdownItems[a];
			dropdownItems_Select.style.animationName = "opening_Dropdown_Items";
			dropdownItems_Select.style.animationDuration = "0.3s";
			dropdownItems_Select.style.animationFillMode = "forwards";
		}
		dropdownButton.style.backgroundColor = "#292930";
		} else {
		dropdownMenu.parentElement.style.height = "auto";
		dropdownMenu.style.animationName = "closing_Dropdown";
		dropdownMenu.style.animationDuration = "0.3s";
		dropdownMenu.style.animationFillMode = "forwards";
		for (var a = 0; a < dropdownItems.length; a++){
			var dropdownItems_Select = dropdownItems[a];
			dropdownItems_Select.style.animationName = "closing_Dropdown_Items";
			dropdownItems_Select.style.animationDuration = "0.3s";
			dropdownItems_Select.style.animationFillMode = "forwards";
		}
		setTimeout(function(){dropdownMenu.style.display = "none";}, 500);
		dropdownButton.style.backgroundColor = "#121212";
	}
}

function trigger_dropdownItemSelected(ID){
	console.log(ID); //Debug
	var selected_dropdownItem = document.getElementById(ID).textContent; //Gets the content of the clicked dropdown item
	console.log(selected_dropdownItem); //Debug
	var dropdown_List = ID.substr(0, 19); //Gets the ID type of the dropdown container the item belongs in
	console.log(dropdown_List);
	switch (dropdown_List){
		case "dropdownItem_Folder": //The ID type of the container
		document.getElementById("dropdownButton_AddItem_Folder").innerHTML = selected_dropdownItem; //Sets the text of the container to the text of the selected item
		trigger_toggleDropdown("dropdownButton_AddItem_Folder"); //Closes the dropdown menu after the click
		break;
		case "dropdownItem_Shrtct":
		document.getElementById("dropdownButton_AddItem_Shortcut1").innerHTML = selected_dropdownItem;
		trigger_toggleDropdown("dropdownButton_AddItem_Shortcut1");
		break;
		case "dropdownItem_ImgTyp":
		document.getElementById("dropdownButton_ImageType").innerHTML = selected_dropdownItem;
		trigger_toggleDropdown("dropdownButton_ImageType");
		break;
		case "dropdownItem_SeaTyp":
		document.getElementById("dropdownButton_SeaTyp").innerHTML = selected_dropdownItem;
		trigger_toggleDropdown("dropdownButton_SeaTyp");
		case "dropdownItem_SpTest":
		document.getElementById("dropdownButton_SpTest").innerHTML = selected_dropdownItem;
		trigger_toggleDropdown("dropdownButton_SpTest");
		console.log("Optioned");
		break;
	}
}



function search_Query(position){
	var setting_PreferredSearchEngine = "Ecosia"; //Change later
	switch (position){
		case "headerMain":
			var searchQuery = document.getElementById("pageElement_SearchQuery").value;
			document.getElementById("pageElement_SearchQuery").value = "";
			break;
		case "headerMenu":
	var searchQuery = document.getElementById("pageElement_SearchQuery2").value;
			document.getElementById("pageElement_SearchQuery2").value = "";
			break;
	}
	switch (setting_PreferredSearchEngine){
		case "Ecosia":
			window.open("https://www.ecosia.org/search?method=index&q="+searchQuery);
			break;
		case "Google":
			window.open("http://google.com/search?q="+searchQuery);
			break;
		case "Bing":
			window.open("https://www.bing.com/search?q="+searchQuery);
			break;
		case "DuckDuckGo":
			window.open("https://duckduckgo.com/?q="+searchQuery);
			break;
		case "Yahoo!":
			window.open("https://search.yahoo.com/search?p="+searchQuery);
			break;
	}
}




function trigger_dropdownItemSelected(ID){
	console.log(ID); //Debug
	var selected_dropdownItem = document.getElementById(ID).textContent; //Gets the content of the clicked dropdown item
	console.log(selected_dropdownItem); //Debug
	var dropdown_List = ID.substr(0, 19); //Gets the ID type of the dropdown container the item belongs in
	console.log(dropdown_List);
	switch (dropdown_List){
		case "dropdownItem_SrhTyp":
			document.getElementById("dropdownButton_SearchType").innerHTML = selected_dropdownItem;
			trigger_toggleDropdown("dropdownButton_SearchType");
		break;
		case "dropdownItem_SeaEng":
			document.getElementById("dropdownButton_SeaEng").innerHTML = selected_dropdownItem;
			trigger_toggleDropdown("dropdownButton_SeaEng");
			console.log("Optioned");
		break;
	}
}



// SETTINGS //
function trigger_ChangeTab(ID){
	var Tab_Container = document.querySelectorAll(".Tab_Container");
	var Sidebar_Icon = document.querySelectorAll(".Sidebar_Icon");
	for (a = 0; a != Tab_Container.length; a++){
		Tab_Container[a].style.display = "none";
		
	}
	for (b = 0; b != Sidebar_Icon.length; b++){
		Sidebar_Icon[b].style.backgroundColor = "var(--Menus-BGColor)";
	}
	var selectedTab = document.getElementById(ID+"_Container");
	selectedTab.style.display = "block";
	selectedTab.style.animationName = "opening_pageTab";
	selectedTab.style.animationDuration = "0.3s";
	selectedTab.style.animationFillMode = "forwards";
	var selectedIcon = document.getElementById(ID+"_Icon");
	selectedIcon.style.backgroundColor = "var(--Accent-Color)";
	
	if(PageName == "DL_Settings.html"){
		document.getElementById("pageElement_Tab_Title").style.display = "none";
		document.getElementById("pageElement_Tab_Description").style.display = "none";
		document.getElementById("Settings_Home_Container").style.display = "none";
	}
}

var wallpaperImagePath;

function Settings_DetectImageFile(){
	var rawFileName = document.getElementById("form_Settings_WallpaperName").value;
	var rawFileType = document.getElementById("dropdownButton_ImageType").innerText;
	var combinedFileName = rawFileName + rawFileType;
	console.log(combinedFileName);
	var imagePath = "Assets/Background/"+combinedFileName;
	wallpaperImagePath = imagePath;
	console.log(imagePath);
	console.log("wallpaperImagePath: "+wallpaperImagePath);
	document.getElementById("Settings_WallpaperPreview").src = imagePath;
	document.getElementById("Settings_WallpaperPreview").style.display = "block";
	
}

function Settings_FileNotFound(){
	document.getElementById("Settings_WallpaperPreview").style.display = "none";
	trigger_createToast("Settings_FileNotFound");
}

var key_Settings_Appearance = "DL_Settings_Appearance";
function Settings_ApplyChanges(){
	Settings_DetectImageFile();
	console.log("Setting variable values from input values...");
	// Get the value from input fields and variables
	var appearance_Wallpaper_Img = wallpaperImagePath;
	var rawWallpaperFileName = document.getElementById("form_Settings_WallpaperName").value;
	var WallpaperFileType = document.getElementById("dropdownButton_ImageType").innerHTML; //The value from the dropdown
	var rawWallpaperFileType = ""; //The filtered variable
	for( var i = 0; i < WallpaperFileType.length; i++ ) { //Filters \n and \t from the string
		if( !(WallpaperFileType[i] == '\n' || WallpaperFileType[i] == '\t') ){
		rawWallpaperFileType += WallpaperFileType[i];}
	} //Thanks geeksforgeeks!
	var AP_CL_AccentColor = document.getElementById("AP-CL-AccentColor").value;
	var AP_CL_AccentColor_Hover = document.getElementById("AP-CL-AccentColor-Hover").value;
	var AP_CL_BGColor_General = document.getElementById("AP-CL-BGColor-General").value;
	var AP_CL_HoverColor = document.getElementById("AP-CL-HoverColor").value;
	var AP_CL_BGColor_Menu = document.getElementById("AP-CL-BGColor-Menu").value;
	var AP_CL_BGColor_Subwindow = document.getElementById("AP-CL-BGColor-Subwindow").value;
	var AP_CL_BGColor_Dropdown = document.getElementById("AP-CL-BGColor-Dropdown").value;
	var AP_CL_BGColor_Opacitated = document.getElementById("AP-CL-BGColor-Opacitated").value;
	hexToRgbA(AP_CL_BGColor_Opacitated); //Convert HEX to RGBA
	
	function hexToRgbA(hex){
		var c;
		if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
			c= hex.substring(1).split('');
			if(c.length== 3){
				c= [c[0], c[0], c[1], c[1], c[2], c[2]];
			}
			c= '0x'+c.join('');
			AP_CL_BGColor_Opacitated = 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+',0.5)';
		}
	}
	
	var AP_CL_BGColor_ShortcutButton = document.getElementById("AP-CL-BGColor-ShortcutButton").value;
	var AP_CL_BGColor_GeneralButton = document.getElementById("AP-CL-BGColor-GeneralButton").value;
	var AP_CL_BGColor_Input = document.getElementById("AP-CL-BGColor-Input").value;
	var AP_CL_BGColor_Divider = document.getElementById("AP-CL-BGColor-Divider").value;
	var AP_TX_Font_Primary = document.getElementById("AP-TX-Font-Primary").value;
	var AP_TX_Font_Secondary = document.getElementById("AP-TX-Font-Secondary").value;
	var AP_TX_Font_Numbers= document.getElementById("AP-TX-Font-Numbers").value;
	var AP_TX_Font_Color = document.getElementById("AP-TX-Font-Color").value;
	console.log("Setting values to object...");
	// Set the values to the object
	const Settings_Appearance_Obj = {
		appearance_Wallpaper_Img: appearance_Wallpaper_Img,
		AP_CL_AccentColor: AP_CL_AccentColor,
		AP_CL_AccentColor_Hover: AP_CL_AccentColor_Hover,
		AP_CL_BGColor_General: AP_CL_BGColor_General,
		AP_CL_HoverColor: AP_CL_HoverColor,
		AP_CL_BGColor_Menu: AP_CL_BGColor_Menu,
		AP_CL_BGColor_Subwindow: AP_CL_BGColor_Subwindow,
		AP_CL_BGColor_Dropdown: AP_CL_BGColor_Dropdown,
		AP_CL_BGColor_Opacitated: AP_CL_BGColor_Opacitated,
		AP_CL_BGColor_ShortcutButton: AP_CL_BGColor_ShortcutButton,
		AP_CL_BGColor_GeneralButton: AP_CL_BGColor_GeneralButton,
		AP_CL_BGColor_Input: AP_CL_BGColor_Input,
		AP_CL_BGColor_Divider: AP_CL_BGColor_Divider,
		rawWallpaperFileName: rawWallpaperFileName,
		rawWallpaperFileType: rawWallpaperFileType,
		AP_TX_Font_Primary: AP_TX_Font_Primary,
		AP_TX_Font_Secondary: AP_TX_Font_Secondary,
		AP_TX_Font_Numbers: AP_TX_Font_Numbers,
		AP_TX_Font_Color: AP_TX_Font_Color,
	}
	
	console.log("Saving objects to local storage...");
	window.localStorage.setItem("DL_Settings_Appearance",JSON.stringify(Settings_Appearance_Obj));
	
	console.log("Settings have been saved");
	trigger_createToast("Settings_SaveSuccess");
	Settings_LoadAppearance();
}



function Settings_LoadAppearance(){
	var stylesheet = document.querySelector(':root');
	
	var records = window.localStorage.getItem(key_Settings_Appearance); //searches for the keyAppearance in localStorage
	var data = JSON.parse(localStorage.getItem("DL_Settings_Appearance"));
	var style = Object.values(data);
	
	if (PageName == "DL_Settings.html"){
		document.getElementById("Settings_WallpaperPreview").src = style[0];
	}
	var wallpaperPath = 'url(../'+style[0]+')';
	stylesheet.style.setProperty("--BG-WallpaperImg", wallpaperPath);
	stylesheet.style.setProperty("--Accent-Color", style[1]);
	stylesheet.style.setProperty("--Accent-Color-Hover", style[2]);
	stylesheet.style.setProperty("--BGColor-General", style[3]);
	stylesheet.style.setProperty("--BGColor-Hover", style[4]);
	stylesheet.style.setProperty("--BGColor-Menus", style[5]);
	stylesheet.style.setProperty("--BGColor-Subwindows", style[6]);
	stylesheet.style.setProperty("--BGColor-Dropdowns", style[7]);
	stylesheet.style.setProperty("--BGColor-Opacitated", style[8]);
	stylesheet.style.setProperty("--BGColor-ShortcutButtons", style[9]);
	stylesheet.style.setProperty("--BGColor-Buttons", style[10]);
	stylesheet.style.setProperty("--BGColor-Input", style[11]);
	stylesheet.style.setProperty("--Color-Dividers", style[12]);
	//13-14 is skipped since it is only needed on the Settings page
	stylesheet.style.setProperty("--Text-Font-Primary", style[15]);
	stylesheet.style.setProperty("--Text-Font-Secondary", style[16]);
	stylesheet.style.setProperty("--Text-Font-Numbers", style[17]);
	stylesheet.style.setProperty("--Text-Color", style[18]);

}

function Settings_LoadSettingValues(){
	var records = window.localStorage.getItem(key_Settings_Appearance); //searches for the keyAppearance in localStorage
	var data = JSON.parse(localStorage.getItem("DL_Settings_Appearance"));
	var style = Object.values(data);
	
	document.getElementById("Settings_WallpaperPreview").src = style[0];
	document.getElementById("AP-CL-AccentColor").value = style[1];
	document.getElementById("AP-CL-AccentColor-Hover").value = style[2];
	document.getElementById("AP-CL-BGColor-General").value = style[3];
	document.getElementById("AP-CL-HoverColor").value = style[4];
	document.getElementById("AP-CL-BGColor-Menu").value = style[5];
	document.getElementById("AP-CL-BGColor-Subwindow").value = style[6];
	document.getElementById("AP-CL-BGColor-Dropdown").value = style[7];
	document.getElementById("AP-CL-BGColor-Opacitated").value = style[8];
	document.getElementById("AP-CL-BGColor-ShortcutButton").value = style[9];
	document.getElementById("AP-CL-BGColor-GeneralButton").value = style[10];
	document.getElementById("AP-CL-BGColor-Input").value = style[11];
	document.getElementById("AP-CL-BGColor-Divider").value = style[12];
	document.getElementById("form_Settings_WallpaperName").value = style[13];
	document.getElementById("dropdownButton_ImageType").innerHTML = style[14];
	document.getElementById("AP-TX-Font-Primary").value = style[15];
	document.getElementById("AP-TX-Font-Secondary").value = style[16];
	document.getElementById("AP-TX-Font-Numbers").value = style[17];
	document.getElementById("AP-TX-Font-Color").value = style[18];
	
}

function Settings_LoadPresets(presetID){
	switch (presetID){
		case "darkmode":
		document.getElementById("AP-CL-AccentColor").value = "#9f4f52";
		document.getElementById("AP-CL-AccentColor-Hover").value = "#9f4f52";
		document.getElementById("AP-CL-BGColor-General").value = "#171010";
		document.getElementById("AP-CL-HoverColor").value = "#242424";
		document.getElementById("AP-CL-BGColor-Menu").value = "#171010";
		document.getElementById("AP-CL-BGColor-Subwindow").value = "#292929";
		document.getElementById("AP-CL-BGColor-Dropdown").value = "#171010";
		//document.getElementById("AP-CL-BGColor-Opacitated").value = "rgba(28, 28, 28, 0.5)";
		document.getElementById("AP-CL-BGColor-Opacitated").value = "#1c1c1c";
		
		document.getElementById("AP-CL-BGColor-ShortcutButton").value = "#1E1E24";
		document.getElementById("AP-CL-BGColor-GeneralButton").value = "#1E1E24";
		document.getElementById("AP-CL-BGColor-Input").value = "#121212";
		document.getElementById("AP-CL-BGColor-Divider").value = "#282830";
		break;
		case "lightmode":
		trigger_createToast("NotImplemented");
	}
}

// ONBOARDING //
function begin_OnboardingSequence(){
	var welcomeBox = document.getElementById("Onboarding_Welcome");
	welcomeBox.style.opacity = "0%";
	setTimeout(function(){welcomeBox.style.display = "none";}, 300);
	
	var processBox = document.getElementById("Onboarding_Process");
	processBox.style.display = "block";
	processBox.style.animationName = "opening_Onboarding_Process";
	processBox.style.animationDuration = "0.3s";
	processBox.style.animationFillMode = "forwards";
}

var Onboarding_Page = 1;
function Onboarding_ChangePage(pageAction){
	var OBPage = Onboarding_Page;
	console.log(Onboarding_Page);
	if (pageAction == "Next"){
		Onboarding_Page = Onboarding_Page + 1;
		} else {
		Onboarding_Page = Onboarding_Page - 1;
	}
	console.log(Onboarding_Page);
	var Onboarding_PageElements = document.querySelectorAll(".Onboarding_Process_Page");
	for (a = 0; a < Onboarding_PageElements.length; a++){
		Onboarding_PageElements[a].style.display = "none";
	}
	var Onboarding_PageElements_Current = document.getElementById("Onboarding_Page"+OBPage);
	Onboarding_PageElements_Current.style.display = "grid";
	console.log(Onboarding_Page);
	}	