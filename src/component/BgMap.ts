module game {
    export class BgMap extends egret.DisplayObjectContainer {

        private bmpArr: any[]; // 存放由圖片合併而成的大圖(底片
        private rowCount: number; // 圖片數量
        private colCount: number; // 圖片數量
        private stageW: number;  // 容器寬
        private stageH: number; // 容器高
        private textureWidth: number; // 圖片來源寬
        private textureHeight: number; // 圖片來源高

        private speed: number = 10; // 場景移動速度

        public constructor() {
            super();
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }

        private onAddToStage(event: egret.Event) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.stageW = this.stage.stageWidth;
            this.stageH = this.stage.stageHeight;
            var texture: egret.Texture = RES.getRes("bg_png");

            this.textureWidth = texture.textureWidth;
            this.textureHeight = texture.textureHeight;

            // 計算當前容器(或螢幕), 需要多少張圖片才能填滿
            this.rowCount = Math.ceil(this.stageW / this.textureWidth) + 1;
            this.colCount = Math.ceil(this.stageH / this.textureHeight) + 1;
            this.bmpArr = [];
            let bgBmp;
            // 將圖片並列在一起
            for (let i: number = 0; i < this.rowCount; i++) {
                let bgData = []
                for (let j: number = 0; j < this.colCount; j++) {
                    bgBmp = game.createBitmapByName("bg_png");
                    bgBmp.x = this.textureWidth * i;
                    bgBmp.y = this.textureHeight * j;
                    bgData.push(bgBmp);
                    this.addChild(bgBmp);
                }
                this.bmpArr.push(bgData);
            }
            console.log(this.bmpArr);
        }

        // /** 開始滾動 */
        // public start(): void {
        //   console.log('開始滾動')
        //     this.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
        //     this.addEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
        // }

        /** 滾動 - ENTER_FRAME */
        private enterFrameHandler(event: egret.Event, direction: string) {
            let item;
            if (direction == 'up' || direction == 'down') {
                item = this.rowCount;
            } else {
                item = this.colCount;
            }
            for (let i: number = 0; i < item; i++) {
                if (this.bmpArr[i].x <= -1 * this.textureWidth) {
                    let bgBmp: egret.Bitmap = this.bmpArr[i];
                    bgBmp.x = this.bmpArr[this.rowCount - 1].x + this.textureWidth;

                    this.bmpArr.shift();
                    this.bmpArr.push(bgBmp);
                    // 處理位置跳格問題
                    this.bmpArr.forEach(bmp => {
                        bmp.x += this.speed;
                    });
                }
                this.bmpArr[i].x -= this.speed;
            }
        }
    }
}