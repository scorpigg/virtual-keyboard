window.onload = function() {

  const keyCodes = [
    'Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace',
    'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'Delete',
    'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter',
    'ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight',
    'ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ControlRight'
  ];

  const keysEng = [
    '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
    'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'Del',
    'CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'Enter',
    'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '↑', 'Shift',
    'Ctrl', 'Win', 'Alt', ' ', 'Alt', '←', '↓', '→', 'Ctrl'
  ];

  const keysEngShift = [
    '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'Backspace',
    'Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '|', 'Del',
    'CapsLock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', 'Enter',
    'Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', '↑', 'Shift',
    'Ctrl', 'Win', 'Alt', ' ', 'Alt', '←', '↓', '→', 'Ctrl'
  ];

  const keysRus = [
    'ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
    'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 'Del',
    'CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter',
    'Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '↑', 'Shift',
    'Ctrl', 'Win', 'Alt', ' ', 'Alt', '←', '↓', '→', 'Ctrl'
  ];

  const keysRusShift = [
    'Ё', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+', 'Backspace',
    'Tab', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', '/', 'Del',
    'CapsLock', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', 'Enter',
    'Shift', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', ',', '↑', 'Shift',
    'Ctrl', 'Win', 'Alt', ' ', 'Alt', '←', '↓', '→', 'Ctrl'
  ];

  const body = document.querySelector('body');
  const keyboardContainer = document.createElement('div');
  const entryField = document.createElement('textarea');
  const keyboard = document.createElement('div');
  const keyboardTitle = document.createElement('h1');
  const description = document.createElement('p');
  const language = document.createElement('p');

  keyboardTitle.innerText = 'Виртуальная клавиатура';
  description.innerText = 'Клавиатура создана в операционной системе Windows';
  language.innerText = 'Для переключения языка комбинация: левыe ctrl + alt';
  entryField.setAttribute('readonly', 'readonly');

  //Add documents to the DOM

  function appendElement(elementName, className, elementParent) {
    elementName.classList.add(className);
    elementParent.appendChild(elementName);
  }
  appendElement(keyboardContainer, 'keyboard-container', body);
  appendElement(keyboardTitle, 'keyboard-title', keyboardContainer);
  appendElement(entryField, 'entry-field', keyboardContainer);
  appendElement(keyboard, 'keyboard', keyboardContainer);
  appendElement(description, 'description', keyboardContainer);
  appendElement(language, 'language', keyboardContainer);

  // Save last used lang in the storage

  function setLastLang(){
    let lang = 'eng';
    if(keyboard.classList.contains('eng')){
      lang = 'eng';
      localStorage.setItem('lang', 'eng');
    }else if(keyboard.classList.contains('rus')){
      lang = 'rus';
      localStorage.setItem('lang', 'rus');
    }
  }

  // Get last used lang from the storage

  function getLastLang(){
    if (localStorage.lang == 'eng'){
      keyboard.classList.add('eng');
      keyboardInit(keysEng);
    }else{
      keyboard.classList.add('rus');
      keyboardInit(keysRus);
    }
  }

  getLastLang();

  // Keyboard creation
    // @keys{array} - array of symbols, letters, numbers

  function keyboardInit(keys){
    keys.forEach((key, index) => {
      const keyboardKey = document.createElement('div');
      if (key == 'Shift' || key == 'Backspace' || key == 'Enter' || key == 'CapsLock'){
        keyboardKey.classList.add('big-key');
      }
      if (key === ' ') {
        keyboardKey.classList.add('space-key');
      }
      keyboardKey.classList.add('key', keyCodes[index]);
      keyboardKey.innerText = key;
      keyboard.appendChild(keyboardKey);
    });
  }

  // Clicking to CapsLock
    //@e{object} -  addEventListener function event

  function capsLockKeyPress(e){
    const capsLockKey = document.querySelector('.CapsLock');
    if((e.code == 'CapsLock' && e.repeat == false) || e.target.innerText == 'CapsLock'){
      Array.from(keyboard.children).forEach(key =>{
        if(key.innerText.length == 1){
          if(key.classList.contains('uppercase') ){
            key.classList.remove('uppercase');
            key.classList.add('lowercase');
          }else{
            key.classList.remove('lowercase');
            key.classList.add('uppercase');
          }
        }
      })
      capsLockKey.classList.toggle('caps-active');
    }
  }

  // Checks if CapsLock is pressed or not
    //return: capsActive{boolean}: true -  letters in uppercase
    //                             false - letters in lowercase

  function isCapsActive(){
    let capsActive = false;
    if(keyboard.firstChild.classList.contains('uppercase')){
      capsActive = true;
    }
    return capsActive;
  }

  // Clicking to shift
    //@e{object} -  addEventListener function event
    //@keysUnshift{array} - array of letters without shift pressing
    //@keysShift{array} - array of letters with shift pressing

  function shiftKeyPress(e, keysUnshift, keysShift){
    if((e.key == 'Shift' && e.repeat == false) || e.target.innerText == 'Shift'){
      Array.from(keyboard.children).forEach((key, index) =>{
        if(e.type == 'keydown' || e.type == 'mousedown'){
          key.innerText = keysShift[index];
        }else if(e.type == 'keyup' || e.type == 'mouseup'){
          key.innerText = keysUnshift[index];
        }
        if(key.innerText.length == 1){
          if(key.classList.contains('uppercase') ){
            key.classList.remove('uppercase');
            key.classList.add('lowercase');
          }else{
            key.classList.remove('lowercase');
            key.classList.add('uppercase');
          }
        }
      })
    }
  }

  // Changes the keyboard's language (eng or rus)
    //@e{object} -  addEventListener function event
    //return:  @lang{string}: eng/rus - current keyboard language

  function changeLang(e){
    if(e.ctrlKey && e.altKey){
      if(keyboard.classList.contains('eng')){
        keyboard.classList.add('rus');
        keyboard.classList.remove('eng');
        Array.from(keyboard.children).forEach((key, index) =>{
          key.innerText = keysRus[index];
        })
      }else{
        keyboard.classList.add('eng');
        keyboard.classList.remove('rus');
        Array.from(keyboard.children).forEach((key, index) =>{
          key.innerText = keysEng[index];
        })
      }
      setLastLang();
    }
    let lang;
    if (keyboard.classList.contains('eng')){
      lang = 'eng'
      shiftKeyPress(e, keysEng, keysEngShift);
    }else{
      lang = 'rus';
      shiftKeyPress(e, keysRus, keysRusShift);
    }
    return lang;
  }

  // Add 'active' class to the letters in css

  function keyActive(e){
    let index = keyCodes.indexOf(e.code);
    if(e.type == 'keydown'){
      keyboard.children[index].classList.add('key_active');
    }
    if(e.type == 'keyup'){
      keyboard.children[index].classList.remove('key_active');
    }
    if(e.target.classList.contains('key')){
      if(e.type == 'mousedown'){
        e.target.classList.add('key_active');
      }
      if(e.type == 'mouseup'){
        e.target.classList.remove('key_active');
      }
    }
  }

  // Letters input with mouse

  function mouseEvent(e) {
    keyActive(e);
    changeLang(e);
    if(e.type == 'mousedown'){
      capsLockKeyPress(e);
      let key = e.target.innerText;
      if(e.target.classList.contains('key')){
        if(key === ''){
          entryField.value += ' ';
        }else if(key == 'Backspace'){
          entryField.value = entryField.value.substring(0, entryField.value.length - 1);
        }else if(key == 'Tab'){
          entryField.value += '   ';
        }else if(key == 'Enter'){
          entryField.value += '\n';
        }else if(key == 'Alt'
              || key == 'Ctrl'
              || key == 'Win'
              || key == 'CapsLock'
              || key == 'Meta'
              || key == 'Shift'
              || key == 'Del'){
          entryField.value += '';
        }else{
          entryField.value += key;
        }
      }
    }
  }

  // Letters input from the physical keyboard

  function keyEvent(e){
    // the general condition for 'keyup' and 'keydown'
    let lang = changeLang(e);
    keyActive(e);

    if(e.type == 'keydown'){
      let index = keyCodes.indexOf(e.code);
      capsLockKeyPress(e);
      let capsLock = isCapsActive();

      if(e.code == 'Space'){
        entryField.value += ' ';
      }else if(e.code == 'Backspace'){
        entryField.value = entryField.value.substring(0, entryField.value.length - 1);
      }else if(e.code == 'Tab'){
        e.preventDefault();
        entryField.value += '   ';
      }else if(e.code == 'Enter'){
        entryField.value += '\n';
      }else if(e.key == 'Alt'
            || e.key == 'Control'
            || e.key == 'Shift'
            || e.key == 'CapsLock'
            || e.key == 'Meta'
            || e.key == 'Delete'
      ){
        e.preventDefault();
      }else if (lang == 'eng') {
        if(e.shiftKey && !capsLock){
          entryField.value += keysEngShift[index].toLowerCase();
        }else if(e.shiftKey){
          entryField.value += keysEngShift[index];
        }else if(capsLock){
          entryField.value += keysEng[index].toUpperCase();
        }else{
          entryField.value += keysEng[index];
        }
      }else{
        if(e.shiftKey && !capsLock){
          entryField.value += keysRusShift[index].toLowerCase();
        }else if(e.shiftKey){
          entryField.value += keysRusShift[index];
        }else if(capsLock){
          entryField.value += keysRus[index].toUpperCase();
        }else{
          entryField.value += keysRus[index];
        }
      }
    }
  }

  body.addEventListener('keyup', keyEvent);
  body.addEventListener('keydown', keyEvent);

  keyboard.addEventListener('mousedown', mouseEvent);
  keyboard.addEventListener('mouseup', mouseEvent);
}