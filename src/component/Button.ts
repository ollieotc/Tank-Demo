module game {
  export class Button extends eui.Image {

    private direction: string;
    private posList = {
      'up':[200,-130],
      'down':[200,10],
      'right':[330,-50],
      'left':[70,-50],
      'attank':[GameCenter.sceneRoot.stage.stageWidth-200, -20],
      'change':[GameCenter.sceneRoot.stage.stage.stageWidth-200, -170],
    }

    public constructor(direction) {
      super();
      this.source = `${direction}_png`;
      this.name = `${direction}`;
      this.x = this.posList[direction][0]
      this.y = this.posList[direction][1]
      this.direction = direction;
      this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {
      this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
  }
}