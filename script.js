$(document).ready(function(){
    //GETTING GAME READY - BEGIN -----
    $('table').hide();
    $('#pps').hide();
    $('#save').hide();
    $('#load').hide();
    $('#reset').hide();
    $('#theme').hide();

    //Create required variables
    var clickedOnce = 0;
    var poop = 0;
    var ppc = 1;
    var pps = 0;
    var cursorCost = 25;
    var dark = false

    //upgrade method
    function upgrade(cost, gpps, multiplier, effect, upcostid, upcostcurr, upbutton){
        this.cost = cost;
        this.pps = gpps;
        this.multiplier = multiplier;
        this.effect = effect;
        this.buy = function(){
            if (poop > this.cost || poop === this.cost){
                $(upbutton).attr('disabled','');
                poop -= this.cost;
                pps += this.effect;
                this.pps += this.effect;
                this.cost *= this.multiplier;
                this.cost = Math.round(this.cost);
                $(upcostid).html(this.cost);
                $(upcostcurr).html(this.pps +' pps');
                updatepoop();
                updatepps();
            }else{
                $(upbutton).attr('disabled','');
            }
        }
    };

    //create upgrades
    var butt = new upgrade(102, 0, 1.2, 1, '#buttcost', '#buttcurr', '#butt');
    var toilet = new upgrade(315, 0, 1.4, 3, '#toiletcost','#toiletcurr','#toilet');
    var cond = new upgrade(2540, 0, 1.6, 25, '#condcost','#condcurr','#cond');
    var tardis = new upgrade(10500, 0, 1.8, 100, '#tardiscost', '#tardiscurr','#tardis');
    var facility = new upgrade(42050, 0, 1.85, 402, '#facilitycost', '#facilitycurr','#facility');
    var nuke = new upgrade(106700, 0, 2, 1000, '#nukecost','#nukecurr','#nuke');

    //create functions
    var check = function(){
        if (poop > cursorCost || poop === cursorCost){
            $('#cursor').removeAttr('disabled');
        }else{
            $('#cursor').attr('disabled','');
        }
        if (poop > butt.cost || poop === butt.cost) {
            $('#butt').removeAttr('disabled');
        }else{
            $('#butt').attr('disabled','');
        }
        if (poop > toilet.cost || poop === toilet.cost){
            $('#toilet').removeAttr('disabled');
        }else{
            $('#toilet').attr('disabled','');
        }
        if (poop > cond.cost || poop === cond.cost){
            $('#cond').removeAttr('disabled');
        }else{
            $('#cond').attr('disabled','');
        }
        if (poop > tardis.cost || poop === tardis.cost){
            $('#tardis').removeAttr('disabled');
        }else{
            $('#tardis').attr('disabled','');
        }
        if (poop > facility.cost || poop === facility.cost){
            $('#facility').removeAttr('disabled');
        }else{
            $('#facility').attr('disabled','');
        }
        if (poop > nuke.cost || poop === nuke.cost){
            $('#nuke').removeAttr('disabled');
        }else{
            $('#nuke').attr('disabled','');
        }
    };
    var updatepps = function(){
        $('#pps').html("pps: " + pps);
    };
    var updatepoop = function(){
        $('#score').html("Poop: " + Math.round(poop));
    }
    var updatetable = function(){
        $('#cursorcost').html(cursorCost);
        $('#cursorcurr').html(ppc + " ppc")
        $('#buttcost').html(butt.cost);
        $('#buttcurr').html(butt.pps +' pps');
        $('#toiletcost').html(toilet.cost);
        $('#toiletcurr').html(toilet.pps +' pps');
        $('#condcost').html(cond.cost);
        $('#condcurr').html(cond.pps +' pps');
        $('#tardiscost').html(tardis.cost);
        $('#tardiscurr').html(tardis.pps +' pps');
        $('#facilitycost').html(facility.cost);
        $('#facilitycurr').html(facility.pps +' pps');
        $('#nukecost').html(nuke.cost);
        $('#nukecurr').html(nuke.pps +' pps');
    }
    var updateall = function(){
        poop += pps/10;
        updatepoop();
        updatepps();
        updatetable();
    }

    //Save & Load functions
    save = function(){
        var saveObject = {
            dark: dark,
            clickedOnce: clickedOnce,
            poop: poop,
            pps: pps,
            ppc: ppc,
            cursorCost: cursorCost,
            buttCost: butt.cost,
            buttpps: butt.pps,
            toiletCost: toilet.cost,
            toiletpps: toilet.pps,
            condCost: cond.cost,
            condpps: cond.pps,
            tardisCost: tardis.cost,
            tardispps: tardis.pps,
            facilityCost: facility.cost,
            facilitypps: facility.pps,
            nukeCost: nuke.cost,
            nukepps: nuke.pps
        }
        var send = JSON.stringify(saveObject);
        var send = btoa(send);
        localStorage.removeItem('poopsave');
        localStorage.setItem('poopsave',send);
        if (localStorage.getItem('poopsave') !== null){
            $('#msg').html('Saved successfully!');
            $('#msg').css('color','');
            $('#msg').show();
            setTimeout(function(){$('#msg').hide()},500);
        }else{
            $('#msg').html('Something went wrong, try again!');
            $('#msg').css('color','red');
            $('#msg').show();
            setTimeout(function(){$('#msg').hide()},500);
        };
    }
    load = function(){
        if (localStorage.getItem('poopsave') !== null){
            var ret = localStorage.getItem('poopsave');
            var ret = atob(ret);
            var ret = JSON.parse(ret);
            dark = ret.dark || false;
            clickedOnce = ret.clickedOnce || 0;
            poop = ret.poop || 0;
            pps = ret.pps || 0;
            ppc = ret.ppc || 0;
            cursorCost = ret.cursorCost || 25;
            butt.cost = ret.buttCost || 102;
            butt.pps = ret.buttpps || 0;
            toilet.cost = ret.toiletCost || 315;
            toilet.pps = ret.toiletpps || 0;
            cond.cost = ret.condCost || 2540;
            cond.pps = ret.condpps || 0;
            tardis.cost = ret.tardisCost || 10500;
            tardis.pps = ret.tardispps || 0;
            facility.cost = ret.facilityCost || 42050;
            facility.pps = ret.facilitypps || 0;
            nuke.cost = ret.nukeCost || 106700;
            nuke.pps = ret.nukepps || 0;
            updatepoop();
            updatepps();
            updatetable();
            theme();
            $('#msg').html('Loaded successfully!');
            $('#msg').css('color','');
            $('#msg').show();
            setTimeout(function(){$('#msg').hide()},500);
        }
    }
    reset = function(){
        var r = confirm("ARE YOU SURE YOU WANT TO RESET?????!!!!! All your progress will be lost");
        if (r==true){
            localStorage.removeItem('poopsave');
            location.reload();
        }
    }
    theme = function(){
        if (dark) {
            $("#themeLoader").html('<link rel="stylesheet" type="text/css" href="spice-dark.css" />');
        } else {
            $("#themeLoader").html('<link rel="stylesheet" type="text/css" href="spice-light.css" />');
        }
    }
    load();

    //Show everything if already played
    if (clickedOnce === 1){
        $('body').show();
        $('table').show();
        $('#pps').html("pps: " + pps);
        $('#pps').show();
        $('#save').show();
        $('#load').show();
        $('#reset').show();
        $('#theme').show();
        adding = setInterval(updateall, 100);
        saving = setInterval(save, 180000);
    }else{
        //Initiate first time run
        $('body').show();
    }    
    //GETTING GAME READY - END -----

    //mouse functions
    $('#thapic').mouseover(function(){
        $(this).addClass('hovered');
    });
    $('#thapic').mouseleave(function(){
        $(this).removeClass('hovered');
    });
    $('#thapic').mousedown(function(){
        $(this).addClass('pressed');
    });
    $('#thapic').mouseup(function(){
        $(this).removeClass('pressed');
    });

    //clicking
    $('#thapic').click(function(){
        poop += ppc;
        if (poop === 1){
            updatepoop();
            $('table').show();
            $('#pps').html("pps: " + pps);
            $('#pps').show();
            $('#save').show();
            $('#load').show();
            $('#reset').show();
            $('#theme').show();
            clickedOnce = 1;
            adding = setInterval(updateall, 100);
            saving = setInterval(save, 180000);
        }else{
            updatepoop();
        };
    });

    //spacebar "clicking"
    $(document).keyup(function(key){
        if (clickedOnce === 1) {
            switch(parseInt(key.which,10)){
                case 32:
                    poop += ppc;
                    updatepoop();
                    break;
                default:
                    break;
            };
        };
    });

    //buying upgrades
    $('#cursor').click(function(){
        if (poop > cursorCost || poop === cursorCost){
            $('#cursor').attr('disabled','');
            poop -= cursorCost;
            ppc *= 2;
            cursorCost *= 4;
            $('#cursorcost').html(cursorCost);
            $('#cursorcurr').html(ppc+" ppc");
            updatepoop();
        }else{
            $('#cursor').attr('disabled','');
        }
    });

    //BUTTONS
    $('#butt').click(function(){butt.buy();});
    $('#toilet').click(function(){toilet.buy();});
    $('#cond').click(function(){cond.buy();});
    $('#tardis').click(function(){tardis.buy();});
    $('#facility').click(function(){facility.buy();});
    $('#nuke').click(function(){nuke.buy();});

    $('#save').click(function(){save()});
    $('#load').click(function(){load()});
    $('#reset').click(function(){reset();});
    $('#theme').click(function(){dark = !dark; theme();});
    
    //running functions
    checking = setInterval(check, 1);

    //Dev tools. Use in developer console. Feel free to ruin the game experience by using these.
    poop_add = function(amount){
        poop += amount;
    }
    poop_set = function(amount){
        poop = amount;
    }
    poop_remove = function(amount){
        poop -= amount;
    }
    pps_add = function(amount){
        pps += amount;
    }
    pps_set = function(amount){
        pps = amount;
    }
    pps_remove = function(amount){
        pps -= amount;
    }
});