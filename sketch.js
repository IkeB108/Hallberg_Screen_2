function setup(){
  textAlign(CENTER, CENTER)
  textSize(100 * (width/500) )
  devMode = false;
  symbolHolding = {
    px: null,
    py: null,
    pmx: null,
    pmy: null,
    i: null
  }
  symbolHoldingCycle = 0; //index of symbol when cycling through with J key
  scrollAmount = -125;
  scrollVelocity = -0.4;
  
  completeHeight = height * 1
  
  framesIdle = 0;
  scrolledSinceLastIdle = true;
  
  class Symbol {
    constructor(name, variableName, size_multiplier){
      this.name = name;
      this.variableName = variableName;
      this.x = width * (1/4),
      this.y = height * (1/4)
      this.size_multiplier = size_multiplier * (width/600)
      this.highlighted = false;
    }
  }
  
  displaySymbol = function( symbolObject ){
    let s = symbolObject
    let lod = locationOfDisplay(s)
    
    // fill(255, 100);
    // rect(lod.x, lod.y, s.w, s.h)
    
    if(s.highlighted && icursor.leftPressed){
      push();
      tint(100,100,255)
      image( window[s.variableName], lod.x, lod.y, s.w, s.h )
      pop();
    }
    else {
      image( s.black, lod.x, lod.y, s.w, s.h )
    }
    
  }
  
  locationOfDisplay = function( symbolObject ){
    let s = symbolObject
    let y = s.y
    while( (y+scrollAmount) > completeHeight - 200)y -= completeHeight;
    while( (y + scrollAmount) < -200 )y += completeHeight;
    return {
      x: s.x,
      y: (y + scrollAmount)
    }
  }
  
  icursor = new MobileFriendlyCursor({
    threeFingerConsole: true,
  })
  
  words_list = "therefore it was called babel".split(" ")
  numbers_list = "0 1 2 3 4 5 6 10 15 16 20 100".split(" ")
  
  all_symbols = []
  
  filesObject = {
    paperImage: "misc/paper.jpg",
    // cursor0: "misc/cursor_0000.png",
    // cursor1: "misc/cursor_0001.png",
    // cursor2: "misc/cursor_0002.png",
    click_anywhere_0: "misc/click_anywhere_0000.png",
    click_anywhere_1: "misc/click_anywhere_0001.png",
    click_anywhere_2: "misc/click_anywhere_0002.png",
    scrollWheel0: "misc/scrollWheel0000.png",
    scrollWheel1: "misc/scrollWheel0001.png",
  }
  
  for(let i in words_list){
    //Word in English
    let fileName = "languages/English/" + words_list[i] + ".png"
    let variableName = "lang_english_" + words_list[i]
    filesObject[ variableName ] = fileName;
    
    all_symbols.push( new Symbol(words_list[i], variableName, 0.3 ) )
    
    //Word in Circles
    fileName = "languages/Circles/" + words_list[i] + ".png"
    variableName = "lang_dnd_circles_" + words_list[i]
    filesObject[ variableName ] = fileName
    
    all_symbols.push( new Symbol(words_list[i], variableName, 0.2) )
    
    //Word in Fancy
    fileName = "languages/Fancy/" + words_list[i] + ".png"
    variableName = "lang_fancy_" + words_list[i]
    filesObject[ variableName ] = fileName
    
    all_symbols.push( new Symbol(words_list[i], variableName, 0.5) )
    
    //Word in Logographic
    fileName = "languages/Logographic/" + words_list[i] + ".png"
    variableName = "lang_logographic_" + words_list[i]
    filesObject[ variableName ] = fileName
    
    all_symbols.push( new Symbol(words_list[i], variableName, 0.2) )
    
    //Word in Wanderer
    fileName = "languages/Wanderer/" + words_list[i] + ".png"
    variableName = "lang_wanderer_" + words_list[i]
    filesObject[ variableName ] = fileName
    
    all_symbols.push( new Symbol(words_list[i], variableName, 0.2) )
    
  }
  
  for(let i in numbers_list){
    //Normal numbers
    let fileName = "numbers/Normal/" + numbers_list[i] + ".png"
    let variableName = "number_normal_" + numbers_list[i];
    filesObject[ variableName ] = fileName
    
    all_symbols.push( new Symbol(numbers_list[i], variableName, 0.5) )
    
    //Eye Numbers
    fileName = "numbers/Eye/" + numbers_list[i] + ".png"
    variableName = "number_eye_" + numbers_list[i];
    filesObject[ variableName ] = fileName
    
    all_symbols.push( new Symbol(numbers_list[i], variableName, 0.3) )
    
    //Parity Numbers
    fileName = "numbers/Parity/" + numbers_list[i] + ".png"
    variableName = "number_parity_" + numbers_list[i];
    filesObject[ variableName ] = fileName
    
    all_symbols.push( new Symbol(numbers_list[i], variableName, 0.3) )
    
    //Stacks Numbers
    fileName = "numbers/Stacks/" + numbers_list[i] + ".png"
    variableName = "number_stacks_" + numbers_list[i];
    filesObject[ variableName ] = fileName
    
    all_symbols.push( new Symbol(numbers_list[i], variableName, 0.3) )
    
  }
  
  myLoader = new FileLoader(filesObject, window, true)
  
  all_symbols = loadJSON("all_symbols.json")
  
}

