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
    // public testLabel: eui.Label;
    private colorList: string[] = ['red', 'blue', 'green'];
    private controlList: string[] = ['up', 'down', 'left', 'right', 'attank', 'change'];

    private emenyInit: number = 30;
    public scoreText: number = 0;  // 得分
    public tickTime: number; // 心跳开始的时间

    public tweenArr: egret.Tween[] = [] // 缓动动画组
    public poolArr: Obstacle[] = [];

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


      this.bg = new game.BgMap();
      this.moveBg.addChild(this.bg);

      this.tank = new game.Tank('red');
      this.tank.x = this.stage.stageWidth / 2;
      this.tank.y = this.stage.stageHeight / 2;
      this.addChild(this.tank);


      this.obstacleList = new eui.Group;
      this.moveBg.addChild(this.obstacleList);

      this.controlPanel = new eui.Group;
      this.controlPanel.y = this.stage.stageHeight - 200;
      this.addChild(this.controlPanel);

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


      // this.testLabel = new eui.Label();
      // this.testLabel.textColor = 0x000000;
      // this.testLabel.x = this.stage.stageWidth / 2;
      // this.testLabel.y = 10;
      // this.testLabel.text = `測試碰撞中`
      // this.addChild(this.testLabel);
    }

    /** 創造控制面板 */
    private createControl() {
      this.controlList.forEach(item => {
        let newButton = new Button(item);
        this.buttonListener(newButton);
        this.controlPanel.addChild(newButton);
      })
    }

    private updateScoreText() {
      this.scoreLabel.text = `score:${this.scoreText}`;
    }

    /**創建障礙物,添加到數組 */
    private createEnemy() {
      let enemyType: number = Math.floor(Math.random() * 2);  // 隨機挑選
      let enemyX: number = Math.floor(Math.random() * this.bg.width + 1);
      let enemyY: number = Math.floor(Math.random() * this.bg.height + 1);
      enemyX = Math.max(enemyX, 0);
      enemyX = Math.min(enemyX, this.bg.width - 320);
      enemyY = Math.max(enemyY, 0);
      enemyY = Math.min(enemyY, this.bg.height - 320);
      let newEnemy = Obstacle.produce({ x: enemyX, y: enemyY, type: enemyType });
      if (!this.isHitGourpItem(newEnemy)) {
        this.obstacleList.addChildAt(newEnemy, this.numChildren - 10);
        this.poolArr.push(newEnemy);
      } else {
        Obstacle.reclaim(newEnemy);
      }
    }

    /** 更新 */
    private updata(timeStamp): boolean {
      // this.scoreLabel.text = `score : ${'' + this.scoreText}`
      this.timeLabel.text = `time : ${(Math.floor(timeStamp / 1000))}`;

      // 生成障礙物
      if (timeStamp - this.tickTime >= 5000) {
        this.tickTime = timeStamp;
        this.createEnemy();
      }
      return false
    }

    /**是否有重疊 */
    public isHitGourpItem(newItem): boolean {
      let isHit: boolean = false;
      for (let i = this.poolArr.length - 1; i >= 0; i--) {
        let theEnemy = this.poolArr[i];
        if (game.hitTest(theEnemy, newItem)) {
          isHit = true;
          break
        }
        if (game.hitTest(newItem, this.tank)) {
          isHit = true;
          break
        }
      }
      return isHit;
    }

    /**是否有攻擊到 */
    public isHitCanShoot(newItem): boolean {
      let isHit: boolean = false;
      for (let i = this.poolArr.length - 1; i >= 0; i--) {
        let theEnemy = this.poolArr[i];
        if (game.hitTest(theEnemy, newItem)) {
          if (theEnemy.canShoot) {
            theEnemy.hp -= this.tank.damage;
            if (theEnemy.hp <= 0) {
              theEnemy.clearItme();
            }
          }
          isHit = true;
          break
        }
      }
      return isHit;
    }

    public shootBullet() {
      let enemyX, enemyY
      let rotation = this.tank.rotation
      if (rotation == 90) {
        enemyX = this.tank.x + this.tank.width - 30;
        enemyY = this.tank.y - 6;
      } else if (rotation == 180) {
        enemyX = this.tank.x + 6;
        enemyY = this.tank.y + this.tank.height - 30;
      } else if (rotation == -90) {
        enemyX = this.tank.x - this.tank.width + 30;
        enemyY = this.tank.y + this.tank.height / 2 - 38;
      } else {
        enemyX = this.tank.x - 6;
        enemyY = this.tank.y - this.tank.height / 2 - 10;
      }
      let newEnemy = Bullet.produce({ x: enemyX, y: enemyY, rotation: rotation });
      this.addChild(newEnemy);
      newEnemy.shooting(rotation);
    }

    public getTankPosition(direction: string): number {
      return this.tank[direction];
    }

    public async moveTank(direction: string, num: number) {
      this.tank[direction] = this.tank[direction] + num;
      if (!await this.tank.canMove()) this.tank[direction] = this.tank[direction] - num;
    }

    public changTankColor() {
      this.tank.setTankColor();
    }

    public setTankrotationAngle(num: number): void {
      this.tank.rotation = num;
    }

    public setButtonEvent(direction) {
      let apl = (direction == 'left' || direction == 'right') ? 'x' : 'y';
      let ang = { 'left': -90, 'up': 0, 'right': 90, 'down': 180 };
      if ((direction == 'left' || direction == 'up') && this.getTankPosition(apl) >= 300) {
        this.moveTank(apl, -30);
      } else if (direction == 'right' && (this.getTankPosition(apl) <= GameCenter.sceneRoot.stage.stageWidth - 300)) {
        this.moveTank(apl, +30);
      } else if (direction == 'down' && (this.getTankPosition(apl) <= 1080 - 300)) {
        this.moveTank(apl, +30);
      } else {
        this.bg.start(direction, 10);
      }
      this.setTankrotationAngle(ang[direction]);
    }

    private buttonListener(obj) {
      if (obj.name == 'change' || obj.name == 'attank') {
        let btnName = `${obj.name}BtnListener`;
        this[btnName](obj);
      } else {
        obj.addEventListener(egret.TouchEvent.TOUCH_TAP, this.setButtonEvent.bind(this, obj.name), this);
      }
    }

    private changeBtnListener(obj) {
      obj.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changTankColor, this);
    }

    private attankBtnListener(obj) {
      obj.addEventListener(egret.TouchEvent.TOUCH_TAP, this.shootBullet, this);
    }

  }
}