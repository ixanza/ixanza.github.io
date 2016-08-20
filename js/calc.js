/**
 * See: https://www.reddit.com/r/ClickerHeroes/comments/4naohc/math_and_transcendance/
 */

function buildMode() {
    var strBuildMode = $('input[name="buildmode"]:checked').val();
    if(strBuildMode == "idle") {
        return "idle";
    } else if (strBuildMode == "hybrid") {
        return "hybrid";
    } else {
        return "active";
    }
}

function maxTpReward() { 
    return (0.05 + Outsiders["borb"].level * 0.005) * HeroSoulsSacrificed;
}
 
function hpScaleFactor() { 
    var zone = Number($('#ascensionzone').val());
    var i = Math.floor(zone/500);
    var scale = 1.145+i*0.005;
    return scale;
}

function alphaFactor(wepwawetLeveledBeyond8k) { 
    if(wepwawetLeveledBeyond8k) {
        return 1.1085 * Math.log(1 + Number($('#tp').val())/100) / Math.log(hpScaleFactor());
    } else {
        return 1.4067 * Math.log(1 + Number($('#tp').val())/100) / Math.log(hpScaleFactor());
    }
}

/**
 * See: https://www.reddit.com/r/ClickerHeroes/comments/4n80r5/boss_level_to_hit_cap/
 */
function bossToHitCap() {
    var solomon = Ancients["solomon"].extraInfo.optimalLevel;
    var ponyboy = Outsiders["ponyboy"].level;
    var tp = Number($('#tp').val())/100; 
    var maxTP = maxTpReward(); // (5% ((+0.5*Borb)%) of your Sacrificed Souls
    
    var multiplier;
    if (solomon < 21) {
        multiplier = 1 + (1 + ponyboy) * (solomon * 0.05);
    } else if (solomon < 41) {
        multiplier = 1 + (1 + ponyboy) * (1 + (solomon - 20) * 0.04);
    } else if (solomon < 61) {
        multiplier = 1 + (1 + ponyboy) * (1.8 + (solomon - 40) * 0.03);
    } else if (solomon < 81) {
        multiplier = 1 + (1 + ponyboy) * (2.4 + (solomon - 60) * 0.02);
    } else {
        multiplier = 1 + (1 + ponyboy) * (2.8 + (solomon - 80) * 0.01);
    }
    
    var bossNumber = Math.ceil(Math.log(maxTP/(20*multiplier))/Math.log(1+tp));
    return bossNumber;
}

function zoneToHitCap() {
    return bossToHitCap() * 5 + 100;
}

function ascensionZone() {
    return Number($('#ascensionzone').val()) * 1.05;
}

function tpCapReached() {
    var boss = (ascensionZone() * 1.05 - 100)/5;
    return boss >= bossToHitCap();
}

function resetOptimalLevels() {
    for (var k in Ancients) {
        Ancients[k].extraInfo.optimalLevel = null;
    }
}

function calculate() {
    resetOptimalLevels();
    
    var tuneAncient;
    
    if(buildMode() == "idle" || buildMode() == "hybrid") {
        tuneAncient = Ancients["siyalatas"];
    } else {
        tuneAncient = Ancients["fragsworth"];
    }
    
    return optimize(tuneAncient);
}

function computeOptimalLevels(tuneAncient, addLevels) {
    var alpha = alphaFactor(Wep8k);
    var transcendent = alpha > 0;
    var atcap = tpCapReached();
    
    var baseLevel = tuneAncient.level + addLevels;
    for (var k in Ancients) {
        var oldLevel = Ancients[k].level;
        
        if (oldLevel > 0 || k == "soulbank") {
            var goalFun;
            var hybridRatio;
            if (buildMode() == "idle") {
                goalFun = Ancients[k].extraInfo.goalIdle;
                hybridRatio = 1;
            } else if(buildMode() == "hybrid") {
                goalFun = Ancients[k].extraInfo.goalHybrid;
                hybridRatio = HybridRatio;
            } else {
                goalFun = Ancients[k].extraInfo.goalActive;
                hybridRatio = 1;
            }
            
            if(typeof goalFun === 'string') {
                goalFun = Ancients[k].extraInfo[goalFun];
            }
            
            if (goalFun) {
                var g = goalFun(baseLevel, oldLevel, alpha, atcap, transcendent, Wep8k, hybridRatio);
                
                Ancients[k].extraInfo.optimalLevel = Math.max(Ancients[k].level, Math.ceil(g));
            }
        }
    }
}

