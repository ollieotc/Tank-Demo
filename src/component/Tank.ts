module game {
  export class Tank extends eui.Component {

    private tank: eui.Image;
    private color: string; // 顏色
    private damage: number; // 火力
    private speed: number = 10; // 場景移動速度
    private colorList: string[] = ['red', 'blue', 'green'];

    public constructor(color) {
      super();
      this.color = color
      this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {
      this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
      this.tank = new eui.Image();
      this.tank.source = `tank_${this.color}_png`;
      this.tank.scaleX = this.tank.scaleY = 0.5;
      this.addChild(this.tank);
      // 設置中心點
      this.tank.anchorOffsetX = this.tank.width / 2;
      this.tank.anchorOffsetY = this.tank.height / 2;
    }

    /** 更換坦克 */
    public setTankColor(): void {
      let getIndex = this.colorList.indexOf(this.color);
      this.color = (getIndex + 1) > 2 ? this.colorList[0] : this.colorList[getIndex + 1]
      this.damage = GameCenter.sceneModel.tankDamage[this.color];
      this.tank.source = `tank_${this.color}_png`;
      console.log(`更換坦克 顏色:${this.color}, 火力:${this.damage}`)
    }
  }
}