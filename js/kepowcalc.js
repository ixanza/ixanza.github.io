"use strict";

    var strSettingsCheckBox = [
        "#addsouls",
        "#wep8k"
    ];

    var strSettingsRadio = [
        "buildmode"
    ];

    var strSettingsList = [
        "#hybridratio"
    ];

    var strCustomSave = [
    ];

    function LoadAllSettings() {
        if (typeof(Storage) !== "undefined") {
            for (var i in strCustomSave) {
                if (localStorage.hasOwnProperty(i)) {
                    strCustomSave[i] = localStorage[i];
                }
            }

            for (var i in strSettingsCheckBox) {
                var str = strSettingsCheckBox[i];
                if (localStorage.hasOwnProperty(str)) {
                    $(str).prop('checked', localStorage[str]=="true");
                }
            }

            for (var i in strSettingsRadio) {
                var str = strSettingsRadio[i];
                if (localStorage.hasOwnProperty(str)) {
                    $('input[name="'+str+'"][value="'+localStorage[str]+'"]').prop('checked', true);
                }
            }

            // Now the other settings.
            for (var i in strSettingsList) {
                var str = strSettingsList[i];
                if (localStorage.hasOwnProperty(str)) {
                    $(str).val(localStorage[str]);
                }
            }
        }
    }

    function SaveSettings(strSetting) {
        if (typeof(Storage) !== "undefined") {
            localStorage[strSetting] = $(strSetting).val();
        }
    };

    function SaveSettingsCheckBox(strSetting) {
        if (typeof(Storage) !== "undefined") {
            localStorage[strSetting] = $(strSetting).prop('checked');
        }
    }

    function saveBuildMode() {
        var strBuildMode = $('input[name="buildmode"]:checked').val();
        if (typeof(Storage) !== "undefined") {
            localStorage.buildmode = strBuildMode;
        }
    }
    
    function showHideHybridRatioContainer() { 
        if($('input[name="buildmode"]:checked').val() == "hybrid") {
            $("#hybridratiocontainer").show();
        } else {
            $("#hybridratiocontainer").hide();
        }
    }

    $(function () {
        $('#addsouls').change(function() {
            SaveSettingsCheckBox("#addsouls");
        });
        
        $('#wep8k').change(function() {
            SaveSettingsCheckBox("#wep8k");
        });

        $("input[name=buildmode]:radio").change(function() {
            saveBuildMode();
            showHideHybridRatioContainer();
        });
        
        $("#hybridratio").change(function() {
            SaveSettings("#hybridratio");
        });
        
        $(window).on("message", function(event) {
            $("#savedata").val(event.originalEvent.data);
            Import();
        });
        
        // Load game data
        $.ajax('data/ClickerHeroes_v6575.js', {
            complete: function(xhr) {
                window.data = JSON.parse(xhr.responseText);
                createObjects(data);
                window.Items = {items : {}, slots : {}};	// No relics.
                ShowTables();
                LoadAllSettings();
                
                // Set up hybrid ratio slider
                $('#hybridratio').slider({
                    formatter: function(value) {
                        return value;
                    },
                    value: Number($('#hybridratio').val())
                });
                $('#hybridratio').on("slideStop", function() { Import(); });
                showHideHybridRatioContainer();
            }
        });
        
    });

    function AddAncient(key) {
        Ancients[key].ui = {};
    
        var tr = Ancients[key].ui.targetBox = $("<tr></tr>");
        tr.append($("<td></td>").addClass("col1").append(Ancients[key].used).append($("<span></span>").text(Ancients[key].name.substring(0, Ancients[key].name.indexOf(','))).attr("title", Ancients[key].name)));
        Ancients[key].level = 0;
        Ancients[key].ui.level = $("<span></span>").text(numberToStringFormatted(0));
        Ancients[key].ui.goal = $("<span></span>").text(numberToStringFormatted(0));
        Ancients[key].ui.change = $("<input></input>").attr("readonly", "readonly").attr("type", "text").addClass("col_change");
        Ancients[key].ui.cost = $("<span></span>").text(numberToStringFormatted(0));
        
        Ancients[key].ui.change.focus(function() { 
            $(this).val(numberToClickerHeroesPasteableString(Ancients[key].extraInfo.optimalLevel - Ancients[key].level));
            $(this).select();
        });
        
        Ancients[key].ui.change.focusout(function() { 
            $(this).val(numberToStringFormatted(Ancients[key].extraInfo.optimalLevel - Ancients[key].level));
        });
        
        tr  .append($("<td></td>").addClass("col2").append(Ancients[key].ui.level))
            .append($("<td></td>").addClass("col3").append(Ancients[key].ui.goal))
            .append($("<td></td>").addClass("col4").append(Ancients[key].ui.change))
            .append($("<td></td>").addClass("col5").append(Ancients[key].ui.cost));
        $("#ancienttbl").append(tr);
        tr.hide();
    }
    
    function addOutsider(key) {
        Outsiders[key].ui = {};
    
        var tr = $("<tr></tr>");
        tr.append($("<td></td>").append($("<span></span>").text(Outsiders[key].name)));
        Outsiders[key].ui.level = $("<span></span>").text(numberToStringFormatted(0));
        tr.append($("<td></td>").append(Outsiders[key].ui.level));
        $("#outsidertbl").append(tr);
    }

    function ShowTables() {
        var ancientList = _.keys(Ancients).sort();

        // Ancient Tab
        for (var i = 0; i < ancientList.length; i++) {
            var key = ancientList[i];
            if (!Ancients[key].maxLevel) {
                AddAncient(key);
            }
        }

        for (var i = 0; i < ancientList.length; i++) {
            var key = ancientList[i];
            if (Ancients[key].maxLevel) {
                AddAncient(key);
            }
        }
        
        // Outsiders Tab
        for (var k in Outsiders) {
            addOutsider(k);
        }
    }

    var ToPurchase = [1,2,4,8,16,35,70,125,250,500,800,1200,1700,2200,2750,3400,4100,5000,6000,7500,10000,12500,16000,25000,35000,50000,70000,100000,150000,250000,400000];
    var OwnedNotInList = 1;

    var ItemTypeMap = {
        "1": "siyalatas",
        "2": "fragsworth",
        "3": "chronos",
        "4": "chawedo",
        "5": "revolc",
        "6": "iris",
        "7": "argaiv",
        "8": "energon",
        "9": "kleptos",
        "10": "sniperino",
        "11": "berserker",
        "12": "hecatoncheir",
        "13": "bubos",
        "14": "morgulis",
        "15": "bhaal",
        "16": "dora",
        "17": "atman",
        "18": "fortuna",
        "19": "dogcog",
        "20": "pluto",
        "21": "mimzee",
        "22": "mammon",
        "24": "libertas",
        "25": "solomon"
    };

    function SetDifference(a, b) {
        var cnt = 0;
        for (var k in b) {
            if (!a.hasOwnProperty(k)) {
                cnt++;
            }
        }
        return cnt;
    }

    function Import() {
        
        var data = $.parseJSON($('#decoded').val());
        
        // Older saves won't have items.
        window.Items = data.hasOwnProperty("items") ? data.items : {items : {}, slots : {}};
        
        window.HeroSoulsSacrificed = Number(data.heroSoulsSacrificed);
        
        window.Wep8k = $("#wep8k").prop("checked");
        
        var heroes = data.heroCollection.heroes;
        var ascensionSouls = 0;
        for (var k in heroes) {
            var id = parseInt(k, 10);
            ascensionSouls += Number(heroes[k].level);
        }
        ascensionSouls = Math.floor(ascensionSouls / 2000) + Number(data.primalSouls);
        
        var levels = {};
        OwnedNotInList = 0;
        for (var i = AncientMin; i <= AncientMax; i++) {
            if (data.ancients.ancients.hasOwnProperty(i)) {
                levels[i] = true;
                OwnedNotInList += 1;
            }
        }
        for (var k in Ancients) {
            if (levels[Ancients[k].id]) {
                OwnedNotInList -= 1;
            }
        }
        
        $("#soulsin").val(numberToString(Number(data.heroSouls) + Number($("#addsouls").prop("checked") ? ascensionSouls : 0)));      
        
        for (var k in Ancients) {
            if (Ancients.hasOwnProperty(k)) {
                if (data.ancients.ancients[Ancients[k].id]) {
                    Ancients[k].level = Math.floor(Number(data.ancients.ancients[Ancients[k].id].level));
                } else {
                    Ancients[k].level = 0;
                }
                Ancients[k].ui.level.text(numberToStringFormatted(Ancients[k].level));
            }
        }
        
        for (var k in Outsiders) {
            if (Outsiders.hasOwnProperty(k)) {
                if (data.outsiders.outsiders[Outsiders[k].id]) {
                    Outsiders[k].level = data.outsiders.outsiders[Outsiders[k].id].level;
                } else {
                    Outsiders[k].level = 0;
                }
                Outsiders[k].ui.level.text(numberToStringFormatted(Outsiders[k].level));
            }
        }
        
        var tp = Math.max(50-49 * Math.exp(-data.ancientSoulsTotal/10000) + 50 * (1 - Math.exp(- Outsiders["phandoryss"].level / 1000)), 1.0);
        
        
        if(! data.transcendent) {
            tp = 0;
        }
        
        $("#tp").val(numberToString(tp));
        
        $("#ascensionzone").val(data.highestFinishedZonePersist);
        
        $("#capreached").prop("checked", tpCapReached());

        $("#astotal").val(data.ancientSoulsTotal);
        
        window.HybridRatio = $('#hybridratio').slider('getValue');
        
        calculateAndUpdate();
    }
    
    function calculateAndUpdate() {
        var spentHS = calculate();
        display(spentHS);
    }
    
    function display(spentHS) {
        $("#soulsgoal").text(numberToStringFormatted($("#soulsin").val() - spentHS));
        $("#soulschange").text("-" + numberToStringFormatted(spentHS));
        
        for (var k in Ancients) {
            var ancient = Ancients[k];
            if (ancient.extraInfo.optimalLevel) {
                ancient.ui.goal.text(numberToStringFormatted(ancient.extraInfo.optimalLevel));
                ancient.ui.change.val(numberToStringFormatted(ancient.extraInfo.optimalLevel - ancient.level));
                ancient.ui.cost.text(numberToStringFormatted(ancient.extraInfo.costToLevelToOptimal));
                ancient.ui.targetBox.show();
            } else {
                ancient.ui.targetBox.hide();
            }
        }
        
        $("#ancienttbl tr:visible").each(function(index, row){
            $(row).removeClass('odd_row');
            if (index%2==1){ //odd row
                $(row).addClass('odd_row');
            }
        });
        
        $("#tprewardcapzone").val(numberToStringFormatted(zoneToHitCap()));
    }