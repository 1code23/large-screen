<script lang="ts" setup>
import EZUIKit from "ezuikit-js";
import { onMounted } from "vue";

interface IPlayer {
  play: Function;
  stop: Function;
  getOSDTime: Function;
  capturePicture: Function;
  openSound: Function;
  closeSound: Function;
  startSave: Function;
  stopSave: Function;
  startTalk: Function;
  stopTalk: Function;
  fullScreen: Function;
  destroy: Function;
}

let player: IPlayer;

const play = () => {
  const playPromise = player.play();
  playPromise.then((data: any) => {
    console.log("promise 获取 数据", data);
  });
};

const stop = () => {
  const stopPromise = player.stop();
  stopPromise.then((data: any) => {
    console.log("promise 获取 数据", data);
  });
};

const getOSDTime = () => {
  const getOSDTimePromise = player.getOSDTime();
  getOSDTimePromise.then((data: any) => {
    console.log("promise 获取 数据", data);
  });
};

const capturePicture = () => {
  const capturePicturePromise = player.capturePicture(
    `${new Date().getTime()}`
  );
  capturePicturePromise.then((data: any) => {
    console.log("promise 获取 数据", data);
  });
};

const openSound = () => {
  const openSoundPromise = player.openSound();
  openSoundPromise.then((data: any) => {
    console.log("promise 获取 数据", data);
  });
};

const closeSound = () => {
  const openSoundPromise = player.closeSound();
  openSoundPromise.then((data: any) => {
    console.log("promise 获取 数据", data);
  });
};

const startSave = () => {
  const startSavePromise = player.startSave(`${new Date().getTime()}`);
  startSavePromise.then((data: any) => {
    console.log("promise 获取 数据", data);
  });
};

const stopSave = () => {
  const stopSavePromise = player.stopSave();
  stopSavePromise.then((data: any) => {
    console.log("promise 获取 数据", data);
  });
};

const ezopenStartTalk = () => {
  player.startTalk();
};

const ezopenStopTalk = () => {
  player.stopTalk();
};

const fullScreen = () => {
  player.fullScreen();
};

const destroy = () => {
  const destroyPromise = player.destroy();
  destroyPromise.then((data: any) => {
    console.log("promise 获取 数据", data);
  });
  player = null;
};

const init = () => {
  if (player) {
    destroy();
  }
  console.group("mounted 组件挂载完毕状态===============》");
  fetch('https://open.ys7.com/api/lapp/token/get', {
      method: 'post',
      body: 'appKey=e416cbdd2d0e4e81b69432c72be84614&appSecret=df95b320ff5013087310dd92befd0bc6',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then((response) => response.json())
    .then((res) => {
      var accessToken = res.data.accessToken;
      player = new EZUIKit.EZUIKitPlayer({
        id: "video-container", // 视频容器ID
        accessToken: accessToken,
        url: "ezopen://open.ys7.com/J63437813/3.live",
        // simple: 极简版; pcLive: pc直播; pcRec: pc回放; mobileLive: 移动端直播; mobileRec: 移动端回放;security: 安防版; voice: 语音版;
         template: "pcLive",
        
        width: 540,
        height: 230,
      });
      window.player = player;
    });
};

onMounted(() => {
  init();
});
</script>

<template>
  <div style="width: 600px; height: 200px">
    <div id="video-container" style="width: 600px; height: 200px"></div>
   
  </div>
</template>

<style>
.header-controls {
    display: none !important;
}

#video-container-player {
  width: 540px !important; 
  height: 180px !important;
}
</style>