const util = require('../../utils/util.js')

function getRandomColor() {
    let rgb = []
    for (let i = 0; i < 3; ++i) {
        let color = Math.floor(Math.random() * 256).toString(16)
        color = color.length == 1 ? '0' + color : color
        rgb.push(color)
    }
    return '#' + rgb.join('')
}
Page({
    data: {
        arr: [],
        scrollTop: 0,
        swipers: [
            'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
            'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
        ],
        swiperInterval: 2000,
        icons: ['success', 'success_no_circle', 'info', 'warn', 'waiting', 'cancel', 'download', 'search', 'clear'],
        hasSubmited: false,
        items: [{
                name: 'USA',
                value: '美国'
            },
            {
                name: 'CHN',
                value: '中国',
                checked: 'true'
            },
            {
                name: 'BRA',
                value: '巴西'
            },
            {
                name: 'JPN',
                value: '日本'
            },
        ],
        inputPlaceholder: 'color: #999; font-size: 30rpx;',
        array: ['美国', '中国', '巴西', '日本'],
        index: 0,
        multiArray: [
            ['无脊柱动物', '脊柱动物'],
            ['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物'],
            ['猪肉绦虫', '吸血虫']
        ],
        multiIndex: [0, 0, 0],
        radios: [{
                name: 'USA',
                value: '美国'
            },
            {
                name: 'CHN',
                value: '中国',
                checked: 'true'
            },
            {
                name: 'BRA',
                value: '巴西'
            },
            {
                name: 'JPN',
                value: '日本'
            },
        ],
        poster: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000',
        name: '此时此刻',
        author: '许巍',
        src: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46',
        danmuList: [{
                text: '第 1s 出现的弹幕',
                color: '#ff0000',
                time: 1
            },
            {
                text: '第 3s 出现的弹幕',
                color: '#ff00ff',
                time: 3
            }
        ],
        markers: [{
            iconPath: "../../res/tab_bar/home.png",
            id: 0,
            latitude: 23.099994,
            longitude: 113.324520,
            width: 50,
            height: 50,
            title: 'tttt',
            rotate: 45,
        }],
        polyline: [{
            points: [{
                longitude: 113.3245211,
                latitude: 23.10229
            }, {
                longitude: 113.324520,
                latitude: 23.21229
            }],
            color: "#FF0000DD",
            width: 2,
            dottedLine: true
        }],
        controls: [{
            id: 1,
            iconPath: '../../res/tab_bar/log.png',
            position: {
                left: 0,
                top: 300 - 50,
                width: 50,
                height: 50
            },
            clickable: true
        }],
        mapTude: {
            longitude: '',
            latitude: ''
        }
    },
    bottomHandler() {
        console.log('bottomHandler')
    },
    onLoad() {
        console.log('onload')
    },
    onShow() {
        console.log('onShow')
    },
    onReady() {
        console.log('onReady')
        let version = ''
        const VERSION = wx.getSystemInfoSync().SDKVersion
        if (util.compareVersion(VERSION, '1.6.0') < 0) {
            this.audioCtx = wx.createAudioContext('myAudio')
            console.log(this.audioCtx)
        } else {
            this.audioCtx = wx.createInnerAudioContext()
            this.audioCtx.src = this.data.src
        }
        this.videoContext = wx.createVideoContext('myVideo')
        this.setData({
            arr: ['a', 'b', 'c'],
            scrollTop: 50
        })
        // let url = 'https://api.douban.com/v2/movie/top250'
        let url = 'https://api.douban.com/v2/book/1220562'
        wx.request({
            url: url, //仅为示例，并非真实的接口地址
            data: {},
            header: {
                'content-type': 'application/json', // 默认值
            },
            success: function (res) {
                console.log('success')
                console.log(res.data)
            }
        })

        let context = wx.createCanvasContext('canvas', this)
        wx.chooseImage({
            success(res) {
                let img = res.tempFilePaths[0]
                context.drawImage(img, 0, 0,50,50)
                context.draw()
            }
        })
    },
    intervalChange(e) {
        this.setData({
            swiperInterval: e.detail.value
        })
    },
    formSubmit(e) {
        console.log(e.detail.value)
        this.setData({
            hasSubmited: true
        });
        setTimeout(() => {
            this.setData({
                hasSubmited: false
            });
        }, 1000)
    },
    formReset() {
        console.log('reset')
    },
    bindPickerChange(e) {
        console.log(e.detail.value)
        this.setData({
            index: e.detail.value
        })
    },
    bindMultiPickerChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            multiIndex: e.detail.value
        })
    },
    bindMultiPickerColumnChange: function (e) {
        console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
        var data = {
            multiArray: this.data.multiArray,
            multiIndex: this.data.multiIndex
        };
        data.multiIndex[e.detail.column] = e.detail.value;
        switch (e.detail.column) {
            case 0:
                switch (data.multiIndex[0]) {
                    case 0:
                        data.multiArray[1] = ['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物'];
                        data.multiArray[2] = ['猪肉绦虫', '吸血虫'];
                        break;
                    case 1:
                        data.multiArray[1] = ['鱼', '两栖动物', '爬行动物'];
                        data.multiArray[2] = ['鲫鱼', '带鱼'];
                        break;
                }
                data.multiIndex[1] = 0;
                data.multiIndex[2] = 0;
                break;
            case 1:
                switch (data.multiIndex[0]) {
                    case 0:
                        switch (data.multiIndex[1]) {
                            case 0:
                                data.multiArray[2] = ['猪肉绦虫', '吸血虫'];
                                break;
                            case 1:
                                data.multiArray[2] = ['蛔虫'];
                                break;
                            case 2:
                                data.multiArray[2] = ['蚂蚁', '蚂蟥'];
                                break;
                            case 3:
                                data.multiArray[2] = ['河蚌', '蜗牛', '蛞蝓'];
                                break;
                            case 4:
                                data.multiArray[2] = ['昆虫', '甲壳动物', '蛛形动物', '多足动物'];
                                break;
                        }
                        break;
                    case 1:
                        switch (data.multiIndex[1]) {
                            case 0:
                                data.multiArray[2] = ['鲫鱼', '带鱼'];
                                break;
                            case 1:
                                data.multiArray[2] = ['青蛙', '娃娃鱼'];
                                break;
                            case 2:
                                data.multiArray[2] = ['蜥蜴', '龟', '壁虎'];
                                break;
                        }
                        break;
                }
                data.multiIndex[2] = 0;
                console.log(data.multiIndex);
                break;
        }
        this.setData(data);
    },
    radioChange(e) {
        console.log(e.detail.value)
    },
    audioPlay: function () {
        this.audioCtx.play()
    },
    audioPause: function () {
        this.audioCtx.pause()
    },
    audio14: function () {
        this.audioCtx.seek(14)
    },
    audioStart: function () {
        this.audioCtx.seek(0)
    },
    bindInput: function (e) {
        this.inputValue = e.detail.value
    },
    bindButtonTap: function () {
        var that = this
        wx.chooseVideo({
            sourceType: ['album', 'camera'],
            maxDuration: 60,
            camera: ['front', 'back'],
            success: function (res) {
                that.setData({
                    src: res.tempFilePath
                })
            }
        })
    },
    bindSendDanmu: function () {
        this.videoContext.sendDanmu({
            text: this.inputValue,
            color: getRandomColor()
        })
    },
    regionchange(e) {
        console.log(e.type)
    },
    markertap(e) {
        console.log(e.markerId)
    },
    controltap(e) {
        console.log(e.controlId)
    },
    getLocation() {
        let that = this
        wx.getLocation({
            type: 'gcj02',
            success(res) {
                console.log(res)
                var latitude = res.latitude
                var longitude = res.longitude
                wx.openLocation({
                    latitude: latitude,
                    longitude: longitude,
                    scale: 28
                })
            }
        })
    }
})