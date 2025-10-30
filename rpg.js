let xp = 0;
let health = 100;
let gold = 100;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["Stick"];

const xpText = document.querySelector("#xp");
const healthText = document.querySelector("#health");
const goldText = document.querySelector("#gold");
const store = document.querySelector("#store");
const cave = document.querySelector("#cave");
const fight = document.querySelector("#fight");
const monsterStats = document.querySelector(".monster-stats");
const monsterNameText = document.querySelector("#monster-name");
const monsterHealthText = document.querySelector("#monster-health");
const text = document.querySelector("#text");

const weapons = [
    {
        name:"Stick",
        power: 10
    },
    {
        name:"Dagger",
        power: 20
    },
    {
        name:"Axe",
        power: 50
    },
    {
        name:"Sword",
        power: 100
    }
];

const monsters = [
    {
        name:"Goblin",
        level:10,
        health:50
    },
    {
        name:"Skeleton",
        level:30,
        health:200
    },
    {
        name:"Dragon",
        level:50,
        health:500
    }
]

const locations = [
    {
        name:"town square",
        "button text":["Go To Store","Go To Cave","Fight The Dragon"],
        "button function":[gotostore,gotocave,fightthedragon],
        text:"You Are In The Town Square. You See A Sign That Says \"Store\"."
    },
    {
        name:"store",
        "button text":["Buy 50 Health (10 Gold)","Buy Weapon (30 Gold)","Go To Town Square"],
        "button function":[buyHealth,buyWeapon,goTown],
        text:"You Entered The Store."
    },
    {
        name:"cave",
        "button text":["Fight Skeleton","Fight Goblin","Go To Town Square"],
        "button function":[fightskeleton,fightgoblin,goTown],
        text:"You Enter The Cave. You See Some Monsters."
    },
    {
        name:"fight",
        "button text":["Attack","Dodge","Run"],
        "button function":[attack,dodge,goTown],
        text: "You Are Fighting A Monster."
    },
    {
        name:"killMonster",
        "button text":["Go To Town Square","Go To Town Square","Go To Town Square"],
        "button function":[goTown,goTown,goTown],
        text: "The Monster Is Defeated. You Got Xp And Gold From It."
    },
    {
        name:"lose",
        "button text":["REPLAY?","REPLAY?","REPLAY?"],
        "button function":[restart,restart,restart],
        text: "You Are Dead."
    },
    {
        name:"win",
        "button text":["REPLAY?","REPLAY?","REPLAY?"],
        "button function":[restart,restart,restart],
        text: "You Have Successfully Defeated The Dragon. You Won The Game."
    }
    
];

store.onclick = gotostore;
cave.onclick = gotocave;
fight.onclick = fightthedragon;

function update(location) {
    monsterStats.style.display = "none";
    store.innerText = location["button text"][0];
    cave.innerText = location["button text"][1];
    fight.innerText = location["button text"][2];
    text.innerText = location.text;

    store.onclick = location["button function"][0];
    cave.onclick = location["button function"][1];
    fight.onclick = location["button function"][2];
}

function goTown() {
    update(locations[0]);
}

function gotostore() {
    update(locations[1]);
}

function buyHealth() {
    if (gold>=10) {
        gold -= 10
        health += 10
        goldText.innerText = gold
        healthText.innerText = health
    }
    else {
        text.innerText = "You Do Not Have Enough Gold To Purchase."
    }
}

function buyWeapon() {
    if(currentWeapon < weapons.length - 1) {
        if (gold>=30) {
            gold -= 30
            currentWeapon++;
            goldText.innerText = gold;
            let newWeapon = weapons[currentWeapon].name;
            text.innerText = "You Have Purchased "+ newWeapon +".";
            inventory.push(newWeapon);
            text.innerText += " In Your Inventory You Have : " + inventory;
        }
        else {
            text.innerText = "You Do Not Have Enough Gold";
        }
    }
    else {
        text.innerText = "You Already Have The Most Powerful Weapon";
        cave.innerText = "Sell Your Weakest Weapon (15 Gold)";
        cave.onclick = sellWeapon;
    }
}

function sellWeapon(){
    if(inventory.length > 1){
        gold += 15;
        goldText.innerText = gold;
        currentWeapon = inventory.shift();
        text.innerText = "You Sold A : " + currentWeapon+".";
        text.innerText += " In Your Inventory You Have : "+ inventory;
    }
    else {
        text.innerText = "Don't Sell Your Only Weapon.";
    }
}

function gotocave() {
    update(locations[2]);
}

function goFight() {
    update(locations[3]);
    monsterHealth = monsters[fighting].health;
    monsterStats.style.display = "block";
    monsterHealthText.innerText = monsterHealth;
    monsterNameText.innerText = monsters[fighting].name;
}

function attack() {
    text.innerText = "The "+ monsters[fighting].name +" Attacks.";
    text.innerText += " You Attack It With Your "+ weapons[currentWeapon].name +".";
    health -= monsters[fighting].level;
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() *xp) + 1;
    healthText.innerText = health;
    monsterHealthText.innerText = monsterHealth;
    if(health <= 0){
        lose();
    }
    else if (monsterHealth <= 0){
        fighting === 2 ? winGame() : defeatMonster();
    }

}
function dodge() {
    text.innerText = "You Dodge The Attack From The "+ monsters[fighting].name +".";
}

function lose(){
    update(locations[5]);   
}

function winGame(){
    update(locations[6]);
}

function restart(){
    xp = 0;
    health = 100;
    gold = 100;
    currentWeapon = 0;
    inventory = ["Stick"];
    goldText.innerText = gold;
    healthText.innerText = health;
    xpText.innerText = xp;
    goTown();
}

function defeatMonster(){
    gold += Math.floor(monsters[fighting].level * 6.7);
    xp += monsters[fighting].level;
    goldText.innerText = gold;
    xpText.innerText = xp;
    update(locations[4]);
}

function fightgoblin() {
    fighting = 0;
    goFight();
}

function fightskeleton() {
    fighting = 1;
    goFight();
}

function fightthedragon() {
    fighting = 2;
    goFight();
}