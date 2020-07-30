enum enemyTypes {
  'hay', 'grass',
}
class Pool extends eui.Image {

  public type: number  //類型
  public hp: number	//血量
  // public secondsToGoal: number	//
  public damage: number	//傷害
  public exp: number	//經驗
  public score: number	//得分
  public canShoot: boolean	//是否可攻擊
  // public dodgeChance	//閃避概率

  public constructor(obj) {
    super()
    this.x = obj.x
    this.y = obj.y
    this.type = obj.type
    this.hp = obj.hp || 0
    this.score = obj.score || 0
    this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this)
  }

  private onAddToStage() {
    console.log('区别一下敌人血量')
    // 區別一下敵人血量
    this.hp = this.type == 0 ? 100 : 0;
    this.canShoot = this.type == 0 ? true : false;
    this.scaleX = this.scaleY = 0.3;
    this.source = `${enemyTypes[this.type]}_png`
  }


  /** 保存敵人對象的對象池 */
  static _pool: Object = {}

  /** 新增 or 取出 */
  static produce(obj): Pool {
    if (Pool._pool[obj.type] == null) {
      Pool._pool[obj.type] = []
    }
    let theArr: Pool[] = Pool._pool[obj.type]
    let thePool: Pool
    if (theArr.length > 0) {
      thePool = theArr.pop()
      thePool.x = obj.x
      thePool.y = obj.y
      thePool.type = obj.type
      console.log('从对象池中取出');
    } else {
      console.log('新增');
      thePool = new Pool(obj)
    }
    return thePool
  }

  /** 回收 */
  static reclaim(thePool: Pool) {
    if (Pool._pool[thePool.type] == null) {
      Pool._pool[thePool.type] = []
      console.log(Pool._pool[thePool.type]);
    }
    let theArr: Pool[] = Pool._pool[thePool.type]

    if (theArr.indexOf(thePool) == -1) {
      theArr.push(thePool)
      console.log('存进对象池');
    }
  }

  /** 清除 */
  public clearItme() {
    if (this.parent) {
      Pool.reclaim(this)
      this.parent.removeChild(this)
    }
  }
}