/**
 * Calculate the Hero Soul cost to level all ancients to their optimals.
 *
 * Approximates the cost for an ancient if more than 25,000 calculations would be 
 * required. 
 */
function calculateHSCostToOptimalLevel() {
    multiplier = Math.pow(0.95, Outsiders["chor'gorloth"].level);
    
    var maxNumSteps = 2500; // Precision of approximation
    
    var totalCost = 0;
    for (var k in Ancients) {
        var oldLevel = Ancients[k].level;
        if (Ancients[k].extraInfo.optimalLevel) {
            var optimalLevel = Ancients[k].extraInfo.optimalLevel;
            
            var diff = optimalLevel - oldLevel;
            if (diff <= 0) {
                Ancients[k].extraInfo.costToLevelToOptimal = 0;
                continue;
            }
            
            var thisAncientCost = 0;
            
            if(Ancients[k].partialCostfn) {
                // We have defined the partial sum for this level cost formula,
                // use it instead of iterating
                thisAncientCost = Ancients[k].partialCostfn(optimalLevel) - Ancients[k].partialCostfn(oldLevel);
            } else {
                var numSteps = Math.min(maxNumSteps, diff);
                var stepSize = diff/numSteps;
                
                var temp = 0;
                for(var step = 1; step <= numSteps; step++) {
                    var prevAddLevels = Math.ceil((step - 1) * stepSize);
                    var addLevels = Math.ceil(step * stepSize);
                    
                    var level = oldLevel + addLevels;
                    var thisStepSize = addLevels - prevAddLevels;
                    
                    temp += Ancients[k].costfn(level) * thisStepSize;
                }
                
                thisAncientCost = temp;
            }
            
            if (k != "soulbank") {
                thisAncientCost = Math.ceil(thisAncientCost * multiplier);
            }
            
            Ancients[k].extraInfo.costToLevelToOptimal = thisAncientCost;
            totalCost += thisAncientCost; 
        }
    }
    
    return totalCost;
}

function compute(tuneAncient, addLevels) {
    computeOptimalLevels(tuneAncient, addLevels);
    return calculateHSCostToOptimalLevel();
}

function optimize(tuneAncient) {
    var hs = Number($("#soulsin").val());
    var baseLevel = tuneAncient.level;
    
    if (! Ancients["morgulis"].level > 0) {
        // We do not own Morgulis, so activate the soulbank
        Ancients["soulbank"] = {
            "name": "soulbank", 
            "level": 0, 
            "costfn": functions.one,
            "partialCostfn": functions.onePartialSum,
            "extraInfo": {
                "goalIdle": Ancients["morgulis"].extraInfo.goalIdle,
                "goalHybrid": Ancients["morgulis"].extraInfo.goalHybrid,
                "goalActive": Ancients["morgulis"].extraInfo.goalActive,
                }
        };
    }
    
    var left = -baseLevel;
    var right = Math.ceil(Math.sqrt(hs + baseLevel * (baseLevel + 1))) - baseLevel;
    var spentHS;
    
    // Iterate until we have converged, or until we are very close to convergence.
    // Converging exactly has run-time complexity in O(log(hs)), which, though sub-
    // polynomial in hs, is still very slow (as hs is basically exponential 
    // in play-time). As such, we'll make do with an approximation.
    var initialDiff = right - left;
    while ((right - left) > 1 && (right - left) / initialDiff > 0.00001) {
        var mid = Math.floor((right + left) / 2);
        
        // Level according to RoT and calculate new cost
        spentHS = compute(tuneAncient, mid);
        if (spentHS <= hs) {
            left = mid;
        } else { 
            right = mid;
        }
    }
    
    // Level according to RoT and calculate new cost
    spentHS = compute(tuneAncient, left);
    
    if  (Ancients["soulbank"]) {
        // Soul bank was used, subtract number of HS put into soulbank
        // from the number of spent HS.
        spentHS -= Ancients["soulbank"].extraInfo.optimalLevel;
        delete Ancients["soulbank"];
    }
    
    return spentHS;
}
