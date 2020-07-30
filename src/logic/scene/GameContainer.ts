module game {
  /** 主遊戲容器 */
  export class GameContainer extends egret.DisplayObjectContainer {

    public moveBg: eui.Group;
    public obstacleList: eui.Group;
    public controlPanel: eui.Group;
    public bg: game.BgMap;
    public tank: game.Tank;
    public scoreLabel: eui.Label;
    public timeLabel: eui.Label;
    public testLabel: eui.Label;
    private colorList: string[] = ['red', 'blue', 'green'];
    private controlList: string[] = ['up', 'down', 'left', 'right', 'attank', 'change'];

    private emenyInit: number = 15;
    public scoreText: number = 0;  // 得分
    public tickTime: number; // 心跳开始的时间

    public tweenArr: egret.Tween[] = [] // 缓动动画组
    public poolArr: Pool[] = [];

    public constructor() {
      super();
      this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {
      this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
      this.createGameScene();
    }

    private createGameScene(): void {
      this.setView();
      this.createControl();
      // 心跳开始
      egret.startTick(this.updata, this)
      this.tickTime = egret.getTimer()

      // 預先生成障礙物
      for (let i = 0; i < this.emenyInit; i++) { this.createEnemy(); }
    }

    private setView() {

      this.moveBg = new eui.Group;
      this.addChild(this.moveBg);
     
      this.controlPanel = new eui.Group;
      this.controlPanel.y = this.stage.stageHeight -200;
      this.addChild(this.controlPanel);

      this.bg = new game.BgMap();
      this.moveBg.addChild(this.bg);

      this.tank = new game.Tank('red');
      this.tank.x = this.stage.stageWidth / 2;
      this.tank.y = this.stage.stageHeight / 2;
      this.addChild(this.tank);

      this.obstacleList = new eui.Group;
      this.moveBg.addChild(this.obstacleList);

      this.scoreLabel = new eui.Label();
      this.scoreLabel.textColor = 0x000000;
      this.scoreLabel.x = 20;
      this.scoreLabel.y = 10;
      this.addChild(this.scoreLabel);

      this.timeLabel = new eui.Label();
      this.timeLabel.textColor = 0x000000;
      this.timeLabel.x = this.stage.stageWidth - 180;
      this.timeLabel.y = 10;
      this.addChild(this.timeLabel);


      this.testLabel = new eui.Label();
      this.testLabel.textColor = 0x000000;
      this.testLabel.x = this.stage.stageWidth / 2;
      this.testLabel.y = 10;
      this.testLabel.text = `測試碰撞中`
      this.addChild(this.testLabel);
    }

    /** 創造控制面板 */
    private createControl() {
      this.controlList.forEach(item => {
        let newButton = new Button(item);
        this.controlPanel.addChild(newButton);
      })
    }

    /**創建障礙物,添加到數組 */
    private createEnemy() {
      let enemyType: number = Math.floor(Math.random() * 2);  // 隨機挑選
      let enemyX: number = Math.floor(Math.random() * this.bg.width + 1)
      let enemyY: number = Math.floor(Math.random() * this.bg.height + 1)
      enemyX = Math.max(enemyX, 0)
      enemyX = Math.min(enemyX, this.bg.width - 320)
      enemyY = Math.max(enemyY, 0)
      enemyY = Math.min(enemyY, this.bg.height - 320)
      let newEnemy = Pool.produce({ x: enemyX, y: enemyY, type: enemyType });
      if (!this.isHitGourpItem(newEnemy)) {
        this.obstacleList.addChildAt(newEnemy, this.numChildren - 10)
        this.poolArr.push(newEnemy);
      } else {
        Pool.reclaim(newEnemy)
      }
    }

    /** 更新 */
    private updata(timeStamp): boolean {
      this.scoreLabel.text = `score : ${'' + this.scoreText}`
      this.timeLabel.text = `time : ${(Math.floor(timeStamp / 1000))}`

      if (timeStamp - this.tickTime >= 8000) {
        this.tickTime = timeStamp
        this.createEnemy()  // 生成障礙物
      }
      return false
    }

    /**是否有重疊 */
    public isHitGourpItem(newItem): boolean {
      let isHit: boolean = false;
      for (let i = this.poolArr.length - 1; i >= 0; i--) {
        let theEnemy = this.poolArr[i];
        if (game.hitTest(theEnemy, newItem)) {
          // console.log('障礙物撞擊');
          isHit = true;
          break
        } else if (game.hitTest(newItem, this.tank)) {
          // console.log('跟坦克撞擊');
          isHit = true;
          break
        }
      }
      return isHit;
    }


    public getBgMap() {
      return this.bg;
    }

    public getTankPosition(direction: string): number {
      return this.tank[direction];
    }

    public async moveTank(direction: string, num: number) {
      this.tank[direction] = this.tank[direction] + num;
      if (!await GameCenter.gameContainer.tank.canMove()) this.tank[direction] = this.tank[direction] - num
    }

    public changTankColor() {
      this.tank.setTankColor();
    }

    public setTankrotationAngle(num: number): void {
      this.tank.rotation = num;
    }

    public setButtonEvent(direction) {
      switch (direction) {
        case 'Left':
          // console.log('向左')
          if (GameCenter.gameContainer.getTankPosition('x') >= 300) {
            GameCenter.gameContainer.moveTank('x', -30);
          } else {
            GameCenter.gameContainer.getBgMap().start('Left', 10);
          }
          GameCenter.gameContainer.setTankrotationAngle(-90);
          break
        case 'Up':
          // console.log('向上')
          if (GameCenter.gameContainer.getTankPosition('y') >= 300) {
            GameCenter.gameContainer.moveTank('y', -30);
          } else {
            GameCenter.gameContainer.getBgMap().start('Up', 10);
          }
          GameCenter.gameContainer.setTankrotationAngle(0);
          break
        case 'Right': // ArrowRight
          // console.log('向右')
          if (GameCenter.gameContainer.getTankPosition('x') <= GameCenter.sceneRoot.stage.stageWidth - 300) {
            GameCenter.gameContainer.moveTank('x', +30);
          } else {
            GameCenter.gameContainer.getBgMap().start('Right', 10);
          }
          GameCenter.gameContainer.setTankrotationAngle(90);
          break
        case 'Down': // ArrowDown
          // console.log('向下')
          if (GameCenter.gameContainer.getTankPosition('y') <= GameCenter.sceneRoot.stage.stageHeight - 300) {
            GameCenter.gameContainer.moveTank('y', +30);
          } else {
            GameCenter.gameContainer.getBgMap().start('Down', 10);
          }
          GameCenter.gameContainer.setTankrotationAngle(180);
          break
      }
    }
  }
}