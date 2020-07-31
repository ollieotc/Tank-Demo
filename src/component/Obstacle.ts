enum enemyTypes {
  'hay', 'grass',
}
class Obstacle extends eui.Image {

  public type: number  //類型
  public hp: number	 //血量
  public exp: number	//經驗
  // public score: number	//得分
  public canShoot: boolean	//是否可攻擊
  public ObstacleList = {
    'hay': { hp: 100, canShoot: true },
    'grass': { hp: 0, canShoot: false }
  }

  public constructor(obj) {
    super()
    this.x = obj.x
    this.y = obj.y
    this.type = obj.type;
    this.name = enemyTypes[obj.type];
    this.source = `${enemyTypes[obj.type]}_png`;
    this.hp = this.ObstacleList[this.name].hp;
    this.canShoot = this.ObstacleList[this.name].canShoot;
    this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this)
  }

  private onAddToStage() {
    this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
  }

  /** 保存障礙物的對象池 */
  static _pool: Object = {}

  /** 新增 or 取出 */
  static produce(obj): Obstacle {
    if (Obstacle._pool[obj.type] == null) {
      Obstacle._pool[obj.type] = []
    }
    let theArr: Obstacle[] = Obstacle._pool[obj.type]
    let theObstacle: Obstacle
    if (theArr.length > 0) {
      theObstacle = theArr.pop()
      theObstacle.x = obj.x;
      theObstacle.y = obj.y;
      theObstacle.type = obj.type;
      theObstacle.name = enemyTypes[obj.type];
      theObstacle.hp = theObstacle.ObstacleList[theObstacle.name].hp;
      theObstacle.canShoot = theObstacle.ObstacleList[theObstacle.name].canShoot;
      theObstacle.source = `${enemyTypes[obj.type]}_png`;
    } else {
      theObstacle = new Obstacle(obj);
    }
    return theObstacle;
  }

  /** 回收 */
  static reclaim(theObstacle: Obstacle) {
    if (Obstacle._pool[theObstacle.type] == null) {
      Obstacle._pool[theObstacle.type] = []
      console.log(Obstacle._pool[theObstacle.type]);
    }
    let theArr: Obstacle[] = Obstacle._pool[theObstacle.type]

    if (theArr.indexOf(theObstacle) == -1) {
      theArr.push(theObstacle)
      // console.log('存進對象池');
    }
  }

  /** 清除 */
  public clearItme() {
    if (this.parent) {
      Obstacle.reclaim(this)
      this.parent.removeChild(this)
    }
  }
}