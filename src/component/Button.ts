module game {
  export class Button extends eui.Image {

    private direction: string;

    public constructor(direction) {
      super();
      this.source = `${direction}_png`;
      this.name = `${direction}Btn`;
      this.direction = direction;
      this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {
      this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
      this.setButtonEvent();
    }

    private setButtonEvent(){
      switch (this.direction) {
        case 'left': //ArrowLeft
          this.addEventListener(egret.TouchEvent.TOUCH_TAP, GameCenter.gameContainer.setButtonEvent.bind(this,'Left'), this);
          break
        case 'up': // ArrowUp
          // console.log('向上')
          this.addEventListener(egret.TouchEvent.TOUCH_TAP, GameCenter.gameContainer.setButtonEvent.bind(this,'Up'), this);
          break
        case 'right': // ArrowRight
          // console.log('向右')
          this.addEventListener(egret.TouchEvent.TOUCH_TAP, GameCenter.gameContainer.setButtonEvent.bind(this,'Right'), this);
          break
        case 'down': // ArrowDown
          // console.log('向下')
          this.addEventListener(egret.TouchEvent.TOUCH_TAP, GameCenter.gameContainer.setButtonEvent.bind(this,'Down'), this);
          break
        case 'attank': // attank
          // console.log('向下')
          // this.addEventListener(egret.TouchEvent.TOUCH_TAP, GameCenter.gameContainer.setButtonEvent.bind(this,'Down'), this);
          break
        case 'change': // change
          // console.log('向下')
          this.addEventListener(egret.TouchEvent.TOUCH_TAP, GameCenter.gameContainer.changTankColor, this);
          break
      }
    }

  }
}