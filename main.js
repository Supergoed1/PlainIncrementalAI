//PlainIncremental Code IGNORE
var game = {
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
};
var market = {
    appleprice: 10,
    apples: 0
}


var dataversion = 0.1;

var defaultGame = game;

var upgradeMenu = document.getElementById("upgradesMenu");
var updateguiint = setInterval("updateGui()", 20);
//var upgradeint = setInterval("update()", 50);
var everySec = setInterval(() => {
    for (let index = 0; index < subjects.length; index++) {
        var subject = subjects[index];
        
        subject.aiGame.money += getPrestigeBonus(subject.aiGame.moneyPerSec, subject);
    }
}, 1000);

function init() {
    AiInit();
    console.log("Initialized");
}

function reset(subject) {
    subject.aiGame = defaultGame;
}

function updateGui() {
    document.getElementById("sub1cash").innerHTML="Subject 1 cash:"+subjects[0].aiGame.money + " " + subjects[0].path + " Current Path " + currentpath;
    document.getElementById("sub2cash").innerHTML="Subject 2 cash:"+subjects[1].aiGame.money;
    document.getElementById("sub3cash").innerHTML="Subject 3 cash:"+subjects[2].aiGame.money;
    document.getElementById("sub4cash").innerHTML="Subject 4 cash:"+subjects[3].aiGame.money;
    document.getElementById("sub5cash").innerHTML="Subject 5 cash:"+subjects[4].aiGame.money;
    document.getElementById("sub6cash").innerHTML="Subject 6 cash:"+subjects[5].aiGame.money;
}


function toggleVisibility(element) {
    if(element.style.visibility == "hidden") {
        element.style.visibility = "visible";
    } else{
        element.style.visibility = "hidden";
    }
}

function getPrestigeBonus(num, subject) {
    return (num * (1 +  (subject.aiGame.prestigeCoins * subject.aiGame.bonusPerPresCoin / 100)));
}

function onClick(subject) {
    subject.aiGame.money = subject.aiGame.money * 1 + getPrestigeBonus(subject.aiGame.moneyPerClick, subject);
}

function prestige(subject) {
    document.getElementById("applesellamount").value = market.apples;
    for(var i = 0; i < market.apples; i++) {
        sellMarket("apple");
    }
    document.getElementById("applesellamount").value = 1;
    subject.aiGame.prestigeCoins += Math.round(Math.round(subject.aiGame.money / 100));
    subject.aiGame.money = 0;
    subject.aiGame.moneyPerClick = 1;
    subject.aiGame.moneyPerSec = 0;
    subject.aiGame.clickAmountPerUpgrade = 1;
    subject.aiGame.clickUpgradeAmountTillNextUpgrade = 0;
    subject.aiGame.clickUpgradeCost = 10;
    subject.aiGame.perSecAmountPerUpgrade = 1;
    subject.aiGame.perSecUpgradeAmountTillNextUpgrade = 0;
    subject.aiGame.perSecUpgradeCost = 25;
    subject.aiGame.offlineTimeCost = 1000;
    subject.aiGame.maxOfflineTime = 0.5;
}

