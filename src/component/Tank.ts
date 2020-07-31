module game {
  export class Tank extends eui.Image {

    // private tank: eui.Image;
    private color: string; // 顏色
    public damage: number; // 火力
    private speed: number = 10; // 場景移動速度
    private colorList: string[] = ['red', 'blue', 'green'];

    public constructor(color) {
      super();
      this.color = color;
      this.damage = GameCenter.sceneModel.tankDamage[this.color];
      this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {
      this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
      this.source = `tank_${this.color}_png`;
      this.anchorOffsetX = this.width / 2;
      this.anchorOffsetY = this.height / 2;
    }

    /** 更換坦克 */
    public setTankColor(): void {
      let getIndex = this.colorList.indexOf(this.color);
      this.color = (getIndex + 1) > 2 ? this.colorList[0] : this.colorList[getIndex + 1]
      this.damage = GameCenter.sceneModel.tankDamage[this.color];
      this.source = `tank_${this.color}_png`;
      console.log(`更換坦克 顏色:${this.color}, 火力:${this.damage}`)
    }

    public async canMove() {
      let canMove = true;
      for (let i = GameCenter.gameContainer.poolArr.length - 1; i >= 0; i--) {
        let theEnemy = GameCenter.gameContainer.poolArr[i]
        if (await game.hitTest(theEnemy, this)){
          canMove = false;
          break;
        }
      }
      return canMove;
    }

  }
}