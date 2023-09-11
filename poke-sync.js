import readlineSync from "readline-sync";
import chalk from "chalk";

class Pokemon { //? Approved
    constructor(name, health, magic, color) {
        this.name = name;
        this.health = health;
        this.magic = magic;
        this.color = color;
        this.baseHealth = health;
        this.baseMagic = magic;
    }
    skills = [];
    level = 1;
    currentXP = 0;
    neededXP = 10;
    xp = 5;
    attack(skillUsed, enemy) { // pokemon attacks //? Approved - review...
        if (!this.isAlive()) {
            console.log(`${
                this.nameColor
            } has no more health points and is unable to continue the battle`); // TODO - Maybe not necesary...
        } else if (!this.hasEnoughMagic(skillUsed)) {
            console.log(`${
                this.nameColor
            } does not have enough magic to attack`);
            return
                // gamingStart.fight.start()
        } else { // attack happens
            enemy.health -= skillUsed.damage;
            this.magic -= skillUsed.magic;
            console.log(`${
                enemy.nameColor
            } receives ${
                chalk.redBright(skillUsed.damage)
            } points of damage.`);
            if (!enemy.isAlive()) {
                console.log(`\n${
                    enemy.nameColor
                } has no more health points`);
                return; // TODO - Necesary...?
            }
        }
    }    
    enemyLevelUp(level) { //? Approved
        if (level > 1) {
            this.health = this.baseHealth + level * 5;
            this.magic = this.baseMagic + level * 5;  
            this.level = level 
        }
        if (level === 3) {
            if (this.skills.length === 1) {
                if (this.name === "Pikachu") {
                    this.learnSkill(thunderShock);
                } else if (this.name === "Bulbasaur") {
                    this.learnSkill(vineWhip);
                } else if (this.name === "Charmander") {
                    this.learnSkill(ember);
                } else if (this.name === "Squirtle") {
                    this.learnSkill(waterGun);
                }
            }
        } else if (this.level === 5) {
            if (this.skills.length === 2) {
                if (this.name === "Pikachu") {
                    this.learnSkill(thunderbolt);
                } else if (this.name === "Bulbasaur") {
                    this.learnSkill(razorLeaf);
                } else if (this.name === "Charmander") {
                    this.learnSkill(flameTower);
                } else if (this.name === "Squirtle") {
                    this.learnSkill(hydroPump);
                }
            }
        }
    }
    gainXP(xp) { // pokemon gets xp points to level up //? Approved
        if (this.currentXP + xp >= this.neededXP) {
            this.level ++;
            this.currentXP += xp - 10;
            this.levelUp();
        } else {
            this.currentXP += xp;
            console.log(`Awesome!! ${
                this.nameColor
            } has won ${
                chalk.cyan(xp)
            } experience points`);
        }
    }   
    getHealth() { // pokemon gains magic points //? Approved
        if (this.baseHealth <= this.health) {
            console.log(`\n${
                this.nameColor
            } can't get more health, it's alredy full`);
        } else {
            let points = Math.ceil(Math.random() * 10 + 10);
            this.health += points;
            console.log(`\n${
                this.nameColor
            } recharges and gets ${points} points of health`);
        }
    }
    getMagic() { // pokemon gains magic points //? Approved
        if (this.baseMagic <= this.magic) {
            console.log(`\n${
                this.nameColor
            } can't get more magic, it's alredy full`);
        } else {
            let points = Math.ceil(Math.random() * 10 + 10);
            this.magic += points;
            console.log(`\n${
                this.nameColor
            } recharges and gets ${points} points of magic`);
        }
    }    
    hasEnoughMagic(skill) { // test poke has enough magic to attack //? Approved
        return this.magic >= skill.magic;
    }
    isAlive() { // Check if poke is has health //? Approved
        return this.health > 0;
    } 
    learnSkill(skill) { // ? Approved
        // pokemon learn new skill
        this.skills.push(skill);
    }
    levelUp() { // ? Approved
        this.baseHealth += 10;
        this.baseMagic += 10;
        this.health = this.baseHealth;
        this.magic = this.baseMagic;
        console.log(`\nCongratulations ${
            this.nameColor
        } has level up`);
        console.log(`\nLevel: ${
            chalk.cyan(this.level)
        }\nHealth: ${
            chalk.cyan(this.health)
        } / Magic: ${
            chalk.cyan(this.magic)
        }\n`);
        if (this.level === 3) {
            if (this.skills.length === 1) {
                if (this.name === "Pikachu") {
                    this.learnSkill(thunderShock);
                } else if (this.name === "Bulbasaur") {
                    this.learnSkill(vineWhip);
                } else if (this.name === "Charmander") {
                    this.learnSkill(ember);
                } else if (this.name === "Squirtle") {
                    this.learnSkill(waterGun);
                }
                console.log(`${nameColor} has learn ${chalk.cyan(this.skills[1].attackName)}`);
            }
        } else if (this.level === 5) {
            if (this.skills.length === 2) {
                if (this.name === "Pikachu") {
                    this.learnSkill(thunderbolt);
                } else if (this.name === "Bulbasaur") {
                    this.learnSkill(razorLeaf);
                } else if (this.name === "Charmander") {
                    this.learnSkill(flameTower);
                } else if (this.name === "Squirtle") {
                    this.learnSkill(hydroPump);
                }
                console.log(`${nameColor} has learn ${chalk.cyan(this.skills[2].attackName)}`);
            }
        }
    }
    pokeDex() { // shows enemyPoke health & magic //? Approved
        return `\n${
            chalk.cyan("PokeDex:")
        }\nThe enemy ${
            this.nameColor
        } has\nHealth: ${
            chalk.cyan(this.health)
        } / Magic: ${
            chalk.cyan(this.magic)
        }`;
    }    
    restoreHP() { // pokemons restores health & magic points //? Approved
        if (this.baseHealth <= this.health) {
            console.log(`${
                this.nameColor
            } health can't be restored, is alredy full`);
        } else {
            this.health = this.baseHealth;
            this.magic = this.baseMagic;
            console.log(`The Health from ${
                this.nameColor
            } has been restored`);
        }
    }
    restoreEnemyHP() { // pokemons restores health & magic points //? Approved
        this.health = this.baseHealth;
        this.magic = this.baseMagic;
    }
    showStatus() { // shows playerPoke health & magic //? Approved
        return `\nYour ${
            this.nameColor
        } is Level: ${chalk.cyan(this.level)} \nHealth: ${
            chalk.cyan(this.health)
        }/${
            chalk.cyan(this.baseHealth)
        } - Magic: ${
            chalk.cyan(this.magic)
        }/${
            chalk.cyan(this.baseMagic)
        }`;
    }
}
class AttackSkill { //? Approved
    constructor(attackName, damage, magic, color) {
        this.attackName = attackName;
        this.damage = damage;
        this.magic = magic;
        this.color = color;
    }
}
class Fight { // Fighting happens here //? Approved
    constructor(playerPoke, enemyPoke) {
        this.playerPoke = playerPoke;
        this.enemyPoke = enemyPoke;
    }
    options = [];
    randomAttack = "";
    start() {
        // ? Approved
        // Battle start when Fn is called
        if (!this.playerPoke.isAlive()) { // check health from playerPoke
            console.log(`You have lost the battle`);
            if (this.playerPoke.health < 0) {
                this.playerPoke.health = 0;
            }
        } else if (this.enemyPoke.health <= 0) { // check health from enemyPoke
            console.log(`${
                this.playerPoke.nameColor
            } has won the battle.`);
            this.playerPoke.gainXP(this.enemyPoke.xp);
        } else {
            let playerDecides = readlineSync.keyInSelect(
                // show menu of actions
                    decition,
                "What are you going to do?"
            );
            if (playerDecides === 0) { // player selects attack
                this.skills(this.playerPoke);
                // calls skills Fn
                // show posible attacks
                let attackSelection = readlineSync.keyInSelect(this.options, "Select your attack");
                if (attackSelection === -1) {
                    this.start();
                } else { // confirmation text
                    console.log(`${
                        chalk.cyan("You are attacking!!")
                    }\n\n${
                        this.playerPoke.nameColor
                    } uses ${
                        this.playerPoke.skills[attackSelection].attackName
                    } against ${
                        this.enemyPoke.nameColor
                    }`);
                    // calls the attack Fn
                    this.playerPoke.attack(this.playerPoke.skills[attackSelection], this.enemyPoke);
                    // enemyPoke attacks playerPoke
                    this.enemyAttack();
                    if (this.enemyPoke.isAlive()) {

                        if (!this.enemyPoke.hasEnoughMagic(this.enemyPoke.skills[this.randomAttack])) { // check enemyPoke magic
                            this.enemyPoke.getMagic();
                            this.start()
                        } else { // random attack
                            console.log(`\nEnemy ${
                                this.enemyPoke.nameColor
                            } attacks!`);
                            this.enemyPoke.attack(this.enemyPoke.skills[this.randomAttack], this.playerPoke);
                            this.start();
                        }
                    } else {
                        this.playerPoke.gainXP(this.enemyPoke.xp)
                    }
                }
            } else if (playerDecides === 1) { // player selects playerPoke status //? Approved
                console.log(`${
                    this.playerPoke.showStatus()
                }`);
                this.start();
            } else if (playerDecides === 2) { // player checks enemyPoke status //? Approved
                console.log(this.enemyPoke.pokeDex());
                this.start();
            } else if (playerDecides === 3) { // poke charges magic //? Approved
                this.playerPoke.getMagic();
                this.start();
            } else if (playerDecides === 4) { //? Approved
                this.playerPoke.getHealth();
                this.start();
            } else { // ? Approved
                console.log(chalk.white("\nYou ran away"));
                gamingStart.runing();
            }
        }
    }
    startGym() {
        // ? Approved
        // Battle start when Fn is called
        if (!this.playerPoke.isAlive()) { // check health from playerPoke
            console.log(`You have lost the battle`);
            endGame = true //! end the game
        } else if (this.enemyPoke.health <= 0) { // check health from enemyPoke
            console.log(`${chalk.magenta("Giovanni")}: How is this posible?\n${this.playerPoke.nameColor} has won the battle.\n\nYou ${chalk.white(player.name)} are now the Champion!\n`);
        } else {
            let playerDecides = readlineSync.keyInSelect(
                // show menu of actions
                    decition,
                "What are you going to do?"
            );
            if (playerDecides === 0) { // player selects attack
                this.skills(this.playerPoke);
                // calls skills Fn
                // show posible attacks
                let attackSelection = readlineSync.keyInSelect(this.options, "Select your attack");
                if (attackSelection === -1) {
                    this.startGym();
                } else { // confirmation text
                    console.log(`${
                        chalk.cyan("You are attacking!!")
                    }\n\n${
                        this.playerPoke.nameColor
                    } uses ${
                        this.playerPoke.skills[attackSelection].attackName
                    } against ${
                        this.enemyPoke.nameColor
                    }`);
                    // calls the attack Fn
                    this.playerPoke.attack(this.playerPoke.skills[attackSelection], this.enemyPoke);
                    // enemyPoke attacks playerPoke
                    this.enemyAttack();
                    if (this.enemyPoke.isAlive()) {
                        
                        if (!this.enemyPoke.hasEnoughMagic(this.enemyPoke.skills[this.randomAttack])) { // check enemyPoke magic
                            this.enemyPoke.getMagic();
                        } else { // random attack
                            console.log(`\nEnemy ${
                                this.enemyPoke.nameColor
                            } attacks!`);
                            this.enemyPoke.attack(this.enemyPoke.skills[this.randomAttack], this.playerPoke);
                            this.start();
                        }
                    }
                }
            } else if (playerDecides === 1) { // player selects playerPoke status //? Approved
                console.log(`${
                    this.playerPoke.showStatus()
                }`);
                this.startGym();
            } else if (playerDecides === 2) { // player checks enemyPoke status //? Approved
                console.log(this.enemyPoke.pokeDex());
                this.startGym();
            } else if (playerDecides === 3) { // poke charges magic //? Approved
                this.playerPoke.getMagic();
                this.startGym();
            } else if (playerDecides === 4) { //? Approved
                this.playerPoke.getHealth();
                this.startGym();
            } else { // ? Approved
                console.log(chalk.white("\nYou ran away"));
                gamingStart.runing();
            }
        }
    }
    enemyAttack() {
        // ? Approved
        // creates a random attack
        let enemySkills = this.enemyPoke.skills.length;
        this.randomAttack = Math.ceil(Math.random()) * enemySkills;
        this.randomAttack --;
    }
    skills(pokemon) {
        // ? Approved
        // test pokemon skills & shows available attacks
        this.options = []; // resets options in every attack
        if (pokemon.skills.length === 3) {
            this.options.push(pokemon.skills[0].attackName, pokemon.skills[1].attackName, pokemon.skills[2].attackName);
        } else if (pokemon.skills.length === 2) {
            this.options.push(pokemon.skills[0].attackName, pokemon.skills[1].attackName);
        } else if (pokemon.skills.length === 1) {
            this.options.push(pokemon.skills[0].attackName);
        }
    }
}
class Game { // ? Approved
    fight = ""
    runing() {
        while (!endGame) { // show option menu & save the selected option
            let option = readlineSync.keyInSelect(options, "What do you want to do");
            if (option === 0) { // player figths another Pokemon
                let enemy = new Trainning(); //
                enemy.findEnemy(); // Finds a random enemy Pokemon
                console.log(chalk.cyan("\nLooking for a Pokemon to figth...."));
                readlineSync.keyInPause(chalk.cyanBright("Pokemon found!!\n\n→"));
                enemy.pokemon.restoreEnemyHP();
                enemy.pokemon.enemyLevelUp(player.pokemon.level)
                // show the enemy pokemon & stats
                console.log(`\nYou are fighting against: \n${
                    enemy.pokemon.nameColor
                } Level: ${
                    chalk.cyan(enemy.pokemon.level)
                }\nHealth: ${
                    chalk.cyan(enemy.pokemon.health)
                } / Magic: ${
                    chalk.cyan(enemy.pokemon.magic)
                }`);
                // Call Fight Fn
                this.fight = new Fight(player.pokemon, enemy.pokemon);
                // call the start fight Fn & fight starts
                this.fight.start();
            } else if (option === 1) { // ? Approved
                console.log(`${
                    player.pokemon.showStatus()
                }`);
            } else if (option === 2) { // ? Approved
                player.pokemon.restoreHP();
            } else if (option === 3) { // ? Approved
                let gym = new GymBattle(playerName, player.pokemon);
                gym.battle();
            } else {
                endGame = true;
                console.log(chalk.cyan(`\n\n**  Thank you for playing!!  **\n\n`));
            }
        }
        return
    }
}
class GymBattle { // ? Approved
    constructor(playerName, playerPokemon) {
        this.playerName = playerName;
        this.playerPokemon = playerPokemon;
        this.enemyPokemon = new Pokemon("Mewtwo", 222, 222, "magenta");
    }
    confusion = new AttackSkill("Confusion", 22, 22, "magenta");
    psychic = new AttackSkill("Psychic", 24, 22, "magenta");
    psybeam = new AttackSkill("Psybeam", 28, 42, "magenta");
    art = chalk.magenta(`
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣤⣄⣾⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣿⣿⢿⣿⣿⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⢰⣦⠀⠀⠀⣽⢿⣵⣿⡟⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⣀⣀⣽⣷⣖⡤⣵⣿⣧⣭⠁⠀⠀⠀⠀⠀⠀
    ⢀⡤⢦⣄⡈⠛⠈⠛⠋⠉⠋⠻⣿⣿⡿⣧⣀⠀⠀⠀⠀⠀
    ⣾⠁⠀⠘⣷⣄⠀⠀⠀⠀⠀⠀⠙⣿⣿⡄⠉⠻⣦⠀⠀⠀
    ⢹⡄⠀⠀⠘⣿⣦⡀⠀⠀⠀⣠⣾⣿⢯⣯⣤⡀⠈⣷⣄⠀
    ⠈⢷⡄⠀⠀⠸⣿⣿⣦⣤⣼⣿⣿⣿⢾⣿⣿⣷⠈⠇⡹⡦
    ⠀⠈⢿⣷⣄⡀⠘⢿⣿⡇⣿⣿⣿⣿⣿⣿⣿⡿⠀⠀⠀⠀
    ⠀⠀⠀⠹⣿⣿⡄⠀⠙⢣⣿⠿⠿⠟⠛⣿⠟⠁⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠉⠀⠀⣠⡿⠃⠀⠀⠀⢠⣿⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⢠⣿⡃⠀⠀⠀⠀⠶⠻⣷⣄⣀⢀⠀⠀
    ⠀⠀⠀⠀⠀⠀⣰⣿⡿⣿⠀⠀⠀⠀⠀⠀⠈⠉⠉⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀`);
    leaderName = chalk.magentaBright("Giovanni");
    battle() { // ? Approved
        this.activatePoke();
        console.log(chalk.cyan("\nLet's see if you are ready for this challenge!!\n"));
        console.log(`The Gym leader ${
            this.leaderName
        } calls his Pokemon`);
        console.log(this.art);
        console.log(`Name: ${
            chalk.magenta(this.enemyPokemon.name)
        }\nLevel: ${
            chalk.magenta("-unknow-")
        }\nHealth: ${
            chalk.magenta(this.enemyPokemon.health)
        } / Magic: ${
            chalk.magenta(this.enemyPokemon.magic)
        }`);
        let gymFight = new Fight(this.playerPokemon, this.enemyPokemon);
        gymFight.start();
    }
    activatePoke() { // ? Approved
        this.enemyPokemon.learnSkill(this.confusion);
        this.enemyPokemon.learnSkill(this.psychic);
        this.enemyPokemon.learnSkill(this.psybeam);
        this.enemyPokemon.nameColor = chalk.magenta("Mewtwo");
    }
}
class Player { // Creates a new Player and it's Pokemon //? Approved
    constructor(playerName, indexPoke) {
        this.playerName = playerName;
        this.indexPoke = indexPoke;
    }
    pokemon = "";
    pokemonSelection = [pikachu, bulbasaur, charmander, squirtle];
    createPoke() {
        this.pokemon = this.pokemonSelection[this.indexPoke];
    }
}
class Trainning { // find a enemy Pokemon to train //? Approved
    pokemon = ""; // saves the enemy pokemon here
    findEnemy() {
        let random = Math.ceil(Math.random() * 4);
        if (random === 1) {
            this.pokemon = pikachuE;
        } else if (random === 2) {
            this.pokemon = bulbasaurE;
        } else if (random === 3) {
            this.pokemon = charmanderE;
        } else {
            this.pokemon = squirtleE;
        }
    }
}

