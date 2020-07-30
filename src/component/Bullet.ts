module game {
  export class Bullet extends eui.Component {

    private bullet: eui.Image;

    public constructor(color) {
      super();
      this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {
      this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
      this.bullet = new eui.Image();
      this.bullet.source = `bullet_png`;
      this.bullet.scaleX = this.bullet.scaleY = 0.5;
      this.addChild(this.bullet);
      // 設置中心點
      this.bullet.anchorOffsetX = this.bullet.width / 2;
      this.bullet.anchorOffsetY = this.bullet.height / 2;
    }

    /**爆炸 */
	public shooting() {
		// this.isHit()
		// this.source = RES.getRes('GameScene-hd_json.GameScene_Explosion')
		this.anchorOffsetX = this.width / 2
		this.anchorOffsetY = this.height / 2
		let tw = egret.Tween.get(this)
		tw.to({ scaleX: 1.5, scaleY: 1.5, alpha: 0.5 }, 200).call(() => {
			this.boomFinish()
		})
	}

	/**爆炸完成 */
	private boomFinish() {
		// let randownNum = Math.floor(Math.random()) * 3 + 1
		// this.source = RES.getRes(`GameScene-hd_json.GameScene_MarcaPiso${randownNum}`)
		// this.anchorOffsetX = this.width / 2
		// this.anchorOffsetY = this.height / 2
		// setTimeout(() => {
		// 	this.parent.removeChild(this)
		// }, 700)
	}
	/**是否击中 */
	public isHit() {

		// for (let i = SceneManager.instance.gamescene.enemysArr.length - 1; i >= 0; i--) {
		// 	let theEnemy = SceneManager.instance.gamescene.enemysArr[i]
		// 	if (SceneManager.hitTest(theEnemy, this)) {
		// 		console.log(theEnemy.hp);

		// 		theEnemy.hp -= 1
		// 	}
		// }
	}

  }
}