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
            this.init();
        }

        // /** 滾動 - ENTER_FRAME */
        // private enterFrameHandler(event: egret.Event, direction: string) {
        //     let item;
        //     if (direction == 'up' || direction == 'down') {
        //         item = this.rowCount;
        //     } else {
        //         item = this.colCount;
        //     }
        //     for (let i: number = 0; i < item; i++) {
        //         if (this.bmpArr[i].x <= -1 * this.textureWidth) {
        //             let bgBmp: egret.Bitmap = this.bmpArr[i];
        //             bgBmp.x = this.bmpArr[this.rowCount - 1].x + this.textureWidth;

        //             this.bmpArr.shift();
        //             this.bmpArr.push(bgBmp);
        //             // 處理位置跳格問題
        //             this.bmpArr.forEach(bmp => {
        //                 bmp.x += this.speed;
        //             });
        //         }
        //         this.bmpArr[i].x -= this.speed;
        //     }
        // }

        /** 初始化背景图 */
        private init(): void {
            let texture: egret.Texture = RES.getRes("bg_png");
            this.textureWidth = texture.textureWidth;
            this.textureHeight = texture.textureHeight;

            // 計算當前容器(或螢幕), 需要多少張圖片才能填滿
            this.rowCount = Math.ceil(this.stageW / this.textureWidth) + 2;
            this.colCount = Math.ceil(this.stageH / this.textureHeight) + 2;
            this.bmpArr = [];

            // 將圖片並列在一起
            for (let i: number = 0; i < this.rowCount; i++) {
                let bgData = []
                let bgBmp;
                for (let j: number = 0; j < this.colCount; j++) {
                    bgBmp = game.createBitmapByName("bg_png");
                    bgBmp.x = this.textureWidth * i;
                    bgBmp.y = this.textureHeight * j;
                    bgData.push(bgBmp);
                    this.addChild(bgBmp);
                }
                this.bmpArr.push(bgData);
            }
            this.x = (this.stageW - this.width) / 2;
            this.y = (this.stageH - this.height) / 2;
        }

        /** 滾動 - ENTER_FRAME */
        private enterFrameHandler(direction: string, speed: number): void {
            let _directionType = direction;
            if (_directionType == 'up' || _directionType == 'down') {
                this.y += this.speed;
                GameCenter.gameContainer.obstacleList.y += this.speed;
                for (let i: number = 0; i < this.rowCount; i++) {
                    let bitmap = this.bmpArr[i];
                    if (_directionType == 'down' && this.y < -1 * (bitmap[0].y + this.textureHeight)) {
                        bitmap[0].y = bitmap[this.colCount - 1].y + this.textureHeight;
                        let arrayMove = bitmap.shift();
                        this.bmpArr[i].push(arrayMove);
                    }
                    if (_directionType == 'up' && this.y > -1 * (bitmap[0].y + this.textureHeight)) {
                        bitmap[this.colCount - 1].y = -(this.textureHeight - bitmap[0].y);
                        let arrayMove = bitmap.pop();
                        this.bmpArr[i].unshift(arrayMove);
                    }
                }
            } else {
                this.x += this.speed;
                GameCenter.gameContainer.obstacleList.x += this.speed;
                let bitmap = this.bmpArr;
                for (let i: number = 0; i < this.colCount; i++) {
                    if (_directionType == 'right' && this.x < -1 * (bitmap[0][i].x + this.textureWidth)) {
                        bitmap[0][i].x = bitmap[this.rowCount - 1][i].x + this.textureWidth;
                    }
                    if (_directionType == 'left') {
                        // if (this.x > -1 * (this.bmpArr[this.rowCount - 1][i].x + this.textureWidth)) {
                        // this.bmpArr[this.rowCount - 1][i].x = -(this.textureWidth + this.bmpArr[0][i].x);
                        // }
                    }
                }
                if (_directionType == 'right') {
                    let arrayMove = this.bmpArr.shift();
                    this.bmpArr.push(arrayMove)
                }
                if (_directionType == 'left') {
                    // let arrayMove = this.bmpArr.pop();
                    // this.bmpArr.unshift(arrayMove)
                }
            }
        }

        /**
         * 开始滚动
         * @param direction 方向
         * @param speed 控制滚动速度
         */
        public start(direction: string, speed: number = 0): void {
            speed = Math.abs(speed);
            this.speed = (direction == 'left' || direction == 'up') ? speed : -speed;
            this.enterFrameHandler(direction, speed);
        }
    }
}