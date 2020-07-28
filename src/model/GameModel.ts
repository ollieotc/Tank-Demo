/** 全局通用資料 */
class GameModel {
    /** 遊戲名稱 */
    public static gameName: string = 'Tank-demo';

    /** 遊戲測試模式 */
    public static testMode: boolean = true;

    /** 是否為手機版 */
    static isMobile: boolean = false;

    /** 遊戲畫面規格 */
    public static gameLayout: any = {
        mode: 'pc',       // pc || mb
        stageWidth: 1920, // 舞台寬
        stageHeight: 1080 // 舞台高
    }

    /** 遊戲狀態列表: */
    public static gameStatus: any[] = [];

    /** 當前遊戲狀態 */
    public static currentGameStatus: string = null;

    /** 當前玩家資訊 */
    public static userInfo: any = {
        account: 'Loading', // 預設有值是為了在打登入接口前可以進去 進開發後請預設空值
        nickName: null,
        headerUrl: null,
        balance: null,
        languageId: null
    }

    /** 當前遊戲資訊 */
    public static gameInfo: any = {
        spMemberId: null,      // 平台ID
        gameNumber: 'Loading', // 遊戲局號 - [ 預設有值是為了在打登入接口前可以進去 進開發後請預設空值 ]
        betRate: null,         // 賠率
        betLimit: null,        // 限注額
        betLimitLower: null,   // 最低下注額
    }

    /** 初次進入遊戲(固定時間軸遊戲使用) */
    public static firstIn: boolean = true;

    /** 結束時間(固定時間軸遊戲使用) */
    public static gameEndTime: number[] = [30, 60];

    /** 封盤時間(固定時間軸遊戲使用) */
    public static stopBettingTime: number[] = [20, 50];
}
