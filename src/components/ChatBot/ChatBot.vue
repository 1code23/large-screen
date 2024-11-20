<template>
    <div v-move class="max-box">
        <div class="header" @click="dialogVisible = true"></div>
    </div>

    <el-dialog v-model="dialogVisible" title="" width="690" top="15vh" center append-to-body=true class="oe-dialog-btn"
               :show-close='false' :before-close="close">

        <div class="title-out">
            <div class="machine-title">人机对话模式</div>
            <div class="close-btn" @click="close"><img src="../../assets/imgsFigure/close-btn.png" alt=""></div>
        </div>

        <div class="chat-box">
            <div class="msg-box">
                <el-scrollbar height="100%" ref="scrollbarRef">
                    <div class="msg-list" ref="innerRef">
                        <div class="msg-item" :class="item.type" v-for="(item, index) in msgList" :key="item.id">
                            <div class="msg-item-avatar">
                                <el-avatar :size="32" :src="item.avatar" />
                            </div>
                            <div class="msg-item-content">
                                <template v-if="index === msgList.length - 1 && item.type === 'from'">
                                    <template v-if="item.contents.length > 1">
                                        <VueTypedJs :strings="[item.contents[item.contents.length - 1]]"
                                                    :typeSpeed="100" :startDelay="300" :smartBackspace="true" :loop="false">
                                            <span>

                                                <template v-for="(s, index) in item.contents" :key="index">
                                                    <template v-if="index < item.contents.length - 1">
                                                        {{ s }}
                                                    </template>
                                                </template>

                                                <span class="typing"></span>
                                            </span>
                                        </VueTypedJs>
                                    </template>
                                    <template v-else>
                                        <VueTypedJs :strings="item.contents" :typeSpeed="100" :startDelay="300"
                                                    :smartBackspace="true" :loop="false">
                                            <span class="typing"></span>
                                        </VueTypedJs>
                                    </template>
                                </template>
                                <!--                                <span v-if="index === msgList.length - 1 && item.type === 'from'" class="msg-item-content-text">{{ item.content }}</span>-->
                                <span v-else class="msg-item-content-text">{{ item.content }}</span>
                            </div>
                        </div>
                        <div class="msg-item from" v-show="isWaiting">
                            <div class="msg-item-avatar">
                                <el-avatar :size="32" :src="''" />
                            </div>
                            <div class="msg-item-content">
                                <el-icon size="18" class="is-loading">
                                    <Loading />
                                </el-icon>
                                <span>智能助手正在生成回答...</span>
                            </div>
                        </div>
                    </div>
                </el-scrollbar>
            </div>
            <div class="bottom-box">
                <div class="input-box">
                    <el-input class="chat-input" autosize type="textarea" v-model="input" placeholder="请输入关键字" />
                </div>
                <div class="audio-btn">
                    <el-tooltip class="box-item" effect="dark" :content="btnControl" placement="top">
                        <div class="audio-btn-item" @click="audioToText">
                            <el-icon size="30" :class="{ 'is-loading': audioBtnStatus === 1 }">
                                <Microphone v-show="audioBtnStatus === 0" />
                                <Loading v-show="audioBtnStatus === 1" />
                                <!-- <Mic v-show="audioBtnStatus === 2" /> -->
                                <img v-show="audioBtnStatus === 2" src="../../assets/imgs/audio.gif" alt="">
                                <Mute v-show="audioBtnStatus === 3" />
                            </el-icon>
                        </div>
                    </el-tooltip>
                    <el-tooltip v-if="audioBtnStatus === 2" class="box-item" effect="dark" content="停止录音"
                                placement="top">
                        <div v-if="audioBtnStatus === 2" class="audio-btn-item" @click="audioToText">
                            <el-icon size="30" color="#f00">
                                <VideoPause />
                            </el-icon>
                        </div>
                    </el-tooltip>
                </div>
                <div class="send-btn" @click="sendMsg">
                    发送
                </div>
            </div>
        </div>
    </el-dialog>
</template>

