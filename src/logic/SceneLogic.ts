class SceneLogic {

    /** 設定畫面 */
  static viewInit(): boolean {
        if (!GameCenter.tableEui) {
            GameCenter.tableEui = new TableEui();
            GameCenter.tableEui.width = GameCenter.sceneRoot.stage.stageWidth;
            GameCenter.tableEui.height = GameCenter.sceneRoot.stage.stageHeight;
            GameCenter.sceneModel.addChild(GameCenter.tableEui);
        }

        // if (!GameCenter.headerEui) {
        //     GameCenter.headerEui = new HeaderEui();
        //     GameCenter.headerEui.width = GameModel.gameLayout.stageWidth;
        //     GameCenter.sceneModel.addChild(GameCenter.headerEui);
        // }

        // if (!GameCenter.footerEui) {
        //     GameCenter.footerEui = new FooterEui();
        //     GameCenter.footerEui.width = GameModel.gameLayout.stageWidth;
        //     GameCenter.footerEui.bottom = '0';
        //     GameCenter.sceneModel.addChild(GameCenter.footerEui);
        // }


        return true;
    }
}
