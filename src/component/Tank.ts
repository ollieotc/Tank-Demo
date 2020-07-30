module game {
  export class Tank extends eui.Image {

    // private tank: eui.Image;
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

    // public IsHit(e: egret.DisplayObjectContainer): boolean {
    //   let arr = EnemyFactory.Init().GetIsUsePlane(); //1.从敌机对象池中取出已经在使用的飞机

    //   let isHit = false;
    //   let hitevent = new HitEvent(HitEvent.EventString);
    //   for (var i = ; i < this._bullet.length; i++) {
    //     if (this._bullet[i].IsUse == true) {  //2.循环遍历子弹对象池，使用IsUse状态为true的子弹
    //       if (this._bullet[i].btype == IdentityType.ENEMY) {  //3.判断子弹类型，如果是敌机发射的，那么就和主角进行碰撞检测
    //         isHit = GameUtils.hitTest(e, this._bullet[i])
    //         hitevent.htype = HitType.ENEMY_TO_HERO;
    //       }

    //       if (this._bullet[i].btype == IdentityType.HERO) { //4.如果是主角发射的。那么就和第一步的取出来的数组进行碰撞检测
    //         for (var j = ; j < arr.length; j++) {
    //           if (arr[j].IsUse) {
    //             isHit = GameUtils.hitTest(arr[j], this._bullet[i])
    //             hitevent.enemy = arr[j];
    //             hitevent.htype = HitType.HERO_TO_ENEMY;
    //           }
    //         }
    //       }
    //       if (isHit) {  //如果碰撞检测为true，那么触发HitEvent事件，并传递检测结果，并手动调用子弹的回收方法
    //         this.dispatchEvent(hitevent);
    //         this._bullet[i].Recycle();
    //       }
    //     }
    //   }
    //   return isHit;

    // }
  }
}