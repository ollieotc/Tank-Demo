module game {

    /** 初始 */
    export function init(): void {
        mouse.enable(GameCenter.sceneRoot.stage);  // 啟用滑鼠庫
        this.setGameKeyboard(); // 設置鍵盤
        let scene: egret.DisplayObjectContainer = GameCenter.sceneModel;
        if (scene) GameCenter.sceneRoot.addChild(scene);
    }

    export function setGameKeyboard(): void {
        console.log('setGameKeyboard');
        document.addEventListener("keydown", function (evt: any) {
            let tankPosition;
            switch (evt.keyCode) {
                case 37: //ArrowLeft
                    console.log('向左')
                    tankPosition = GameCenter.gameContainer.getTankPosition('x');
                    if (tankPosition >= 300) GameCenter.gameContainer.moveTank('x', -30);
                    GameCenter.gameContainer.setTankrotationAngle(-90);
                    break
                case 38: // ArrowUp
                    console.log('向上')
                    tankPosition = GameCenter.gameContainer.getTankPosition('y');
                    if (tankPosition >= 300) GameCenter.gameContainer.moveTank('y', -30);
                    GameCenter.gameContainer.setTankrotationAngle(0);
                    break
                case 39: // ArrowRight
                    console.log('向右')
                    tankPosition = GameCenter.gameContainer.getTankPosition('x');
                    if (tankPosition <= GameCenter.sceneRoot.stage.stageWidth - 300) GameCenter.gameContainer.moveTank('x', +30);
                    GameCenter.gameContainer.setTankrotationAngle(90);
                    break
                case 40: // ArrowDown
                    console.log('向下')
                    tankPosition = GameCenter.gameContainer.getTankPosition('y');
                    if (tankPosition <= GameCenter.sceneRoot.stage.stageHeight - 300) GameCenter.gameContainer.moveTank('y', +30);
                    GameCenter.gameContainer.setTankrotationAngle(180);
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
        var result: egret.Bitmap = new egret.Bitmap();
        var texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    export function createBlocksItem(): void {

    }
}
