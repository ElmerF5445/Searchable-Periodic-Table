function searchTable(){
	var searchOption = document.getElementById("searchOption").value;
	var searchInput = document.getElementById("searchInput").value;
	document.getElementById("Search").innerHTML = searchOption +" : "+ searchInput;
	startSearch();
}

function startSearch(){
	switch (searchOption){
		case ElementName:
		searchByName();
		break;
		case ElementSymbol:
		searchBySymbol();
		break;
		case AtomicNumber:
		searchByNumber();
		break;
	}
}

function searchByName(){
	switch (searchInput){
		case Hydrogen:
		var E_Name = document.getElementById("Name")[1].textContent;
		document.getElementById("Search").innerHTML = E_Name;
		break;
	}
}
// WARNING: These arrays are arranged by ATOMIC NUMBER, not by how they are placed in the actual table. Always double check.
const elementArray_Symbol = ["Filler", "H", "He", "Li", "Be", "B", "C", "N", "O", "F", "Ne", "Na", "Mg", "Al", "Si", "P", "S", "Cl", "Ar", "K", "Ca", "Sc", "Ti", "V", "Cr", "Mn", "Fe", "Co", "Ni", "Cu", "Zn", "Ga", "Ge", "As", "Se", "Br", "Kr", "Rb", "Sr", "Y", "Zr", "Nb", "Mo", "Tc", "Ru", "Rh", "Pd", "Ag", "Cd", "In", "Sn", "Sb", "Te", "I", "Xe", "Cs", "Ba", "La", "Ce", "Pr", "Nd", "Pm", "Sm", "Eu", "Gd", "Tb", "Dy", "Ho", "Er", "Tm", "Yb", "Lu", "Hf", "Ta", "W", "Re", "Os", "Ir", "Pt", "Au", "Hg", "Tl", "Pb", "Bi", "Po", "At", "Rn", "Fr", "Ra", "Ac", "Th", "Pa", "U", "Np", "Pu", "Am", "Cm", "Bk", "Cf", "Es", "Fm", "Md", "No", "Lr", "Rf", "Db", "Sg", "Bh", "Hs", "Mt", "Ds", "Rg", "Cn", "Nh", "Fl", "Mc", "Lv", "Ts", "Og"];
const elementArray_Name = ["Filler", "Hydrogen", "Helium", "Lithium", "Beryllium", "Boron", "Carbon", "Nitrogen", "Oxygen", "Fluorine", "Neon", "Sodium", "Magnesium", "Aluminum", "Silicon", "Phosphorous", "Sulfur", "Chlorine", "Argon", "Potassium", "Calcium", "Scandium", "Titanium", "Vanadium", "Chromium", "Manganese", "Iron", "Cobalt", "Nickel", "Copper", "Zinc", "Gallium", "Germanium", "Arsenic", "Selenium", "Bromine", "Krypton", "Rubidium", "Strontium", "Yttrium", "Zirconium", "Niobium", "Molybdenum", "Technetium", "Ruthenium", "Rhodium", "Palladium", "Silver", "Cadmium", "Indium", "Tin", "Antimony", "Tellurium", "Iodine", "Xenon", "Cesium", "Barium", "Lanthanum", "Cerium", "Praseodymium", "Neodymium", "Promethium", "Samarium", "Europium", "Gadolinium", "Terbium", "Dysporium", "Holmium", "Erbium", "Thullum", "Ytterbium", "Lutetium", "Hafnium", "Tantalum", "Tungsten", "Rhenium", "Osmium", "Iridium", "Platinum", "Gold", "Mercury", "Thallium", "Lead", "Bismuth", "Polonium", "Astatine", "Radon", "Francium", "Radium", "Actinium", "Thorium", "Protactinium", "Uranium", "Neptunium", "Plutonium", "Americium", "Curium", "Berkelium", "Californium", "Einsteinium", "Fermium", "Mendelevium", "Nobelium", "Lawrencium", "Rutherfordium", "Dubnium", "Seaborgium", "Bohrium", "Hassium", "Meitnerium", "Darmstadtium", "Roentgenium", "Copernicium", "Nihonium", "Flerovium", "Moscovium", "Livermorium", "Tenessine", "Oganesson"];

var searchType;
function getSearchType(ID){
	var searchType = ID;
	InitializeSearch(searchType);
}

function InitializeSearch(Type){
	switch (Type){
		case "SbyS":
			Search_BySymbol();
		case "SbyN":
			Search_ByName();
		case "SbyAN":
			Search_ByAtomicNumber();
	}
	document.getElementById("pageElement_LearnMore").style.display = "grid";
}

