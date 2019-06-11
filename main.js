//PlainIncremental Code IGNORE
var game = {
    dataversion: 0.1,
    money: 0,
    moneyPerClick: 1,
    moneyPerSec: 0,
    prestigeCoins: 0,
    bonusPerPresCoin: 1,
    clickUpgradeCost: 10,
    clickAmountPerUpgrade: 1,
    clickUpgradeAmountTillNextUpgrade: 0,
    perSecUpgradeCost: 25,
    perSecAmountPerUpgrade: 1,
    perSecUpgradeAmountTillNextUpgrade: 0,
    offlineTimeCost: 1000,
    maxOfflineTime: 0.5,
    prestigeBonusUpgradeCost: 500
};
var market = {
    appleprice: 10,
    apples: 0
}


var dataversion = 0.1;

var defaultGame = game;

var upgradeMenu = document.getElementById("upgradesMenu");
var updateguiint = setInterval("updateGui()", 20);
var upgradeint = setInterval("update()", 50);
var everySec = setInterval(() => {
    subject.game.money += (getPrestigeBonus(subject.game.moneyPerSec) / 100);
}, 10);

function init() {
    AiInit();
    console.log("Initialized");
}

function reset(subject) {
    subject.game = defaultGame;
}
/*
function updateGui() {
    document.getElementById("money").innerHTML = format(subject.subject.game.money);
    document.getElementById("presCoins").innerHTML = "Prestige Coins: " + subject.subject.game.prestigeCoins;
    document.getElementById("presBonus").innerHTML = "Prestige Bonus: " + subject.subject.game.prestigeCoins * subject.subject.game.bonusPerPresCoin + "%";
    document.getElementById("clickButton").innerHTML = "+" + format(getPrestigeBonus(subject.subject.game.moneyPerClick));
    document.getElementById("clickUpgrade").innerHTML = "+" + format(subject.subject.game.clickAmountPerUpgrade) + "/click <br> Cost: " + format(subject.subject.game.clickUpgradeCost);
    document.getElementById("perSecUpgrade").innerHTML = "+" + format(subject.subject.game.perSecAmountPerUpgrade) + "/per sec <br> Cost: " + format(subject.subject.game.perSecUpgradeCost);
    document.getElementById("offlineTimeUpgrade").innerHTML = "+0.5 hours offline time <br> Cost: " + format(subject.subject.game.offlineTimeCost);
    document.getElementById("aprice").innerHTML = "Apple Price: " + format(market.appleprice);
    document.getElementById("aamount").innerHTML = "Apples: " + market.apples;
}
*/

function toggleVisibility(element) {
    if(element.style.visibility == "hidden") {
        element.style.visibility = "visible";
    } else{
        element.style.visibility = "hidden";
    }
}

function getPrestigeBonus(num, subject) {
    return (num * (1 +  (subject.game.prestigeCoins * subject.subject.game.bonusPerPresCoin / 100)));
}

function onClick(subject) {
    subject.game.money = subject.game.money * 1 + getPrestigeBonus(subject.game.moneyPerClick);
}

function prestige(subject) {
    document.getElementById("applesellamount").value = market.apples;
    for(var i = 0; i < market.apples; i++) {
        sellMarket("apple");
    }
    document.getElementById("applesellamount").value = 1;
    subject.game.prestigeCoins += Math.round(Math.round(subject.game.money / 100));
    subject.game.money = 0;
    subject.game.moneyPerClick = 1;
    subject.game.moneyPerSec = 0;
    subject.game.clickAmountPerUpgrade = 1;
    subject.game.clickUpgradeAmountTillNextUpgrade = 0;
    subject.game.clickUpgradeCost = 10;
    subject.game.perSecAmountPerUpgrade = 1;
    subject.game.perSecUpgradeAmountTillNextUpgrade = 0;
    subject.game.perSecUpgradeCost = 25;
    subject.game.offlineTimeCost = 1000;
    subject.game.maxOfflineTime = 0.5;
}

function format(number) {
    return number.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

function buyUpgrade(upgrade, subject) {
    if(upgrade == "click") {   
        if(subject.game.money >= subject.game.clickUpgradeCost) {
            subject.game.moneyPerClick += subject.game.clickAmountPerUpgrade;
            subject.game.money -= subject.game.clickUpgradeCost;
            subject.game.clickUpgradeAmountTillNextUpgrade += 1;
            if(subject.game.clickUpgradeAmountTillNextUpgrade >= 5) {
                subject.game.clickAmountPerUpgrade *= 2;
                subject.game.clickUpgradeAmountTillNextUpgrade = 0;
            }
            subject.game.clickUpgradeCost *= 1.50;
        }
    }
    if(upgrade == "perSec") {   
        if(subject.game.money >= subject.game.perSecUpgradeCost) {
            subject.game.moneyPerSec += subject.game.perSecAmountPerUpgrade;
            subject.game.money -= subject.game.perSecUpgradeCost;
            subject.game.perSecUpgradeAmountTillNextUpgrade += 1;
            if(subject.game.perSecUpgradeAmountTillNextUpgrade >= 5) {
                subject.game.perSecAmountPerUpgrade *= 2;
                subject.game.perSecUpgradeAmountTillNextUpgrade = 0;
            }
            subject.game.perSecUpgradeCost *= 1.50;
        }
    }
    
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

init();

//AI Starts here
var aiInterval = setInterval(() => {
    for (let index = 0; index < subjects.length; index++) {
        var subject = subjects[index];
        if(subject.done) {
            return;
        }
        if(subject.turns <= 0) {
            console.log("Subject " + subject.number + " is out of turns")
            subject.done = true;
            return;
        }
        doAction(subject, getRandomInt(0,3))
    }
}, 1000);

var subjects = [subject1 = {turns: 5, aiGame: game, number: 1, done: false},
subject2 = {turns: 5, aiGame: game, number: 2, done: false},
subject3 = {turns: 5, aiGame: game, number: 3, done: false},
subject4 = {turns: 5, aiGame: game, number: 4, done: false},
subject5 = {turns: 5, aiGame: game, number: 5, done: false},
subject6 = {turns: 5, aiGame: game, number: 6, done: false}];

function AiInit() {
    console.log("AI init complete");
}

function doAction(subject,action) {
    //0 = click, 1 = buyClickUpgrade, 2 = buy perSecUpgrade
    switch (action) {
        case 0:
            onClick(subject);
            subject.turns--;
            console.log("Subject " + subject.number + " clicked the button");
            break;
        case 1:
            buyUpgrade("click", subject);
            subject.turns--;
            break;
        case 2:
            buyUpgrade("perSec", subject);
            subject.turns--;
            break;
    }
}

