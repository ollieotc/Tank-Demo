module game {
  export class Tank extends eui.Component {

    private tank: eui.Image;
    private color: string; // 顏色
    private damage: number; // 火力
    private speed: number = 10; // 場景移動速度

    public constructor(color) {
      super();
      this.color = color
      this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {
      this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
      this.tank = new eui.Image();
      this.tank.source = `tank_${this.color}_png`;
      // this.tank.anchorOffsetX = this.tank.width / 2;
      // this.tank.anchorOffsetY = this.tank.height / 2;
      this.tank.scaleX = this.tank.scaleY = 0.5;
      this.addChild(this.tank);
    }

    /** 判斷當前顏色 */
    public getColor(): string {
      return this.color;
    }

    /** 更換坦克 */
    public setTankColor(color: string): void {
      this.color = color;
      this.damage = GameCenter.sceneModel.tankDamage[this.color];
      this.tank.source = `tank_${this.color}_png`;
      console.log(`更換坦克 顏色:${this.color}, 火力:${this.damage}`)
    }

    public setRotation(num: number) {
      this.tank.rotation = num;
    }
  }
}