function format(number) {
    return number.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

function buyUpgrade(upgrade, subject) {
    if(upgrade == "click") {   
        if(subject.aiGame.money >= subject.aiGame.clickUpgradeCost) {
            subject.aiGame.moneyPerClick += subject.aiGame.clickAmountPerUpgrade;
            subject.aiGame.money -= subject.aiGame.clickUpgradeCost;
            subject.aiGame.clickUpgradeAmountTillNextUpgrade += 1;
            if(subject.aiGame.clickUpgradeAmountTillNextUpgrade >= 5) {
                subject.aiGame.clickAmountPerUpgrade *= 2;
                subject.aiGame.clickUpgradeAmountTillNextUpgrade = 0;
            }
            subject.aiGame.clickUpgradeCost *= 1.50;
        }
    }
    if(upgrade == "perSec") {   
        if(subject.aiGame.money >= subject.aiGame.perSecUpgradeCost) {
            subject.aiGame.moneyPerSec += subject.aiGame.perSecAmountPerUpgrade;
            subject.aiGame.money -= subject.aiGame.perSecUpgradeCost;
            subject.aiGame.perSecUpgradeAmountTillNextUpgrade += 1;
            if(subject.aiGame.perSecUpgradeAmountTillNextUpgrade >= 5) {
                subject.aiGame.perSecAmountPerUpgrade *= 2;
                subject.aiGame.perSecUpgradeAmountTillNextUpgrade = 0;
            }
            subject.aiGame.perSecUpgradeCost *= 1.50;
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

var currentpath=[];

var stop = false;

var aiInterval = setInterval(() => {
    if(stop) {
        return;
    }
    for (let index = 0; index < subjects.length; index++) {
        var subject = subjects[index];
        if(checkIfDone()) {
            evolve();
            return;
        }
        if(subject.done) {
            continue;
        }
        if(subject.turns == subject.maxTurns) {
            console.log("Subject " + subject.number + " is out of turns")
            console.log("Subject earned " + subject.aiGame.money)
            subject.done = true;
            continue;
        } else if (subject.turns < subject.path.length) {
            doAction(subject, subject.path[subject.turns - 1])
            if(subject.number == 1) {
                currentpath.push(subjects[0].path[subjects[0].turns]);
            }
            continue;
        } else {
            var randomint = getRandomInt(0,2);
            doAction(subject, randomint);
            subject.path.push(randomint);
            if(subject.number == 1) {
                currentpath.push(randomint);
            }
        }
        
    }
}, 1000);

var subjects = [subject1 = {turns: 0,maxTurns: 5,path: [], aiGame: {
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
}, number: 1, done: false},
subject2 = {turns: 0,maxTurns: 5,path: [], aiGame: {
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
}, number: 2, done: false},
subject3 = {turns: 0,maxTurns: 5,path: [], aiGame: {
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
}, number: 3, done: false},
subject4 = {turns: 0,maxTurns: 5,path: [], aiGame: {
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
}, number: 4, done: false},
subject5 = {turns: 0,maxTurns: 5,path: [], aiGame: {
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
}, number: 5, done: false},
subject6 = {turns: 0,maxTurns: 5,path: [], aiGame: {
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
}, number: 6, done: false}];

function AiInit() {
    console.log("AI init complete");
}

function checkIfDone() {
    var donesubjects = 0;
    for (let index = 0; index < subjects.length; index++) {
        var subject = subjects[index];
        if(subject.done) {
            donesubjects++;
            continue;
        }
    }
    if(donesubjects >= subjects.length) {
        return true;
    } else {
        return false;
    }
}

function evolve() {
    stop = true;
    for (let index = 0; index < subjects.length; index++) {
        var subject = subjects[index];
        console.log("Subject " +  subject.number  + " earned " + subject.aiGame.money)
        subject.maxTurns += 5;
        subject.turns = 0;
        subject.done = false;
    }
    var stoptimeout = setTimeout(() => {
        currentpath = [];
        for (let index = 0; index < subjects.length; index++) {
            var subject = subjects[index];
            subject.aiGame = {
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
            }
        }
        stop = false;
    }, 3000);
}

function doAction(subject,action) {
    //0 = click, 1 = buyClickUpgrade, 2 = buy perSecUpgrade
    switch (action) {
        case 0:
            onClick(subject);
            subject.turns++;
            console.log("Subject " + subject.number + " clicked the button");
            break;
        case 1:
            buyUpgrade("click", subject);
            subject.turns++;
            console.log("Subject " + subject.number + " bought click upgrade");
            break;
        case 2:
            buyUpgrade("perSec", subject);
            subject.turns++;
            console.log("Subject " + subject.number + " bought perSec upgrade");
            break;
    }
}

