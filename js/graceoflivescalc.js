Decimal.config({
    precision: 17
});

//GLOBAL VARIABLES
var rawData = "";
var hs = new Decimal(0);
var ascZone = new Decimal(0);
var ancientTableShow = 0;
var summonedAncients = 0;
var ratio = new Decimal(1);
var additionalASShow = new Decimal(0);
var ancient = {
    "3": {
        "Name": "Solomon",
        "Level": Decimal(0),
        "OptimalLevel": Decimal(0),
        "CostToOptimal": Decimal(0),
        "Visible": "true",
    },
    "4": {
        "Name": "Libertas",
        "Level": Decimal(0),
        "OptimalLevel": Decimal(0),
        "CostToOptimal": Decimal(0),
        "Visible": "true",
    },
    "5": {
        "Name": "Siyalatas",
        "Level": Decimal(0),
        "OptimalLevel": Decimal(0),
        "CostToOptimal": Decimal(0),
        "Visible": "true",
    },
    //"6":{"Name" : "Khrysos, Ancient of Inheritance", "Level" : 0, "Hidden" : true},
    //"7":{"Name" : "Thusia, Ancient of Vaults", "Level" : 0, "Hidden" : true},
    "8": {
        "Name": "Mammon",
        "Level": Decimal(0),
        "OptimalLevel": Decimal(0),
        "CostToOptimal": Decimal(0),
        "Visible": "true",
    },
    "9": {
        "Name": "Mimzee",
        "Level": Decimal(0),
        "OptimalLevel": Decimal(0),
        "CostToOptimal": Decimal(0),
        "Visible": "true",
    },
    //"10":{"Name" : "Pluto, Ancient of Wealth", "Level" : 0, "Hidden" : true},
    "11": {
        "Name": "Dogcog",
        "Level": Decimal(0),
        "OptimalLevel": Decimal(0),
        "CostToOptimal": Decimal(0),
        "Visible": "true",
    },
    "12": {
        "Name": "Fortuna",
        "Level": Decimal(0),
        "OptimalLevel": Decimal(0),
        "CostToOptimal": Decimal(0),
        "Visible": "true",
    },
    "13": {
        "Name": "Atman",
        "Level": Decimal(0),
        "OptimalLevel": Decimal(0),
        "CostToOptimal": Decimal(0),
        "Visible": "true",
    },
    "14": {
        "Name": "Dora",
        "Level": Decimal(0),
        "OptimalLevel": Decimal(0),
        "CostToOptimal": Decimal(0),
        "Visible": "true",
    },
    "15": {
        "Name": "Bhaal",
        "Level": Decimal(0),
        "OptimalLevel": Decimal(0),
        "CostToOptimal": Decimal(0),
        "Visible": "false",
    },
    "16": {
        "Name": "Morgulis",
        "Level": Decimal(0),
        "OptimalLevel": Decimal(0),
        "CostToOptimal": Decimal(0),
        "Visible": "true",
    },
    "17": {
        "Name": "Chronos",
        "Level": Decimal(0),
        "OptimalLevel": Decimal(0),
        "CostToOptimal": Decimal(0),
        "Visible": "true",
    },
    "18": {
        "Name": "Bubos",
        "Level": Decimal(0),
        "OptimalLevel": Decimal(0),
        "CostToOptimal": Decimal(0),
        "Visible": "true",
    },
    "19": {
        "Name": "Fragsworth",
        "Level": Decimal(0),
        "OptimalLevel": Decimal(0),
        "CostToOptimal": Decimal(0),
        "Visible": "false",
    },
    "20": {
        "Name": "Vaagur",
        "Level": Decimal(0),
        "OptimalLevel": Decimal(0),
        "CostToOptimal": Decimal(0),
        "Visible": "false",
    },
    "21": {
        "Name": "Kumawakamaru",
        "Level": Decimal(0),
        "OptimalLevel": Decimal(0),
        "CostToOptimal": Decimal(0),
        "Visible": "true",
    },
    "22": {
        "Name": "Chawedo",
        "Level": Decimal(0),
        "OptimalLevel": Decimal(0),
        "CostToOptimal": Decimal(0),
        "Visible": "false",
    },
    "23": {
        "Name": "Hecatoncheir",
        "Level": Decimal(0),
        "OptimalLevel": Decimal(0),
        "CostToOptimal": Decimal(0),
        "Visible": "false",
    },
    "24": {
        "Name": "Berserker",
        "Level": Decimal(0),
        "OptimalLevel": Decimal(0),
        "CostToOptimal": Decimal(0),
        "Visible": "false",
    },
    "25": {
        "Name": "Sniperino",
        "Level": Decimal(0),
        "OptimalLevel": Decimal(0),
        "CostToOptimal": Decimal(0),
        "Visible": "false",
    },
    "26": {
        "Name": "Kleptos",
        "Level": Decimal(0),
        "OptimalLevel": Decimal(0),
        "CostToOptimal": Decimal(0),
        "Visible": "false",
    },
    "27": {
        "Name": "Energon",
        "Level": Decimal(0),
        "OptimalLevel": Decimal(0),
        "CostToOptimal": Decimal(0),
        "Visible": "false",
    },
    "28": {
        "Name": "Argaiv",
        "Level": Decimal(0),
        "OptimalLevel": Decimal(0),
        "CostToOptimal": Decimal(0),
        "Visible": "true",
    },
    "29": {
        "Name": "Juggernaut",
        "Level": Decimal(0),
        "OptimalLevel": Decimal(0),
        "CostToOptimal": Decimal(0),
        "Visible": "false",
    },
    //"30":{"Name" : "Iris, Ancient of Vision", "Level" : 0, "Hidden" : true},
    "31": {
        "Name": "Revolc",
        "Level": Decimal(0),
        "OptimalLevel": Decimal(0),
        "CostToOptimal": Decimal(0),
        "Visible": "false",
    },
}
var outsider = {
    "1": {
        "Name": "Xyliqil",
        "Level": Decimal(0),
        "Multiplier": Decimal(0)
    },
    "2": {
        "Name": "Chor'gorloth",
        "Level": Decimal(0),
        "Multiplier": Decimal(0)
    },
    "3": {
        "Name": "Phandoryss",
        "Level": Decimal(0),
        "Multiplier": Decimal(0)
    },
    "4": {
        "Name": "Borb",
        "Level": Decimal(0),
        "Multiplier": Decimal(0)
    },
    "5": {
        "Name": "Ponyboy",
        "Level": Decimal(0),
        "Multiplier": Decimal(0)
    },
}

