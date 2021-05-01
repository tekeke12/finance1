// Working UI
var uiController = (function(){
    var DomStrings = {
        inputType: ".add__type",
        inputDescription: ".add__description",
        inputValue: ".add__value",
        addBtn:".add__btn"
    };
    return {
        getInput: function() {
            return {
                type: document.querySelector(DomStrings.inputType).value,
                description: document.querySelector(DomStrings.inputDescription).value,
                value: document.querySelector(DomStrings.inputValue).value
            };
        },
        getDOMstrings: function(){
            return DomStrings
        },

        addListItem: function(item, type){
            var html, list;
            if(type === 'inc'){
                list = '.income__list'
                html = '<div class="item clearfix" id="income-&id&"><div class="item__description">$$Description$$</div><div class="right clearfix"><div class="item__value">$$value$$</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }else {
                list = '.expenses__list'

                html = '<div class="item clearfix" id="expense-&id&"><div class="item__description">$$Description$$</div><div class="right clearfix"><div class="item__value">$$value$$</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }
            html = html.replace("&id&", item.id);
            html = html.replace("$$Description$$", item.description);
            html = html.replace("$$value$$", item.value);
            
            document.querySelector(list).insertAdjacentHTML("beforeend", html);
        }
    };
})();

// Working finance controller
var financeController = (function(){
    var Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    } ;
    var Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    } ;

    var data = {
        items:{
            inc: [],
            exp: []
        },
        totals: {
            inc: 0,
            exp: 0
        }
    };
    return {
        addItem: function(type, desc, val){
            var item, id;
            if (data.items[type].length === 0) id = 1;
            else {
                id = data.items[type][data.items[type].length-1].id + 1;
            }
            if (type === "inc"){
                item = new Income(id, desc, val);
            }else {
                item = new Expense(id, desc, val);
            }
            data.items[type].push(item);
            return item;
        },
        seeData: function(){
            return data;
        }
    };
})();

// Program combine controller
var appController = (function(uiController, fnController){

    
    var ctrlAdditem = function(){
        // 1.Searching entry data from ui
        var input = uiController.getInput()
        // 2.Transfer data to finance controller
        var item = fnController.addItem(input.type, input.description, input.value);
        
        // 3.Olson ugugdluude web deere tohiroh eshiig shalgah
        uiController.addListItem(item, input.type);
        // 4.Tuswiig tootsoolno
        
        // 5.Etsiin uldegdel
    };
    var setupEventListener = function(){
        var DOM = uiController.getDOMstrings();
        
        document.querySelector(DOM.addBtn).addEventListener("click", function(){
            ctrlAdditem();
        });
    
        document.addEventListener = ("keypress", function(event){
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });
    };
        return {
            init: function(){
                console.log("App Started"),
                setupEventListener()
            }
        };
})(uiController, financeController);
appController.init();