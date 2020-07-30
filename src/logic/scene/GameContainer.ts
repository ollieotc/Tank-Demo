module game {
  /** 主遊戲容器 */
  export class GameContainer extends egret.DisplayObjectContainer {

    public bg: game.BgMap;
    public tank: game.Tank;
    public scoreLabel: eui.Label;
    public timeLabel: eui.Label;
    private colorList: string[] = ['red', 'blue', 'green'];

    public scoreText: number = 0;  // 得分
    public tickTime: number; // 心跳开始的时间

    public tweenArr: egret.Tween[] = [] // 缓动动画组
    public poolArr: Pool[] = [];
    public obstacleList: eui.Group;

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
      console.log(this.bg.x, this.bg.y);

      this.obstacleList = new eui.Group;
      // this.x = this.bg.x;
      // this.y = this.bg.y;
      this.bg.addChild(this.obstacleList);

      this.tank = new game.Tank('red');
      this.tank.x = this.stage.stageWidth / 2;
      this.tank.y = this.stage.stageHeight / 2;
      this.addChild(this.tank)
      // this.bg.start();  // 背景開始滾動

      this.scoreLabel = new eui.Label();
      this.scoreLabel.textColor = 0x000000;
      this.scoreLabel.x = 20;
      this.scoreLabel.y = 10;
      this.addChild(this.scoreLabel);

      this.timeLabel = new eui.Label();
      this.timeLabel.textColor = 0x000000;
      this.timeLabel.x = this.stage.stageWidth - 180;
      this.timeLabel.y = 10;
      this.addChild(this.timeLabel)

      // 心跳开始
      egret.startTick(this.updata, this)
      this.tickTime = egret.getTimer()
    }

    /**創建障礙物,添加到數組 */
    private createEnemy() {
      console.log('創建障礙物');
      let enemyType: number = Math.floor(Math.random() * 2);  // 隨機挑選
      let enemyX: number = Math.floor(Math.random() * this.bg.width + 1)
      let enemyY: number = Math.floor(Math.random() * this.bg.height + 1)
      enemyX = Math.max(enemyX, 0)
      enemyX = Math.min(enemyX, this.bg.width - 320)
      enemyY = Math.max(enemyY, 0)
      enemyY = Math.min(enemyY, this.bg.height - 320)
      let newEnemy = Pool.produce({ x: enemyX, y: enemyY, type: enemyType });
      // if(!this.isHitGourpItem()){
        console.log('可生成')
        this.obstacleList.addChild(newEnemy)
        this.poolArr.push(newEnemy);
      // }else {
        // console.log('有重疊不行生成');
        // item.goDie()
        // this.poolArr.splice(i, 1)
      // }
    }

    /**更新 */
    private updata(timeStamp): boolean {
      // this.num_hp.text = this.myBear.hp.toString()
      this.scoreLabel.text = `score : ${'' + this.scoreText}`
      this.timeLabel.text = `time : ${(Math.floor(timeStamp / 1000))}`

      if (timeStamp - this.tickTime >= 4000) {
        this.tickTime = timeStamp
        // 创建敌人
        this.createEnemy()
      }

      // // 敌人移动
      // if (this.poolArr.length > 0) {
      // 	for (let i = this.poolArr.length - 1; i >= 0; i--) {
      // 		let item = this.poolArr[i]
      // 		// 判断敌人血量
      // 		if (item.hp > 0) {
      // 			// 判断是否抵达
      // 			if (item.y === 720) {
      // 				// this.myBear.hp -= 1
      // 				this.gameOver()
      // 			}
      // 			// 超出屏幕删除
      // 			if (item.y >= this.stage.stageHeight) {
      // 				console.log('超出屏幕');
      // 				item.goDie()
      // 				this.poolArr.splice(i, 1)
      // 				continue
      // 			}
      // 			item.move()
      // 		} else {
      // 			item.goDie()
      // 			this.poolArr.splice(i, 1)
      // 			this.scoreText += 1
      // 		}
      // 	}
      // }
      return false
    }

    /**是否有重疊 */
    public isHitGourpItem() {
      for (let i = this.poolArr.length - 1; i >= 0; i--) {
        let theEnemy = this.poolArr[i];
        console.log('theEnemy', theEnemy)
        if (game.hitTest(theEnemy, this)) {
          theEnemy.clearItme()
          this.poolArr.splice(i, 1)
          console.log('撞擊');
          return true;
          // theEnemy.hp -= 1
        } else {
          return false;
        }
      }
    }

    public getBgMap() {
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