function saveAllSymbols(){
  for(let i in all_symbols){
    delete all_symbols[i].black; //This is a P5 Graphic that can't be exported to JSON
  }
  saveJSON(all_symbols)
}

function modifySymbols(variableNameIncludes, attributeToChange, newValue){
  for(let i in all_symbols){
    if(all_symbols[i].variableName.includes(variableNameIncludes)){
      all_symbols[i][attributeToChange] = newValue;
      if(attributeToChange == "size_multiplier"){
        //Fix w and h as well
        let img = window[ all_symbols[i].variableName ]
        all_symbols[i].w = img.width * all_symbols[i].size_multiplier * (width/586);
        all_symbols[i].h = img.height * all_symbols[i].size_multiplier * (width/586);
      }
    }
  }
}

function onLoadComplete(){
  completeHeight = height * 1.7
  for(let i in all_symbols){
    let img = window[ all_symbols[i].variableName ]
    all_symbols[i].x *= (width/600)
    // all_symbols[i].y -= (height/3)
    all_symbols[i].y *= (height/822)
    all_symbols[i].w = img.width * all_symbols[i].size_multiplier * (width/586);
    all_symbols[i].h = img.height * all_symbols[i].size_multiplier * (width/586);
    
    //Create a black version
    let blackimg = createGraphics(img.width, img.height)
    blackimg.tint(0);
    blackimg.image(img, 0, 0);
    all_symbols[i].black = blackimg;
  }
  
  
}

function draw(){
  //Remember to use if(myLoader.complete)
  background(0)
  if(!myLoader.complete){
    fill(255);
    text("Loading...", width/2, height/2)
  }
  if(myLoader.complete){
    image(paperImage, 0, 0, width, height)
    for(let i in all_symbols){
      displaySymbol(all_symbols[i])
      
    }
    
    framesIdle ++;
    if( framesIdle > 70 * 6 ){
      scrolledSinceLastIdle = false;
      // for(let i in all_symbols){
      //   let lod = locationOfDisplay(all_symbols[i])
      //   let n = floor(frameCount/10) % 3
      //   if( lod.y.isBetween(0,height*(3/4))){
      //     let x = lod.x + (all_symbols[i].w/2)
      //     let y = lod.y + (all_symbols[i].h/2)
      // 
      //     // let cursorSize = width/10 * ( 1 + ( sin(frameCount/15) * 0.18 ) )
      //     let cursorSize = width * 0.25
      //     image(window['cursor' + n], x, y, cursorSize, cursorSize )
      //     break;
      //   }
      // }
      let n = floor(frameCount/10) % 3
      let img = window["click_anywhere_" + n]
      let w = width * 0.7
      let h = img.height * (w/img.width)
      image(img, (width/2) - (w/2), height * 0.8, w, h )
    }
    
    if(!scrolledSinceLastIdle && framesIdle < 70 * 6){
      let n = floor(frameCount/20) % 2
      let img = window["scrollWheel" + n]
      let w = width/4
      let h = img.height * (w/img.width)
      image(window['scrollWheel' + n], 10, 10, w, h)
    }
    
    if(symbolHolding.i !== null){
      let sh = all_symbols[symbolHolding.i]
      sh.x = symbolHolding.px + (icursor.x - symbolHolding.pmx);
      sh.y = symbolHolding.py + (icursor.y - symbolHolding.pmy);
    }
    
    if(!devMode){
      if(!icursor.leftPressed)scrollAmount += (scrollVelocity) ;
      scrollVelocity *= 0.95
      if(icursor.leftPressed)scrollAmount = scrollAmountAtPress + (icursor.y - icursor.atPress.y)
    }
  }
  if(frameCount == 70 * 60 * 120)location.reload(); //120 minutes
  icursor.update();
}

