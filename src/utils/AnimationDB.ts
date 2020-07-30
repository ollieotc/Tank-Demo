class AnimationDB {

  /** 初始化DB動畫 */
  public static initDB(): void {
    let dbList: string[] = [
      'boom',
      'shot',
    ]

    dbList.forEach(item => {
      /** 讀取資源 */
      let skeletonData = RES.getRes(`${item}_ske_json`);
      let textureData = RES.getRes(`${item}_tex_json`);
      let texture = RES.getRes(`${item}_tex_png`);

      /** 設定動畫 */
      dragonBones.EgretFactory.factory.parseDragonBonesData(skeletonData);
      dragonBones.EgretFactory.factory.parseTextureAtlasData(textureData, texture);
    })
  }


	/**
	 * 播放DB動畫
	 * @param {string} option 播放的動畫
	 * @param {string} dbSource 播放的動畫資源
	 * @param {any} parent 要掛載在哪個畫面上
	 * @param {number[]} xy 播放動畫的座標
	 * @param {number} timeScale 播放動畫的速度
	 * @param {boolean} repeat 是否重複播放
	 * @param {number} count 播放次數
	 */
  public static playDB(option: string, dbSource: string, parent: any, xy: number[], timeScale: number, repeat: boolean, count: number = 1): void {

    /** 創建動畫 */
    let target: any = parent;

    if (!target[`armatureDisplay_${option}`]) {
      target[`armatureDisplay_${option}`] = dragonBones.EgretFactory.factory.buildArmatureDisplay(dbSource);
      // target[`armatureDisplay_${option}`].touchEnabled = false;

      /** 掛載偵聽事件 */
      target[`armatureDisplay_${option}`].addEventListener(dragonBones.EventObject.COMPLETE, () => {
        target[`armatureDisplay_${option}`].parent.removeChild(target[`armatureDisplay_${option}`]);
      }, this)
    }

    /** 掛載動畫 */
    if (!target[`armatureDisplay_${option}`].parent) parent.addChild(target[`armatureDisplay_${option}`]);

    /** 設定座標 */
    target[`armatureDisplay_${option}`].x = xy[0];
    target[`armatureDisplay_${option}`].y = xy[1];

    /** 設定播放時間 */
    target[`armatureDisplay_${option}`].animation.timeScale = timeScale || 1;

    /** 設定播放次數 */
    repeat
      ? target[`armatureDisplay_${option}`].animation.play()
      : target[`armatureDisplay_${option}`].animation.play(null, count)
  }


  /** 爆炸 */
  public static boom(group, xy: number[]): void {
    AnimationDB.playDB('boom', `boom`, group, xy, 1, false);
  }

  /** 開槍 */
  public static shot(group, xy: number[]): void {
    AnimationDB.playDB('shot', `shot`, group, xy, 1, false);
  }

}