module game {
	export class Bullet extends eui.Image {

		private tik;

		public constructor(obj) {
			super();
			this.x = obj.x;
			this.y = obj.y;
			this.rotation = obj.rotation;
			this.source = `bullet_png`;
			this.anchorOffsetX = this.anchorOffsetY = 0.5;
			this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
		}

		private onAddToStage(event: egret.Event) {
			this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
		}

		/** 保存子彈的對象池 */
		static _bullet: any = [];

		/** 新增 or 取出 */
		static produce(obj): Bullet {
			let theArr = Bullet._bullet;
			let theBullet: Bullet;
			if (theArr.length > 0) {
				theBullet = theArr.pop();
				theBullet.x = obj.x;
				theBullet.y = obj.y;
				theBullet.rotation = obj.rotation;
				theBullet.source = `bullet_png`;
			} else {
				theBullet = new Bullet(obj);
			}
			return theBullet;
		}

		/** 回收 */
		static reclaim(theBullet: Bullet) {
			let theArr: any[] = Bullet._bullet;

			if (theArr.indexOf(theArr) == -1) {
				theArr.push(theBullet);
				// console.log('存進對象池');
			}
		}

		/** 清除 */
		public clearItme() {
			if (this.parent) {
				Bullet.reclaim(this);
				this.parent.removeChild(this);
			}
		}

		/**爆炸 */
		public shooting(rotation) {

			this.tik = setInterval(() => {
				let apl;
				let total;
				if (rotation == 0) {
					apl = this.y;
					total = 0;
					this.y -= 60;
				}
				if (rotation == 90) {
					apl = this.x;
					total = GameCenter.sceneRoot.stage.stageWidth;
					this.x += 60;
				}
				if (rotation == 180) {
					apl = this.y;
					total = GameCenter.sceneRoot.stage.stageHeight;
					this.y += 60;
				}
				if (rotation == -90) {
					apl = this.x;
					total = 0;
					this.x -= 60;
				}
				this.fly(apl, total);
			}, 100);
		}

		public fly(apl, total) {
			let isHit = GameCenter.gameContainer.isHitCanShoot(this);
			if (isHit) {
				this.boomFinish();
			}
			if (total == 0 && apl < total) {
				clearInterval(this.tik);
				this.clearItme();
			}
			if (total != 0 && apl > total) {
				clearInterval(this.tik);
				this.clearItme();
			}
		}

		/**爆炸完成 */
		private boomFinish() {
			clearInterval(this.tik);
			this.source = `boom_03_png`;
			setTimeout(() => {
				this.clearItme();
			}, 200)
		}

	}
}