function cursorPressStart(){
  framesIdle = 0;
  if(!devMode) scrollAmountAtPress = scrollAmount;
  
  for(let i in all_symbols){
    //Assume user is not tapping this symbol until proven otherwise
    all_symbols[i].highlighted = false
  }
  
  for(let i in all_symbols){
    let lod = locationOfDisplay(all_symbols[i])
    
    userClicking = collidePointRect(icursor.x, icursor.y, lod.x, lod.y, all_symbols[i].w, all_symbols[i].h)
    
    halvedHitboxes = [
      "lang_lotr_elvish_therefore",
      "lang_lotr_elvish_it"
    ]
    if( halvedHitboxes.includes(all_symbols[i].variableName) )
    userClicking = collidePointRect(icursor.x, icursor.y, lod.x, lod.y, all_symbols[i].w, all_symbols[i].h * 0.4 )
    
    if(userClicking){
      if(!devMode){
        
        //This symbol should be highilghted
        all_symbols[i].highlighted = true;
        for(let j in all_symbols){
          if(all_symbols[j].name == all_symbols[i].name)
          all_symbols[j].highlighted = true;
          
        }
        
      }
      if(devMode){
        symbolHolding.i = i;
        symbolHolding.px = all_symbols[i].x;
        symbolHolding.py = all_symbols[i].y;
        symbolHolding.pmx = icursor.x;
        symbolHolding.pmy = icursor.y;
      }
    }
  }
}

function cursorPressEnd(){
  symbolHolding.i = null;
  if(!devMode){
    scrollVelocity = icursor.swipeVelocity.y
    if( abs(icursor.y - icursor.atPress.y) > height/50)scrolledSinceLastIdle = true;
  }
}

function cursorClick(b){
  if(b == "middle")location.reload()
}

function mouseWheel(e){
  framesIdle = 0;
  scrolledSinceLastIdle = true;
  let scrollIncrement = width/10;
  if(e.delta < 0)scrollAmount += scrollIncrement;
  if(e.delta > 0)scrollAmount -= scrollIncrement;
}

function windowResized(){
  if(typeof willRefresh == "undefined"){
    setTimeout( ()=> { location.reload(); }, 3000 )
    console.log("Will refresh...")
    willRefresh = true; 
  }
}

// function keyTyped(){
//   if(key==" ")devMode = !devMode;
//   if(key == 'j' && devMode){
//     symbolHoldingCycle = (symbolHoldingCycle + 1) % all_symbols.length
//     symbolHolding.i = symbolHoldingCycle
//     let i = symbolHolding.i
//     all_symbols[i].x = icursor.x
//     all_symbols[i].y = (icursor.y + scrollAmount)
//     symbolHolding.px = all_symbols[i].x;
//     symbolHolding.py = all_symbols[i].y
//     symbolHolding.pmx = icursor.x;
//     symbolHolding.pmy = (icursor.y + scrollAmount)
// 
//   }
//   if(key == 'k')saveCanvas();
// 
//   if(!devMode)symbolHolding.i = null;
// }
