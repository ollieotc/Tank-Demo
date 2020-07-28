class InitLogic {

    public static init(): void {
      
        mouse.enable(GameCenter.sceneRoot.stage);  // 啟用滑鼠庫

        let scene: egret.DisplayObjectContainer =  GameCenter.sceneModel; 
        if (scene)  GameCenter.sceneRoot.addChild(scene);
    }

    /** 設定WebSocket連線 */
    public static ws(): void {
        // Socket.getInstance().initServer();
        // WsMessage.getWsmessageInstance().listentDetail();
    }

}