function Search_BySymbol(){
	var Query = document.getElementById("SearchQuery").value;
	var arrayLoop = 0; //Initializes the loop counter
	var arrayLength = elementArray_Symbol.length;
	for (arrayLoop = 0; arrayLoop != arrayLength; arrayLoop++){ //Keep looping the code block until arrayLoop has the same count as arrayLoop
		if (Query == elementArray_Symbol[arrayLoop]){
			console.log(elementArray_Symbol[arrayLoop]+" : "+elementArray_Name[arrayLoop]);
			document.getElementById("Info_Symbol").innerHTML = elementArray_Symbol[arrayLoop];
			document.getElementById("Info_Name").innerHTML = elementArray_Name[arrayLoop];
			document.getElementById("Info_AtomicNumber").innerHTML = arrayLoop;
			document.getElementById("Info_AtomicWeight").innerHTML = document.getElementById("Elem_AtomicWeight_"+arrayLoop).textContent;
			document.getElementById("Info_OxidState").innerHTML = document.getElementById("Elem_OxidState_"+arrayLoop).textContent;
			document.getElementById("Info_MeltPoint").innerHTML = document.getElementById("Elem_MeltPoint_"+arrayLoop).textContent;
			document.getElementById("Info_BoilPoint").innerHTML = document.getElementById("Elem_BoilPoint_"+arrayLoop).textContent;
			document.getElementById("Info_Density").innerHTML = document.getElementById("Elem_Density_"+arrayLoop).textContent;
			document.getElementById("Info_Electronegativity").innerHTML = document.getElementById("Elem_Electronegativity_"+arrayLoop).textContent;
		}
		
	}
}


function Search_ByName(){
	var Query = document.getElementById("SearchQuery").value;
	var arrayLoop = 0; //Initializes the loop counter
	var arrayLength = elementArray_Name.length;
	for (arrayLoop = 0; arrayLoop != arrayLength; arrayLoop++){ //Keep looping the code block until arrayLoop has the same count as arrayLoop
		if (Query == elementArray_Name[arrayLoop]){
			console.log(elementArray_Name[arrayLoop]+" : "+elementArray_Symbol[arrayLoop]);
			document.getElementById("Info_Symbol").innerHTML = elementArray_Symbol[arrayLoop];
			document.getElementById("Info_Name").innerHTML = elementArray_Name[arrayLoop];
			document.getElementById("Info_AtomicNumber").innerHTML = arrayLoop;
			document.getElementById("Info_AtomicWeight").innerHTML = document.getElementById("Elem_AtomicWeight_"+arrayLoop).textContent;
			document.getElementById("Info_OxidState").innerHTML = document.getElementById("Elem_OxidState_"+arrayLoop).textContent;
			document.getElementById("Info_MeltPoint").innerHTML = document.getElementById("Elem_MeltPoint_"+arrayLoop).textContent;
			document.getElementById("Info_BoilPoint").innerHTML = document.getElementById("Elem_BoilPoint_"+arrayLoop).textContent;
			document.getElementById("Info_Density").innerHTML = document.getElementById("Elem_Density_"+arrayLoop).textContent;
			document.getElementById("Info_Electronegativity").innerHTML = document.getElementById("Elem_Electronegativity_"+arrayLoop).textContent;
		}
		
	}
}

function Search_ByAtomicNumber(){
	var Query = document.getElementById("SearchQuery").value;
	if (Query > 0 && Query < 119){
		document.getElementById("Info_Symbol").innerHTML = elementArray_Symbol[Query];
		document.getElementById("Info_Name").innerHTML = elementArray_Name[Query];
		document.getElementById("Info_AtomicNumber").innerHTML = Query;
		document.getElementById("Info_AtomicWeight").innerHTML = document.getElementById("Elem_AtomicWeight_"+Query).textContent;
		document.getElementById("Info_OxidState").innerHTML = document.getElementById("Elem_OxidState_"+Query).textContent;
		document.getElementById("Info_MeltPoint").innerHTML = document.getElementById("Elem_MeltPoint_"+Query).textContent;
		document.getElementById("Info_BoilPoint").innerHTML = document.getElementById("Elem_BoilPoint_"+Query).textContent;
		document.getElementById("Info_Density").innerHTML = document.getElementById("Elem_Density_"+Query).textContent;
		document.getElementById("Info_Electronegativity").innerHTML = document.getElementById("Elem_Electronegativity_"+Query).textContent;
	}
}

function GoogleElement(){
	var ElementName = document.getElementById("Info_Name").textContent;
	console.log(ElementName);
	//document.getElementById("testing").innerHTML = ElementName;
	/*if (ElementName == "?"){
		ElementName = "Periodic Table"
	}*/
	window.open("http://google.com/search?q="+ElementName);
}