module game {
  	/** 主遊戲容器 */
  export class GameContainer extends egret.DisplayObjectContainer {

    private bg: game.BgMap;
    private tank: game.Tank;
    private colorList: string[] = ['red', 'blue', 'green'];

    public constructor() {
      super();
      this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {
      this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
      this.createGameScene();
    }

    private createGameScene(): void {
      this.bg = new game.BgMap();
      this.addChild(this.bg);
      console.log(this.bg.x,this.bg.y)

      this.tank = new game.Tank('red');
      this.tank.x = this.stage.stageWidth / 2;
      this.tank.y = this.stage.stageHeight / 2;
      this.addChild(this.tank)
      // this.bg.start();  // 背景開始滾動
    }

    public getBgMap(){
      return this.bg;
    }

    public getTankPosition(direction: string): number {
      return this.tank[direction];
    }

    public moveTank(direction: string, num: number): void {
      this.tank[direction] = this.tank[direction] + num;
    }

    public changTankColor() {
      this.tank.setTankColor();
    }

    public setTankrotationAngle(num: number): void {
      this.tank.rotation = num;
    }
  }
}