<script lang="ts" setup>
    import { ref, nextTick } from 'vue'
    import { VueTypedJs } from "vue3-typed-ts";
    import { Directive, DirectiveBinding } from 'vue';
    // 定义一个自定义指令 v-move
    const VMove: Directive<any, void> = (el: HTMLElement, bingding: DirectiveBinding) => {
        console.log('el', el);    // 这个 el 就是挂载 v-move 指定的元素
        // 获取到盒子右侧和底部可以移动到的最值
        const right = window.innerWidth - el.clientWidth
        const bottom = window.innerHeight - el.clientHeight
        console.log('盒子右下最值：', right, bottom);

        // 获取内部第一个div元素
        let moveElement: HTMLDivElement = el.firstElementChild as HTMLDivElement
        console.log('获取的元素', moveElement);   // 这里获取到的就是 header 所在的div元素

        // 鼠标按下的事件
        const mouseDown = (e: MouseEvent) => {
            let X = e.clientX - el.offsetLeft
            let Y = e.clientY - el.offsetTop
            // 鼠标移动事件
            const move = (e: MouseEvent) => {
                // 控制向左移动最左不能超出窗口左侧 且 向右移动最右不能让盒子超出窗口右侧
                let moveX = e.clientX - X < 0 ? 0 : ((e.clientX - X) > right ? right : e.clientX - X)
                // 控制向上移动最上不能超出窗口顶部 且 向下移动最下不能让盒子超出窗口底部
                let moveY = e.clientY - Y < 0 ? 0 : ((e.clientY - Y) > bottom ? bottom : e.clientY - Y)

                el.style.left = moveX + 'px'
                el.style.top = moveY + 'px'
            }
            document.addEventListener('mousemove', move)
            // 在鼠标抬起时去移除移动事件
            document.addEventListener('mouseup', () => {
                // 移除移动事件
                document.removeEventListener('mousemove', move)
            })
        }
        // 为获取到的div盒子绑定鼠标按下事件
        moveElement.addEventListener('mousedown', mouseDown)
    }

    const dialogVisible = ref(false)
    const msgList = ref([{
        id: '1',
        type: 'from',
        content: '你好，我是智能客服',
        contents: [],
        avatar: ''
    }, {
        id: '2',
        type: 'to',
        content: '你好',
        contents: [],
        avatar: ''
    }])
    const audioBtnStatus = ref(0)
    const input = ref('')
    const message = ref('')
    const btnControl = ref('开始录音')
    const isWaiting = ref(false)
    const innerRef = ref<HTMLDivElement>()
    const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>()

    const getMsg = async () => {
        bigModel.start();
        msgList.value.push({
            id: new Date().getTime() + '',
            type: 'from',
            content: total_res,
            contents: [],
            avatar: ''
        })
        console.log('msgList ------------> ', msgList);
        // if (message.value.includes("苹果种类")) {
        //     const msgs = "陕西是中国著名的苹果产地，拥有众多优质品种。以下是陕西苹果的详细介绍：“秦冠”苹果。果实圆锥形，果面着色浓红，肉质黄白色，松脆多汁。“红富士”苹果。果实圆形或长圆形，果面光滑，果肉黄白色，细脆致密，酸甜适度。“瑞阳”和“瑞雪”苹果。由“秦冠”和“富士”杂交选育，具有“秦冠”的丰产性和“富士”的优良性状。“白水苹果”。品质优于日本红富士，被誉为“中华名果”。“洛川苹果”。以红星、红元帅等品种为优，色泽艳丽，肉质脆密，含糖量高。“礼泉苹果”。种植面积大，多次获得部优、省优称号。“宜川苹果”。色艳、香浓、耐储藏，品质居全国同类苹果之冠。“合阳苹果”。品质优良，获得“绿色食品证书”。此外，陕西还有“红元帅”“嘎拉”“黄元帅”“金帅”“富硒红”等品种。这些苹果品种不仅外观诱人，而且口感上佳，营养价值丰富。"
        //     msgList.value.push({
        //         id: new Date().getTime() + '',
        //         type: 'from',
        //         content: msgs,
        //         contents: [msgs],
        //         avatar: ''
        //     })
        // } else if (message.value.includes("果业发展")) {
        //     const msgs = "根据提供的信息，陕西果业的发展现状如下：生产规模：截至2022年底，陕西的园林水果面积为1752.23万亩，比上年增长0.1%，其中苹果产量为1302.71万吨，占全省园林水果总产的65.3%。生产基地县：陕西的果业大县（基地县）通过不断投入人力、财力，提高了果园管理和生产技术的水平，对全省果业发展起到引领示范作用。销售情况：2022年，陕西苹果的开盘价上涨，带动了水果市场的整体价格上升，呈现出产销两旺的状态。生产投入：苹果、梨及柑橘的生产性投入有所增加，而猕猴桃和红枣的生产投入则有所下降。经济效益：由于水果产量的提高和价格的提升，果农的经营收益普遍增加。出口情况：尽管2022年陕西果品的出口量略有下降，但仍实现了止跌企稳，尤其是鲜苹果和鲜梨的出口数量分别增长了1.61%和143.24%。产业发展策略：为了推动果业的可持续发展，需要立足新阶段，贯彻新理念，融入新格局，并通过转型升级实现高质量"
        //     msgList.value.push({
        //         id: new Date().getTime() + '',
        //         type: 'from',
        //         content: msgs,
        //         contents: [msgs],
        //         avatar: ''
        //     })
        // } else if (message.value.includes("陕西水果网络零售")) {
        //     const msgs = "2023年陕西水果网络零售额仅次于山东，稳居全国第二。分季度看，一季度元旦、春节等节庆背景下，居民走亲访友、送礼场景增多，助推水果网销稳定增长；二季度气温回暖，疫后居民外出旅游、踏青等情形增多，线下实体消费挤占一定网销份额，叠加应季时令水果较少，陕西水果网销阶段性回落，其中6月受“6.18”电商年中大促影响，网络零售额较快增长，环比增长94.15%；三季度保持平稳运行；四季度冬枣、猕猴桃、苹果等本地优势水果上市，叠加中秋、国庆、“双十一”等节庆效应推动，陕西水果网络零售整体表现良好，11月达全年峰值，环比增长121.24%。"
        //     msgList.value.push({
        //         id: new Date().getTime() + '',
        //         type: 'from',
        //         content: msgs,
        //         contents: [msgs],
        //         avatar: ''
        //     })
        // } else if (message.value.includes("苹果深加工")) {
        //     const msgs = "苹果可以深加工苹果干，苹果醋，苹果罐头。苹果可以加工成苹果酒，苹果脆片等。苹果可以加工成苹果汁、苹果干、苹果醋、苹果罐头等。液体加工产品。果汁产品，如鲜榨苹果汁、苹果浓缩浊汁和苹果浓缩原浆；苹果醋以及醋饮料；苹果罐头以及苹果酒。固体加工产品。苹果全粉及速溶粉，果酱，果脯，苹果天然香精以及脱水苹果干、苹果脆片等。苹果可以深加工成罐头，果汁，醋，苹果干，酒等。苹果深加工主要有果干，果片，果酱，果醋，果酒等。"
        //     msgList.value.push({
        //         id: new Date().getTime() + '',
        //         type: 'from',
        //         content: msgs,
        //         contents: [msgs],
        //         avatar: ''
        //     })
        // } else {
        //     const msgs = ['很抱歉，我无法理解您的问题。请尝试使用更清晰和具体的语言来表达您的问题，这样我才能更好地帮助您。', '你好！有什么我能帮忙的吗？', '您好！如果您有任何问题或需要帮助，都可以告诉我，我会尽力为您提供帮助。如果有具体的问题，请直接告诉我，我会为您解答。', '抱歉，没有明白您说内容']
        //     msgList.value.push({
        //         id: new Date().getTime() + '',
        //         type: 'from',
        //         content: msgs[Math.floor(Math.random() * 3)],
        //         avatar: ''
        //     })
        // }

        await nextTick();
        scrollbarRef.value!.setScrollTop(innerRef.value!.clientHeight)
    }
    const sendMsg = async () => {
        if (!input.value) {
            return
        }
        msgList.value.push({
            id: new Date().getTime() + '',
            type: 'to',
            content: input.value,
            contents: [],
            avatar: ''
        })
        message.value = input.value
        input.value = ""

        isWaiting.value = true
        await nextTick();
        scrollbarRef.value!.setScrollTop(innerRef.value!.clientHeight)

        setTimeout(() => {
            isWaiting.value = false
            getMsg()
        }, 1000);
    }


    let btnStatus = "UNDEFINED"; // "UNDEFINED" "CONNECTING" "OPEN" "CLOSING" "CLOSED"


    const recorder = new RecorderManager("../../dist");
    recorder.onStart = () => {
        changeBtnStatus("OPEN");
    }
    let iatWS: any;
    let resultText: any = "";
    let resultTextTemp = "";
    let countdownInterval: any = null;

    /**
     * 获取websocket url
     * 该接口需要后端提供，这里为了方便前端处理
     */
    function getWebSocketUrl() {
        // 请求地址根据语种不同变化
        var url = "wss://rtasr.xfyun.cn/v1/ws";
        var appId = (window as any).APPID;
        var secretKey = (window as any).API_KEY;
        var ts = Math.floor(new Date().getTime() / 1000);
        var signa = (window as any).hex_md5(appId + ts);
        var signatureSha = (window as any).CryptoJSNew.HmacSHA1(signa, secretKey);
        var signature = (window as any).CryptoJS.enc.Base64.stringify(signatureSha);
        signature = encodeURIComponent(signature);
        return `${url}?appid=${appId}&ts=${ts}&signa=${signature}`;
    }

    function changeBtnStatus(status: any) {
        btnStatus = status;
        if (status === "CONNECTING") {
            btnControl.value = "建立连接中";
            audioBtnStatus.value = 1;
            input.value = "";
            resultText = "";
            resultTextTemp = "";
        } else if (status === "OPEN") {
            btnControl.value = "录音中";
            audioBtnStatus.value = 2;
        } else if (status === "CLOSING") {
            btnControl.value = "关闭连接中";
            audioBtnStatus.value = 3;
        } else if (status === "CLOSED") {
            btnControl.value = "开始录音";
            audioBtnStatus.value = 0;
        }
    }

    function renderResult(resultData: any) {
        let jsonData = JSON.parse(resultData);
        if (jsonData.action == "started") {
            // 握手成功
            console.log("握手成功");
        } else if (jsonData.action == "result") {
            const data = JSON.parse(jsonData.data)
            console.log(data)
            // 转写结果
            let resultTextTemp = ""
            data.cn.st.rt.forEach((j: any) => {
                j.ws.forEach((k: any) => {
                    k.cw.forEach((l: any) => {
                        resultTextTemp += l.w;
                    });
                });
            });
            if (data.cn.st.type == 0) {
                // 【最终】识别结果：
                resultText += resultTextTemp;
                resultTextTemp = ""
            }

            input.value = resultText + resultTextTemp
        } else if (jsonData.action == "error") {
            // 连接发生错误
            console.log("出错了:", jsonData);
        }
    }

    function connectWebSocket() {
        const websocketUrl = getWebSocketUrl();
        if ("WebSocket" in window) {
            iatWS = new WebSocket(websocketUrl);
        } else if ("MozWebSocket" in window) {
            iatWS = new MozWebSocket(websocketUrl);
        } else {
            alert("浏览器不支持WebSocket");
            return;
        }
        changeBtnStatus("CONNECTING");
        iatWS.onopen = (_e) => {
            // 开始录音
            recorder.start({
                sampleRate: 16000,
                frameSize: 1280,
            });
        };
        iatWS.onmessage = (e: any) => {
            renderResult(e.data);
        };
        iatWS.onerror = (e: any) => {
            console.error(e);
            recorder.stop();
            changeBtnStatus("CLOSED");
        };
        iatWS.onclose = (e) => {
            recorder.stop();
            changeBtnStatus("CLOSED");
        };
    }

    recorder.onFrameRecorded = ({ isLastFrame, frameBuffer }) => {
        if (iatWS.readyState === iatWS.OPEN) {
            iatWS.send(new Int8Array(frameBuffer));
            if (isLastFrame) {
                iatWS.send('{"end": true}');
                changeBtnStatus("CLOSING");
            }
        }
    };
    recorder.onStop = () => {
        clearInterval(countdownInterval);
    };

    const audioToText = () => {
        if (btnStatus === "UNDEFINED" || btnStatus === "CLOSED") {
            connectWebSocket();
        } else if (btnStatus === "CONNECTING" || btnStatus === "OPEN") {
            // 结束录音
            recorder.stop();
        }
    }

    // 右上角关闭按钮
    function close() {
        setTimeout(() => {
            isWaiting.value = false;
            bigModel.stop();
            msgList.value = [{
                id: '1',
                type: 'from',
                content: '你好，我是智能客服',
                contents: [],
                avatar: ''
            }, {
                id: '2',
                type: 'to',
                content: '你好',
                contents: [],
                avatar: ''
            }];
        }, 1000);
        dialogVisible.value = false;
    }



    /******************************* 星火大模型 *********************************/
    import CryptoJS from 'crypto-js';

    let httpUrl = new URL("wss://spark-api.xf-yun.com/v3.5/chat");
    let modelDomain: any; // V1.1-V3.5动态获取，高于以上版本手动指定
    //APPID，APISecret，APIKey在https://console.xfyun.cn/services/cbm这里获取
    const APPID = '4cd66009'
    const API_SECRET = 'NzJlODUwNTg2OGMwNzI4Y2FjNmQ0MjIw'
    const API_KEY = '95bd56c30e65a7f400095a6f006d3f32'
    var total_res = "";
    let result = document.querySelector("#result");


    function getWebsocketUrl_xh() {
        // console.log(httpUrl.pathname)
        // 动态获取domain信息
        switch (httpUrl.pathname) {
            case "/v1.1/chat":
                modelDomain = "general";
                break;
            case "/v2.1/chat":
                modelDomain = "generalv2";
                break;
            case "/v3.1/chat":
                modelDomain = "generalv3";
                break;
            case "/v3.5/chat":
                modelDomain = "generalv3.5";
                break;
        }

        return new Promise((resolve, reject) => {
            var apiKey = API_KEY
            var apiSecret = API_SECRET


            var url = 'wss://' + httpUrl.host + httpUrl.pathname

            // console.log("我打印的" + httpUrl.host)
            // console.log("我打印的" + httpUrl.pathname)

            var host = location.host
            var date = new Date().toGMTString()
            var algorithm = 'hmac-sha256'
            var headers = 'host date request-line'
            var signatureOrigin = `host: ${host}\ndate: ${date}\nGET ${httpUrl.pathname} HTTP/1.1`
            var signatureSha = CryptoJS.HmacSHA256(signatureOrigin, apiSecret)
            var signature = CryptoJS.enc.Base64.stringify(signatureSha)
            var authorizationOrigin = `api_key="${apiKey}", algorithm="${algorithm}", headers="${headers}", signature="${signature}"`
            var authorization = btoa(authorizationOrigin)
            url = `${url}?authorization=${authorization}&date=${date}&host=${host}`
            resolve(url)
        })
    }

    class TTSRecorder {
        constructor({
                        appId = APPID
                    } = {}) {
            this.appId = appId
            this.status = 'init'
        }

        // 修改状态
        setStatus(status) {
            this.onWillStatusChange && this.onWillStatusChange(this.status, status)
            this.status = status
        }

        // 连接websocket
        connectWebSocket() {
            this.setStatus('ttsing')
            return getWebsocketUrl_xh().then(url => {
                let ttsWS
                if ('WebSocket' in window) {
                    ttsWS = new WebSocket(url)
                } else if ('MozWebSocket' in window) {
                    ttsWS = new MozWebSocket(url)
                } else {
                    alert('浏览器不支持WebSocket')
                    return
                }
                this.ttsWS = ttsWS
                ttsWS.onopen = e => {
                    this.webSocketSend()
                }
                ttsWS.onmessage = e => {
                    this.result(e.data)
                }
                ttsWS.onerror = e => {
                    clearTimeout(this.playTimeout)
                    this.setStatus('error')
                    alert('WebSocket报错，请f12查看详情')
                    console.error(`详情查看：${encodeURI(url.replace('wss:', 'https:'))}`)
                }
                ttsWS.onclose = e => {
                    console.log(e)
                }
            })
        }


        // websocket发送数据
        webSocketSend() {
            console.log(modelDomain)
            var params = {
                "header": {
                    "app_id": this.appId, "uid": "fd3f47e4-d"
                }, "parameter": {
                    "chat": {
                        "domain": modelDomain, "temperature": 0.5, "max_tokens": 1024
                    }
                }, "payload": {
                    "message": {
                        "text": [
                            // {
                            //     "role": "user", "content": "中国第一个皇帝是谁？"
                            // }, {
                            //     "role": "assistant", "content": "秦始皇"
                            // }, {
                            //     "role": "user", "content": "秦始皇修的长城吗"
                            // }, {
                            //     "role": "assistant", "content": "是的"
                            // },
                            {
                                "role": "user", "content": message.value
                            }
                        ]
                    }
                }
            }
            console.log(JSON.stringify(params))
            this.ttsWS.send(JSON.stringify(params))
        }

        start() {
            total_res = ""; // 请空回答历史
            this.connectWebSocket()
        }

        stop() {
            total_res = ""; // 请空回答历史
            this.ttsWS.close();
        }

        // websocket接收数据的处理
        async result(resultData) {
            let jsonData = JSON.parse(resultData)
            console.log('jsonData ------------->', jsonData)
            total_res = total_res + jsonData.payload.choices.text[0].content;
            msgList.value[msgList.value.length - 1].content += jsonData.payload.choices.text[0].content;
            msgList.value[msgList.value.length - 1].contents.push(jsonData.payload.choices.text[0].content)
            console.log('msgList ------------->', msgList)
            // // 提问失败
            if (jsonData.header.code !== 0) {
                alert(`提问失败: ${jsonData.header.code}:${jsonData.header.message}`)
                console.error(`${jsonData.header.code}:${jsonData.header.message}`)
                return
            }
            if (jsonData.header.code === 0 && jsonData.header.status === 2) {
                msgList.value[msgList.value.length - 1].content = total_res
                this.ttsWS.close()
                bigModel.setStatus("init")
            }


            await nextTick();
            scrollbarRef.value!.setScrollTop(innerRef.value!.clientHeight)
        }
    }

    let bigModel = new TTSRecorder()
    bigModel.onWillStatusChange = function (oldStatus, status) {
        // 可以在这里进行页面中一些交互逻辑处理：按钮交互等
        // 按钮中的文字
        let btnState = {
            init: '立即提问', ttsing: '回答中...'
        }
        // $('.audio-ctrl-btn')
        //     .removeClass(oldStatus)
        //     .addClass(status)
        //     .text(btnState[status])
    }

    // $('.audio-ctrl-btn').click(function () {
    //     if (['init', 'endPlay', 'errorTTS'].indexOf(bigModel.status) > -1) {
    //         bigModel.start()
    //     }
    // })
    //
    // $("#input_text").on('input propertychange', function () {
    //     $('#input_text').text(this.value)
    //     // console.log($("#input_text").text())
    // });

