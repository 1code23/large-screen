/**
 * 格式化浮点数
 */
let fullScreen = true;
const fullScreenClick = (val) => {
    let element = document.getElementById(val.currentTarget.id); //需要全屏容器的id
    // 浏览器兼容
    if (fullScreen) {
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
            element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
    fullScreen = !fullScreen;
};

export { fullScreenClick };