//SUMMATIONS
function approSum(n) {
    return Decimal.ceil(n.pow(5 / 2).times(2 / 5).plus(n.pow(3 / 2).times(1 / 2)).plus(n.pow(1 / 2).times(1 / 8)).plus(n.pow(-3 / 2).times(1 / 1920)));
}

//FORMAT FUNCTIONS
function decFormatGrouping(num) {
    return num.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function decFormatNoGrouping(num) {
    return num.toFixed(0);
}

function decFormatEasyCopy(num) {
    if (num.gte(100000)) {
        var rs = Decimal(num).toFixed(0);
        var x10 = 0;
        while (rs[rs.length - 1] === "0") {
            x10++;
            rs = rs.substring(0, rs.length - 1);
        }
        if (x10 == 0)
            return rs;
        else
            return (rs + 'e' + x10);
    } else
        return decFormatNoGrouping(num);
}

function fracFormat(num) {
    return num.toFixed(2);
}

function sciFormat(num, decimalPoint) {
    if (num.gte(100000))
        return Decimal(num).toExponential(decimalPoint).toString().replace("+", "");
    else
        return decFormatNoGrouping(num);
}

//SUPPORT FUNCTIONS
function calcTranscendentPower() {
    var totalAS = Decimal(rawData.ancientSoulsTotal);
    return Decimal(50).minus(Decimal(49).times(totalAS.neg().div(10000).exp())).plus(outsider[3].Multiplier).div(100);
}

function getHeroSouls() {
    var a = Decimal(rawData.heroSouls);
    if ($("#useNextAscensionSouls").prop("checked"))
        a = a.plus(Decimal(rawData.primalSouls)).plus(Decimal(rawData.totalHeroLevels).div(2000).floor());
    $("#manualHS").val(decFormatNoGrouping(a));
    return a;
}

function getAscensionZone() {
    var a = Decimal(rawData.highestFinishedZonePersist);
    $("#ascensionZone").val(a.toString());
    return a;
}

function getCurrentRatio() {
    var s = ancient["5"].Level;
    var f = ancient["19"].Level;
    if (s.equals(0))
        if (f.gt(0))
            $("#playstyleSelect").prop('selectedIndex', 2).change();
        else
            $("#playstyleSelect").prop('selectedIndex', 0).change();
    else if (f.equals(0))
        $("#playstyleSelect").prop('selectedIndex', 0).change();
    else if (f.div(s).lt(0.1))
        $("#playstyleSelect").prop('selectedIndex', 0).change();
    else if (f.div(s).gt(10))
        $("#playstyleSelect").prop('selectedIndex', 2).change();
    else {
        $("#playstyleSelect").prop('selectedIndex', 1).change();
        ratio = f.div(s).times(20).round().div(20);
        $("#hybridRatio").val(ratio.toString());
    }
}

function getSolomonMultiplier(solomonLevel, ponyboyMultiplier) {
    var result = solomonLevel.times(5);
    for (var i = 1; i < 5; i++)
        if (solomonLevel.gt(i * 20))
            result = result.minus(solomonLevel.minus(i * 20));
    result = result.times(ponyboyMultiplier.plus(1)).div(100).plus(1);
    return result;
}

function showASGain(moreAS) {
    var as = Decimal(rawData.ancientSoulsTotal);
    var totalHSEarned = Decimal(rawData.heroSoulsSacrificed).plus(Decimal(rawData.heroSouls));
    for (var k in rawData.ancients.ancients)
        totalHSEarned = totalHSEarned.plus(Decimal(rawData.ancients.ancients[k].spentHeroSouls));
    var currentASGain = Decimal.log10(totalHSEarned).times(5).floor().minus(as);
    for (var k = 1; k < 4; k++) {
        $("#asGain" + k).text(currentASGain.plus(k).plus(moreAS).toString());
        $("#hsToGain" + k).text(sciFormat(Decimal(10).pow(as.plus(currentASGain).plus(k).plus(moreAS).div(5)).minus(totalHSEarned), 4));
    }
}

function getNUALevel(a, b, c, d, s) {
    var testvalue = d.div(a);
    var left = Decimal(0);
    var right = Decimal(1e6);
    while (right.minus(left).gt(1)) {
        var mid = right.plus(left).div(2).floor();
        if (Decimal.pow(2 * Math.exp(b), mid).times(Decimal.pow(Math.exp(1), mid.times(-b)).times(s).plus(c)).lte(testvalue))
            left = mid;
        else
            right = mid;
    }
    return right;
}

//MAIN FUNCTIONS
function loadGame() {
    var SPLITTER = "Fe12NAfA3R6z4k0z";
    var ipData = $("#sg").val();
    if (ipData.indexOf(SPLITTER) > 0) {
        ipData = ipData.split(SPLITTER)[0];
        var temp = "";
        for (var i = 0; i < ipData.length; i += 2)
            temp += ipData[i];
        rawData = JSON.parse(atob(temp));
    }
    //load Outsiders
    for (var k in outsider) {
        outsider[k].Level = Decimal(rawData.outsiders.outsiders[k].level);
    }
    //load Ancients
    for (var k in ancient) {
        ancient[k].OptimalLevel = Decimal(0);
        ancient[k].CostToOptimal = Decimal(0);
        if (!!rawData.ancients.ancients[k]) {
            ancient[k].Level = Decimal(rawData.ancients.ancients[k].level);
            summonedAncients++;
        } else
            ancient[k].Level = Decimal(0);
    }
    getCurrentRatio();
}

function showOutsider() {
    var tb = document.getElementById("osdtable");
    for (var k in outsider) {
        tb.rows[k].cells[1].innerHTML = outsider[k].Level.toString();
    }
    //calculate the multipliers
    outsider[1].Multiplier = outsider[1].Level;
    outsider[2].Multiplier = Decimal(1).minus(Decimal(0.95).pow(outsider[2].Level));
    outsider[3].Multiplier = Decimal(50).minus(outsider[3].Level.neg().div(1000).exp().times(50));
    outsider[4].Multiplier = outsider[4].Level.div(10);
    outsider[5].Multiplier = outsider[5].Level;
    //show data
    tb.rows[1].cells[2].innerHTML = "+" + outsider[1].Multiplier.times(100).toString() + "% effective of all Idle bonuses";
    tb.rows[2].cells[2].innerHTML = "-" + fracFormat(outsider[2].Multiplier.times(100)) + "% Ancient cost";
    tb.rows[3].cells[2].innerHTML = "+" + fracFormat(outsider[3].Multiplier) + "% Transcendent Power (additive)";
    tb.rows[4].cells[2].innerHTML = "+" + outsider[4].Multiplier.times(100).toString() + "% maximum transcendent primal soul reward";
    tb.rows[5].cells[2].innerHTML = "+" + outsider[5].Multiplier.times(100).toString() + "% effective of Solomon";
    var tp = calcTranscendentPower();
    var maxTPReward = outsider[4].Multiplier.plus(1).times(0.05).times(Decimal(rawData.heroSoulsSacrificed));
    var x = ancient["3"].Level; //Solomon level
    var solomonMultiplier = getSolomonMultiplier(ancient["3"].Level, outsider[5].Multiplier);
    var zoneCap = maxTPReward.div(solomonMultiplier.times(20)).ln().div(tp.plus(1).ln()).ceil().times(5).plus(100);
    var as = Decimal(rawData.ancientSoulsTotal);
    var totalHSEarned = Decimal(rawData.heroSoulsSacrificed).plus(Decimal(rawData.heroSouls));
    for (var k in rawData.ancients.ancients)
        totalHSEarned = totalHSEarned.plus(Decimal(rawData.ancients.ancients[k].spentHeroSouls));
    var currentASGain = Decimal.log10(totalHSEarned).times(5).floor().minus(as);
    $("#tp").text(fracFormat(tp.times(100)));
    $("#maxTPReward").text(sciFormat(maxTPReward, 4));
    $("#zoneCap").text(decFormatNoGrouping(zoneCap));
    $("#as").text(as.toString());
    $("#asGainIfTranscend").text(currentASGain.toString());
    showASGain(additionalASShow);
}

function compute(x) {
    var HPscale = Decimal(1.14).plus(ascZone.div(500).ceil().times(0.005));
    if ($("#wep8k").prop("checked"))
        var alpha = Decimal(1.1085).times(Decimal.ln(calcTranscendentPower().plus(1))).div(Decimal.ln(HPscale));
    else
        var alpha = Decimal(1.4067).times(Decimal.ln(calcTranscendentPower().plus(1))).div(Decimal.ln(HPscale));
    var playStyle = $("#playstyleSelect").val();
    var s, f, m;
    switch (playStyle) {
        case "idle":
            s = ancient[5].Level.plus(x);
            f = Decimal(0);
            m = s;
            break;
        case "hybrid":
            s = ancient[5].Level.plus(x);
            f = s.times(ratio);
            m = Decimal.max(s, f);
            break;
        case "active":
            s = Decimal(0);
            f = ancient[19].Level.plus(x);
            m = f;
            break;
    }
    //find the Optimal Level with pre-determined Siya lvl
    for (var i in ancient) {
        if (ancient[i].Level.gt(0)) {
            switch (i) {
                case "3": //Solomon
                    ancient[i].OptimalLevel = m.pow(0.8).div(alpha.pow(0.4)).ceil();
                    break;
                case "4": //Libertas
                    if ($("#wep8k").prop("checked"))
                        ancient[i].OptimalLevel = s.times(0.905).ceil();
                    else
                        ancient[i].OptimalLevel = s.times(0.926).ceil();
                    break;
                case "8": //Mammon
                case "9": //Mimzee
                    if ($("#wep8k").prop("checked"))
                        ancient[i].OptimalLevel = m.times(0.905).ceil();
                    else
                        ancient[i].OptimalLevel = m.times(0.926).ceil();
                    break;
                case "5": //Siyalatas
                    ancient[i].OptimalLevel = s;
                    break;
                case "11": //Dogcog
                    ancient[i].OptimalLevel = Decimal.min(3743, getNUALevel(200 * Math.log(2), 0.01, 1 / 99, m.times(0.927).pow(2), 1));
                    break;
                case "12": //Fortuna
                    ancient[i].OptimalLevel = Decimal.min(14972, getNUALevel(800 * Math.log(2), 0.0025, 10 / 9, m.times(0.927).pow(2), -1));
                    break;
                case "13": //Atman
                    ancient[i].OptimalLevel = Decimal.min(2880, getNUALevel(2 / 0.013 * Math.log(2), 0.013, 4 / 3, m.pow(2).div(alpha), -1));
                    break;
                case "14": //Dora
                    ancient[i].OptimalLevel = Decimal.min(18715, getNUALevel(1000 * Math.log(2), 0.002, 100 / 99, m.times(0.927).pow(2), -1));
                    break;
                case "15": //Bhaal
                    ancient[i].OptimalLevel = f;
                    break;
                case "16": //Morgulis
                    ancient[i].OptimalLevel = m.pow(2);
                    break;
                case "17": //Chronos
                    ancient[i].OptimalLevel = Decimal.min(1101, getNUALevel(2 / 0.034 * Math.log(2), 0.034, 2, m.pow(2), -1));
                    break;
                case "18": //Bubos
                    ancient[i].OptimalLevel = Decimal.min(1872, getNUALevel(100 * Math.log(2), 0.02, 1, m.pow(2), 1));
                    break;
                case "19": //Fragsworth
                    ancient[i].OptimalLevel = f;
                    break;
                case "21": //Kuma
                    ancient[i].OptimalLevel = Decimal.min(3743, getNUALevel(200 * Math.log(2), 0.01, 0.25, m.pow(2).div(alpha), 1));
                    break;
                case "28": //Argaiv
                    ancient[i].OptimalLevel = m;
                    break;
                case "29": //Juggernaut
                    ancient[i].OptimalLevel = f.pow(0.8).ceil();
                    break;
            }
        }
    }
    for (var i in ancient) {
        if (ancient[i].Level.gt(0)) {
            switch (i) {
                case "20": //Vaagur
                case "31": //Revolc
                case "22": //Chawedo
                case "23": //Hecatoncheir
                case "24": //Berserker
                case "25": //Sniperino
                case "26": //Kleptos
                case "27": //Energon
                    ancient[i].OptimalLevel = Decimal.max(ancient[$("#otherAncientsLowerBase").val()].OptimalLevel.minus($("#otherAncientsLower").val(), 0));
                    break;
            }
        }
    }
    //find the HS requirement to reach that lvl
    var totalHS = new Decimal(0);
    for (var i in ancient) {
        var temp = new Decimal(0);
        var x = ancient[i].Level;
        var y = ancient[i].OptimalLevel;
        if ((y.gt(x)) && (ancient[i].Visible === "true")) {
            switch (i) {
                case "3":
                case "29": //n^1.5
                    temp = approSum(y).minus(approSum(x));
                    break;
                case "4":
                case "5":
                case "8":
                case "9":
                case "15":
                case "19":
                case "28": //n
                    temp = y.times(y.plus(1)).div(2).minus(x.times(x.plus(1)).div(2));
                    break;
                case "11":
                case "12":
                case "13":
                case "14":
                case "17":
                case "18":
                case "20":
                case "21":
                case "22":
                case "23":
                case "24":
                case "25":
                case "26":
                case "27":
                case "26":
                case "31": //2^n
                    temp = Decimal.pow(2, y.plus(1)).minus(Decimal.pow(2, x.plus(1)));
                    break;
                case "16": //1
                    temp = y.minus(x);
                    break;
            }
        }
        ancient[i].CostToOptimal = temp.times(Decimal(1).minus(outsider[2].Multiplier)).ceil();
        totalHS = totalHS.plus(ancient[i].CostToOptimal);
    }
    return totalHS;
}

function optimizeAncient() {
    //optimize
    if (summonedAncients != 0) { //check if no Ancient summoned
        var left, right, base, hsToSpend, hsSpare;
        if (compute(0).gt(hs)) {
            left = ancient[5].Level.neg();
            right = Decimal(0);
        } else {
            left = Decimal(0);
            var x = ancient[5].Level;
            right = hs.div(Decimal(1).minus(outsider[2].Multiplier)).plus(x.times(x.plus(1)).times(2)).sqrt().ceil().minus(x);
        }
        if ($("playstyleSelect").val() == "active")
            base = ancient[19].Level;
        else
            base = ancient[5].Level;
        while (right.minus(left).gt(Decimal.max(1, right.plus(base).times(1e-15)))) {
            var mid = right.plus(left).div(2).floor();
            hsToSpend = compute(mid);
            if (ancient["16"].Level.equals(0))
                hsSpare = Decimal.pow(Decimal.max(ancient["5"].OptimalLevel, ancient["19"].OptimalLevel), 2);
            else
                hsSpare = 0;
            if (hsToSpend.plus(hsSpare).lte(hs))
                left = mid;
            else
                right = mid;
        }
        var spentHS = compute(left);
    }
    //sort Ancients by name
    var ancientArr = [];
    for (var k in ancient)
        ancientArr.push(ancient[k]);
    ancientArr.sort(function(a, b) {
        var a1 = a.Name.toLowerCase();
        var b1 = b.Name.toLowerCase();
        if (a1 === b1) return 0;
        return (a1 > b1 ? 1 : -1);
    });
    //show data
    var tb = document.getElementById("anctable");
    tb.rows[1].cells[0].innerHTML = "Hero Souls";
    $("#manualHS").val(decFormatNoGrouping(hs));
    tb.rows[1].cells[2].innerHTML = sciFormat(hs.minus(spentHS), 4);
    tb.rows[1].cells[2].setAttribute("title", decFormatGrouping(hs.minus(spentHS)));
    tb.rows[1].cells[3].innerHTML = "-" + sciFormat(spentHS, 4);
    tb.rows[1].cells[3].setAttribute("title", "-" + decFormatGrouping(spentHS));
    if (ancientTableShow == 0) {
        for (var j = 0; j < 25; j++) {
            $("#anctable").append("<tr style=\"display: table-row;\"><td></td><td class=\"number\"></td><td class=\"number\"></td><td><input id=\"" + j + "\" class=\"rs number bold \" type=\"text\"></input></td><td class=\"number\"></td></tr>");
        }
        $(".rs").map(function() {
            $(this).focus(function() {
                $(this).val(decFormatEasyCopy(Decimal.max(0, ancientArr[this.id].OptimalLevel.minus(ancientArr[this.id].Level))))
            });
            $(this).focusout(function() {
                $(this).val(sciFormat(Decimal.max(0, ancientArr[this.id].OptimalLevel.minus(ancientArr[this.id].Level)), 4))
            });
        });
        ancientTableShow = 1;
    }
    i = 2;
    for (var k in ancientArr) {
        tb.rows[i].cells[0].innerHTML = ancientArr[k].Name;
        tb.rows[i].cells[1].innerHTML = sciFormat(ancientArr[k].Level, 4);
        tb.rows[i].cells[1].setAttribute("title", decFormatGrouping(ancientArr[k].Level));
        tb.rows[i].cells[2].innerHTML = sciFormat(ancientArr[k].OptimalLevel, 4);
        tb.rows[i].cells[2].setAttribute("title", decFormatGrouping(ancientArr[k].OptimalLevel));
        tb.rows[i].cells[3].firstChild.value = sciFormat(Decimal.max(0, ancientArr[k].OptimalLevel.minus(ancientArr[k].Level)), 4);
        tb.rows[i].cells[4].innerHTML = sciFormat(ancientArr[k].CostToOptimal, 4);
        tb.rows[i].cells[4].setAttribute("title", decFormatGrouping(ancientArr[k].CostToOptimal));
        if ((ancientArr[k].Visible == "false") || (ancientArr[k].Level == 0))
            tb.rows[i].style.display = "none";
        else
            tb.rows[i].style.display = "table-row";
        i++;
    }
}

function showBossRaidData() {
    var immortalDmg = Decimal(rawData.titanDamage);
    var highestBossLvl = Decimal.log(immortalDmg.times(3.6)).div(Decimal.log(2)).floor().plus(1);
    $("#immortalDamage").text(sciFormat(immortalDmg, 4));
    $("#highestBossLevel").text(highestBossLvl.toString());
}

//ELEMENTS' BEHAVIORS
$(document).ready(function() {
    $("head").append("<link id=\"themeLink\" rel=\"stylesheet\" href=\"https://cdn.rawgit.com/graceoflives/fluffy-garbanzo/master/theme_dark.css\" type=\"text/css\" />");
    $("#themeChoice input").on("change", function() {
        $("head #themeLink").prop("href", "https://cdn.rawgit.com/graceoflives/fluffy-garbanzo/master/theme_" + $("#themeChoice input[name=\"theme\"]:checked").val() + ".css");
    });
    $("#anctable").append("<tr><td></td><td class=\"number\"></td><td class=\"number\"></td><td class=\"number bold\"></td><td></td></tr>");
    var input = document.createElement("input");
    input.style = "text-align:right";
    input.type = "text";
    input.value = "Your desire HS (current HS if ignored)";
    input.id = "manualHS";
    var tb = document.getElementById("anctable")
    tb.rows[1].cells[0].innerHTML = "Hero Souls";
    tb.rows[1].cells[1].appendChild(input);
    $("#sg").change(function() {
        loadGame();
        ascZone = getAscensionZone();
        hs = getHeroSouls();
        showOutsider();
        showBossRaidData();
        optimizeAncient();
    });
    $("#ascensionZone").change(function() {
        if (Decimal($(this).val()).gt(0))
            ascZone = Decimal($(this).val());
        else {
            ascZone = getAscensionZone();
        }
        optimizeAncient();
    });
    $("#manualHS").change(function() {
        if (Decimal($(this).val()).gt(0))
            hs = Decimal($(this).val());
        else
            hs = getHeroSouls();
        optimizeAncient();
    });
    $("#useNextAscensionSouls").change(function() {
        hs = getHeroSouls();
        optimizeAncient();
    });
    $(document).on("click", "input", function() {
        $(this).select();
    });
    $("#tabs li").click(function() {
        var tabData = $(this).attr("data");
        $("#tabs li").removeClass("current");
        $(this).addClass("current");
        $(".tabcontent").removeClass("current");
        $("#" + tabData).addClass("current");
    });
    $("#playstyleSelect").on("change", function() {
        if ($(this).val() == "idle") {
            $("#hybridRatioContainer").hide();
            ancient["4"].Visible = "true";
            ancient["5"].Visible = "true";
            ancient["15"].Visible = "false";
            ancient["19"].Visible = "false";
            ancient["29"].Visible = "false";
        } else if ($(this).val() == "hybrid") {
            $("#hybridRatioContainer").show();
            ancient["4"].Visible = "true";
            ancient["5"].Visible = "true";
            ancient["15"].Visible = "true";
            ancient["19"].Visible = "true";
            ancient["29"].Visible = "true";
        } else if ($(this).val() == "active") {
            $("#hybridRatioContainer").hide();
            ancient["4"].Visible = "false";
            ancient["5"].Visible = "false";
            ancient["15"].Visible = "true";
            ancient["19"].Visible = "true";
            ancient["29"].Visible = "true";
        }
        optimizeAncient();
    });
    $("#hybridRatio, #wep8k").on("change", function() {
        ratio = Decimal($("#hybridRatio").val());
        optimizeAncient();
    });
    $("#flagCalculateOtherAncients").on("change", function() {
        if ($(this).prop("checked")) {
            ancient["20"].Visible = "true";
            ancient["22"].Visible = "true";
            ancient["23"].Visible = "true";
            ancient["24"].Visible = "true";
            ancient["25"].Visible = "true";
            ancient["26"].Visible = "true";
            ancient["27"].Visible = "true";
            ancient["31"].Visible = "true";
        } else {
            ancient["20"].Visible = "false";
            ancient["22"].Visible = "false";
            ancient["23"].Visible = "false";
            ancient["24"].Visible = "false";
            ancient["25"].Visible = "false";
            ancient["26"].Visible = "false";
            ancient["27"].Visible = "false";
            ancient["31"].Visible = "false";
        }
        optimizeAncient();
    });
    $("#otherAncientsLower, #otherAncientsLowerBase").on("change", function() {
        optimizeAncient();
    });
    $("#buttonLessAS").on("click", function() {
        additionalASShow = Decimal.max(additionalASShow.minus(1), 0);
        showASGain(additionalASShow);
    });
    $("#buttonMoreAS").on("click", function() {
        additionalASShow = Decimal.min(additionalASShow.plus(1), 17);
        showASGain(additionalASShow);
    });
});