</script>

<style lang="less" scoped>
    .title-out {
        border-bottom: 1px solid #2F80ED;
        height: 30px;

        // 标题样式
        .machine-title {
            position: absolute;
            top: -5px;
            left: 50%;
            transform: translateX(-50%);
            color: #2f80ed;
            font-family: "PingFang SC";
            font-size: 18px;
            font-style: normal;
            font-weight: 600;
        }

        .machine-title::after {
            content: '';
            border: 1px solid #2F80ED;
            width: 100%;
            position: absolute;
            left: 0px;
            bottom: -1px;
        }

        // 右上角关闭按钮样式
        .close-btn {
            position: absolute;
            top: -10px;
            right: 20px;
            background: #004EA2;
            z-index: 999;
            width: 28px;
            height: 28px;
            border-radius: 50%;
            cursor: pointer;

            img {
                width: 100%;
                height: 100%;
            }
        }
    }

    .chat-box {
        height: 65vh;
        position: relative;
        padding-bottom: 160px;
        padding-top: 36px;
        box-sizing: border-box;

        .msg-box {
            height: 100%;

            .msg-list {
                padding: 0 20px;

                .msg-item {
                    display: flex;
                    margin-bottom: 20px;

                    &-avatar {
                        width: 32px;
                        height: 32px;
                    }

                    &-content {
                        display: flex;
                        align-items: center;
                        width: auto;
                        max-width: 80%;
                        border-radius: 24px;
                        min-height: 44px;
                        padding: 12px 24px;
                        color: #fff;
                        line-height: 1.75;
                    }

                    &.from {
                        .msg-item-avatar {
                            margin-right: 8px;
                        }

                        .msg-item-content {
                            text-align: left;
                            border-top-left-radius: 0;
                            background: #1868FB;
                            box-shadow: 0 -1px 1px 0 #00000014, 0 2px 4px 0 #00000029, 0 0 1px 0 #0000003d;
                        }
                    }

                    &.to {
                        flex-direction: row-reverse;

                        .msg-item-avatar {
                            margin-left: 8px;
                        }

                        .msg-item-content {
                            text-align: left;
                            border-top-right-radius: 0;
                            background: #004EA2;
                            box-shadow: 0 -1px 1px 0 #00000014, 0 2px 4px 0 #00000029, 0 0 1px 0 #0000003d;
                            word-break: break-all !important;

                            .msg-item-content-text {
                                word-break: break-all !important;
                                flex-wrap: wrap;
                            }
                        }
                    }
                }

                // 头像右
                .to {
                    .msg-item-avatar {
                        .el-avatar--circle {
                            border-radius: 50%;
                            background: url('../../assets/imgsFigure/renwu.png');
                            background-size: 100% 100%;
                            z-index: 9999;
                        }
                    }
                }

                // 头像左
                .from {
                    .msg-item-avatar {
                        .el-avatar--circle {
                            border-radius: 50%;
                            background: url('../../assets/imgsFigure/jiqiren.png');
                            background-size: 100% 100%;
                            z-index: 9999;
                        }
                    }
                }

            }
        }

        .bottom-box {
            position: absolute;
            bottom: 0;
            width: 100%;
            min-height: 140px;
            margin-top: 20px;
            padding: 10px 10px 60px 10px;
            border: 1px solid #004EA2;
            border-radius: 8px;
            background-color: #fff;

            .input-box {

                .audio-btn {
                    position: absolute;
                    right: 12px;
                    top: 8px;
                    z-index: 10;
                    width: 26px;
                    height: 26px;
                    cursor: pointer;
                }
            }

            .send-btn {
                position: absolute;
                bottom: 6px;
                right: 6px;
                display: flex;
                justify-content: center;
                align-items: center;
                width: 84px;
                height: 42px;
                margin-left: 20px;
                border-radius: 1000px;
                background: #004EA2;
                line-height: 42px;
                text-align: center;
                color: #fff;
                font-size: 14px;
                font-weight: 700;
                cursor: pointer;
            }

            .audio-btn {
                position: absolute;
                bottom: 6px;
                right: 100px;
                display: flex;
                justify-content: right;
                align-items: center;
                width: 84px;
                height: 42px;

                &-item {
                    display: flex;
                    justify-content: right;
                    align-items: center;
                    margin-left: 10px;
                    cursor: pointer;
                }

                img {
                    display: block;
                    height: 36px;
                }
            }
        }
    }

    // 机器人
    .max-box {
        width: 93px;
        height: 163px;
        position: absolute;
        top: 95%;
        left: 48%;
        cursor: pointer;
        animation: rotateLeftRightJump 2s infinite linear;

        .header {
            width: 100%;
            height: 100%;
            cursor: move;
            background: url('../../assets/imgsFigure/Robot.png') no-repeat;
            background-size: 100% 100%;
            cursor: pointer;
        }

        // .content {
        //     min-height: 250px;
        //     border: 2px solid black;
        //     border-top: 0;
        //     padding: 10px;
        // }
    }

    // 给机器人添加动画
    @keyframes rotateLeftRightJump {
        0% {
            transform: rotateY(0deg) translateY(0);
        }

        50% {
            transform: rotateY(15deg) translateY(-15px);
        }

        100% {
            transform: rotateY(30deg) translateY(0);
        }
    }
</style>

<style lang="less">
    .chat-input {
        height: auto;

        .el-textarea__inner {
            border: none;
            box-shadow: none;
            min-height: 70px !important;
            resize: none;
        }

        .el-textarea__inner:focus,
        .el-textarea__inner:hover {
            box-shadow: none;

        }
    }

    // 外侧对话框的圆角
    .el-overlay {
        background: rgb(0 0 0 / 78%) !important;
    }

    // 外侧对话框的阴影
    .oe-dialog-btn {
        border-radius: 10px !important;
        box-shadow: 0 0 10px 5px gray !important;
    }
</style>
