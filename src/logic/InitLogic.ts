module game {

    /** 初始 */
    export function init(): void {
        mouse.enable(GameCenter.sceneRoot.stage);  // 啟用滑鼠庫
        this.setGameKeyboard(); // 設置鍵盤
        this.animation();
        let scene: egret.DisplayObjectContainer = GameCenter.sceneModel;
        if (scene) GameCenter.sceneRoot.addChild(scene);
    }

    export function setControltPanel(){

    }

    export function setGameKeyboard(): void {
        document.addEventListener("keydown", function (evt: any) {
            let tankPosition;
            switch (evt.keyCode) {
                case 37: //ArrowLeft
                    GameCenter.gameContainer.setButtonEvent('Left');
                    break
                case 38: // ArrowUp
                    // console.log('向上')
                    GameCenter.gameContainer.setButtonEvent('Up');
                    break
                case 39: // ArrowRight
                    // console.log('向右')
                    GameCenter.gameContainer.setButtonEvent('Right');
                    break
                case 40: // ArrowDown
                    // console.log('向下')
                    GameCenter.gameContainer.setButtonEvent('Down');
                    break
                case 13: // Enter
                    console.log('Enter')
                    GameCenter.gameContainer.changTankColor();
                    break
                case 32: // Space
                    console.log('Space')
                    break
            }
        })
    }

    /** 根據name關鍵字創建一個Bitmap對象。name屬性請參考resources/resource.json配置文件的內容。 */
    export function createBitmapByName(name: string): egret.Bitmap {
        let result: egret.Bitmap = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }


    /** 設定動畫 */
    export function animation(): void {
        AnimationDB.initDB();
    }

    /**碰撞检测 */
    export function hitTest(obj1: egret.DisplayObject, obj2: egret.DisplayObject): boolean {
        let isHit: boolean = false;
        isHit = obj1.hitTestPoint(obj2.x,obj2.y,true)
        GameCenter.gameContainer.testLabel.text = `isHit: ${isHit}`;
        return isHit;
    }
}
