type GameKeyboardEvent = {
  id?: number;
  name?: string;
  onKeyDown?: (keys: string[], preKeys: string[]) => void;
  onKeyUp?: (keys: string[], preKeys: string[]) => void;
};

class GameKeyboard {
  private events: GameKeyboardEvent[] = [];
  private disabled: boolean = false;
  private preKeys: string[] = [];
  private keys: string[] = [];
  private keyValue = keyboardValue;
  private timer: number;
  private deltaTime = 15;
  
  public constructor(deltaTime?: number){
    this.deltaTime = deltaTime || 15;
    this.init();
  }
  // function Object() { [native code] }(deltaTime?: number) {
  // }

  private init() {
    document.onkeydown = this.onKeyDown.bind(this);
    document.onkeyup = this.onKeyUp.bind(this);
  }

  public addEvent(event: GameKeyboardEvent) {
    event.id = Math.random();
    this.events.push(event);
    console.log("addEvent", event.id, this.events);
    return event.id;
  }

  public removeEvent(id: number) {
    const index = this.events.findIndex(v => v.id === id);
    if (index !== -1) {
      this.events.splice(index, 1);
    }
    console.log("removeEvent", this.events, index);
  }

  private onKeyDown(event: KeyboardEvent) {
    if (!this) {
      return;
    }
    const e = event || window.event || arguments.callee.caller.arguments[0];
    this.handleKeyDown(e);
    this.removeTimer();
    if (this.keys.length > 0) {
      //console.log(this.inputs.length)
      if (!this.disabled) {
        this.dispatchEventWith(KeyBoardType.onkeydown);
      }
      this.preKeys = this.keys;
      this.timer = setInterval(
        function() {
          if (!this.disabled) {
            this.dispatchEventWith(KeyBoardType.onkeydown, true, this.keys, true);
          }
          this.preInputs = this.inputs;
        }.bind(this),
        this.deltaTime
      );
    }
  }

  private onKeyUp(event: KeyboardEvent) {
    if (!this) {
      return;
    }
    let e = event || window.event || arguments.callee.caller.arguments[0];
    this.handleKeyUp(e);
    if (this.keys.length > 0) {
      if (!this.disabled) {
        this.dispatchEventWith(KeyBoardType.onkeyup);
      }
      this.preKeys = this.keys;
    } else {
      this.removeTimer();
      this.preKeys = [];
    }
  }

  private dispatchEventWith(type: string) {
    const event = this.events[this.events.length - 1];
    if (!event) {
      return;
    }
    // console.log("dispatchEventWith", event, this.events, this.events.length);
    if (type === KeyBoardType.onkeydown) {
      if (event.onKeyDown) {
        event.onKeyDown(this.keys, this.preKeys);
      }
    } else if (type === KeyBoardType.onkeyup) {
      if (event.onKeyUp) {
        event.onKeyUp(this.keys, this.preKeys);
      }
    }
  }

  private removeTimer() {
    this.timer && clearInterval(this.timer);
  }

  /** 處理鍵盤按下對應keycode */
  private handleKeyDown(event: KeyboardEvent) {
    for (let item in this.keyValue) {
      if (parseInt(item) === event.keyCode) {
        this.checkInput(this.keyValue[item]);
      }
    }
  }

  /** 處理鍵盤擡起對應keycode */
  private handleKeyUp(event: KeyboardEvent) {
    for (let item in this.keyValue) {
      if (parseInt(item) === event.keyCode) {
        this.removeByKey(this.keyValue[item]);
      }
    }
  }

  /** 通過key添加 */
  private checkInput(key: string) {
    let isContain = false;
    for (let i = 0; i < this.keys.length; i++) {
      if (this.keys[i] == key) {
        isContain = true;
      }
    }
    if (!isContain) {
      this.keys.push(key);
    }
  }

  /** 通過key刪除 */
  private removeByKey(key: string) {
    for (let i = 0; i < this.keys.length; i++) {
      if (this.keys[i] == key) {
        this.keys.splice(i, 1);
      }
    }
  }

  /** 判斷data字符串數組中是否包含某個字符串 */
  public isContain(data: string[], keyCode: string) {
    let isContain = false;
    for (let i = 0; i < data.length; i++) {
      if (data[i] == keyCode) {
        isContain = true;
      }
    }
    return isContain;
  }

  /** 獲取上次inputs */
  public getPreKeys() {
    return this.preKeys;
  }

  public changeDisabled(disabled: boolean) {
    this.disabled = disabled;
  }
}

const KeyBoardType = {
  onkeydown: "KeyBoardonkeydown",
  onkeyup: "KeyBoardonkeyup",
  ENTER: "ENTER",
  SPACE: "SPACE",
  UpArrow: "up",
  keyArrow: "left",
  DownArrow: "down",
  RightArrow: "right"
};

const keyboardValue = {
  "13": KeyBoardType.ENTER,
  "32": KeyBoardType.SPACE,
  "37": KeyBoardType.keyArrow,
  "38": KeyBoardType.UpArrow,
  "40": KeyBoardType.DownArrow,
  "39": KeyBoardType.RightArrow,
};
