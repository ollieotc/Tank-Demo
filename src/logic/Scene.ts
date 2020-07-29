module game {
    /** 場景 */
    export class Scene {

        /** 設定畫面 */
        public viewInit(): boolean {
            if(!GameCenter.gameContainer){
                GameCenter.gameContainer = new GameContainer();
                GameCenter.gameContainer.width = GameCenter.sceneRoot.stage.stageWidth;
                GameCenter.gameContainer.height = GameCenter.sceneRoot.stage.stageHeight;
                GameCenter.sceneModel.addChild(GameCenter.gameContainer);
            } 
            return true;
        }
    }
}
