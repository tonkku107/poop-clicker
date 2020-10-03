$(document).ready(() => {
  // GETTING GAME READY - BEGIN -----
  $('table').hide();
  $('#pps').hide();
  $('#save').hide();
  $('#load').hide();
  $('#reset').hide();
  $('#theme').hide();

  // Create required variables
  let clickedOnce = 0;
  let poop = 0;
  let ppc = 1;
  let pps = 0;
  let cursorCost = 25;
  let dark = false;

  // upgrade method
  class Upgrade {
    constructor(cost, gpps, multiplier, effect, upcostid, upcostcurr, upbutton) {
      this.cost = cost;
      this.pps = gpps;
      this.multiplier = multiplier;
      this.effect = effect;
      this.upcostid = upcostid;
      this.upcostcurr = upcostcurr;
      this.upbutton = upbutton;
    }

    buy() {
      if (poop >= this.cost) {
        $(this.upbutton).attr('disabled', '');
        poop -= this.cost;
        pps += this.effect;
        this.pps += this.effect;
        this.cost *= this.multiplier;
        this.cost = Math.round(this.cost);
        $(this.upcostid).html(this.cost);
        $(this.upcostcurr).html(`${this.pps} pps`);
        updatepoop();
        updatepps();
      } else {
        $(this.upbutton).attr('disabled', '');
      }
    }
  }

  // create upgrades
  const butt = new Upgrade(102, 0, 1.2, 1, '#buttcost', '#buttcurr', '#butt');
  const toilet = new Upgrade(315, 0, 1.4, 3, '#toiletcost', '#toiletcurr', '#toilet');
  const cond = new Upgrade(2540, 0, 1.6, 25, '#condcost', '#condcurr', '#cond');
  const tardis = new Upgrade(10500, 0, 1.8, 100, '#tardiscost', '#tardiscurr', '#tardis');
  const facility = new Upgrade(42050, 0, 1.85, 402, '#facilitycost', '#facilitycurr', '#facility');
  const nuke = new Upgrade(106700, 0, 2, 1000, '#nukecost', '#nukecurr', '#nuke');

  // create functions
  const check = () => {
    if (poop >= cursorCost) {
      $('#cursor').removeAttr('disabled');
    } else {
      $('#cursor').attr('disabled', '');
    }
    if (poop >= butt.cost) {
      $('#butt').removeAttr('disabled');
    } else {
      $('#butt').attr('disabled', '');
    }
    if (poop >= toilet.cost) {
      $('#toilet').removeAttr('disabled');
    } else {
      $('#toilet').attr('disabled', '');
    }
    if (poop >= cond.cost) {
      $('#cond').removeAttr('disabled');
    } else {
      $('#cond').attr('disabled', '');
    }
    if (poop >= tardis.cost) {
      $('#tardis').removeAttr('disabled');
    } else {
      $('#tardis').attr('disabled', '');
    }
    if (poop >= facility.cost) {
      $('#facility').removeAttr('disabled');
    } else {
      $('#facility').attr('disabled', '');
    }
    if (poop >= nuke.cost) {
      $('#nuke').removeAttr('disabled');
    } else {
      $('#nuke').attr('disabled', '');
    }
  };

  const updatepps = () => {
    $('#pps').html(`pps: ${pps}`);
  };

  const updatepoop = () => {
    $('#score').html(`Poop: ${poop}`);
  };

  const updatetable = () => {
    $('#cursorcost').html(cursorCost);
    $('#cursorcurr').html(`${ppc} ppc`);
    $('#buttcost').html(butt.cost);
    $('#buttcurr').html(`${butt.pps} pps`);
    $('#toiletcost').html(toilet.cost);
    $('#toiletcurr').html(`${toilet.pps} pps`);
    $('#condcost').html(cond.cost);
    $('#condcurr').html(`${cond.pps} pps`);
    $('#tardiscost').html(tardis.cost);
    $('#tardiscurr').html(`${tardis.pps} pps`);
    $('#facilitycost').html(facility.cost);
    $('#facilitycurr').html(`${facility.pps} pps`);
    $('#nukecost').html(nuke.cost);
    $('#nukecurr').html(`${nuke.pps} pps`);
  };

  const updateall = () => {
    poop += pps;
    updatepoop();
    updatepps();
    updatetable();
  };

  // Save & Load functions
  const save = () => {
    const saveObject = {
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
      nukepps: nuke.pps,
    };

    const send = btoa(JSON.stringify(saveObject));
    localStorage.setItem('poopsave', send);
    if (localStorage.getItem('poopsave') !== null) {
      $('#msg').html('Saved successfully!');
      $('#msg').css('color', '');
      $('#msg').show();
      setTimeout(() => $('#msg').hide(), 500);
    } else {
      $('#msg').html('Something went wrong, try again!');
      $('#msg').css('color', 'red');
      $('#msg').show();
      setTimeout(() => $('#msg').hide(), 500);
    }
  };

  const load = () => {
    if (localStorage.getItem('poopsave') !== null) {
      const ret = JSON.parse(atob(localStorage.getItem('poopsave')));
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
      $('#msg').css('color', '');
      $('#msg').show();
      setTimeout(() => $('#msg').hide(), 500);
    }
  };

  const reset = () => {
    const r = confirm('ARE YOU SURE YOU WANT TO RESET?????!!!!! All your progress will be lost');
    if (r) {
      localStorage.removeItem('poopsave');
      location.reload();
    }
  };

  const theme = () => {
    if (dark) {
      $('#themeLoader').html('<link rel="stylesheet" type="text/css" href="spice-dark.css" />');
    } else {
      $('#themeLoader').html('<link rel="stylesheet" type="text/css" href="spice-light.css" />');
    }
  };

  load();

  // Show everything if already played
  if (clickedOnce === 1) {
    $('body').show();
    $('table').show();
    $('#pps').html(`pps: ${pps}`);
    $('#pps').show();
    $('#save').show();
    $('#load').show();
    $('#reset').show();
    $('#theme').show();
    setInterval(updateall, 1000);
    setInterval(save, 180000);
  } else {
    // Initiate first time run
    $('body').show();
  }
  // GETTING GAME READY - END -----

  // mouse functions
  $('#thapic').mouseover(() => $('#thapic').addClass('hovered'));
  $('#thapic').mouseleave(() => $('#thapic').removeClass('hovered'));
  $('#thapic').mousedown(() => $('#thapic').addClass('pressed'));
  $('#thapic').mouseup(() => $('#thapic').removeClass('pressed'));

  // clicking
  $('#thapic').click(() => {
    poop += ppc;
    if (poop === 1) {
      updatepoop();
      $('table').show();
      $('#pps').html(`pps: ${pps}`);
      $('#pps').show();
      $('#save').show();
      $('#load').show();
      $('#reset').show();
      $('#theme').show();
      clickedOnce = 1;
      setInterval(updateall, 1000);
      setInterval(save, 180000);
    } else {
      updatepoop();
    }
  });

  // spacebar "clicking"
  $(document).keyup(key => {
    if (clickedOnce === 1) {
      switch (parseInt(key.which, 10)) {
        case 32:
          poop += ppc;
          updatepoop();
          break;
      }
    }
  });

  // buying upgrades
  $('#cursor').click(() => {
    if (poop >= cursorCost) {
      $('#cursor').attr('disabled', '');
      poop -= cursorCost;
      ppc *= 2;
      cursorCost *= 4;
      $('#cursorcost').html(cursorCost);
      $('#cursorcurr').html(`${ppc} ppc`);
      updatepoop();
    } else {
      $('#cursor').attr('disabled', '');
    }
  });

  // BUTTONS
  $('#butt').click(() => butt.buy());
  $('#toilet').click(() => toilet.buy());
  $('#cond').click(() => cond.buy());
  $('#tardis').click(() => tardis.buy());
  $('#facility').click(() => facility.buy());
  $('#nuke').click(() => nuke.buy());

  $('#save').click(save);
  $('#load').click(load);
  $('#reset').click(reset);
  $('#theme').click(() => {
    dark = !dark;
    theme();
  });

  // running functions
  setInterval(check, 1);

  // Dev tools. Use in developer console. Feel free to ruin the game experience by using these.
  window.poop_add = amount => {
    poop += amount;
  };
  window.poop_set = amount => {
    poop = amount;
  };
  window.poop_remove = amount => {
    poop -= amount;
  };
  window.pps_add = amount => {
    pps += amount;
  };
  window.pps_set = amount => {
    pps = amount;
  };
  window.pps_remove = amount => {
    pps -= amount;
  };
});