// Normal Attacks
const tackle = new AttackSkill("Tackle", 10, 10, "white");
const scratch = new AttackSkill("Scratch", 11, 11, "white");
const quickAttack = new AttackSkill("Quick Attack", 9, 9, "white");
// Special Attacks
const thunderShock = new AttackSkill("Thunder Shock", 15, 14, "yellow");
const thunderbolt = new AttackSkill("Tunderbolt", 22, 24, "yellow");
const vineWhip = new AttackSkill("Vine Whip", 15, 14, "green");
const razorLeaf = new AttackSkill("Razor Leaf", 20, 20, "green");
const ember = new AttackSkill("Ember", 15, 14, "red");
const flameTower = new AttackSkill("Flame Tower", 21, 22, "red");
const waterGun = new AttackSkill("Water Gun", 15, 14, "blue");
const hydroPump = new AttackSkill("Hydro Pump", 22, 24, "blue");
// Create Pokemon
const pikachu = new Pokemon("Pikachu", 35, 55, "yellow");
const bulbasaur = new Pokemon("Bulbasaur", 45, 45, "green");
const charmander = new Pokemon("Charmander", 38, 52, "red");
const squirtle = new Pokemon("Squirtle", 44, 46, "blue");
// Create enemy Pokemons
const pikachuE = new Pokemon("Pikachu", 35, 55, "yellow");
const bulbasaurE = new Pokemon("Bulbasaur", 45, 45, "green");
const charmanderE = new Pokemon("Charmander", 38, 52, "red");
const squirtleE = new Pokemon("Squirtle", 44, 46, "blue");
// Base Attack for Pokemons lvl 1
pikachu.skills.push(quickAttack);
bulbasaur.skills.push(tackle);
charmander.skills.push(scratch);
squirtle.skills.push(tackle);
// base attack for enemy Pokemons
pikachuE.skills.push(quickAttack);
bulbasaurE.skills.push(tackle);
charmanderE.skills.push(scratch);
squirtleE.skills.push(tackle);
// Color names
pikachu.nameColor = chalk.yellow(pikachu.name);
bulbasaur.nameColor = chalk.green(bulbasaur.name);
charmander.nameColor = chalk.red(charmander.name);
squirtle.nameColor = chalk.blue(squirtle.name);
pikachuE.nameColor = chalk.yellow(pikachu.name);
bulbasaurE.nameColor = chalk.green(bulbasaur.name);
charmanderE.nameColor = chalk.red(charmander.name);
squirtleE.nameColor = chalk.blue(squirtle.name);
// Pictures
pikachu.art = chalk.yellow(`
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡠⣴⡿⠁⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⠊⠀⡿⠁⠀⠀⠀⠀⠀
⠀⠀⢀⣤⣤⡤⠤⠤⠤⢀⣀⡤⠒⠂⠈⠉⠁⠒⢡⡀⡔⠁⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠉⠛⠿⢦⡀⠀⠀⠀⢀⢄⡀⠀⠀⠀⢠⣲⡙⡄⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠈⠁⠖⠀⠸⠾⠃⠀⠠⠄⠈⠋⠁⡵⣠⠤⡄⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⢀⡤⣐⡀⠔⠉⢢⠀⠢⠔⠳⡆⠁⠀⢄⠇⢀⠇⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠻⡀⠈⠑⢌⠒⠊⠀⠀⠁⠈⠀⠀⡠⠊⠀⡘⠀⠀⠀⠀⠀
⡖⠒⠢⠤⠤⠤⠤⢵⡀⠀⠀⠑⠀⠀⠀⠂⠒⠀⠀⠀⠀⢠⠁⠀⠀⠀⠀⠀
⡇⠀⠀⠀⠀⠀⠀⠠⠱⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⡃⠀⠀⠀⠀⠀⠀
⡄⠀⠀⣀⡀⠀⣠⡣⡆⡘⠀⢀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡇⠀⠀⠀⠀⠀⠀
⠉⠉⠁⠀⡆⠀⣩⠠⡗⡇⣸⠟⢣⡀⠀⠀⠀⠀⠀⠀⠀⡇⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠓⠉⢸⡰⣧⠽⡈⡄⢸⠀⠀⠀⠀⠀⠀⠀⠀⠇⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠈⠀⠀⠀⠑⠴⢜⣀⠀⠤⢄⣀⠀⢀⠜⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢡⠈⡇⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢲⠆  `);
bulbasaur.art = chalk.green(`
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣀⣀⣀⣀⡀⠈⡖⡤⠄⠀
⠀⠀⢀⡀⠀⠀⠀⡐⠁⠀⠀⠠⠐⠂⠀⠁⠀⠀:
⠀⠰⡁⠐⢉⣉⣭⡍⠁⠂⠉⠘⡀⠀⠀⠀⠀⠂⠡⠀
⢀⣊⠀⡄⠻⠿⠋⠀⠀⠀⠀⠀⢃⠀⠀⠀⠀⠀ ⢀
⡎⣾⠀⠁⣴⡆⠀⠡⢺⣿⣆⠀⢠⢱⣄⠀⠀⠀⠀ :
⡑⠟⠀⠀⠀⠀⠀⢀⣸⡿⠟⠀⠀⠈⢿⣿⡦⡀⠀⡰
⠙⠔⠦⣤⣥⣤⣤⣤⡤⠆⠀⠀⠀⠀⢀⢀⠀⠈⠎⠀
⠀⠀⠈⣰⡋⢉⠉⠁⠒⠂⢇⢠⡆⠀⠸⢴⣿⠀⠘⠀
⠀⠀⠘⡿⠃⠀⠨⠒⢆⣸⣿⠁⠀⡠⡇⠈⠋⠀⠰⠀
⠀⠀⠀⠛⠒⠒⠁⠀⠈⠷⡤⠤⠐⠀⠘⠒⠒⠖⠁    `);
charmander.art = chalk.red(`
⠀⠀⠀⣀⠔⠒⠒⠂⢄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
  ⢰⢅⠀⠀⢀⣤⢄⢂⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⣾⡆⠀⠀⠀⢸⠼⡎⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
 ⢀⢗⠂⠀⠀⡀⠈⢉⠅⠇⠀⠀⠀⠀⠀⠀⢠⣄⠀
⠀⠈⠢⣓⠔⣲⠖⡫⠊⡘⠀⠀⠀⠀⠀⠀⠲⡟⠙⡆
⠀⢀⢀⠠⠘⣇⠖⢄⠀⠉⠐⠠⢄⣀⡀⠀⠜⠀⠀⣁
⠘⣏⣀⣀⣀⠃⠀⠀⠑⣀⣀⣀⣰⠼⠇⠈⠄⠀⠈⡻
⠀⠁⠀⠀⢰⠀⠀⠀⠀⠠⠀⠡⡀⠀⠀⠀⠈⡖⠚⠀
⠀⠀⠀⡠⠘⠀⠀⠀⠀⢀⠆⠀⠐⡀⠀⡠⠊⣠⠀⠀
⠀⠀⢐⠀⠀⠁⡀⠀⠀⢀⠀⠀⠀⢨⠀⡠⡴⠂⠀⠀
⠀⢀⣨⣤⠀⠀⠐⠃⠐⠚⠢⠀⠀⠈⠑⠊⠀⠀⠀⠀
⠀⠘⠓⠋⠉⠁⠀⠀⠀⠀⠀⠓⢶⡾⠗⠀⠀⠀⠀⠀    `);
squirtle.art = chalk.blue(`
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⠤⠐⠒⠒⠂⠠⡀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⠊⠀⠀⡠⢠⠂⠀⠀⠀⠡⡀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠇⠀⠀⢰⣷⣾⠀⠀⠀⠀⠀⡇⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⡠⠜⢨⠢⠔⡀⠀⠠⠘⠛⠛⠀⠀⠀⠀⢸⡇⠀
⠀⠀⠀⢀⣀⣀⠀⠀⠀⠰⠀⠀⠀⠀⠡⡀⠀⠈⠀⠒⠂⠄⡀⢀….
⠀⡴⠊⠀⠀⠀⠉⢆⠀⡔⢣⠀⠀⠀⠀⠐⡤⣀⠀⠀⠀⠀⠀⣀⠄´
⢸⠀⠀⠀⢠⠀⠀⠈⣼⠀⠀⠣⠀⠀⠀⡰⡀⠀⠉⠀⠀⠰⠉⠀⠁⠠⢄
⢰⠀⠀⠀⠀⠇⠀⢀⢿⠀⢀⠇⡐⠀⠈⠀⠈⠐⠠⠤⠤⠤⠀⠀⠀⠀⢨
⠀⢓⠤⠤⠊⠀⠀⢸⠀⠣⠀⡰⠁⠀⠀⡀⠀⠀⠀⠸⠀⢰⠁⠐⠂⠈⠁
⠀⠀⠑⢀⠀⠀⠀⠈⣄⠖⠉⠑⢄⠠⠊⠀⠢⢄⣠⣃⣀⡆⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠑⠠⢀⣀⠎⠀⠀⠀⠈⡄⠀⠀⠀⢠⢃⠠⠃⠐⡀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠸⠀⠀⠀⠀⢀⠯⠉⠤⢴⡃⠁⠀⠀⠀⡇⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠰⡁⠀⠀⠀⠠⠂⠀⠀⠀⠀⠑⢄⠀⠀⢀⠲⠁⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠘⠒⠑⠔⠁⠀⠀⠀⠀⠀⠀⠀⠁⠉⠀⠀⠀⠀`);
const pokeSyncArt = `
${
    chalk.red("█▀█ █▀█ █▄▀ █▀▀")
}   ${
    chalk.white("▄▄")
}   ${
    chalk.blue("█▀ █▄█ █▄ █ █▀▀")
}
${
    chalk.red("█▀▀ █▄█ █ █ ██▄")
}   ${
    chalk.white("--")
}   ${
    chalk.blue("▄█  █  █ ▀█ █▄▄")
}
`;
// Arrays with different options for keyInSelect()
// Select a Pokemon
const firstPokemon = [
    chalk.yellow("Pikachu"), 
    chalk.green("Bulbasaur"), 
    chalk.red("Charmander"), 
    chalk.blue("Squirtle"),
];
// Option menu in game
const options = [
    chalk.cyan("Train Pokemon"), 
chalk.cyan("Pokemon status"), 
chalk.greenBright("Restore Pokemon's health"), 
chalk.magenta("Challenge Gym Leader"),
];
// Options in fighting menu
const decition = [
    chalk.red("Attack"), 
    chalk.cyan("Pokemon status"), 
    chalk.cyanBright("PokeDex"), 
    chalk.green("Recharge magic"),
    chalk.greenBright("Recharge health")
];

// Status of the game
let endGame = false;

// * ------------------------------Game starts here:---------------------------------- *//
console.log(`Welcome to:`);
console.log(pokeSyncArt);
// saves plasyer name
let playerName = readlineSync.question("What's your name? ");
// If player gives no name, playerName = "player"
if (! playerName) {
    playerName = "player";
}
// greet player
console.log(`Nice to meet you ${
    chalk.white(playerName)
}.`);
console.log(`${
    chalk.cyan("\nPlease select your Pokemon:")
}`);
// Options to pick a Pokemon from an array
let indexPokemon = readlineSync.keyInSelect(firstPokemon, "choose wisely...");
// Show the selected Pokemon
console.log("\nYou have chosen", firstPokemon[indexPokemon]);
// Create a player with name
let player = new Player(playerName, indexPokemon);
// Create a Pokemon for player
player.createPoke();
// Show picture of Pokemon selected
console.log(player.pokemon.art);
// Show the stats of the Pokemon
readlineSync.keyInPause(`Level: ${
    chalk.cyan(player.pokemon.level)
}\nHealth points:${
    chalk.cyan(player.pokemon.health)
} / Magic points: ${
    chalk.cyan(player.pokemon.magic)
}\nAttacks:\n${
    chalk.bold(player.pokemon.skills[0].attackName)
}: damage: ${
    chalk.cyan(player.pokemon.skills[0].damage)
} / magic: ${
    chalk.cyan(player.pokemon.skills[0].magic)
}\n\n→`);
// basic guide and goals
readlineSync.keyInPause(`\n${
    chalk.cyan("Your goal is to defeat the Gym Leader.\nbut first you should train your Pokemon and learn more attacks.")
}\n\n→`);
const gamingStart = new Game(); // create a game session
gamingStart.runing(); // run the game session
