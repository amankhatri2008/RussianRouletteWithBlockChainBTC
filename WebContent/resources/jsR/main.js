(function(b) {
    (jQuery.browser = jQuery.browser || {}).mobile = /android|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(ad|hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|tablet|treo|up\.(browser|link)|vodafone|wap|webos|windows (ce|phone)|xda|xiino/i.test(b) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.test(b.substr(0,
        4))
})(navigator.userAgent || navigator.vendor || window.opera);
$(window).resize(function() {
    sizeHandler()
});

function trace(b) {
    console.log(b)
}

function isIphone() {
    return -1 !== navigator.userAgent.toLowerCase().indexOf("iphone") ? !0 : !1
}
window.addEventListener("orientationchange", onOrientationChange);

function onOrientationChange() {
    window.matchMedia("(orientation: portrait)").matches && sizeHandler();
    window.matchMedia("(orientation: landscape)").matches && sizeHandler()
}

function sizeHandler() {
    window.scrollTo(0, 1);
    if ($("#canvas")) {
        var b = CANVAS_WIDTH,
            g = CANVAS_HEIGHT,
            f = window.innerWidth,
            a = window.innerHeight;
        _checkOrientation(f, a);
        multiplier = Math.min(a / g, f / b);
        b *= multiplier;
        g *= multiplier;
        s_oStage.canvas.width = b;
        s_oStage.canvas.height = g;
        $("#canvas").css("left", f / 2 - b / 2 + "px");
        s_oStage.scaleX = s_oStage.scaleY = Math.min(b / CANVAS_WIDTH, g / CANVAS_HEIGHT)
    }
}

function _checkOrientation(b, g) {
    s_bMobile && ENABLE_CHECK_ORIENTATION && (b > g ? "landscape" === $(".orientation-msg-container").attr("data-orientation") ? ($(".orientation-msg-container").css("display", "none"), s_oMain.startUpdate()) : ($(".orientation-msg-container").css("display", "block"), s_oMain.stopUpdate()) : "portrait" === $(".orientation-msg-container").attr("data-orientation") ? ($(".orientation-msg-container").css("display", "none"), s_oMain.startUpdate()) : ($(".orientation-msg-container").css("display", "block"),
        s_oMain.stopUpdate()))
}

function inIframe() {
    try {
        return window.self !== window.top
    } catch (b) {
        return !0
    }
}

function createBitmap(b, g, f) {
    var a = new createjs.Bitmap(b),
        d = new createjs.Shape;
    g && f ? d.graphics.beginFill("#fff").drawRect(0, 0, g, f) : d.graphics.beginFill("#ff0").drawRect(0, 0, b.width, b.height);
    a.hitArea = d;
    return a
}

function createSprite(b, g, f, a, d, c) {
    b = null !== g ? new createjs.Sprite(b, g) : new createjs.Sprite(b);
    g = new createjs.Shape;
    g.graphics.beginFill("#000000").drawRect(-f, -a, d, c);
    b.hitArea = g;
    return b
}

function randomFloatBetween(b, g, f) {
    "undefined" === typeof f && (f = 2);
    return parseFloat(Math.min(b + Math.random() * (g - b), g).toFixed(f))
}

function shuffle(b) {
    for (var g = b.length, f, a; 0 !== g;) a = Math.floor(Math.random() * g), --g, f = b[g], b[g] = b[a], b[a] = f;
    return b
}

function roundDecimal(b, g) {
    var f = Math.pow(10, g);
    return Math.round(f * b) / f
}

function tweenVectors(b, g, f, a) {
    a.x = b.x + f * (g.x - b.x);
    a.y = b.y + f * (g.y - b.y);
    return a
}

function easeInOutCubic(b, g, f, a) {
    return 1 > (b /= a / 2) ? f / 2 * b * b * b + g : f / 2 * ((b -= 2) * b * b + 2) + g
}

function formatTime(b) {
    b /= 1E3;
    var g = Math.floor(b / 60);
    b = parseFloat(b - 60 * g).toFixed(1);
    var f = "",
        f = 10 > g ? f + ("0" + g + ":") : f + (g + ":");
    return 10 > b ? f + ("0" + b) : f + b
}

function NoClickDelay(b) {
    this.element = b;
    window.Touch && this.element.addEventListener("touchstart", this, !1)
}
NoClickDelay.prototype = {
    handleEvent: function(b) {
        switch (b.type) {
            case "touchstart":
                this.onTouchStart(b);
                break;
            case "touchmove":
                this.onTouchMove(b);
                break;
            case "touchend":
                this.onTouchEnd(b)
        }
    },
    onTouchStart: function(b) {
        b.preventDefault();
        this.moved = !1;
        this.element.addEventListener("touchmove", this, !1);
        this.element.addEventListener("touchend", this, !1)
    },
    onTouchMove: function(b) {
        this.moved = !0
    },
    onTouchEnd: function(b) {
        this.element.removeEventListener("touchmove", this, !1);
        this.element.removeEventListener("touchend",
            this, !1);
        if (!this.moved) {
            b = document.elementFromPoint(b.changedTouches[0].clientX, b.changedTouches[0].clientY);
            3 === b.nodeType && (b = b.parentNode);
            var g = document.createEvent("MouseEvents");
            g.initEvent("click", !0, !0);
            b.dispatchEvent(g)
        }
    }
};

function ctlArcadeResume() {
    null !== s_oMain && s_oMain.startUpdate()
}

function ctlArcadePause() {
    null !== s_oMain && s_oMain.stopUpdate()
}

function getParamValue(b) {
    for (var g = window.location.search.substring(1).split("&"), f = 0; f < g.length; f++) {
        var a = g[f].split("=");
        if (a[0] == b) return a[1]
    }
}

function playSound(b, g, f) {
    return !1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile ? createjs.Sound.play(b, {
        loop: f,
        volume: g
    }) : null
}

function CSpriteLibrary() {
    var b, g, f, a, d, c;
    this.init = function(h, e, k) {
        f = g = 0;
        a = h;
        d = e;
        c = k;
        b = {}
    };
    this.addSprite = function(a, e) {
        b.hasOwnProperty(a) || (b[a] = {
            szPath: e,
            oSprite: new Image
        }, g++)
    };
    this.getSprite = function(a) {
        return b.hasOwnProperty(a) ? b[a].oSprite : null
    };
    this._onSpritesLoaded = function() {
        d.call(c)
    };
    this._onSpriteLoaded = function() {
        a.call(c);
        ++f === g && this._onSpritesLoaded()
    };
    this.loadSprites = function() {
        for (var a in b) b[a].oSprite.oSpriteLibrary = this, b[a].oSprite.onload = function() {
                this.oSpriteLibrary._onSpriteLoaded()
            },
            b[a].oSprite.onerror = function() {
                s_oMain.onImageLoadError($(this).attr("src"))
            }, b[a].oSprite.src = b[a].szPath
    };
    this.getNumSprites = function() {
        return g
    }
}
var CANVAS_WIDTH = 750,
    CANVAS_HEIGHT = 600,
    FPS_TIME = 1E3 / 24,
    DISABLE_SOUND_MOBILE = !1,
    STATE_LOADING = 0,
    STATE_MENU = 1,
    STATE_HELP = 1,
    STATE_GAME = 3,
    STATE_GAME_WAITING_FOR_BET = 0,
    STATE_GAME_SPINNING = 1,
    STATE_GAME_SHOW_WINNER = 2,
    STATE_DISTRIBUTE_FICHES = 3,
    ON_SHOW_BET_ON_TABLE = 0,
    ON_SHOW_ENLIGHT = 1,
    ON_HIDE_ENLIGHT = 2,
    ON_MOUSE_DOWN = 0,
    ON_MOUSE_UP = 1,
    ON_MOUSE_OVER = 2,
    ON_MOUSE_OUT = 3,
    ON_DRAG_START = 4,
    ON_DRAG_END = 5,
    COLOR_RED = "red",
    COLOR_BLACK = "black",
    COLOR_ZERO = "zero",
    TOTAL_MONEY, NUM_FICHE_VALUES = 6,
    NUMBERS_TO_BET = 37,
    NUM_FICHES = 6,
    MIN_BET, MAX_BET, WIN_OCCURRENCE, TIME_WAITING_BET, TIME_SPINNING = 3500,
    TIME_SHOW_WINNER, TIME_FICHES_MOV = 500,
    NUM_WHEEL_TOP_FRAMES = 200,
    NUM_MASK_BALL_SPIN_FRAMES = 200,
    NUM_BALL_SPIN_FRAMES = 400,
    NUM_HAND_FOR_ADS, FONT1 = "arialbold",
    FONT2 = "Digital-7",
    ENABLE_FULLSCREEN, ENABLE_CHECK_ORIENTATION;

function CRouletteSettings() {
    var b, g, f, a, d, c;
    this._init = function() {
        this._initAttachFiches();
        b = [.1, 1, 5, 10, 25, 100];
        f = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35];
        g = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
        a = [1, 77, 169, 12, 180, 99, 148, 34, 115, 55, 104, 126, 23, 137, 66, 191, 88, 158, 45, 185, 72, 174, 50, 110, 93, 164, 7, 142, 28, 39, 120, 61, 196, 83, 153, 17, 131];
        d = [
            []
        ];
        d[0][0] = 32;
        d[0][1] = 107;
        d[0][2] = 1;
        d[0][3] = 42;
        d[0][4] = 10;
        d[0][5] = 129;
        d[0][6] = 177;
        d[0][7] = 63;
        d[0][8] = 145;
        d[0][9] = 86;
        d[0][10] = 134;
        d[0][11] = 156;
        d[0][12] =
            53;
        d[0][13] = 167;
        d[0][14] = 97;
        d[0][15] = 21;
        d[0][16] = 118;
        d[0][17] = 188;
        d[0][18] = 75;
        d[0][19] = 15;
        d[0][20] = 102;
        d[0][21] = 4;
        d[0][22] = 80;
        d[0][23] = 140;
        d[0][24] = 124;
        d[0][25] = 192;
        d[0][26] = 36;
        d[0][27] = 172;
        d[0][28] = 58;
        d[0][29] = 69;
        d[0][30] = 151;
        d[0][31] = 91;
        d[0][32] = 26;
        d[0][33] = 113;
        d[0][34] = 183;
        d[0][35] = 47;
        d[0][36] = 161;
        d[1] = [];
        d[1][0] = 172;
        d[1][1] = 47;
        d[1][2] = 140;
        d[1][3] = 181;
        d[1][4] = 151;
        d[1][5] = 69;
        d[1][6] = 118;
        d[1][7] = 4;
        d[1][8] = 86;
        d[1][9] = 26;
        d[1][10] = 75;
        d[1][11] = 97;
        d[1][12] = 192;
        d[1][13] = 107;
        d[1][14] = 36;
        d[1][15] = 161;
        d[1][16] =
            58;
        d[1][17] = 129;
        d[1][18] = 15;
        d[1][19] = 156;
        d[1][20] = 42;
        d[1][21] = 144;
        d[1][22] = 20;
        d[1][23] = 80;
        d[1][24] = 63;
        d[1][25] = 134;
        d[1][26] = 177;
        d[1][27] = 113;
        d[1][28] = 0;
        d[1][29] = 9;
        d[1][30] = 91;
        d[1][31] = 31;
        d[1][32] = 167;
        d[1][33] = 53;
        d[1][34] = 124;
        d[1][35] = 188;
        d[1][36] = 102;
        d[2] = [];
        d[2][0] = 86;
        d[2][1] = 161;
        d[2][2] = 53;
        d[2][3] = 97;
        d[2][4] = 63;
        d[2][5] = 183;
        d[2][6] = 31;
        d[2][7] = 118;
        d[2][8] = 0;
        d[2][9] = 140;
        d[2][10] = 188;
        d[2][11] = 9;
        d[2][12] = 107;
        d[2][13] = 20;
        d[2][14] = 149;
        d[2][15] = 75;
        d[2][16] = 172;
        d[2][17] = 42;
        d[2][18] = 129;
        d[2][19] = 69;
        d[2][20] =
            156;
        d[2][21] = 58;
        d[2][22] = 134;
        d[2][23] = 194;
        d[2][24] = 177;
        d[2][25] = 47;
        d[2][26] = 91;
        d[2][27] = 26;
        d[2][28] = 113;
        d[2][29] = 124;
        d[2][30] = 4;
        d[2][31] = 144;
        d[2][32] = 80;
        d[2][33] = 167;
        d[2][34] = 36;
        d[2][35] = 102;
        d[2][36] = 15
    };
    this._initAttachFiches = function() {
        c = [];
        c.bet_0 = {
            x: 67,
            y: -54
        };
        c.bet_1 = {
            x: 68,
            y: -10
        };
        c.bet_2 = {
            x: 94,
            y: -36
        };
        c.bet_3 = {
            x: 118,
            y: -59
        };
        c.bet_4 = {
            x: 92,
            y: 7
        };
        c.bet_5 = {
            x: 118,
            y: -17
        };
        c.bet_6 = {
            x: 140,
            y: -42
        };
        c.bet_7 = {
            x: 116,
            y: 25
        };
        c.bet_8 = {
            x: 142,
            y: -2
        };
        c.bet_9 = {
            x: 165,
            y: -25
        };
        c.bet_10 = {
            x: 140,
            y: 40
        };
        c.bet_11 = {
            x: 164,
            y: 15
        };
        c.bet_12 = {
            x: 190,
            y: -8
        };
        c.bet_13 = {
            x: 165,
            y: 59
        };
        c.bet_14 = {
            x: 190,
            y: 34
        };
        c.bet_15 = {
            x: 215,
            y: 11
        };
        c.bet_16 = {
            x: 190,
            y: 80
        };
        c.bet_17 = {
            x: 216,
            y: 53
        };
        c.bet_18 = {
            x: 240,
            y: 28
        };
        c.bet_19 = {
            x: 217,
            y: 98
        };
        c.bet_20 = {
            x: 241,
            y: 72
        };
        c.bet_21 = {
            x: 266,
            y: 46
        };
        c.bet_22 = {
            x: 242,
            y: 118
        };
        c.bet_23 = {
            x: 265,
            y: 92
        };
        c.bet_24 = {
            x: 291,
            y: 64
        };
        c.bet_25 = {
            x: 268,
            y: 137
        };
        c.bet_26 = {
            x: 292,
            y: 110
        };
        c.bet_27 = {
            x: 316,
            y: 84
        };
        c.bet_28 = {
            x: 294,
            y: 156
        };
        c.bet_29 = {
            x: 318,
            y: 129
        };
        c.bet_30 = {
            x: 342,
            y: 102
        };
        c.bet_31 = {
            x: 319,
            y: 175
        };
        c.bet_32 = {
            x: 345,
            y: 149
        };
        c.bet_33 = {
            x: 369,
            y: 121
        };
        c.bet_34 = {
            x: 348,
            y: 197
        };
        c.bet_35 = {
            x: 373,
            y: 169
        };
        c.bet_36 = {
            x: 396,
            y: 141
        };
        c.bet_0_1 = {
            x: 59,
            y: -20
        };
        c.bet_0_2 = {
            x: 84,
            y: -43
        };
        c.bet_0_3 = {
            x: 109,
            y: -66
        };
        c.bet_1_4 = {
            x: 82,
            y: -1
        };
        c.bet_2_5 = {
            x: 106,
            y: -24
        };
        c.bet_3_6 = {
            x: 129,
            y: -49
        };
        c.bet_4_7 = {
            x: 106,
            y: 16
        };
        c.bet_5_8 = {
            x: 130,
            y: -6
        };
        c.bet_6_9 = {
            x: 154,
            y: -33
        };
        c.bet_7_10 = {
            x: 128,
            y: 35
        };
        c.bet_8_11 = {
            x: 155,
            y: 11
        };
        c.bet_9_12 = {
            x: 179,
            y: -16
        };
        c.bet_10_13 = {
            x: 153,
            y: 53
        };
        c.bet_11_14 = {
            x: 179,
            y: 29
        };
        c.bet_12_15 = {
            x: 203,
            y: 4
        };
        c.bet_13_16 = {
            x: 179,
            y: 71
        };
        c.bet_14_17 = {
            x: 201,
            y: 45
        };
        c.bet_15_18 = {
            x: 225,
            y: 21
        };
        c.bet_16_19 = {
            x: 203,
            y: 90
        };
        c.bet_17_20 = {
            x: 228,
            y: 64
        };
        c.bet_18_21 = {
            x: 252,
            y: 40
        };
        c.bet_19_22 = {
            x: 230,
            y: 109
        };
        c.bet_20_23 = {
            x: 252,
            y: 83
        };
        c.bet_21_24 = {
            x: 277,
            y: 57
        };
        c.bet_22_25 = {
            x: 255,
            y: 128
        };
        c.bet_23_26 = {
            x: 278,
            y: 102
        };
        c.bet_24_27 = {
            x: 302,
            y: 76
        };
        c.bet_25_28 = {
            x: 282,
            y: 148
        };
        c.bet_26_29 = {
            x: 306,
            y: 120
        };
        c.bet_27_30 = {
            x: 328,
            y: 94
        };
        c.bet_28_31 = {
            x: 309,
            y: 167
        };
        c.bet_29_32 = {
            x: 332,
            y: 140
        };
        c.bet_30_33 = {
            x: 354,
            y: 112
        };
        c.bet_31_34 = {
            x: 334,
            y: 188
        };
        c.bet_32_35 = {
            x: 358,
            y: 160
        };
        c.bet_33_36 = {
            x: 382,
            y: 132
        };
        c.bet_1_2 = {
            x: 81,
            y: -22
        };
        c.bet_2_3 = {
            x: 107,
            y: -46
        };
        c.bet_4_5 = {
            x: 105,
            y: -4
        };
        c.bet_5_6 = {
            x: 129,
            y: -30
        };
        c.bet_7_8 = {
            x: 127,
            y: 12
        };
        c.bet_8_9 = {
            x: 154,
            y: -12
        };
        c.bet_10_11 = {
            x: 153,
            y: 30
        };
        c.bet_11_12 = {
            x: 178,
            y: 5
        };
        c.bet_13_14 = {
            x: 178,
            y: 47
        };
        c.bet_14_15 = {
            x: 202,
            y: 22
        };
        c.bet_16_17 = {
            x: 203,
            y: 65
        };
        c.bet_17_18 = {
            x: 227,
            y: 40
        };
        c.bet_19_20 = {
            x: 230,
            y: 84
        };
        c.bet_20_21 = {
            x: 252,
            y: 59
        };
        c.bet_22_23 = {
            x: 256,
            y: 103
        };
        c.bet_23_24 = {
            x: 278,
            y: 77
        };
        c.bet_25_26 = {
            x: 281,
            y: 122
        };
        c.bet_26_27 = {
            x: 303,
            y: 96
        };
        c.bet_28_29 = {
            x: 307,
            y: 141
        };
        c.bet_29_30 = {
            x: 330,
            y: 115
        };
        c.bet_31_32 = {
            x: 333,
            y: 161
        };
        c.bet_32_33 = {
            x: 356,
            y: 135
        };
        c.bet_34_35 = {
            x: 359,
            y: 181
        };
        c.bet_35_36 = {
            x: 383,
            y: 154
        };
        c.bet_0_1_2 = {
            x: 69,
            y: -33
        };
        c.bet_0_2_3 = {
            x: 97,
            y: -58
        };
        c.bet_1_2_3 = {
            x: 57,
            y: 1
        };
        c.bet_4_5_6 = {
            x: 79,
            y: 19
        };
        c.bet_7_8_9 = {
            x: 105,
            y: 36
        };
        c.bet_10_11_12 = {
            x: 128,
            y: 55
        };
        c.bet_13_14_15 = {
            x: 153,
            y: 73
        };
        c.bet_16_17_18 = {
            x: 179,
            y: 93
        };
        c.bet_19_20_21 = {
            x: 205,
            y: 110
        };
        c.bet_22_23_24 = {
            x: 230,
            y: 129
        };
        c.bet_25_26_27 = {
            x: 257,
            y: 149
        };
        c.bet_28_29_30 = {
            x: 282,
            y: 169
        };
        c.bet_31_32_33 = {
            x: 307,
            y: 191
        };
        c.bet_34_35_36 = {
            x: 337,
            y: 210
        };
        c.bet_0_1_2_3 = {
            x: 43,
            y: -7
        };
        c.bet_1_2_4_5 = {
            x: 93,
            y: -15
        };
        c.bet_2_3_5_6 = {
            x: 119,
            y: -38
        };
        c.bet_4_5_7_8 = {
            x: 119,
            y: 3
        };
        c.bet_5_6_8_9 = {
            x: 143,
            y: -21
        };
        c.bet_7_8_10_11 = {
            x: 142,
            y: 20
        };
        c.bet_8_9_11_12 = {
            x: 167,
            y: -3
        };
        c.bet_10_11_13_14 = {
            x: 167,
            y: 38
        };
        c.bet_11_12_14_15 = {
            x: 191,
            y: 14
        };
        c.bet_13_14_16_17 = {
            x: 192,
            y: 57
        };
        c.bet_14_15_17_18 = {
            x: 216,
            y: 32
        };
        c.bet_16_17_19_20 = {
            x: 216,
            y: 76
        };
        c.bet_17_18_20_21 = {
            x: 240,
            y: 49
        };
        c.bet_19_20_22_23 = {
            x: 242,
            y: 95
        };
        c.bet_20_21_23_24 = {
            x: 266,
            y: 68
        };
        c.bet_22_23_25_26 = {
            x: 266,
            y: 114
        };
        c.bet_23_24_26_27 = {
            x: 292,
            y: 86
        };
        c.bet_25_26_28_29 = {
            x: 292,
            y: 133
        };
        c.bet_26_27_29_30 = {
            x: 318,
            y: 105
        };
        c.bet_28_29_31_32 = {
            x: 318,
            y: 153
        };
        c.bet_29_30_32_33 = {
            x: 345,
            y: 125
        };
        c.bet_31_32_34_35 = {
            x: 347,
            y: 172
        };
        c.bet_32_33_35_36 = {
            x: 372,
            y: 144
        };
        c.bet_1_2_3_4_5_6 = {
            x: 68,
            y: 8
        };
        c.bet_4_5_6_7_8_9 = {
            x: 93,
            y: 25
        };
        c.bet_7_8_9_10_11_12 = {
            x: 118,
            y: 43
        };
        c.bet_10_11_12_13_14_15 = {
            x: 142,
            y: 63
        };
        c.bet_13_14_15_16_17_18 = {
            x: 166,
            y: 80
        };
        c.bet_16_17_18_19_20_21 = {
            x: 192,
            y: 99
        };
        c.bet_19_20_21_22_23_24 = {
            x: 217,
            y: 118
        };
        c.bet_22_23_24_25_26_27 = {
            x: 244,
            y: 138
        };
        c.bet_25_26_27_28_29_30 = {
            x: 270,
            y: 158
        };
        c.bet_28_29_30_31_32_33 = {
            x: 297,
            y: 179
        };
        c.bet_31_32_33_34_35_36 = {
            x: 324,
            y: 200
        };
        c.col1 = {
            x: 375,
            y: 216
        };
        c.col2 = {
            x: 399,
            y: 187
        };
        c.col3 = {
            x: 423,
            y: 161
        };
        c.first12 = {
            x: 70,
            y: 45
        };
        c.second12 = {
            x: 170,
            y: 123
        };
        c.third12 = {
            x: 280,
            y: 203
        };
        c.first18 = {
            x: 8,
            y: 68
        };
        c.even = {
            x: 55,
            y: 104
        };
        c.black = {
            x: 107,
            y: 142
        };
        c.red = {
            x: 160,
            y: 185
        };
        c.odd = {
            x: 212,
            y: 225
        };
        c.second18 = {
            x: 263,
            y: 267
        };
        c.oDealerWin = {
            x: 105,
            y: -232
        };
        c.oReceiveWin = {
            x: 215,
            y: 428
        }
    };
    this.generateFichesPileByIndex = function(a) {
        var e = [],
            c, d = b.length - 1,
            g = b[d];
        do {
            c = a % g;
            c = roundDecimal(c, 1);
            a = Math.floor(a / g);
            for (var f = 0; f < a; f++) e.push(this.getFicheIndexByValue(g));
            d--;
            g = b[d];
            a = c
        } while (0 <
            c && -1 < d);
        return e
    };
    this.getNumbersForButton = function(a) {
        var b;
        switch (a) {
            case "col1":
                b = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34];
                break;
            case "col2":
                b = [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35];
                break;
            case "col3":
                b = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36];
                break;
            case "first12":
                b = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
                break;
            case "second12":
                b = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
                break;
            case "third12":
                b = [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36];
                break;
            case "first18":
                b = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
                break;
            case "second18":
                b = [19,
                    20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36
                ];
                break;
            case "even":
                b = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36];
                break;
            case "black":
                b = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35];
                break;
            case "red":
                b = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
                break;
            case "odd":
                b = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35];
                break;
            case "oBetVoisinsZero":
                b = [22, 18, 29, 7, 28, 12, 35, 3, 26, 0, 32, 15, 19, 4, 21, 2, 25];
                break;
            case "oBetTier":
                b = [27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33];
                break;
            case "oBetOrphelins":
                b = [1, 6, 9, 14, 17, 20, 31, 34]
        }
        return b
    };
    this.getBetMultiplierForButton = function(a) {
        var b;
        switch (a) {
            case "oBetFirstRow":
                b = 12;
                break;
            case "oBetSecondRow":
                b = 12;
                break;
            case "oBetThirdRow":
                b = 12;
                break;
            case "oBetFirst12":
                b = 12;
                break;
            case "oBetSecond12":
                b = 12;
                break;
            case "oBetThird12":
                b = 12;
                break;
            case "oBetFirst18":
                b = 18;
                break;
            case "oBetSecond18":
                b = 18;
                break;
            case "oBetEven":
                b = 18;
                break;
            case "oBetBlack":
                b = 18;
                break;
            case "oBetRed":
                b = 18;
                break;
            case "oBetOdd":
                b = 18;
                break;
            case "oBetVoisinsZero":
                b = 17;
                break;
            case "oBetTier":
                b = 12;
                break;
            case "oBetOrphelins":
                b = 8;
                break;
            case "oBetFinalsBet":
                b = 4
        }
        return b
    };
    this.getBetWinForButton = function(a) {
        var b;
        switch (a) {
            case "oBetFirstRow":
                b = 3;
                break;
            case "oBetSecondRow":
                b = 3;
                break;
            case "oBetThirdRow":
                b = 3;
                break;
            case "oBetFirst12":
                b = 3;
                break;
            case "oBetSecond12":
                b = 3;
                break;
            case "oBetThird12":
                b = 3;
                break;
            case "oBetFirst18":
                b = 2;
                break;
            case "oBetSecond18":
                b = 2;
                break;
            case "oBetEven":
                b = 2;
                break;
            case "oBetBlack":
                b = 2;
                break;
            case "oBetRed":
                b = 2;
                break;
            case "oBetOdd":
                b = 2;
                break;
            case "oBetVoisinsZero":
                b = 2;
                break;
            case "oBetTier":
                b =
                    3;
                break;
            case "oBetOrphelins":
                b = 4;
                break;
            case "oBetFinalsBet":
                b = 4
        }
        return b
    };
    this.getNumFichesPerBet = function(a) {
        var b;
        switch (a) {
            case "oBetVoisinsZero":
                b = 9;
                break;
            case "oBetTier":
                b = 6;
                break;
            case "oBetOrphelins":
                b = 5
        }
        return b
    };
    this.getFicheValues = function(a) {
        return b[a]
    };
    this.getFicheIndexByValue = function(a) {
        for (var c = 0, d = 0; d < b.length; d++)
            if (a === b[d]) {
                c = d;
                break
            }
        return c
    };
    this.getColorNumber = function(a) {
        var b;
        for (b = 0; b < f.length; b++)
            if (f[b] === a) return COLOR_BLACK;
        for (b = 0; b < g.length; b++)
            if (g[b] === a) return COLOR_RED;
        return COLOR_ZERO
    };
    this.getFrameForNumber = function(b) {
        return a[b]
    };
    this.getFrameForBallSpin = function(a, b) {
        return d[a][b]
    };
    this.getAttachOffset = function(a) {
        return c[a]
    };
    this._init()
}

function CFichesController(b) {
    var g, f, a, d, c, h;
    this._init = function(a) {
        h = a;
        this.reset()
    };
    this.reset = function() {
        this._removeAllFichesOnTable();
        g = [];
        f = [];
        a = [];
        d = [];
        c = []
    };
    this.setFicheOnTable = function(a, b, c) {
        this.addFicheOnTable(a, b, c);
        d.push({
            tag: "oBetSingle",
            num: 1
        })
    };
    this.addFicheOnTable = function(b, c, d) {
        void 0 === g[c] && (g[c] = 0);
        var e = s_oGameSettings.getFicheValues(b);
        g[c] += e;
        g[c] = roundDecimal(g[c], 1);
        e = s_oGameSettings.generateFichesPileByIndex(g[c]);
        e.sort(function(a, b) {
            return a - b
        });
        this._removeFichesPile(f[c]);
        f[c] = [];
        for (var k = s_oGameSettings.getAttachOffset(c), h = k.x, k = k.y, q = 0; q < e.length; q++) d.push(this._attachFichesPile(e[q], c, h, k)), k -= 5;
        a.push({
            index: c,
            value: b
        })
    };
    this._attachFichesPile = function(a, b, d, g) {
        a = new CFiche(d, g, a, h);
        f[b].push(a);
        c.push(a);
        return a
    };
    this.createPileForVoisinZero = function(a, b) {
        this.addFicheOnTable(a, "bet_0_2_3", b);
        this.addFicheOnTable(a, "bet_0_2_3", b);
        this.addFicheOnTable(a, "bet_4_7", b);
        this.addFicheOnTable(a, "bet_12_15", b);
        this.addFicheOnTable(a, "bet_18_21", b);
        this.addFicheOnTable(a,
            "bet_19_22", b);
        this.addFicheOnTable(a, "bet_25_26_28_29", b);
        this.addFicheOnTable(a, "bet_25_26_28_29", b);
        this.addFicheOnTable(a, "bet_32_35", b);
        d.push({
            tag: "oBetVoisinsZero",
            num: 9
        })
    };
    this.createPileForTier = function(a, b) {
        this.addFicheOnTable(a, "bet_5_8", b);
        this.addFicheOnTable(a, "bet_10_11", b);
        this.addFicheOnTable(a, "bet_13_16", b);
        this.addFicheOnTable(a, "bet_23_24", b);
        this.addFicheOnTable(a, "bet_27_30", b);
        this.addFicheOnTable(a, "bet_33_36", b);
        d.push({
            tag: "oBetTier",
            num: 6
        })
    };
    this.createPileForOrphelins =
        function(a, b) {
            this.addFicheOnTable(a, "bet_1", b);
            this.addFicheOnTable(a, "bet_6_9", b);
            this.addFicheOnTable(a, "bet_14_17", b);
            this.addFicheOnTable(a, "bet_17_20", b);
            this.addFicheOnTable(a, "bet_31_34", b);
            d.push({
                tag: "oBetOrphelins",
                num: 5
            })
        };
    this.createPileForMultipleNumbers = function(a, b, c) {
        for (var e = 0; e < b.length; e++) this.addFicheOnTable(a, "bet_" + b[e], c);
        d.push({
            tag: "oBetMultiple",
            num: b.length
        })
    };
    this._removeAllFichesOnTable = function() {
        if (c)
            for (var a = 0; a < c.length; a++) h.contains(c[a].getSprite()) && h.removeChild(c[a].getSprite())
    };
    this._removeFichesPile = function(a) {
        for (var b in a) h.removeChild(a[b].getSprite())
    };
    this.clearLastBet = function() {
        if (0 === d.length) return 0;
        for (var b = d.pop().num, c, h = 0; h < b; h++) {
            var m = a.pop();
            c = s_oGameSettings.getFicheValues(m.value);
            g[m.index] -= c;
            g[m.index] = roundDecimal(g[m.index], 1);
            var p = s_oGameSettings.generateFichesPileByIndex(g[m.index]);
            p.sort(function(a, b) {
                return a - b
            });
            this._removeFichesPile(f[m.index]);
            f[m.index] = [];
            for (var r = s_oGameSettings.getAttachOffset(m.index), v = r.x, r = r.y, n = 0; n < p.length; n++) this._attachFichesPile(p[n],
                m.index, v, r), r -= 5
        }
        return c * b
    };
    this.clearAllBets = function() {
        for (var b = a.length, c = 0; c < b; c++) this.clearLastBet()
    };
    this._init(b)
}
TEXT_GAMEOVER = "GAME OVER";
TEXT_CONGRATS = "CONGRATULATIONS";
TEXT_MONEY = "MONEY";
TEXT_PLAY = "PLAY";
TEXT_BET = "BET";
TEXT_COIN = "COIN";
TEXT_MAX_BET = "MAX BET";
TEXT_INFO = "INFO";
TEXT_LINES = "LINES";
TEXT_SPIN = "SPIN";
TEXT_EXIT = "EXIT";
TEXT_RECHARGE = "RECHARGE";
TEXT_CLEAR_LAST_BET = "CLEAR LAST BET";
TEXT_CLEAR_ALL_BET = "CLEAR ALL BETS";
TEXT_VOISINS_ZERO = "VOISINS DU ZERO";
TEXT_TIER = "TIER";
TEXT_ORPHELINS = "ORPHELINS";
TEXT_NEIGHBORS = "NEIGHBORS";
TEXT_FINALSBET = "FINALS BET";
TEXT_REBET = "REBET";
TEXT_WIN = "WIN";
TEXT_ERROR_NO_MONEY_MSG = "NOT ENOUGH MONEY FOR THIS BET!!";
TEXT_ERROR_MAX_BET_REACHED = "MAX BET REACHED!!";
TEXT_ERROR_MIN_BET = "YOU BET IS LOWER THAN MINIMUM BET!!";
TEXT_MIN_BET = "MIN BET";
TEXT_MAX_BET = "MAX BET";
TEXT_DISPLAY_MSG_WAITING_BET = "WAITING FOR\n YOUR BET";
TEXT_SPINNING = "SPINNING...";
TEXT_DISPLAY_MSG_PLAYER_WIN = "PLAYER WON ";
TEXT_DISPLAY_MSG_PLAYER_LOSE = "PLAYER LOSES";
TEXT_IMAGE_FAIL = "CAN'T FIND FILE:";
TEXT_NO_MONEY = "YOU DON'T HAVE ENOUGH MONEY!!!";
TEXT_RECHARGE_MSG = "PLEASE CLICK RECHARGE BUTTON TO PLAY AGAIN";
TEXT_CONGRATULATIONS = "Congratulations!";
TEXT_SHARE_1 = "You collected <strong>";
TEXT_SHARE_2 = " points</strong>!<br><br>Share your score with your friends!";
TEXT_SHARE_3 = "My score is ";
TEXT_SHARE_4 = " points! Can you do better?";

function CPreloader() {
    var b, g, f, a, d;
    this._init = function() {
        s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);
        s_oSpriteLibrary.addSprite("bg_menu", "/CSE545-SS-0.0.1-SNAPSHOT/resources/sprites/bg_menu.jpg");
        s_oSpriteLibrary.addSprite("progress_bar", "/CSE545-SS-0.0.1-SNAPSHOT/resources/sprites/progress_bar.png");
        s_oSpriteLibrary.loadSprites();
        d = new createjs.Container;
        s_oStage.addChild(d)
    };
    this.unload = function() {
        d.removeAllChildren()
    };
    this._onImagesLoaded = function() {};
    this._onAllImagesLoaded = function() {
        this.attachSprites();
        s_oMain.preloaderReady()
    };
    this.attachSprites = function() {
        var c = createBitmap(s_oSpriteLibrary.getSprite("bg_menu"));
        d.addChild(c);
        f = createBitmap(s_oSpriteLibrary.getSprite("progress_bar"));
        f.x = 100;
        f.y = CANVAS_HEIGHT - 40;
        d.addChild(f);
        b = 476;
        a = new createjs.Shape;
        a.graphics.beginFill("rgba(255,0,0,0.01)").drawRect(100, CANVAS_HEIGHT - 40, 1, 30);
        d.addChild(a);
        f.mask = a;
        g = new createjs.Text("0%", "30px " + FONT1, "#fff");
        g.x = 150;
        g.y = CANVAS_HEIGHT - 40;
        g.textAlign = "center";
        g.textBaseline = "middle";
        d.addChild(g)
    };
    this.refreshLoader = function(c) {
        g.text =
            c + "%";
        c = Math.floor(c * b / 100);
        a.graphics.clear();
        a.graphics.beginFill("rgba(255,0,0,0.01)").drawRect(100, CANVAS_HEIGHT - 40, c, 30)
    };
    this._init()
}

function CMain(b) {
    var g, f = 0,
        a = 0,
        d = STATE_LOADING,
        c, h, e;
    this.initContainer = function() {
        var a = document.getElementById("canvas");
        s_oStage = new createjs.Stage(a);
        createjs.Touch.enable(s_oStage);
        s_bMobile = jQuery.browser.mobile;
        !1 === s_bMobile && s_oStage.enableMouseOver(20);
        s_iPrevTime = (new Date).getTime();
        createjs.Ticker.setFPS(30);
        createjs.Ticker.addEventListener("tick", this._update);
        navigator.userAgent.match(/Windows Phone/i) && (DISABLE_SOUND_MOBILE = !0);
        s_oSpriteLibrary = new CSpriteLibrary;
        h = new CPreloader
    };
    this.soundLoaded = function() {
        f++;
        f === a && (h.unload(), this.gotoMenu())
    };
    this._initSounds = function() {
        createjs.Sound.initializeDefaultPlugins() && (0 < navigator.userAgent.indexOf("Opera") || 0 < navigator.userAgent.indexOf("OPR") ? (createjs.Sound.alternateExtensions = ["mp3"], createjs.Sound.addEventListener("fileload", createjs.proxy(this.soundLoaded, this)), createjs.Sound.registerSound("/CSE545-SS-0.0.1-SNAPSHOT/resources/sounds/chip.ogg", "chip"), createjs.Sound.registerSound("/CSE545-SS-0.0.1-SNAPSHOT/resources/sounds/click.ogg", "click"), createjs.Sound.registerSound("/CSE545-SS-0.0.1-SNAPSHOT/resources/sounds/fiche_collect.ogg",
            "fiche_collect"), createjs.Sound.registerSound("/CSE545-SS-0.0.1-SNAPSHOT/resources/sounds/fiche_select.ogg", "fiche_select"), createjs.Sound.registerSound("/CSE545-SS-0.0.1-SNAPSHOT/resources/sounds/wheel_sound.ogg", "wheel_sound")) : (createjs.Sound.alternateExtensions = ["ogg"], createjs.Sound.addEventListener("fileload", createjs.proxy(this.soundLoaded, this)), createjs.Sound.registerSound("/CSE545-SS-0.0.1-SNAPSHOT/resources/sounds/chip.mp3", "chip"), createjs.Sound.registerSound("/CSE545-SS-0.0.1-SNAPSHOT/resources/sounds/click.mp3", "click"), createjs.Sound.registerSound("/CSE545-SS-0.0.1-SNAPSHOT/resources/sounds/fiche_collect.mp3", "fiche_collect"), createjs.Sound.registerSound("/CSE545-SS-0.0.1-SNAPSHOT/resources/sounds/fiche_select.mp3",
            "fiche_select"), createjs.Sound.registerSound("/CSE545-SS-0.0.1-SNAPSHOT/resources/sounds/wheel_sound.mp3", "wheel_sound")), a += 5)
    };
    this._loadImages = function() {
        s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);
        s_oSpriteLibrary.addSprite("bg_menu", "/CSE545-SS-0.0.1-SNAPSHOT/resources/sprites/bg_menu.jpg");
        s_oSpriteLibrary.addSprite("but_bg", "/CSE545-SS-0.0.1-SNAPSHOT/resources/sprites/but_play_bg.png");
        s_oSpriteLibrary.addSprite("but_exit", "/CSE545-SS-0.0.1-SNAPSHOT/resources/sprites/but_exit.png");
        s_oSpriteLibrary.addSprite("bg_game", "/CSE545-SS-0.0.1-SNAPSHOT/resources/sprites/bg_game.jpg");
        s_oSpriteLibrary.addSprite("audio_icon", "/CSE545-SS-0.0.1-SNAPSHOT/resources/sprites/audio_icon.png");
        s_oSpriteLibrary.addSprite("block", "/CSE545-SS-0.0.1-SNAPSHOT/resources/sprites/block.png");
        s_oSpriteLibrary.addSprite("msg_box", "/CSE545-SS-0.0.1-SNAPSHOT/resources/sprites/msg_box.png");
        s_oSpriteLibrary.addSprite("display_bg", "/CSE545-SS-0.0.1-SNAPSHOT/resources/sprites/display_bg.png");
        s_oSpriteLibrary.addSprite("hit_area_bet0", "/CSE545-SS-0.0.1-SNAPSHOT/resources/sprites/hit_area_bet0.png");
        s_oSpriteLibrary.addSprite("hit_area_simple_bet", "/CSE545-SS-0.0.1-SNAPSHOT/resources/sprites/hit_area_simple_bet.png");
        s_oSpriteLibrary.addSprite("hit_area_couple_bet", "/CSE545-SS-0.0.1-SNAPSHOT/resources/sprites/hit_area_couple_bet.png");
        s_oSpriteLibrary.addSprite("hit_area_small_circle", "/CSE545-SS-0.0.1-SNAPSHOT/resources/sprites/hit_area_small_circle.png");
        s_oSpriteLibrary.addSprite("hit_area_triple_bet", "/CSE545-SS-0.0.1-SNAPSHOT/resources/sprites/hit_area_triple_bet.png");
        s_oSpriteLibrary.addSprite("hit_area_col_bet", "/CSE545-SS-0.0.1-SNAPSHOT/resources/sprites/hit_area_col_bet.png");
        s_oSpriteLibrary.addSprite("hit_area_twelve_bet", "/CSE545-SS-0.0.1-SNAPSHOT/resources/sprites/hit_area_twelve_bet.png");
        s_oSpriteLibrary.addSprite("hit_area_other_bet", "/CSE545-SS-0.0.1-SNAPSHOT/resources/sprites/hit_area_other_bet.png");
        s_oSpriteLibrary.addSprite("enlight_bet0", "/CSE545-SS-0.0.1-SNAPSHOT/resources/sprites/enlight_bet0.png");
        s_oSpriteLibrary.addSprite("enlight_black", "/CSE545-SS-0.0.1-SNAPSHOT/resources/sprites/enlight_black.png");
        s_oSpriteLibrary.addSprite("enlight_first18",
            "/CSE545-SS-0.0.1-SNAPSHOT/resources/sprites/enlight_first18.png");
        s_oSpriteLibrary.addSprite("enlight_first_twelve", "/CSE545-SS-0.0.1-SNAPSHOT/resources/sprites/enlight_first_twelve.png");
        s_oSpriteLibrary.addSprite("enlight_second_twelve", "/CSE545-SS-0.0.1-SNAPSHOT/resources/sprites/enlight_second_twelve.png");
        s_oSpriteLibrary.addSprite("enlight_third_twelve", "/CSE545-SS-0.0.1-SNAPSHOT/resources/sprites/enlight_third_twelve.png");
        s_oSpriteLibrary.addSprite("enlight_second18", "/CSE545-SS-0.0.1-SNAPSHOT/resources/sprites/enlight_second18.png");
        s_oSpriteLibrary.addSprite("enlight_number1", "/CSE545-SS-0.0.1-SNAPSHOT/resources/sprites/enlight_number1.png");
        s_oSpriteLibrary.addSprite("enlight_number3",
            "/CSE545-SS-0.0.1-SNAPSHOT/resources/sprites/enlight_number3.png");
        s_oSpriteLibrary.addSprite("enlight_number4", "/CSE545-SS-0.0.1-SNAPSHOT/resources/sprites/enlight_number4.png");
        s_oSpriteLibrary.addSprite("enlight_number12", "/CSE545-SS-0.0.1-SNAPSHOT/resources/sprites/enlight_number12.png");
        s_oSpriteLibrary.addSprite("enlight_number16", "/CSE545-SS-0.0.1-SNAPSHOT/resources/sprites/enlight_number16.png");
        s_oSpriteLibrary.addSprite("enlight_number25", "/CSE545-SS-0.0.1-SNAPSHOT/resources/sprites/enlight_number25.png");
        s_oSpriteLibrary.addSprite("enlight_number30", "/CSE545-SS-0.0.1-SNAPSHOT/resources/sprites/enlight_number30.png");
        s_oSpriteLibrary.addSprite("enlight_odd", "/CSE545-SS-0.0.1-SNAPSHOT/resources/sprites/enlight_odd.png");
        s_oSpriteLibrary.addSprite("enlight_red", "/CSE545-SS-0.0.1-SNAPSHOT/resources/sprites/enlight_red.png");
        s_oSpriteLibrary.addSprite("enlight_col", "/CSE545-SS-0.0.1-SNAPSHOT/resources/sprites/enlight_col.png");
        s_oSpriteLibrary.addSprite("select_fiche", "/CSE545-SS-0.0.1-SNAPSHOT/resources/sprites/select_fiche.png");
        s_oSpriteLibrary.addSprite("roulette_anim_bg", "/CSE545-SS-0.0.1-SNAPSHOT/resources/sprites/roulette_anim_bg.png");
        s_oSpriteLibrary.addSprite("ball_spin", "/CSE545-SS-0.0.1-SNAPSHOT/resources/sprites/ball_spin.png");
        s_oSpriteLibrary.addSprite("spin_but", "/CSE545-SS-0.0.1-SNAPSHOT/resources/sprites/spin_but.png");
        s_oSpriteLibrary.addSprite("placeholder", "/CSE545-SS-0.0.1-SNAPSHOT/resources/sprites/placeholder.png");
        s_oSpriteLibrary.addSprite("but_game_bg",
            "/CSE545-SS-0.0.1-SNAPSHOT/resources/sprites/but_game_bg.png");
        s_oSpriteLibrary.addSprite("circle_red", "/CSE545-SS-0.0.1-SNAPSHOT/resources/sprites/circle_red.png");
        s_oSpriteLibrary.addSprite("circle_green", "/CSE545-SS-0.0.1-SNAPSHOT/resources/sprites/circle_green.png");
        s_oSpriteLibrary.addSprite("circle_black", "/CSE545-SS-0.0.1-SNAPSHOT/resources/sprites/circle_black.png");
        s_oSpriteLibrary.addSprite("final_bet_bg", "/CSE545-SS-0.0.1-SNAPSHOT/resources/sprites/final_bet_bg.png");
        s_oSpriteLibrary.addSprite("neighbor_bg", "/CSE545-SS-0.0.1-SNAPSHOT/resources/sprites/neighbor_bg.jpg");
        s_oSpriteLibrary.addSprite("neighbor_enlight", "/CSE545-SS-0.0.1-SNAPSHOT/resources/sprites/neighbor_enlight.png");
        s_oSpriteLibrary.addSprite("hitarea_neighbor",
            "/CSE545-SS-0.0.1-SNAPSHOT/resources/sprites/hitarea_neighbor.png");
        s_oSpriteLibrary.addSprite("game_over_bg", "/CSE545-SS-0.0.1-SNAPSHOT/resources/sprites/game_over_bg.jpg");
        s_oSpriteLibrary.addSprite("but_game_small", "/CSE545-SS-0.0.1-SNAPSHOT/resources/sprites/but_game_small.png");
        s_oSpriteLibrary.addSprite("but_fullscreen", "/CSE545-SS-0.0.1-SNAPSHOT/resources/sprites/but_fullscreen.png");
        for (var b = 0; b < NUM_FICHES; b++) s_oSpriteLibrary.addSprite("fiche_" + b, "/CSE545-SS-0.0.1-SNAPSHOT/resources/sprites/fiche_" + b + ".png");
        for (b = 0; b < NUM_MASK_BALL_SPIN_FRAMES; b++) s_oSpriteLibrary.addSprite("mask_ball_spin_" + b, "/CSE545-SS-0.0.1-SNAPSHOT/resources/sprites/mask_ball_spin/mask_ball_spin_" + b + ".png");
        for (b = 0; b <
            NUM_MASK_BALL_SPIN_FRAMES; b++) s_oSpriteLibrary.addSprite("wheel_anim_" + b, "/CSE545-SS-0.0.1-SNAPSHOT/resources/sprites/wheel_anim/wheel_anim_" + b + ".jpg");
        for (b = 0; b < NUM_WHEEL_TOP_FRAMES; b++) s_oSpriteLibrary.addSprite("wheel_top_" + b, "/CSE545-SS-0.0.1-SNAPSHOT/resources/sprites/wheel_top/wheel_top_" + b + ".jpg");
        for (b = 0; b < NUM_BALL_SPIN_FRAMES; b++) s_oSpriteLibrary.addSprite("ball_spin1_" + b, "/CSE545-SS-0.0.1-SNAPSHOT/resources/sprites/ball_spin1/ball_spin1_" + b + ".png"), s_oSpriteLibrary.addSprite("ball_spin2_" + b, "/CSE545-SS-0.0.1-SNAPSHOT/resources/sprites/ball_spin2/ball_spin2_" + b + ".png"), s_oSpriteLibrary.addSprite("ball_spin3_" + b, "/CSE545-SS-0.0.1-SNAPSHOT/resources/sprites/ball_spin3/ball_spin3_" +
            b + ".png");
        a += s_oSpriteLibrary.getNumSprites();
        s_oSpriteLibrary.loadSprites()
    };
    this._onImagesLoaded = function() {
        f++;
        h.refreshLoader(Math.floor(f / a * 100));
        f === a && (h.unload(), this.gotoMenu())
    };
    this._onAllImagesLoaded = function() {};
    this.onAllPreloaderImagesLoaded = function() {
        this._loadImages()
    };
    this.onImageLoadError = function(a) {};
    this.preloaderReady = function() {
        this._loadImages();
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || this._initSounds();
        g = !0
    };
    this.gotoMenu = function() {
        new CMenu;
        d = STATE_MENU
    };
    this.gotoGame =
        function() {
            e = new CGame(c);
            d = STATE_GAME
        };
    this.gotoHelp = function() {
        new CHelp;
        d = STATE_HELP
    };
    this.stopUpdate = function() {
        g = !1;
        createjs.Ticker.paused = !0;
        $("#block_game").css("display", "block");
        createjs.Sound.setMute(!0)
    };
    this.startUpdate = function() {
        s_iPrevTime = (new Date).getTime();
        g = !0;
        createjs.Ticker.paused = !1;
        $("#block_game").css("display", "none");
        s_bAudioActive && createjs.Sound.setMute(!1)
    };
    this._update = function(a) {
        if (!1 !== g) {
            var b = (new Date).getTime();
            s_iTimeElaps = b - s_iPrevTime;
            s_iCntTime += s_iTimeElaps;
            s_iCntFps++;
            s_iPrevTime = b;
            1E3 <= s_iCntTime && (s_iCurFps = s_iCntFps, s_iCntTime -= 1E3, s_iCntFps = 0);
            d === STATE_GAME && e.update();
            s_oStage.update(a)
        }
    };
    s_oMain = this;
    c = b;
    ENABLE_CHECK_ORIENTATION = b.check_orientation;
    this.initContainer()
}
var s_bMobile, s_bAudioActive = !0,
    s_iCntTime = 0,
    s_iTimeElaps = 0,
    s_iPrevTime = 0,
    s_iCntFps = 0,
    s_iCurFps = 0,
    s_oDrawLayer, s_oStage, s_oMain = null,
    s_oSpriteLibrary, s_bFullscreen = !1;

function CTextButton(b, g, f, a, d, c, h, e) {
    var k, q, m, p, r, v, n, l, t, w;
    this._init = function(a, b, c, d, e, g, f, h) {
        k = !1;
        p = [];
        r = [];
        w = createBitmap(c);
        q = c.width;
        m = c.height;
        var x = Math.ceil(f / 20);
        l = new createjs.Text(d, f + "px " + e, "#000000");
        var v = l.getBounds();
        l.textAlign = "center";
        l.textBaseline = "alphabetic";
        l.x = c.width / 2 + x;
        l.y = Math.floor(c.height / 2) + v.height / 3 + x;
        t = new createjs.Text(d, f + "px " + e, g);
        t.textAlign = "center";
        t.textBaseline = "alphabetic";
        t.x = c.width / 2;
        t.y = Math.floor(c.height / 2) + v.height / 3;
        n = new createjs.Container;
		
        n.x = a;
        n.y = b;
		n.name=a+'_'+b;
        n.regX = c.width / 2;
        n.regY = c.height / 2;
        s_bMobile || (n.cursor = "pointer");
        n.addChild(w, l, t);
		
	
        !1 !== h && s_oStage.addChild(n);
		
        this._initListener()
    };
    this.unload = function() {
        n.off("mousedown");
        n.off("pressup");
        s_oStage.removeChild(n)
    };
    this.setVisible = function(a) {
        n.visible = a
    };
    this.enable = function() {
        k = !1;
        w.filters = [];
        w.cache(0, 0, q, m)
    };
    this.disable = function() {
        k = !0;
        var a = (new createjs.ColorMatrix).adjustSaturation(-100).adjustBrightness(40);
        w.filters = [new createjs.ColorMatrixFilter(a)];
        w.cache(0, 0, q, m)
    };
    this._initListener = function() {
        n.on("mousedown", this.buttonDown);
        n.on("pressup", this.buttonRelease)
    };
    this.addEventListener = function(a, b, c) {
        p[a] = b;
        r[a] = c
    };
    this.addEventListenerWithParams = function(a, b, c, d) {
        p[a] = b;
        r[a] = c;
        v = d
    };
    this.buttonRelease = function() {
        k || (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || createjs.Sound.play("click"), n.scaleX = 1, n.scaleY = 1, p[ON_MOUSE_UP] && p[ON_MOUSE_UP].call(r[ON_MOUSE_UP], v))
    };
    this.buttonDown = function() {
        k || (n.scaleX = .9, n.scaleY = .9, p[ON_MOUSE_DOWN] && p[ON_MOUSE_DOWN].call(r[ON_MOUSE_DOWN]))
    };
    this.setPosition = function(a, b) {
        n.x = a;
        n.y = b
    };
    this.changeText = function(a) {
        t.text = a;
        l.text = a;
		
    };
    this.setX = function(a) {
        n.x = a
    };
    this.setY = function(a) {
        n.y = a
    };
    this.getButtonImage = function() {
        return n
    };
    this.getX = function() {
        return n.x
    };
    this.getY = function() {
        return n.y
    };
    this.getSprite = function() {
        return n
    };
    this._init(b, g, f, a, d, c, h, e);
    return this
}

function CGfxButton(b, g, f, a) {
    var d, c, h, e;
    this._init = function(a, b, g, f) {
        d = [];
        c = [];
        e = createBitmap(g);
        e.x = a;
        e.y = b;
        e.regX = g.width / 2;
        e.regY = g.height / 2;
        s_bMobile || (e.cursor = "pointer");
        !1 !== f && s_oStage.addChild(e);
        this._initListener()
    };
    this.unload = function() {
        e.off("mousedown", this.buttonDown);
        e.off("pressup", this.buttonRelease);
        !1 === s_bMobile && (e.off("rollover", this.mouseOver), e.off("rollout", this.mouseOut));
        s_oStage.removeChild(e)
    };
    this.setVisible = function(a) {
        e.visible = a
    };
    this._initListener = function() {
        e.on("mousedown",
            this.buttonDown);
        e.on("pressup", this.buttonRelease);
        !1 === s_bMobile && (e.on("rollover", this.mouseOver), e.on("rollout", this.mouseOut))
    };
    this.addEventListener = function(a, b, e) {
        d[a] = b;
        c[a] = e
    };
    this.addEventListenerWithParams = function(a, b, e, g) {
        d[a] = b;
        c[a] = e;
        h = g
    };
    this.buttonRelease = function() {
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || createjs.Sound.play("click");
        e.scaleX = 1;
        e.scaleY = 1;
        d[ON_MOUSE_UP] && d[ON_MOUSE_UP].call(c[ON_MOUSE_UP], h)
    };
    this.buttonDown = function() {
        e.scaleX = .9;
        e.scaleY = .9;
        d[ON_MOUSE_DOWN] &&
            d[ON_MOUSE_DOWN].call(c[ON_MOUSE_DOWN], h)
    };
    this.mouseOver = function() {
        d[ON_MOUSE_OVER] && d[ON_MOUSE_OVER].call(c[ON_MOUSE_OVER], h)
    };
    this.mouseOut = function() {
        d[ON_MOUSE_OUT] && d[ON_MOUSE_OUT].call(c[ON_MOUSE_OUT], h)
    };
    this.setPosition = function(a, b) {
        e.x = a;
        e.y = b
    };
    this.rotate = function(a) {
        e.rotation = a
    };
    this.setX = function(a) {
        e.x = a
    };
    this.setY = function(a) {
        e.y = a
    };
    this.getButtonImage = function() {
        return e
    };
    this.getX = function() {
        return e.x
    };
    this.getY = function() {
        return e.y
    };
    this._init(b, g, f, a);
    return this
}

function CFicheBut(b, g, f) {
    var a, d, c, h, e, k, q = [],
        m, p, r;
    this._init = function(b, g, f) {
        d = !1;
        p = new createjs.Container;
        s_oStage.addChild(p);
        a = !1;
        e = [];
        k = [];
        m = createBitmap(f);
        m.x = b;
        m.y = g;
        m.regX = f.width / 2;
        m.regY = f.height / 2;
        s_bMobile || (m.cursor = "pointer");
        p.addChild(m);
        c = f.width;
        h = f.height;
        f = s_oSpriteLibrary.getSprite("select_fiche");
        r = createBitmap(f);
        r.x = b;
        r.y = g - 2;
        r.regX = f.width / 2;
        r.regY = f.height / 2;
        p.addChild(r);
        r.visible = a;
        this._initListener()
    };
    this.unload = function() {
        m.off("mousedown", this.buttonDown);
        m.off("pressup",
            this.buttonRelease);
        s_oStage.removeChild(p)
    };
    this.select = function() {
        a = !0;
        r.visible = a
    };
    this.deselect = function() {
        a = !1;
        r.visible = a
    };
    this.enable = function() {
        d = !1;
        m.filters = [];
        m.cache(0, 0, c, h)
    };
    this.disable = function() {
        d = !0;
        var a = (new createjs.ColorMatrix).adjustSaturation(-90);
        m.filters = [new createjs.ColorMatrixFilter(a)];
        m.cache(0, 0, c, h)
    };
    this.setVisible = function(a) {
        m.visible = a
    };
    this._initListener = function() {
        m.on("mousedown", this.buttonDown);
        m.on("pressup", this.buttonRelease)
    };
    this.addEventListener = function(a,
        b, c) {
        e[a] = b;
        k[a] = c
    };
    this.addEventListenerWithParams = function(a, b, c, d) {
        e[a] = b;
        k[a] = c;
        q = d
    };
    this.buttonRelease = function() {
        d || (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || createjs.Sound.play("press_but"), m.scaleX = 1, m.scaleY = 1, e[ON_MOUSE_UP] && e[ON_MOUSE_UP].call(k[ON_MOUSE_UP], q), a = !a, r.visible = a)
    };
    this.buttonDown = function() {
        d || (m.scaleX = .9, m.scaleY = .9, e[ON_MOUSE_DOWN] && e[ON_MOUSE_DOWN].call(k[ON_MOUSE_DOWN], q))
    };
    this.setPosition = function(a, b) {
        m.x = a;
        m.y = b
    };
    this.setX = function(a) {
        m.x = a
    };
    this.setY = function(a) {
        m.y =
            a
    };
    this.getButtonImage = function() {
        return m
    };
    this.getX = function() {
        return m.x
    };
    this.getY = function() {
        return m.y
    };
    this._init(b, g, f)
}

function CBetTableButton(b, g, f, a, d, c) {
    var h, e, k, q, m, p, r, v, n;
    this._init = function(a, b, c, d, f, g) {
        h = g;
        r = d;
        e = [];
        k = [];
        n = f;
        q = createBitmap(c);
        q.x = a;
        q.y = b;
        q.regX = c.width / 2;
        q.regY = c.height / 2;
        s_bMobile || (q.cursor = "pointer");
        this._initListener();
        n.addChild(q);
        v = [];
        v = r.split("_");
        1 < v.length ? v.splice(0, 1) : this._assignNumber();
        this._assignBetMultiplier()
    };
    this.unload = function() {
        q.off("mousedown", this.buttonDown);
        q.off("pressup", this.buttonRelease);
        q.off("rollover", this.mouseOver);
        q.off("rollout", this.mouseOut);
        n.removeChild(q)
    };
    this.setVisible = function(a) {
        q.visible = a
    };
    this._assignNumber = function() {
        v = s_oGameSettings.getNumbersForButton(r)
    };
    this._assignBetMultiplier = function() {
        switch (v.length) {
            case 0:
                m = s_oGameSettings.getBetMultiplierForButton(r);
                p = s_oGameSettings.getBetWinForButton(r);
                break;
            default:
                m = v.length, p = Math.floor(36 / v.length)
        }
    };
    this._initListener = function() {
        q.on("mousedown", this.buttonDown);
        q.on("pressup", this.buttonRelease);
        q.on("rollover", this.mouseOver);
        q.on("rollout", this.mouseOut)
    };
    this.addEventListener = function(a,
        b, c) {
        e[a] = b;
        k[a] = c
    };
    this.addEventListenerWithParams = function(a, b, c, d) {
        e[a] = b;
        k[a] = c
    };
    this.buttonRelease = function() {
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || createjs.Sound.play("press_but");
        e[ON_MOUSE_UP] && e[ON_MOUSE_UP].call(k[ON_MOUSE_UP], {
            numbers: v,
            bet_mult: m,
            bet_win: p,
            name: r,
            num_fiches: 1
        }, !1)
    };
    this.buttonDown = function() {
        e[ON_MOUSE_DOWN] && e[ON_MOUSE_DOWN].call(k[ON_MOUSE_DOWN], {
            button: r,
            numbers: v,
            bet_mult: m,
            bet_win: p,
            num_fiches: 1
        }, !1)
    };
    this.mouseOver = function() {
        e[ON_MOUSE_OVER] && (h ? e[ON_MOUSE_OVER].call(k[ON_MOUSE_OVER], {
            numbers: v,
            enlight: r
        }) : e[ON_MOUSE_OVER].call(k[ON_MOUSE_OVER], {
            numbers: v
        }))
    };
    this.mouseOut = function() {
        e[ON_MOUSE_OUT] && (h ? e[ON_MOUSE_OUT].call(k[ON_MOUSE_OUT], {
            numbers: v,
            enlight: r
        }) : e[ON_MOUSE_OUT].call(k[ON_MOUSE_OUT], {
            numbers: v
        }))
    };
    this.setPosition = function(a, b) {
        q.x = a;
        q.y = b
    };
    this.setX = function(a) {
        q.x = a
    };
    this.setY = function(a) {
        q.y = a
    };
    this.rotate = function(a) {
        q.rotation = a
    };
    this.getButtonImage = function() {
        return q
    };
    this.getX = function() {
        return q.x
    };
    this.getY = function() {
        return q.y
    };
    this._init(b, g, f, a, d,
        c)
}

function CBetTextButton(b, g, f, a, d, c, h, e) {
    var k, q, m, p, r, v, n, l, t, w, y, u, z, x;
    this._init = function(a, b, c, d, e, f, g, h) {
        k = !1;
        t = [];
        w = [];
        x = createBitmap(c);
        q = c.width;
        m = c.height;
        var C = Math.ceil(g / 20);
        u = new createjs.Text(d, g + "px " + e, "#000000");
        u.textAlign = "center";
        var J = u.getBounds();
        u.x = c.width / 2 + C;
        u.y = (c.height - J.height) / 2 + C;
        z = new createjs.Text(d, g + "px " + e, f);
        z.textAlign = "center";
        J = z.getBounds();
        z.x = c.width / 2;
        z.y = (c.height - J.height) / 2;
        y = new createjs.Container;
        y.x = a;
        y.y = b;
        y.regX = c.width / 2;
        y.regY = c.height / 2;
        s_bMobile ||
            (y.cursor = "pointer");
        y.addChild(x, u, z);
        s_oStage.addChild(y);
        this._initListener();
        n = h;
        l = [];
        l = h.split("_");
        1 < l.length ? l.splice(0, 1) : this._assignNumber(h);
        p = s_oGameSettings.getBetMultiplierForButton(h);
        r = s_oGameSettings.getBetWinForButton(h);
        v = s_oGameSettings.getNumFichesPerBet(h)
    };
    this._assignNumber = function(a) {
        l = s_oGameSettings.getNumbersForButton(a)
    };
    this.unload = function() {
        y.off("mousedown");
        y.off("pressup");
        s_oStage.removeChild(y)
    };
    this.setVisible = function(a) {
        y.visible = a
    };
    this.enable = function() {
        k = !1;
        x.filters = [];
        x.cache(0, 0, q, m)
    };
    this.disable = function() {
        k = !0;
        var a = (new createjs.ColorMatrix).adjustSaturation(-100).adjustBrightness(40);
        x.filters = [new createjs.ColorMatrixFilter(a)];
        x.cache(0, 0, q, m)
    };
    this._initListener = function() {
        oParent = this;
        y.on("mousedown", this.buttonDown);
        y.on("pressup", this.buttonRelease)
    };
    this.addEventListener = function(a, b, c) {
        t[a] = b;
        w[a] = c
    };
    this.buttonRelease = function() {
        k || (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || createjs.Sound.play("press_but"), y.scaleX = 1, y.scaleY = 1,
            t[ON_MOUSE_UP] && t[ON_MOUSE_UP].call(w[ON_MOUSE_UP], {
                name: n,
                numbers: l,
                bet_mult: p,
                bet_win: r,
                num_fiches: v
            }, !1))
    };
    this.buttonDown = function() {
        k || (y.scaleX = .9, y.scaleY = .9, t[ON_MOUSE_DOWN] && t[ON_MOUSE_DOWN].call(w[ON_MOUSE_DOWN]))
    };
    this.setPosition = function(a, b) {
        y.x = a;
        y.y = b
    };
    this.changeText = function(a) {
        z.text = a;
        u.text = a
    };
    this.setX = function(a) {
        y.x = a
    };
    this.setY = function(a) {
        y.y = a
    };
    this.getButtonImage = function() {
        return y
    };
    this.getX = function() {
        return y.x
    };
    this.getY = function() {
        return y.y
    };
    this._init(b, g, f, a, d,
        c, h, e);
    return this
}

function CToggle(b, g, f, a, d) {
    var c, h, e, k, q = [],
        m;
    this._init = function(a, b, d, g, f) {
        e = [];
        k = [];
        var t = new createjs.SpriteSheet({
            images: [d],
            frames: {
                width: d.width / 2,
                height: d.height,
                regX: d.width / 2 / 2,
                regY: d.height / 2
            },
            animations: {
                state_true: [0],
                state_false: [1]
            }
        });
        c = g;
        h = f;
        m = createSprite(t, "state_" + c, d.width / 2 / 2, d.height / 2, d.width / 2, d.height);
        m.x = a;
        m.y = b;
        m.cursor = "pointer";
        m.stop();
        s_oStage.addChild(m);
        this._initListener()
    };
    this.unload = function() {
        m.off("mousedown", this.buttonDown);
        m.off("pressup", this.buttonRelease);
        s_oStage.removeChild(m)
    };
    this._initListener = function() {
        m.on("mousedown", this.buttonDown);
        m.on("pressup", this.buttonRelease)
    };
    this.addEventListener = function(a, b, c) {
        e[a] = b;
        k[a] = c
    };
    this.addEventListenerWithParams = function(a, b, c, d) {
        e[a] = b;
        k[a] = c;
        q = d
    };
    this.setActive = function(a) {
        c = a;
        m.gotoAndStop("state_" + c)
    };
    this.buttonRelease = function() {
        m.scaleX = 1;
        m.scaleY = 1;
        playSound("press_button", 1, 0);
        h && (c = !c, m.gotoAndStop("state_" + c));
        e[ON_MOUSE_UP] && e[ON_MOUSE_UP].call(k[ON_MOUSE_UP], q)
    };
    this.buttonDown = function() {
        m.scaleX =
            .9;
        m.scaleY = .9;
        e[ON_MOUSE_DOWN] && e[ON_MOUSE_DOWN].call(k[ON_MOUSE_DOWN], q)
    };
    this.setPosition = function(a, b) {
        m.x = a;
        m.y = b
    };
    this.setVisible = function(a) {
        m.visible = a
    };
    this.getX = function() {
        return m.x
    };
    this.getY = function() {
        return m.y
    };
    this._init(b, g, f, a, d)
}

function CMenu() {
    var b, g, f, a, d, c = null,
        h = null;
    this._init = function() {
        b = createBitmap(s_oSpriteLibrary.getSprite("bg_menu"));
        s_oStage.addChild(b);
        var e = s_oSpriteLibrary.getSprite("but_bg");
        g = new CTextButton(CANVAS_WIDTH / 2, CANVAS_HEIGHT - 70, e, TEXT_PLAY, FONT1, "#ffffff", 40);
        g.addEventListener(ON_MOUSE_UP, this._onButPlayRelease, this);
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) e = s_oSpriteLibrary.getSprite("audio_icon"), f = new CToggle(CANVAS_WIDTH - e.width / 2, e.height / 2 + 14, e), f.addEventListener(ON_MOUSE_UP, this._onAudioToggle,
            this);
        var e = window.document,
            k = e.documentElement;
        c = k.requestFullscreen || k.mozRequestFullScreen || k.webkitRequestFullScreen || k.msRequestFullscreen;
        h = e.exitFullscreen || e.mozCancelFullScreen || e.webkitExitFullscreen || e.msExitFullscreen;
        !1 === ENABLE_FULLSCREEN && (c = !1);
        c && !1 === inIframe() && (e = s_oSpriteLibrary.getSprite("but_fullscreen"), d = new CToggle(e.width / 4 + 10, e.height / 2 + 10, e, s_bFullscreen, !0), d.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this));
        a = new createjs.Shape;
        a.graphics.beginFill("black").drawRect(0,
            0, CANVAS_WIDTH, CANVAS_HEIGHT);
        s_oStage.addChild(a);
        createjs.Tween.get(a).to({
            alpha: 0
        }, 400).call(function() {
            a.visible = !1
        })
    };
    this.unload = function() {
        g.unload();
        g = null;
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) f.unload(), f = null;
        c && !1 === inIframe() && d.unload();
        s_oStage.removeChild(b);
        b = null;
        s_oStage.removeChild(a);
        a = null
    };
    this._onButPlayRelease = function() {
        this.unload();
        s_oMain.gotoGame();
        $(s_oMain).trigger("start_session")
    };
    this._onAudioToggle = function() {
        createjs.Sound.setMute(!s_bAudioActive)
    };
    this._onFullscreenRelease =
        function() {
            s_bFullscreen ? (h.call(window.document), s_bFullscreen = !1) : (c.call(window.document.documentElement), s_bFullscreen = !0);
            sizeHandler()
        };
    this._init()
}
var winingNumber;
var bettingnumberdeatil=[];
function CGame(b) {
    var g = !1,
        f, a, d, c, h, e, k, q, m, p, r, v, n, l, t, w, y, u, z, x, C, A, D, E, I, G, B, H, F;
    this._init = function() {
        s_oTweenController = new CTweenController;
        s_oGameSettings = new CRouletteSettings;
        y = createBitmap(s_oSpriteLibrary.getSprite("bg_game"));
        s_oStage.addChild(y);
        this._initEnlights();
        A = new createjs.Container;
        A.x = 261;
        A.y = 264;
        s_oStage.addChild(A);
        C = new CTableController;
        C.addEventListener(ON_SHOW_ENLIGHT, this._onShowEnlight);
        C.addEventListener(ON_HIDE_ENLIGHT, this._onHideEnlight);
        C.addEventListener(ON_SHOW_BET_ON_TABLE,
            this._onShowBetOnTable);
        q = 0;
        a = -1;
        d = 37;
        m = [];
        p = [];
        r = [];
        t = [];
        u = new CSeat;
        E = new CWheelTopAnim(493, 6);
        I = new CWheelAnim(0, 0);
        x = new CInterface;
        G = new CFinalBetPanel(160, 569);
        B = new CNeighborsPanel(u.getCredit());
        H = new CGameOver;
        D = new CMsgBox;
        var b = (new createjs.Graphics).beginFill("rgba(0,0,0,0.01)").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        F = new createjs.Shape(b);
        F.on("click", function() {});
        F.visible = !1;
        s_oStage.addChild(F);
        v = [];
        c = 0;
        this._onSitDown();
        g = !0
    };
    this.unload = function() {
        !1 !== DISABLE_SOUND_MOBILE &&
            !1 !== s_bMobile || createjs.Sound.stop();
        x.unload();
        C.unload();
        D.unload();
        G.unload();
        B.unload();
        H.unload();
        s_oStage.removeAllChildren()
    };
    this._initEnlights = function() {
        var a;
        n = [];
        a = new CEnlight(288, 175, s_oSpriteLibrary.getSprite("enlight_bet0"), s_oStage);
        n.oEnlight_0 = a;
        a = new CEnlight(318, 244, s_oSpriteLibrary.getSprite("enlight_number1"), s_oStage);
        n.oEnlight_1 = a;
        a = new CEnlight(342, 220, s_oSpriteLibrary.getSprite("enlight_number1"), s_oStage);
        n.oEnlight_2 = a;
        a = new CEnlight(368, 198, s_oSpriteLibrary.getSprite("enlight_number3"),
            s_oStage);
        n.oEnlight_3 = a;
        a = new CEnlight(341, 262, s_oSpriteLibrary.getSprite("enlight_number4"), s_oStage);
        n.oEnlight_4 = a;
        a = new CEnlight(367, 238, s_oSpriteLibrary.getSprite("enlight_number1"), s_oStage);
        n.oEnlight_5 = a;
        a = new CEnlight(392, 214, s_oSpriteLibrary.getSprite("enlight_number3"), s_oStage);
        n.oEnlight_6 = a;
        a = new CEnlight(366, 279, s_oSpriteLibrary.getSprite("enlight_number4"), s_oStage);
        n.oEnlight_7 = a;
        a = new CEnlight(391, 255, s_oSpriteLibrary.getSprite("enlight_number1"), s_oStage);
        n.oEnlight_8 = a;
        a = new CEnlight(416,
            231, s_oSpriteLibrary.getSprite("enlight_number3"), s_oStage);
        n.oEnlight_9 = a;
        a = new CEnlight(390, 297, s_oSpriteLibrary.getSprite("enlight_number4"), s_oStage);
        n.oEnlight_10 = a;
        a = new CEnlight(415, 273, s_oSpriteLibrary.getSprite("enlight_number1"), s_oStage);
        n.oEnlight_11 = a;
        a = new CEnlight(439, 249, s_oSpriteLibrary.getSprite("enlight_number12"), s_oStage);
        n.oEnlight_12 = a;
        a = new CEnlight(414, 315, s_oSpriteLibrary.getSprite("enlight_number4"), s_oStage);
        n.oEnlight_13 = a;
        a = new CEnlight(439, 291, s_oSpriteLibrary.getSprite("enlight_number1"),
            s_oStage);
        n.oEnlight_14 = a;
        a = new CEnlight(464, 266, s_oSpriteLibrary.getSprite("enlight_number12"), s_oStage);
        n.oEnlight_15 = a;
        a = new CEnlight(439, 333, s_oSpriteLibrary.getSprite("enlight_number16"), s_oStage);
        n.oEnlight_16 = a;
        a = new CEnlight(464, 308, s_oSpriteLibrary.getSprite("enlight_number16"), s_oStage);
        n.oEnlight_17 = a;
        a = new CEnlight(488, 283, s_oSpriteLibrary.getSprite("enlight_number1"), s_oStage);
        n.oEnlight_18 = a;
        a = new CEnlight(466, 351, s_oSpriteLibrary.getSprite("enlight_number16"), s_oStage);
        n.oEnlight_19 =
            a;
        a = new CEnlight(489, 326, s_oSpriteLibrary.getSprite("enlight_number16"), s_oStage);
        n.oEnlight_20 = a;
        a = new CEnlight(513, 301, s_oSpriteLibrary.getSprite("enlight_number16"), s_oStage);
        n.oEnlight_21 = a;
        a = new CEnlight(491, 371, s_oSpriteLibrary.getSprite("enlight_number16"), s_oStage);
        n.oEnlight_22 = a;
        a = new CEnlight(515, 344, s_oSpriteLibrary.getSprite("enlight_number16"), s_oStage);
        n.oEnlight_23 = a;
        a = new CEnlight(539, 319, s_oSpriteLibrary.getSprite("enlight_number16"), s_oStage);
        n.oEnlight_24 = a;
        a = new CEnlight(516,
            389, s_oSpriteLibrary.getSprite("enlight_number25"), s_oStage);
        n.oEnlight_25 = a;
        a = new CEnlight(540, 363, s_oSpriteLibrary.getSprite("enlight_number25"), s_oStage);
        n.oEnlight_26 = a;
        a = new CEnlight(564, 338, s_oSpriteLibrary.getSprite("enlight_number16"), s_oStage);
        n.oEnlight_27 = a;
        a = new CEnlight(542, 408, s_oSpriteLibrary.getSprite("enlight_number25"), s_oStage);
        n.oEnlight_28 = a;
        a = new CEnlight(566, 381, s_oSpriteLibrary.getSprite("enlight_number25"), s_oStage);
        n.oEnlight_29 = a;
        a = new CEnlight(590, 356, s_oSpriteLibrary.getSprite("enlight_number30"),
            s_oStage);
        n.oEnlight_30 = a;
        a = new CEnlight(568, 428, s_oSpriteLibrary.getSprite("enlight_number25"), s_oStage);
        n.oEnlight_31 = a;
        a = new CEnlight(593, 401, s_oSpriteLibrary.getSprite("enlight_number25"), s_oStage);
        n.oEnlight_32 = a;
        a = new CEnlight(617, 376, s_oSpriteLibrary.getSprite("enlight_number30"), s_oStage);
        n.oEnlight_33 = a;
        a = new CEnlight(596, 448, s_oSpriteLibrary.getSprite("enlight_number25"), s_oStage);
        n.oEnlight_34 = a;
        a = new CEnlight(619, 421, s_oSpriteLibrary.getSprite("enlight_number25"), s_oStage);
        n.oEnlight_35 =
            a;
        a = new CEnlight(644, 395, s_oSpriteLibrary.getSprite("enlight_number30"), s_oStage);
        n.oEnlight_36 = a;
        a = new CEnlight(624, 470, s_oSpriteLibrary.getSprite("enlight_col"), s_oStage);
        n.oEnlight_col1 = a;
        a = new CEnlight(649, 442, s_oSpriteLibrary.getSprite("enlight_col"), s_oStage);
        n.oEnlight_col2 = a;
        a = new CEnlight(672, 415, s_oSpriteLibrary.getSprite("enlight_col"), s_oStage);
        n.oEnlight_col3 = a;
        a = new CEnlight(280, 268, s_oSpriteLibrary.getSprite("enlight_first_twelve"), s_oStage);
        n.oEnlight_first12 = a;
        a = new CEnlight(377,
            340, s_oSpriteLibrary.getSprite("enlight_second_twelve"), s_oStage);
        n.oEnlight_second12 = a;
        a = new CEnlight(477, 416, s_oSpriteLibrary.getSprite("enlight_third_twelve"), s_oStage);
        n.oEnlight_third12 = a;
        a = new CEnlight(241, 305, s_oSpriteLibrary.getSprite("enlight_first18"), s_oStage);
        n.oEnlight_first18 = a;
        a = new CEnlight(288, 343, s_oSpriteLibrary.getSprite("enlight_first18"), s_oStage);
        n.oEnlight_even = a;
        a = new CEnlight(338, 380, s_oSpriteLibrary.getSprite("enlight_black"), s_oStage);
        n.oEnlight_black = a;
        a = new CEnlight(389,
            419, s_oSpriteLibrary.getSprite("enlight_red"), s_oStage);
        n.oEnlight_red = a;
        a = new CEnlight(439, 456, s_oSpriteLibrary.getSprite("enlight_odd"), s_oStage);
        n.oEnlight_odd = a;
        a = new CEnlight(492, 498, s_oSpriteLibrary.getSprite("enlight_second18"), s_oStage);
        n.oEnlight_second18 = a
    };
    this._setState = function(b) {
        a = b;
        switch (b) {
            case STATE_GAME_WAITING_FOR_BET:
                x.enableBetFiches(), F.visible = !1
        }
    };
    this._resetTable = function() {
        c = 0;
        d = 37;
        m = [];
        p = [];
        r = [];
        null !== z && (s_oStage.removeChild(z), z = null);
        u.reset();
        B.reset();
        .1 > u.getCredit() ?
            (a = -1, F.visible = !1, H.show()) : (x.enableRebet(), this._setState(STATE_GAME_WAITING_FOR_BET));
        q++;
        q === NUM_HAND_FOR_ADS && (q = 0, $(s_oMain).trigger("show_interlevel_ad"))
    };
    this._startRouletteAnim = function() {
        x.disableBetFiches();
        e = this._generateWinLoss();
        v.push(e);
        c = 0;
        h = s_oGameSettings.getFrameForNumber(e)
    };
    this._startWheelTopAnim = function() {
        E.playToFrame(h)
    };
    this._startBallSpinAnim = function() {
        var a = Math.floor(3 * Math.random());
        I.startSpin(a, s_oGameSettings.getFrameForBallSpin(a, e))
    };
    this._generateWinLoss =
        function() {
			return winingNumber;
		
       /*     var a, b = u.getNumbersBetted(),
                c = u.getNumberSelected(),
			     w = b[c[0][0]].win;
				console.log(u.getCurBet());
				console.log(c);
				
            k < w ? (c = 0, a = Math.floor(100 * Math.random())) : -1 === WIN_OCCURRENCE ? (c = 37 - d, a = Math.floor(38 * Math.random())) : (c = WIN_OCCURRENCE, a = Math.floor(100 * Math.random()));
            if (f = a >= c ? !1 : !0) {
                do a = Math.floor(Math.random() * b.length), w = b[a].win; while (0 === w)
            } else {
                c = [];
                for (a = 0; 37 > a; a++) c.push(a);
                do {
                    if (0 === c.length) {
                        a = Math.floor(Math.random() * b.length);
                        break
                    }
                    a = Math.floor(Math.random() * c.length);
                    w = b[a].win;
                    c.splice(a, 1)
                } while (w > u.getCurBet())
            }
           // return e =a;
			return winingNumber;
		*/
		
        };
    this._rouletteAnimEnded = function() {
        c = 0;
        E.showBall();
        this._setState(STATE_GAME_SHOW_WINNER);
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || w.stop();
        var a = u.getNumbersBetted(),
            b = a[e],
            d = roundDecimal(b.win, 2);
        l = [];
        for (var t = 0; t < a.length; t++) {
            var g = a[t];
            if (0 < g.win)
                for (var f = 0; f < g.mc.length; f++) {
                    l.push(g.mc[f]);
                    var h = s_oGameSettings.getAttachOffset("oDealerWin");
                    g.mc[f].setEndPoint(h.x, h.y)
                }
        }
		
        if (b.mc) {
            for (a = 0; a < b.mc.length; a++) h = s_oGameSettings.getAttachOffset("oReceiveWin"), b.mc[a].setEndPoint(h.x, h.y);
            x.showWin(d)
        } else x.showLose();
        x.refreshNumExtracted(v);
        z = createBitmap(s_oSpriteLibrary.getSprite("placeholder"));
        0 === e ? (z.x = n["oEnlight_" + e].getX() + 27, z.y = n["oEnlight_" + e].getY() + 22) : (z.x = n["oEnlight_" + e].getX(), z.y = n["oEnlight_" + e].getY());
        z.regX = 6;
        z.regY = 20;
        s_oStage.addChild(z);
        u.showWin(d);
        k = 0 < d ? k - d : k + u.getCurBet();
        $(s_oMain).trigger("save_score", u.getCredit());
		$(s_oMain).trigger("save_betting", u.getCredit());
        x.refreshMoney(u.getCredit())
    };
    this.showMsgBox = function(a) {
        D.show(a)
    };
    this.onRecharge = function() {
        u.recharge(TOTAL_MONEY);
        x.refreshMoney(u.getCredit());
        this._setState(STATE_GAME_WAITING_FOR_BET);
        H.hide();
        $(s_oMain).trigger("recharge")
    };
    this.onSpin = function() {
	
        if (B.isVisible()) B.onExit();
		
      //  0 !== u.getCurBet() && (u.getCurBet() < MIN_BET ? (D.show(TEXT_ERROR_MIN_BET), x.enableBetFiches(), x.enableSpin(!0)) : F.visible || (F.visible = !0, E.hideBall(), B.hide(), G.hide(), x.enableSpin(!1), x.displayAction(TEXT_SPINNING), this._startRouletteAnim(), this._startWheelTopAnim(), this._startBallSpinAnim(), this._setState(STATE_GAME_SPINNING), !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) ||
  1 == 1 && (1 !== 1 ? (D.show(TEXT_ERROR_MIN_BET), x.enableBetFiches(), x.enableSpin(!0)) : F.visible || (F.visible = !0, E.hideBall(), B.hide(), G.hide(), x.enableSpin(!1), x.displayAction(TEXT_SPINNING), this._startRouletteAnim(), this._startWheelTopAnim(), this._startBallSpinAnim(), this._setState(STATE_GAME_SPINNING), !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) ||           
		   (w = createjs.Sound.play("wheel_sound")))
		   bettingnumberdeatil=[];
    };
    this._onSitDown = function() {
        this._setState(STATE_GAME_WAITING_FOR_BET);
        u.setInfo(TOTAL_MONEY, A);
        x.refreshMoney(TOTAL_MONEY)
    };
    this._onShowBetOnTable = function(a, b) {
        var c = a.button,
            w = a.numbers;
        d -= a.bet_mult;
        m.push(a.bet_mult);
        var e = a.bet_win,
            g = a.num_fiches,
            f, h;
        b ? f = a.value : (f = x.getCurFicheSelected(), 0 === p.length && (t = [], x.disableRebet()), t.push({
            button: a.button,
            numbers: a.numbers,
            bet_mult: a.bet_mult,
            bet_win: a.bet_win,
            num_fiches: a.num_fiches,
            neighbors: !1,
            value: f
        }));
		bettingnumberdeatil=t;
        h = s_oGameSettings.getFicheValues(f);
        p.push(e);
        r.push(g);
        var k = u.getCurBet();
        if (0 > u.getCredit() - h * g) D.show(TEXT_ERROR_NO_MONEY_MSG), B.reset();
        else if (k + h * g > MAX_BET) D.show(TEXT_ERROR_MAX_BET_REACHED), B.reset();
        else {
            switch (c) {
                case "oBetVoisinsZero":
                    u.createPileForVoisinZero(h, f, w, e, g);
                    break;
                case "oBetTier":
                    u.createPileForTier(h, f, w, e, g);
                    break;
                case "oBetOrphelins":
                    u.createPileForOrphelins(h, f, w, e, g);
                    break;
                case "oBetFinalsBet":
                    u.createPileForMultipleNumbers(h, f, w, e, g);
                    break;
                default:
                    u.addFicheOnTable(h,
                        f, w, e, c)
            }
            x.refreshMoney(u.getCredit());
            x.enableSpin(!0);
            !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || createjs.Sound.play("chip")
        }
    };
    this._onShowBetOnTableFromNeighbors = function(a, b) {
        var c = a.numbers;
        d -= a.bet_mult;
        m.push(a.bet_mult);
        var w = a.bet_win,
            e = a.num_fiches;
        b || (0 === p.length && (t = [], x.disableRebet()), t.push({
            button: a.button,
            numbers: a.numbers,
            bet_mult: a.bet_mult,
            bet_win: a.bet_win,
            num_fiches: a.num_fiches,
            value: x.getCurFicheSelected(),
            num_clicked: a.num_clicked,
            neighbors: !0
        }));
		bettingnumberdeatil=t;
        p.push(w);
        r.push(e);
        var f =
            s_oGameSettings.getFicheValues(a.value);
        f * e > u.getCredit() ? (D.show(TEXT_ERROR_NO_MONEY_MSG), B.reset()) : (u.createPileForMultipleNumbers(f, a.value, c, w, e), x.refreshMoney(u.getCredit()), x.enableSpin(!0), !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || createjs.Sound.play("chip"))
    };
    this._onShowEnlight = function(a) {
        for (var b = a.numbers, c = 0; c < b.length; c++) n["oEnlight_" + b[c]].show();
        (a = a.enlight) && n["oEnlight_" + a].show()
    };
    this._onHideEnlight = function(a) {
        for (var b = a.numbers, c = 0; c < b.length; c++) n["oEnlight_" + b[c]].hide();
        (a = a.enlight) && n["oEnlight_" + a].hide()
    };
    this.onClearLastBet = function() {
        if (0 < m.length) {
            var a = m.pop();
            d += a
        }
        0 === m.length && x.enableSpin(!1);
        u.clearLastBet(p.pop(), r.pop());
        x.refreshMoney(u.getCredit());
        B.clearLastBet();
        0 < t.length && t.pop()
    };
    this.onClearAllBets = function() {
        u.clearAllBets();
        x.refreshMoney(u.getCredit());
        x.enableSpin(!1);
        B.reset();
        t = [];
        d = 37
    };
    this.onRebet = function() {
        for (var a = 0; a < t.length; a++) !0 === t[a].neighbors ? B.rebet(t[a].num_clicked) : this._onShowBetOnTable(t[a], !0)
    };
    this.onFinalBetShown =
        function() {
            G.isVisible() ? G.hide() : G.show()
        };
    this.onOpenNeighbors = function() {
        G.hide();
        B.showPanel(x.getCurFicheSelected(), u.getCredit())
    };
    this.onExit = function() {
        this.unload();
        s_oMain.gotoMenu();
        $(s_oMain).trigger("end_session");
        $(s_oMain).trigger("share_event", u.getCredit())
    };
    this._updateWaitingBet = function() {
        B.isVisible() || (0 === TIME_WAITING_BET ? x.displayAction(TEXT_MIN_BET + ": " + MIN_BET + "\n" + TEXT_MAX_BET + ": " + MAX_BET, TEXT_DISPLAY_MSG_WAITING_BET) : (c += s_iTimeElaps, c > TIME_WAITING_BET ? (c = 0, this.onSpin()) :
            x.displayAction(TEXT_MIN_BET + ": " + MIN_BET + "\n" + TEXT_MAX_BET + ": " + MAX_BET, TEXT_DISPLAY_MSG_WAITING_BET + " " + Math.floor((TIME_WAITING_BET - c) / 1E3))))
    };
    this._updateSpinning = function() {
        c += s_iTimeElaps;
        E.getCurrentFrame() === NUM_WHEEL_TOP_FRAMES - 1 ? E.playToFrame(1) : E.nextFrame();
        c > TIME_SPINNING && E.getCurrentFrame() === h && this._rouletteAnimEnded()
    };
    this._updateShowWinner = function() {
        c += s_iTimeElaps;
        c > TIME_SHOW_WINNER && (c = 0, this._setState(STATE_DISTRIBUTE_FICHES))
    };
    this._updateDistributeFiches = function() {
        c += s_iTimeElaps;
        if (c > TIME_FICHES_MOV) c = 0, createjs.Sound.play("fiche_collect"), this._resetTable();
        else
            for (var a = easeInOutCubic(c, 0, 1, TIME_FICHES_MOV), b = 0; b < l.length; b++) l[b].updatePos(a)
    };
    this.update = function() {
        if (!1 !== g) {
            switch (a) {
                case STATE_GAME_WAITING_FOR_BET:
                    this._updateWaitingBet();
					$(s_oMain).trigger("currentlyWaitingBet");
                    break;
                case STATE_GAME_SPINNING:
                    this._updateSpinning();
					$(s_oMain).trigger("currentlySpining");
                    break;
                case STATE_GAME_SHOW_WINNER:
                    this._updateShowWinner();
                    break;
                case STATE_DISTRIBUTE_FICHES:
                    this._updateDistributeFiches()
            }
            I.update()
        }
    };
    s_oGame = this;
    TOTAL_MONEY = b.money;
    MIN_BET =
        b.min_bet;
    MAX_BET = b.max_bet;
    TIME_WAITING_BET = b.time_bet;
    TIME_SHOW_WINNER = b.time_winner;
    WIN_OCCURRENCE = b.win_occurrence;
    ENABLE_FULLSCREEN = b.fullscreen;
    NUM_HAND_FOR_ADS = b.num_hand_before_ads;
    k = b.casino_cash;
    this._init();
	
	
}
var s_oGame, s_oTweenController, s_oGameSettings;
var CInterfaceObj;
function CInterface() {
    var b, g, f, a, d, c, h, e, k, q, m, p, r, v, n, l, t, w, y, u = null,
        z = null;
    this._init = function() {
		
        var f, C;
        c = new createjs.Text("", "12px " + FONT1, "#fff");
        c.textAlign = "center";
        c.x = CANVAS_WIDTH - 56;
        c.y = CANVAS_HEIGHT - 35;
        s_oStage.addChild(c);
        k = createBitmap(s_oSpriteLibrary.getSprite("display_bg"));
        k.x = 235;
        k.y = 4;
        s_oStage.addChild(k);
        h = new createjs.Text("", "20px " + FONT2, "#ffde00");
        h.textAlign = "center";
        h.lineHeight = 20;
        h.x = k.x + 160;
        h.y = k.y + 8;
        s_oStage.addChild(h);
        e = new createjs.Text("", "16px " + FONT2, "#ffde00");
        e.textAlign = "left";
        e.lineHeight = 14;
        e.x = k.x + 120;
        e.y = k.y + 60;
        s_oStage.addChild(e);
        q = new CGfxButton(575, 221, s_oSpriteLibrary.getSprite("spin_but"));
        q.setVisible(!1);
        q.addEventListener(ON_MOUSE_UP, this._onSpin, this);
        m = new CTextButton(81, 309, s_oSpriteLibrary.getSprite("but_game_bg"), TEXT_CLEAR_LAST_BET, FONT1, "#fff", 14);
        m.addEventListener(ON_MOUSE_UP, this._onClearLastBet, this);
        p = new CTextButton(81, 342, s_oSpriteLibrary.getSprite("but_game_bg"), TEXT_CLEAR_ALL_BET, FONT1, "#fff", 14);
        p.addEventListener(ON_MOUSE_UP,
            this._onClearAllBet, this);
        t = new CBetTextButton(81, 447, s_oSpriteLibrary.getSprite("but_game_bg"), TEXT_VOISINS_ZERO, FONT1, "#fff", 14, "oBetVoisinsZero");
        t.addEventListener(ON_MOUSE_UP, this._onBetRelease, this);
        n = new CBetTextButton(81, 515, s_oSpriteLibrary.getSprite("but_game_bg"), TEXT_ORPHELINS, FONT1, "#fff", 14, "oBetOrphelins");
        n.addEventListener(ON_MOUSE_UP, this._onBetRelease, this);
        l = new CBetTextButton(81, 481, s_oSpriteLibrary.getSprite("but_game_bg"), TEXT_TIER, FONT1, "#fff", 14, "oBetTier");
        l.addEventListener(ON_MOUSE_UP,
            this._onBetRelease, this);
        r = new CTextButton(81, 582, s_oSpriteLibrary.getSprite("but_game_bg"), TEXT_FINALSBET, FONT1, "#fff", 14);
        r.addEventListener(ON_MOUSE_UP, this._onFinalBetShow, this);
        v = new CTextButton(81, 549, s_oSpriteLibrary.getSprite("but_game_bg"), TEXT_NEIGHBORS, FONT1, "#fff", 14);
        v.addEventListener(ON_MOUSE_UP, this._onNeighborsPanel, this);
        w = new CTextButton(692, 538, s_oSpriteLibrary.getSprite("but_game_small"), TEXT_REBET, FONT1, "#fff", 14);
        w.disable();
        w.addEventListener(ON_MOUSE_UP, this._onRebet, this);
        this._initFichesBut();
        this.disableBetFiches();
        this._initNumExtracted();
	
        b = 0;
        g[b].select();
        var A = s_oSpriteLibrary.getSprite("but_exit");
        a = new CGfxButton(A.width / 2 + 5, A.height / 2 + 5, A, !0);
        a.addEventListener(ON_MOUSE_UP, this._onExit, this);
        !1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile ? (d = new CToggle(a.getX() + A.width + 5, A.height / 2 + 4, s_oSpriteLibrary.getSprite("audio_icon")), d.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this), f = d.getX() + A.width + 5, C = d.getY()) : (f = a.getX() + A.width + 5, C = A.height / 2 + 4);
        var A = window.document,
            D = A.documentElement;
        u = D.requestFullscreen || D.mozRequestFullScreen || D.webkitRequestFullScreen || D.msRequestFullscreen;
        z = A.exitFullscreen || A.mozCancelFullScreen || A.webkitExitFullscreen || A.msExitFullscreen;
        !1 === ENABLE_FULLSCREEN && (u = !1);
        u && !1 === inIframe() && (A = s_oSpriteLibrary.getSprite("but_fullscreen"), y = new CToggle(f, C, A, s_bFullscreen, !0), y.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this))
		
		
    };
    this.unload = function() {
        a.unload();
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || d.unload();
        q.unload();
        m.unload();
        p.unload();
        r.unload();
        v.unload();
        n.unload();
        l.unload();
        t.unload();
        w.unload();
        u && !1 === inIframe() && y.unload()
    };
    this.enableBetFiches = function() {
        for (var a = 0; a < NUM_FICHE_VALUES; a++) g[a].enable();
        m.enable();
        p.enable();
        r.enable();
        v.enable();
        n.enable();
        l.enable();
        t.enable()
    };
    this.disableBetFiches = function() {
        for (var a = 0; a < NUM_FICHE_VALUES; a++) g[a].disable();
        m.disable();
        p.disable();
        r.disable();
        v.disable();
        n.disable();
        l.disable();
        t.disable();
        w.disable()
    };
    this.enableRebet = function() {
        w.enable()
    };
    this.disableRebet =
        function() {
            w.disable()
        };
    this._initNumExtracted = function() {
        f = [];
        for (var a = 11, b = 0; 12 > b; b++) {
            var c = new CHistoryRow(672, a);
            f[b] = c;
			
            a += 22
        }
    };
    this.deselectAllFiches = function() {
        for (var a = 0; a < NUM_FICHES; a++) g[a].deselect()
    };
    this.enableSpin = function(a) {
        q.setVisible(a)
    };
    this._initFichesBut = function() {
        var a = [{
            x: 296,
            y: 410
        }, {
            x: 324,
            y: 434
        }, {
            x: 352,
            y: 456
        }, {
            x: 381,
            y: 477
        }, {
            x: 409,
            y: 500
        }, {
            x: 438,
            y: 521
        }];
        g = [];
        for (var b = 0; b < NUM_FICHES; b++) {
            var c = s_oSpriteLibrary.getSprite("fiche_" + b);
            g[b] = new CFicheBut(a[b].x, a[b].y, c);
            g[b].addEventListenerWithParams(ON_MOUSE_UP,
                this._onFicheSelected, this, [b])
        }
    };
    this.refreshTime = function(a) {
        formatTime(a)
    };
    this.refreshMoney = function(a) {
        c.text = TEXT_MONEY + "\n" + a + "$"
    };
    this.displayAction = function(a, b) {
        h.text = a;
        e.text = b
    };
    this.showWin = function(a) {
        this.displayAction(TEXT_DISPLAY_MSG_PLAYER_WIN + "\n" + a + "$")
    };
    this.showLose = function() {
        this.displayAction(TEXT_DISPLAY_MSG_PLAYER_LOSE)
    };
    this.refreshNumExtracted = function(a) {
        var b = a.length - 1,
            c = -1;
        11 < a.length && (c = b - 12);
        for (var d = 0; b > c; b--) {
            switch (s_oGameSettings.getColorNumber(a[b])) {
                case COLOR_BLACK:
                    f[d].showBlack(a[b]);
					$(s_oMain).trigger("getLastDrawNumber", a[b]);
                    break;
                case COLOR_RED:
                    f[d].showRed(a[b]);
					$(s_oMain).trigger("getLastDrawNumber", a[b]);
                    break;
                case COLOR_ZERO:
                    f[d].showGreen(a[b])
					$(s_oMain).trigger("getLastDrawNumber", a[b]);
            }
            d++
        }
    };
    this.gameOver = function() {};
    this._onBetRelease = function(a) {
        var b = a.numbers,
            c = a.bet_mult,
            d = a.bet_win;
        null !== b && s_oGame._onShowBetOnTable({
            button: a.name,
            numbers: b,
            bet_mult: c,
            bet_win: d,
            num_fiches: a.num_fiches
        }, !1)
    };
    this._onFicheSelected = function(a) {
        createjs.Sound.play("fiche_select");
        this.deselectAllFiches();
        a = a[0];
        for (var c = 0; c < NUM_FICHE_VALUES; c++) c === a && (b = c)
    };
    this._onSpin = function() {
        this.disableBetFiches();
        this.enableSpin(!1);
        s_oGame.onSpin()
    };
    this._onClearLastBet = function() {
        s_oGame.onClearLastBet()
    };
    this._onClearAllBet = function() {
        s_oGame.onClearAllBets()
    };
    this._onFinalBetShow = function() {
        s_oGame.onFinalBetShown()
    };
    this._onNeighborsPanel = function() {
        s_oGame.onOpenNeighbors()
    };
    this._onRebet = function() {
        w.disable();
        s_oGame.onRebet()
    };
    this._onExit = function() {
        s_oGame.onExit()
    };
    this.getCurFicheSelected = function() {
        return b
    };
    this._onAudioToggle = function() {
        createjs.Sound.setMute(!s_bAudioActive)
    };
    this._onFullscreenRelease = function() {
        s_bFullscreen ?
            (z.call(window.document), s_bFullscreen = !1) : (u.call(window.document.documentElement), s_bFullscreen = !0);
        sizeHandler()
    };
    s_oInterface = this;
    this._init();
	
    return this
}
var s_oInterface;

function CMsgBox() {
    var b, g, f, a;
    this._init = function() {
        b = createBitmap(s_oSpriteLibrary.getSprite("msg_box"));
        f = new createjs.Text("", "24px " + FONT1, "#000");
        f.x = CANVAS_WIDTH / 2 + 2;
        f.y = CANVAS_HEIGHT / 2 - 28;
        f.textAlign = "center";
        f.lineWidth = 300;
        g = new createjs.Text("", "24px " + FONT1, "#ffffff");
        g.x = CANVAS_WIDTH / 2;
        g.y = CANVAS_HEIGHT / 2 - 30;
        g.textAlign = "center";
        g.lineWidth = 300;
        a = new createjs.Container;
        a.alpha = 0;
        a.visible = !1;
        a.addChild(b, f, g);
        s_oStage.addChild(a)
    };
    this.unload = function() {
        a.off("mousedown", this._onExit)
    };
    this._initListener = function() {
        a.on("mousedown", this._onExit)
    };
    this.show = function(b) {
        f.text = b;
        g.text = b;
        a.visible = !0;
        var c = this;
        createjs.Tween.get(a).to({
            alpha: 1
        }, 500).call(function() {
            c._initListener()
        });
        setTimeout(function() {
            c._onExit()
        }, 3E3)
    };
    this._onExit = function() {
        a.visible && (a.off("mousedown"), a.visible = !1)
    };
    this._init();
    return this
}

function CTweenController() {
    this.tweenValue = function(b, g, f) {
        return b + f * (g - b)
    };
    this.easeLinear = function(b, g, f, a) {
        return f * b / a + g
    };
    this.easeInCubic = function(b, g, f, a) {
        a = (b /= a) * b * b;
        return g + f * a
    };
    this.easeBackInQuart = function(b, g, f, a) {
        a = (b /= a) * b;
        return g + f * (2 * a * a + 2 * a * b + -3 * a)
    };
    this.easeInBack = function(b, g, f, a) {
        return f * (b /= a) * b * (2.70158 * b - 1.70158) + g
    };
    this.easeOutCubic = function(b, g, f, a) {
        return f * ((b = b / a - 1) * b * b + 1) + g
    }
}

function CSeat() {
    var b, g, f, a, d, c;
    this._init = function() {
        this.reset()
    };
    this.reset = function() {
        f = [];
        a = [];
        d = [];
        this.resetNumberWins();
        c && c.reset();
        b = 0
    };
    this.setInfo = function(a, d) {
        g = a;
        b = 0;
        c = new CFichesController(d)
    };
    this.resetNumberWins = function() {
        for (var a = 0; a < NUMBERS_TO_BET; a++) f[a] = {
            win: 0,
            mc: null
        };
        d = []
    };
    this.setFicheBetted = function(c, e, k, q, m) {
        for (var h = [], r = [], v = 0; v < e.length; v++) {
            var n = (parseFloat(f[e[v]].win) + k * c * m).toFixed(1);
            f[e[v]] = {
                win: n,
                mc: q
            };
            h.push(k * c * m);
            r.push(q)
        }
        d.push({
            win: h,
            mc: q
        });
        a.push(e);
        b += c * m;
        g -= c * m;
        g = roundDecimal(g, 1)
    };
    this.createPileForVoisinZero = function(a, b, d, f, g) {
        var e = [];
        c.createPileForVoisinZero(b, e);
        this.setFicheBetted(a, d, f, e, g)
    };
    this.createPileForTier = function(a, b, d, f, g) {
        var e = [];
        c.createPileForTier(b, e);
        this.setFicheBetted(a, d, f, e, g)
    };
    this.createPileForOrphelins = function(h, e, k, q, m) {
        q = [];
        c.createPileForOrphelins(e, q);
        e = [];
        var p = (parseFloat(f[k[0]].win) + 36 * h).toFixed(1);
        f[k[0]] = {
            win: p,
            mc: q
        };
        e.push(36 * h);
        p = (parseFloat(f[k[1]].win) + 18 * h).toFixed(1);
        f[k[1]] = {
            win: p,
            mc: q
        };
        e.push(18 *
            h);
        p = (parseFloat(f[k[2]].win) + 18 * h).toFixed(1);
        f[k[2]] = {
            win: p,
            mc: q
        };
        e.push(18 * h);
        p = (parseFloat(f[k[3]].win) + 18 * h).toFixed(1);
        f[k[3]] = {
            win: p,
            mc: q
        };
        e.push(18 * h);
        p = (parseFloat(f[k[4]].win) + 36 * h).toFixed(1);
        f[k[4]] = {
            win: p,
            mc: q
        };
        e.push(36 * h);
        p = (parseFloat(f[k[5]].win) + 18 * h).toFixed(1);
        f[k[5]] = {
            win: p,
            mc: q
        };
        e.push(18 * h);
        p = (parseFloat(f[k[6]].win) + 18 * h).toFixed(1);
        f[k[6]] = {
            win: p,
            mc: q
        };
        e.push(18 * h);
        p = (parseFloat(f[k[7]].win) + 18 * h).toFixed(1);
        f[k[7]] = {
            win: p,
            mc: q
        };
        e.push(18 * h);
        a.push(k);
        b += h * m;
        g -= h * m;
        g = roundDecimal(g,
            1);
        d.push({
            win: e,
            mc: q
        })
    };
    this.createPileForMultipleNumbers = function(a, b, d, f, g) {
        var e = [];
        c.createPileForMultipleNumbers(b, d, e);
        this.setFicheBetted(a, d, f, e, g)
    };
    this.addFicheOnTable = function(a, b, d, f, g) {
        var e = [];
        c.setFicheOnTable(b, g, e);
        this.setFicheBetted(a, d, f, e, 1)
    };
    this.clearLastBet = function() {
        if (0 !== a.length) {
            var h = c.clearLastBet();
            g += h;
            g = roundDecimal(g, 1);
            b -= h;
            for (var h = a.pop(), e = d.pop().win, k = 0; k < h.length; k++) f[h[k]] = 0 < d.length ? {
                win: f[h[k]].win - e[k],
                mc: d[d.length - 1].mc
            } : {
                win: f[h[k]].win - e[k],
                mc: null
            }
        }
    };
    this.clearAllBets = function() {
        this.resetNumberWins();
        c.clearAllBets();
        g += b;
        g = roundDecimal(g, 1);
        b = 0
    };
    this.showWin = function(a) {
        g += a;
        g = roundDecimal(g, 1)
    };
    this.recharge = function(a) {
        g = a
    };
    this.getCurBet = function() {
        return b
    };
    this.getCredit = function() {
        return g
    };
    this.getNumbersBetted = function() {
        return f
    };
    this.getNumberSelected = function() {
        return a
    };
    this._init()
}

function CTableController() {
    var b, g, f;
    this._init = function() {
        b = new createjs.Container;
        b.x = 285;
        b.y = 102;
        s_oStage.addChild(b);
        var a;
        a = new CBetTableButton(62, 221, s_oSpriteLibrary.getSprite("hit_area_twelve_bet"), "first12", b, !0);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a = new CBetTableButton(161, 296, s_oSpriteLibrary.getSprite("hit_area_twelve_bet"), "second12",
            b, !0);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a = new CBetTableButton(263, 373, s_oSpriteLibrary.getSprite("hit_area_twelve_bet"), "third12", b, !0);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a = new CBetTableButton(54,
            118, s_oSpriteLibrary.getSprite("hit_area_bet0"), "bet_0", b, !1);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        for (var d = [{
                    x: 56,
                    y: 162
                }, {
                    x: 81,
                    y: 137
                }, {
                    x: 104,
                    y: 115
                }, {
                    x: 78,
                    y: 181
                }, {
                    x: 104,
                    y: 156
                }, {
                    x: 129,
                    y: 131
                }, {
                    x: 103,
                    y: 197
                }, {
                    x: 128,
                    y: 172
                }, {
                    x: 152,
                    y: 148
                }, {
                    x: 128,
                    y: 215
                }, {
                    x: 153,
                    y: 190
                }, {
                    x: 176,
                    y: 166
                }, {
                    x: 153,
                    y: 233
                }, {
                    x: 176,
                    y: 208
                }, {
                    x: 201,
                    y: 183
                }, {
                    x: 177,
                    y: 253
                }, {
                    x: 201,
                    y: 226
                },
                {
                    x: 226,
                    y: 202
                }, {
                    x: 202,
                    y: 271
                }, {
                    x: 227,
                    y: 244
                }, {
                    x: 251,
                    y: 220
                }, {
                    x: 228,
                    y: 289
                }, {
                    x: 250,
                    y: 265
                }, {
                    x: 275,
                    y: 238
                }, {
                    x: 254,
                    y: 310
                }, {
                    x: 279,
                    y: 282
                }, {
                    x: 302,
                    y: 257
                }, {
                    x: 280,
                    y: 330
                }, {
                    x: 305,
                    y: 301
                }, {
                    x: 328,
                    y: 275
                }, {
                    x: 308,
                    y: 348
                }, {
                    x: 331,
                    y: 322
                }, {
                    x: 354,
                    y: 294
                }, {
                    x: 335,
                    y: 370
                }, {
                    x: 359,
                    y: 341
                }, {
                    x: 383,
                    y: 314
                }
            ], c = s_oSpriteLibrary.getSprite("hit_area_simple_bet"), h = 1; 37 > h; h++) a = new CBetTableButton(d[h - 1].x, d[h - 1].y, c, "bet_" + h, b, !1), a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this), !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver,
            this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a = new CBetTableButton(43, 153, s_oSpriteLibrary.getSprite("hit_area_couple_bet"), "bet_0_1", b, !1);
        a.rotate(-45);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a = new CBetTableButton(68, 129, s_oSpriteLibrary.getSprite("hit_area_couple_bet"), "bet_0_2", b, !1);
        a.rotate(-45);
        a.addEventListener(ON_MOUSE_DOWN,
            this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a = new CBetTableButton(95, 105, s_oSpriteLibrary.getSprite("hit_area_couple_bet"), "bet_0_3", b, !1);
        a.rotate(-45);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a = new CBetTableButton(67, 172, s_oSpriteLibrary.getSprite("hit_area_couple_bet"),
            "bet_1_4", b, !1);
        a.rotate(-45);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a = new CBetTableButton(93, 145, s_oSpriteLibrary.getSprite("hit_area_couple_bet"), "bet_2_5", b, !1);
        a.rotate(-45);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut,
            this));
        a = new CBetTableButton(117, 121, s_oSpriteLibrary.getSprite("hit_area_couple_bet"), "bet_3_6", b, !1);
        a.rotate(-45);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a = new CBetTableButton(92, 187, s_oSpriteLibrary.getSprite("hit_area_couple_bet"), "bet_4_7", b, !1);
        a.rotate(-45);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER,
            this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a = new CBetTableButton(116, 163, s_oSpriteLibrary.getSprite("hit_area_couple_bet"), "bet_5_8", b, !1);
        a.rotate(-45);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a = new CBetTableButton(141, 138, s_oSpriteLibrary.getSprite("hit_area_couple_bet"), "bet_6_9", b, !1);
        a.rotate(-45);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a = new CBetTableButton(117, 205, s_oSpriteLibrary.getSprite("hit_area_couple_bet"), "bet_7_10", b, !1);
        a.rotate(-45);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a =
            new CBetTableButton(140, 181, s_oSpriteLibrary.getSprite("hit_area_couple_bet"), "bet_8_11", b, !1);
        a.rotate(-45);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a = new CBetTableButton(165, 155, s_oSpriteLibrary.getSprite("hit_area_couple_bet"), "bet_9_12", b, !1);
        a.rotate(-45);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER,
            this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a = new CBetTableButton(140, 223, s_oSpriteLibrary.getSprite("hit_area_couple_bet"), "bet_10_13", b, !1);
        a.rotate(-45);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a = new CBetTableButton(165, 198, s_oSpriteLibrary.getSprite("hit_area_couple_bet"), "bet_11_14", b, !1);
        a.rotate(-45);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a = new CBetTableButton(190, 172, s_oSpriteLibrary.getSprite("hit_area_couple_bet"), "bet_12_15", b, !1);
        a.rotate(-45);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a =
            new CBetTableButton(164, 242, s_oSpriteLibrary.getSprite("hit_area_couple_bet"), "bet_13_16", b, !1);
        a.rotate(-45);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a = new CBetTableButton(189, 216, s_oSpriteLibrary.getSprite("hit_area_couple_bet"), "bet_14_17", b, !1);
        a.rotate(-45);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER,
            this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a = new CBetTableButton(213, 192, s_oSpriteLibrary.getSprite("hit_area_couple_bet"), "bet_15_18", b, !1);
        a.rotate(-45);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a = new CBetTableButton(188, 262, s_oSpriteLibrary.getSprite("hit_area_couple_bet"), "bet_16_19", b, !1);
        a.rotate(-45);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a = new CBetTableButton(213, 236, s_oSpriteLibrary.getSprite("hit_area_couple_bet"), "bet_17_20", b, !1);
        a.rotate(-45);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a =
            new CBetTableButton(238, 211, s_oSpriteLibrary.getSprite("hit_area_couple_bet"), "bet_18_21", b, !1);
        a.rotate(-45);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a = new CBetTableButton(213, 282, s_oSpriteLibrary.getSprite("hit_area_couple_bet"), "bet_19_22", b, !1);
        a.rotate(-45);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER,
            this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a = new CBetTableButton(239, 254, s_oSpriteLibrary.getSprite("hit_area_couple_bet"), "bet_20_23", b, !1);
        a.rotate(-45);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a = new CBetTableButton(264, 228, s_oSpriteLibrary.getSprite("hit_area_couple_bet"), "bet_21_24", b, !1);
        a.rotate(-45);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a = new CBetTableButton(240, 300, s_oSpriteLibrary.getSprite("hit_area_couple_bet"), "bet_22_25", b, !1);
        a.rotate(-45);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a =
            new CBetTableButton(267, 272, s_oSpriteLibrary.getSprite("hit_area_couple_bet"), "bet_23_26", b, !1);
        a.rotate(-45);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a = new CBetTableButton(291, 245, s_oSpriteLibrary.getSprite("hit_area_couple_bet"), "bet_24_27", b, !1);
        a.rotate(-45);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER,
            this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a = new CBetTableButton(266, 320, s_oSpriteLibrary.getSprite("hit_area_couple_bet"), "bet_25_28", b, !1);
        a.rotate(-45);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a = new CBetTableButton(290, 293, s_oSpriteLibrary.getSprite("hit_area_couple_bet"), "bet_26_29", b, !1);
        a.rotate(-45);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a = new CBetTableButton(314, 267, s_oSpriteLibrary.getSprite("hit_area_couple_bet"), "bet_27_30", b, !1);
        a.rotate(-45);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a =
            new CBetTableButton(294, 339, s_oSpriteLibrary.getSprite("hit_area_couple_bet"), "bet_28_31", b, !1);
        a.rotate(-45);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a = new CBetTableButton(318, 311, s_oSpriteLibrary.getSprite("hit_area_couple_bet"), "bet_29_32", b, !1);
        a.rotate(-45);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER,
            this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a = new CBetTableButton(341, 285, s_oSpriteLibrary.getSprite("hit_area_couple_bet"), "bet_30_33", b, !1);
        a.rotate(-45);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a = new CBetTableButton(320, 360, s_oSpriteLibrary.getSprite("hit_area_couple_bet"), "bet_31_34", b, !1);
        a.rotate(-45);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a = new CBetTableButton(346, 329, s_oSpriteLibrary.getSprite("hit_area_couple_bet"), "bet_32_35", b, !1);
        a.rotate(-45);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a =
            new CBetTableButton(368, 305, s_oSpriteLibrary.getSprite("hit_area_couple_bet"), "bet_33_36", b, !1);
        a.rotate(-45);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a = new CBetTableButton(70, 150, s_oSpriteLibrary.getSprite("hit_area_couple_bet"), "bet_1_2", b, !1);
        a.rotate(38);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER,
            this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a = new CBetTableButton(94, 126, s_oSpriteLibrary.getSprite("hit_area_couple_bet"), "bet_2_3", b, !1);
        a.rotate(38);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a = new CBetTableButton(92, 167, s_oSpriteLibrary.getSprite("hit_area_couple_bet"), "bet_4_5", b, !1);
        a.rotate(38);
        a.addEventListener(ON_MOUSE_DOWN,
            this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a = new CBetTableButton(116, 143, s_oSpriteLibrary.getSprite("hit_area_couple_bet"), "bet_5_6", b, !1);
        a.rotate(38);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a = new CBetTableButton(116, 185, s_oSpriteLibrary.getSprite("hit_area_couple_bet"),
            "bet_7_8", b, !1);
        a.rotate(38);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a = new CBetTableButton(141, 162, s_oSpriteLibrary.getSprite("hit_area_couple_bet"), "bet_8_9", b, !1);
        a.rotate(38);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut,
            this));
        a = new CBetTableButton(140, 202, s_oSpriteLibrary.getSprite("hit_area_couple_bet"), "bet_10_11", b, !1);
        a.rotate(38);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a = new CBetTableButton(165, 180, s_oSpriteLibrary.getSprite("hit_area_couple_bet"), "bet_11_12", b, !1);
        a.rotate(38);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER,
            this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a = new CBetTableButton(165, 220, s_oSpriteLibrary.getSprite("hit_area_couple_bet"), "bet_13_14", b, !1);
        a.rotate(38);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a = new CBetTableButton(189, 197, s_oSpriteLibrary.getSprite("hit_area_couple_bet"), "bet_14_15", b, !1);
        a.rotate(38);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a = new CBetTableButton(189, 238, s_oSpriteLibrary.getSprite("hit_area_couple_bet"), "bet_16_17", b, !1);
        a.rotate(38);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a =
            new CBetTableButton(214, 212, s_oSpriteLibrary.getSprite("hit_area_couple_bet"), "bet_17_18", b, !1);
        a.rotate(38);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a = new CBetTableButton(215, 258, s_oSpriteLibrary.getSprite("hit_area_couple_bet"), "bet_19_20", b, !1);
        a.rotate(38);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER,
            this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a = new CBetTableButton(240, 230, s_oSpriteLibrary.getSprite("hit_area_couple_bet"), "bet_20_21", b, !1);
        a.rotate(38);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a = new CBetTableButton(240, 276, s_oSpriteLibrary.getSprite("hit_area_couple_bet"), "bet_22_23", b, !1);
        a.rotate(38);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a = new CBetTableButton(266, 250, s_oSpriteLibrary.getSprite("hit_area_couple_bet"), "bet_23_24", b, !1);
        a.rotate(38);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a =
            new CBetTableButton(266, 296, s_oSpriteLibrary.getSprite("hit_area_couple_bet"), "bet_25_26", b, !1);
        a.rotate(38);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a = new CBetTableButton(292, 269, s_oSpriteLibrary.getSprite("hit_area_couple_bet"), "bet_26_27", b, !1);
        a.rotate(38);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER,
            this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a = new CBetTableButton(292, 316, s_oSpriteLibrary.getSprite("hit_area_couple_bet"), "bet_28_29", b, !1);
        a.rotate(38);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a = new CBetTableButton(318, 288, s_oSpriteLibrary.getSprite("hit_area_couple_bet"), "bet_29_30", b, !1);
        a.rotate(38);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a = new CBetTableButton(319, 336, s_oSpriteLibrary.getSprite("hit_area_couple_bet"), "bet_31_32", b, !1);
        a.rotate(38);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a =
            new CBetTableButton(346, 308, s_oSpriteLibrary.getSprite("hit_area_couple_bet"), "bet_32_33", b, !1);
        a.rotate(38);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a = new CBetTableButton(346, 354, s_oSpriteLibrary.getSprite("hit_area_couple_bet"), "bet_34_35", b, !1);
        a.rotate(38);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER,
            this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a = new CBetTableButton(371, 328, s_oSpriteLibrary.getSprite("hit_area_couple_bet"), "bet_35_36", b, !1);
        a.rotate(38);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a = new CBetTableButton(57, 142, s_oSpriteLibrary.getSprite("hit_area_small_circle"), "bet_0_1_2", b, !1);
        a.addEventListener(ON_MOUSE_DOWN,
            this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a = new CBetTableButton(82, 118, s_oSpriteLibrary.getSprite("hit_area_small_circle"), "bet_0_2_3", b, !1);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a = new CBetTableButton(44, 173, s_oSpriteLibrary.getSprite("hit_area_triple_bet"),
            "bet_1_2_3", b, !1);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a = new CBetTableButton(67, 191, s_oSpriteLibrary.getSprite("hit_area_triple_bet"), "bet_4_5_6", b, !1);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a = new CBetTableButton(91, 208, s_oSpriteLibrary.getSprite("hit_area_triple_bet"), "bet_7_8_9", b, !1);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a = new CBetTableButton(116, 228, s_oSpriteLibrary.getSprite("hit_area_triple_bet"), "bet_10_11_12", b, !1);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver,
            this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a = new CBetTableButton(140, 247, s_oSpriteLibrary.getSprite("hit_area_triple_bet"), "bet_13_14_15", b, !1);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a = new CBetTableButton(165, 265, s_oSpriteLibrary.getSprite("hit_area_triple_bet"), "bet_16_17_18", b, !1);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress,
            this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a = new CBetTableButton(188, 283, s_oSpriteLibrary.getSprite("hit_area_triple_bet"), "bet_19_20_21", b, !1);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a = new CBetTableButton(214, 302, s_oSpriteLibrary.getSprite("hit_area_triple_bet"),
            "bet_22_23_24", b, !1);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a = new CBetTableButton(241, 322, s_oSpriteLibrary.getSprite("hit_area_triple_bet"), "bet_25_26_27", b, !1);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut,
            this));
        a = new CBetTableButton(268, 342, s_oSpriteLibrary.getSprite("hit_area_triple_bet"), "bet_28_29_30", b, !1);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a = new CBetTableButton(296, 362, s_oSpriteLibrary.getSprite("hit_area_triple_bet"), "bet_31_32_33", b, !1);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER,
            this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a = new CBetTableButton(323, 382, s_oSpriteLibrary.getSprite("hit_area_triple_bet"), "bet_34_35_36", b, !1);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a = new CBetTableButton(31, 164, s_oSpriteLibrary.getSprite("hit_area_small_circle"), "bet_0_1_2_3", b, !1);
        a.addEventListener(ON_MOUSE_DOWN,
            this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a = new CBetTableButton(80, 158, s_oSpriteLibrary.getSprite("hit_area_small_circle"), "bet_1_2_4_5", b, !1);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a = new CBetTableButton(105, 134, s_oSpriteLibrary.getSprite("hit_area_small_circle"),
            "bet_2_3_5_6", b, !1);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a = new CBetTableButton(104, 176, s_oSpriteLibrary.getSprite("hit_area_small_circle"), "bet_4_5_7_8", b, !1);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut,
            this));
        a = new CBetTableButton(128, 151, s_oSpriteLibrary.getSprite("hit_area_small_circle"), "bet_5_6_8_9", b, !1);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a = new CBetTableButton(128, 193, s_oSpriteLibrary.getSprite("hit_area_small_circle"), "bet_7_8_10_11", b, !1);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER,
            this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a = new CBetTableButton(152, 169, s_oSpriteLibrary.getSprite("hit_area_small_circle"), "bet_8_9_11_12", b, !1);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a = new CBetTableButton(152, 211, s_oSpriteLibrary.getSprite("hit_area_small_circle"), "bet_10_11_13_14", b, !1);
        a.addEventListener(ON_MOUSE_DOWN,
            this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a = new CBetTableButton(176, 187, s_oSpriteLibrary.getSprite("hit_area_small_circle"), "bet_11_12_14_15", b, !1);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a = new CBetTableButton(176, 230, s_oSpriteLibrary.getSprite("hit_area_small_circle"),
            "bet_13_14_16_17", b, !1);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a = new CBetTableButton(201, 205, s_oSpriteLibrary.getSprite("hit_area_small_circle"), "bet_14_15_17_18", b, !1);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut,
            this));
        a = new CBetTableButton(202, 248, s_oSpriteLibrary.getSprite("hit_area_small_circle"), "bet_16_17_19_20", b, !1);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a = new CBetTableButton(227, 222, s_oSpriteLibrary.getSprite("hit_area_small_circle"), "bet_17_18_20_21", b, !1);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER,
            this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a = new CBetTableButton(228, 267, s_oSpriteLibrary.getSprite("hit_area_small_circle"), "bet_19_20_22_23", b, !1);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a = new CBetTableButton(252, 241, s_oSpriteLibrary.getSprite("hit_area_small_circle"), "bet_20_21_23_24", b, !1);
        a.addEventListener(ON_MOUSE_DOWN,
            this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a = new CBetTableButton(254, 285, s_oSpriteLibrary.getSprite("hit_area_small_circle"), "bet_22_23_25_26", b, !1);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a = new CBetTableButton(277, 260, s_oSpriteLibrary.getSprite("hit_area_small_circle"),
            "bet_23_24_26_27", b, !1);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a = new CBetTableButton(280, 305, s_oSpriteLibrary.getSprite("hit_area_small_circle"), "bet_25_26_28_29", b, !1);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut,
            this));
        a = new CBetTableButton(304, 279, s_oSpriteLibrary.getSprite("hit_area_small_circle"), "bet_26_27_29_30", b, !1);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a = new CBetTableButton(306, 324, s_oSpriteLibrary.getSprite("hit_area_small_circle"), "bet_28_29_31_32", b, !1);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER,
            this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a = new CBetTableButton(331, 298, s_oSpriteLibrary.getSprite("hit_area_small_circle"), "bet_29_30_32_33", b, !1);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a = new CBetTableButton(333, 344, s_oSpriteLibrary.getSprite("hit_area_small_circle"), "bet_31_32_34_35", b, !1);
        a.addEventListener(ON_MOUSE_DOWN,
            this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a = new CBetTableButton(357, 317, s_oSpriteLibrary.getSprite("hit_area_small_circle"), "bet_32_33_35_36", b, !1);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a = new CBetTableButton(54, 182, s_oSpriteLibrary.getSprite("hit_area_small_circle"),
            "bet_1_2_3_4_5_6", b, !1);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a = new CBetTableButton(78, 200, s_oSpriteLibrary.getSprite("hit_area_small_circle"), "bet_4_5_6_7_8_9", b, !1);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut,
            this));
        a = new CBetTableButton(103, 218, s_oSpriteLibrary.getSprite("hit_area_small_circle"), "bet_7_8_9_10_11_12", b, !1);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a = new CBetTableButton(128, 236, s_oSpriteLibrary.getSprite("hit_area_small_circle"), "bet_10_11_12_13_14_15", b, !1);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER,
            this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a = new CBetTableButton(153, 255, s_oSpriteLibrary.getSprite("hit_area_small_circle"), "bet_13_14_15_16_17_18", b, !1);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a = new CBetTableButton(178, 274, s_oSpriteLibrary.getSprite("hit_area_small_circle"), "bet_16_17_18_19_20_21", b, !1);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a = new CBetTableButton(204, 293, s_oSpriteLibrary.getSprite("hit_area_small_circle"), "bet_19_20_21_22_23_24", b, !1);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a = new CBetTableButton(230, 312, s_oSpriteLibrary.getSprite("hit_area_small_circle"), "bet_22_23_24_25_26_27", b, !1);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a = new CBetTableButton(255, 332, s_oSpriteLibrary.getSprite("hit_area_small_circle"), "bet_25_26_27_28_29_30", b, !1);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER,
            this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a = new CBetTableButton(282, 352, s_oSpriteLibrary.getSprite("hit_area_small_circle"), "bet_28_29_30_31_32_33", b, !1);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a = new CBetTableButton(309, 372, s_oSpriteLibrary.getSprite("hit_area_small_circle"), "bet_31_32_33_34_35_36", b, !1);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a = new CBetTableButton(361, 388, s_oSpriteLibrary.getSprite("hit_area_col_bet"), "col1", b, !0);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a = new CBetTableButton(386,
            361, s_oSpriteLibrary.getSprite("hit_area_col_bet"), "col2", b, !0);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a = new CBetTableButton(410, 332, s_oSpriteLibrary.getSprite("hit_area_col_bet"), "col3", b, !0);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT,
            this._onBetNumberOut, this));
        a = new CBetTableButton(-2, 240, s_oSpriteLibrary.getSprite("hit_area_other_bet"), "first18", b, !0);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a = new CBetTableButton(47, 277, s_oSpriteLibrary.getSprite("hit_area_other_bet"), "even", b, !0);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER,
            this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a = new CBetTableButton(96, 316, s_oSpriteLibrary.getSprite("hit_area_other_bet"), "black", b, !0);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a = new CBetTableButton(147, 356, s_oSpriteLibrary.getSprite("hit_area_other_bet"), "red", b, !0);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress,
            this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a = new CBetTableButton(197, 395, s_oSpriteLibrary.getSprite("hit_area_other_bet"), "odd", b, !0);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        a = new CBetTableButton(253, 438, s_oSpriteLibrary.getSprite("hit_area_other_bet"),
            "second18", b, !0);
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        !1 === s_bMobile && (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this), a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
        g = [];
        f = []
    };
    this.unload = function() {
        for (var a = 0; a < b.getNumChildren(); a++) {
            var d = b.getChildAt(a);
            d instanceof CBetTableButton && d.unload()
        }
    };
    this.addEventListener = function(a, b, c) {
        g[a] = b;
        f[a] = c
    };
    this._onBetPress = function(a) {
        null !== a.numbers && g[ON_SHOW_BET_ON_TABLE] && g[ON_SHOW_BET_ON_TABLE].call(f[ON_SHOW_BET_ON_TABLE],
            a, !1)
    };
    this._onBetNumberOver = function(a) {
        null !== a.numbers && g[ON_SHOW_ENLIGHT] && g[ON_SHOW_ENLIGHT].call(f[ON_SHOW_ENLIGHT], a)
    };
    this._onBetNumberOut = function(a) {
        null !== a.numbers && g[ON_HIDE_ENLIGHT] && g[ON_HIDE_ENLIGHT].call(f[ON_HIDE_ENLIGHT], a)
    };
    this._init()
}

function CEnlight(b, g, f, a) {
    var d;
    this._init = function(a, b, e, f) {
        d = createBitmap(e);
        d.x = a;
        d.y = b;
        d.visible = !1;
        f.addChild(d)
    };
    this.show = function() {
        d.visible = !0
    };
    this.hide = function() {
        d.visible = !1
    };
    this.rotate = function(a) {
        d.rotation = a
    };
    this.getX = function() {
        return d.x
    };
    this.getY = function() {
        return d.y
    };
    this._init(b, g, f, a)
}

function CWheelTopAnim(b, g) {
    var f, a, d, c, h;
    this._init = function(b, g) {
        f = 0;
        h = new createjs.Container;
        h.x = b;
        h.y = g;
        s_oStage.addChild(h);
        a = [];
        for (var e = 0; e < NUM_WHEEL_TOP_FRAMES; e++) {
            var k = createBitmap(s_oSpriteLibrary.getSprite("wheel_top_" + e));
            k.visible = !1;
            h.addChild(k);
            a.push(k)
        }
        c = createBitmap(s_oSpriteLibrary.getSprite("ball_spin"));
        c.visible = !1;
        c.x = 68;
        c.y = 80;
        h.addChild(c);
        d = a[0];
        d.visible = !0
    };
    this.hideBall = function() {
        c.visible = !1
    };
    this.showBall = function() {
        c.visible = !0
    };
    this.playToFrame = function(b) {
        d.visible = !1;
        f = b;
        a[f].visible = !0;
        d = a[f]
    };
    this.stopAnim = function() {};
    this.nextFrame = function() {
        d.visible = !1;
        f++;
        a[f].visible = !0;
        d = a[f]
    };
    this.getCurrentFrame = function() {
        return f
    };
    this._init(b, g)
}

function CFiche(b, g, f, a, d) {
    var c, h, e, k, q;
    this._init = function(a, b, d, e, f) {
        q = e;
        e = s_oSpriteLibrary.getSprite("fiche_" + d);
        k = createBitmap(e);
        k.x = a;
        k.y = b;
        f ? (k.scaleX = f, k.scaleY = f) : (k.scaleX = .8, k.scaleY = .8);
        c = d;
        q.addChild(k)
    };
    this.setEndPoint = function(a, b) {
        h = new createjs.Point(k.x, k.y);
        e = new createjs.Point(a, b)
    };
    this.updatePos = function(a) {
        var b = new createjs.Point,
            b = tweenVectors(h, e, a, b);
        k.x = b.x;
        k.y = b.y
    };
    this.getSprite = function() {
        return k
    };
    this.getValue = function() {
        return c
    };
    this._init(b, g, f, a, d)
}

function CHistoryRow(b, g) {
    var f, a, d, c, h, e, k;
    this._init = function(b, g) {
		
        k = new createjs.Container;
        k.x = b;
        k.y = g;
        s_oStage.addChild(k);
        f = createBitmap(s_oSpriteLibrary.getSprite("circle_red"));
        f.visible = !1;
        k.addChild(f);
        a = createBitmap(s_oSpriteLibrary.getSprite("circle_green"));
        a.visible = !1;
        a.x = 24;
        k.addChild(a);
        d = createBitmap(s_oSpriteLibrary.getSprite("circle_black"));
        d.visible = !1;
        d.x = 48;
        k.addChild(d);
        c = new createjs.Text("a", "12px " + FONT1, "#fff");
        c.x = f.x + 10;
        c.y = f.y + 5;
        c.visible = !1;
        c.textAlign = "center";
        k.addChild(c);
        h = new createjs.Text("a", "12px " + FONT1, "#fff");
        h.x = a.x + 10;
        h.y = a.y + 5;
        h.visible = !1;
        h.textAlign = "center";
        k.addChild(h);
        e = new createjs.Text("a", "12px " + FONT1, "#fff");
        e.x = d.x + 10;
        e.y = d.y + 5;
        e.visible = !1;
        e.textAlign = "center";
        k.addChild(e)
    };
    this.showBlack = function(b) {
        e.text = b;
        f.visible = !1;
        c.visible = !1;
        a.visible = !1;
        h.visible = !1;
        d.visible = !0;
        e.visible = !0
    };
    this.showRed = function(b) {
        c.text = b;
        f.visible = !0;
        c.visible = !0;
        a.visible = !1;
        h.visible = !1;
        d.visible = !1;
        e.visible = !1
    };
    this.showGreen = function(b) {
        h.text = b;
        f.visible = !1;
        c.visible = !1;
        a.visible = !0;
        h.visible = !0;
        d.visible = !1;
        e.visible = !1
    };
    this._init(b, g);
	 
}

function CWheelAnim(b, g) {
    var f, a, d, c, h, e, k, q, m, p = null,
        r;
    this._init = function(a, b) {
        c = 0;
        f = !1;
        r = new createjs.Container;
        r.x = a;
        r.y = b;
        s_oStage.addChild(r);
        h = [];
        for (var d = 0; d < NUM_WHEEL_TOP_FRAMES; d++) {
            var t = createBitmap(s_oSpriteLibrary.getSprite("wheel_anim_" + d));
            t.visible = !1;
            r.addChild(t);
            h.push(t)
        }
        k = [];
        for (d = 0; 3 > d; d++) {
            k[d] = [];
            for (var w = 0; w < NUM_BALL_SPIN_FRAMES; w++) t = createBitmap(s_oSpriteLibrary.getSprite("ball_spin" + (d + 1) + "_" + w)), t.visible = !1, r.addChild(t), k[d].push(t)
        }
        e = [];
        for (d = 0; d < NUM_WHEEL_TOP_FRAMES; d++) t =
            createBitmap(s_oSpriteLibrary.getSprite("mask_ball_spin_" + d)), t.visible = !1, r.addChild(t), e.push(t);
        q = h[0];
        q.visible = !0;
        m = e[0];
        m.visible = !0
    };
    this.startSpin = function(b, c) {
        this.playToFrame(c);
        d = b;
        a = 1;
        f = !0
    };
    this.playToFrame = function(a) {
        q.visible = !1;
        c = a;
        h[c].visible = !0;
        q = h[c];
        m.visible = !1;
        e[c].visible = !0;
        m = e[c]
    };
    this.nextFrame = function() {
        q.visible = !1;
        c++;
        h[c].visible = !0;
        q = h[c];
        m.visible = !1;
        e[c].visible = !0;
        m = e[c]
    };
    this._ballSpin = function() {
        null !== p && (p.visible = !1);
        k[d][a].visible = !0;
        p = k[d][a];
        a++;
        a === NUM_BALL_SPIN_FRAMES -
            1 && (a = 200)
    };
    this.update = function() {
        c === NUM_WHEEL_TOP_FRAMES - 1 ? this.playToFrame(1) : this.nextFrame();
        f && this._ballSpin()
    };
    this._init(b, g)
}

function CFinalBetPanel(b, g) {
    var f, a;
    this._init = function(b, c) {
        f = [
            [0, 10, 20, 30],
            [1, 11, 21, 31],
            [2, 12, 22, 32],
            [3, 13, 23, 33],
            [4, 14, 24, 34],
            [5, 15, 25, 35],
            [6, 16, 26, 36],
            [7, 17, 27],
            [8, 18, 28],
            [9, 19, 29]
        ];
        a = new createjs.Container;
        a.x = b;
        a.y = c;
        s_oStage.addChild(a);
        for (var d = s_oSpriteLibrary.getSprite("final_bet_bg"), e = d.width / 2, g = d.height / 2, q = 0; 10 > q; q++) {
            var m = new CTextButton(e, g, d, "" + q, FONT1, "#fff", 14, !1);
            m.addEventListenerWithParams(ON_MOUSE_UP, this._onFinalBetPressed, this, {
                index: q
            });
            a.addChild(m.getSprite());
            e += d.width +
                2
        }
        a.visible = !1
    };
    this.unload = function() {
        for (var b = 0; b < a.getNumChildren(); b++)
            if (c instanceof CTextButton) {
                var c = a.getChildAt(b);
                c.unload()
            }
    };
    this.show = function() {
        a.visible = !0
    };
    this.hide = function() {
        a.visible = !1
    };
    this._onFinalBetPressed = function(a) {
        a = a.index;
        s_oGame._onShowBetOnTable({
            button: "oBetFinalsBet",
            numbers: f[a],
            bet_mult: 4 === f[a].length ? 4 : 3,
            bet_win: 4 === f[a].length ? 9 : 12,
            num_fiches: f[a].length
        }, !1);
        this.hide()
    };
    this.isVisible = function() {
        return a.visible
    };
    this._init(b, g)
}

function CNeighborsPanel() {
    var b, g, f, a, d, c, h, e, k, q, m, p, r, v, n, l;
    this._init = function() {
        m = [];
        l = new createjs.Container;
        s_oStage.addChild(l);
        var a = createBitmap(s_oSpriteLibrary.getSprite("neighbor_bg"));
        l.addChild(a);
        n = new createjs.Text(f + "$", "20px " + FONT1, "#fff");
        n.textAlign = "center";
        n.x = CANVAS_WIDTH - 56;
        n.y = CANVAS_HEIGHT - 30;
        l.addChild(n);
        e = [];
        a = new CEnlight(354, 41, s_oSpriteLibrary.getSprite("neighbor_enlight"), l);
        e.oEnlight_0 = a;
        a = new CEnlight(212, 505, s_oSpriteLibrary.getSprite("neighbor_enlight"), l);
        a.rotate(-136.8);
        e.oEnlight_1 = a;
        a = new CEnlight(586, 145, s_oSpriteLibrary.getSprite("neighbor_enlight"), l);
        a.rotate(58.1);
        e.oEnlight_2 = a;
        a = new CEnlight(268, 62, s_oSpriteLibrary.getSprite("neighbor_enlight"), l);
        a.rotate(-19.2);
        e.oEnlight_3 = a;
        a = new CEnlight(523, 84, s_oSpriteLibrary.getSprite("neighbor_enlight"), l);
        a.rotate(39);
        e.oEnlight_4 = a;
        a = new CEnlight(377, 563, s_oSpriteLibrary.getSprite("neighbor_enlight"), l);
        a.rotate(-175);
        e.oEnlight_5 = a;
        a = new CEnlight(637, 311, s_oSpriteLibrary.getSprite("neighbor_enlight"),
            l);
        a.rotate(96.2);
        e.oEnlight_6 = a;
        a = new CEnlight(142, 184, s_oSpriteLibrary.getSprite("neighbor_enlight"), l);
        a.rotate(-58.8);
        e.oEnlight_7 = a;
        a = new CEnlight(504, 530, s_oSpriteLibrary.getSprite("neighbor_enlight"), l);
        a.rotate(156.5);
        e.oEnlight_8 = a;
        a = new CEnlight(121, 357, s_oSpriteLibrary.getSprite("neighbor_enlight"), l);
        a.rotate(-97);
        e.oEnlight_9 = a;
        a = new CEnlight(421, 560, s_oSpriteLibrary.getSprite("neighbor_enlight"), l);
        a.rotate(175.6);
        e.oEnlight_10 = a;
        a = new CEnlight(574, 473, s_oSpriteLibrary.getSprite("neighbor_enlight"),
            l);
        a.rotate(135.8);
        e.oEnlight_11 = a;
        a = new CEnlight(195, 113, s_oSpriteLibrary.getSprite("neighbor_enlight"), l);
        a.rotate(-39.1);
        e.oEnlight_12 = a;
        a = new CEnlight(619, 399, s_oSpriteLibrary.getSprite("neighbor_enlight"), l);
        a.rotate(117.4);
        e.oEnlight_13 = a;
        a = new CEnlight(155, 440, s_oSpriteLibrary.getSprite("neighbor_enlight"), l);
        a.rotate(-118.2);
        e.oEnlight_14 = a;
        a = new CEnlight(442, 47, s_oSpriteLibrary.getSprite("neighbor_enlight"), l);
        a.rotate(19.7);
        e.oEnlight_15 = a;
        a = new CEnlight(290, 548, s_oSpriteLibrary.getSprite("neighbor_enlight"),
            l);
        a.rotate(-156.8);
        e.oEnlight_16 = a;
        a = new CEnlight(628, 226, s_oSpriteLibrary.getSprite("neighbor_enlight"), l);
        a.rotate(80.2);
        e.oEnlight_17 = a;
        a = new CEnlight(117, 269, s_oSpriteLibrary.getSprite("neighbor_enlight"), l);
        a.rotate(-79.2);
        e.oEnlight_18 = a;
        a = new CEnlight(484, 62, s_oSpriteLibrary.getSprite("neighbor_enlight"), l);
        a.rotate(29.6);
        e.oEnlight_19 = a;
        a = new CEnlight(181, 475, s_oSpriteLibrary.getSprite("neighbor_enlight"), l);
        a.rotate(-127.5);
        e.oEnlight_20 = a;
        a = new CEnlight(557, 112, s_oSpriteLibrary.getSprite("neighbor_enlight"),
            l);
        a.rotate(49.1);
        e.oEnlight_21 = a;
        a = new CEnlight(115, 314, s_oSpriteLibrary.getSprite("neighbor_enlight"), l);
        a.rotate(-88.9);
        e.oEnlight_22 = a;
        a = new CEnlight(463, 549, s_oSpriteLibrary.getSprite("neighbor_enlight"), l);
        a.rotate(166.4);
        e.oEnlight_23 = a;
        a = new CEnlight(333, 559, s_oSpriteLibrary.getSprite("neighbor_enlight"), l);
        a.rotate(-166.6);
        e.oEnlight_24 = a;
        a = new CEnlight(610, 183, s_oSpriteLibrary.getSprite("neighbor_enlight"), l);
        a.rotate(69);
        e.oEnlight_25 = a;
        a = new CEnlight(311, 47, s_oSpriteLibrary.getSprite("neighbor_enlight"),
            l);
        a.rotate(-7.9);
        e.oEnlight_26 = a;
        a = new CEnlight(633, 355, s_oSpriteLibrary.getSprite("neighbor_enlight"), l);
        a.rotate(106.4);
        e.oEnlight_27 = a;
        a = new CEnlight(166, 146, s_oSpriteLibrary.getSprite("neighbor_enlight"), l);
        a.rotate(-48.1);
        e.oEnlight_28 = a;
        a = new CEnlight(126, 225, s_oSpriteLibrary.getSprite("neighbor_enlight"), l);
        a.rotate(-68.3);
        e.oEnlight_29 = a;
        a = new CEnlight(541, 505, s_oSpriteLibrary.getSprite("neighbor_enlight"), l);
        a.rotate(146);
        e.oEnlight_30 = a;
        a = new CEnlight(134, 400, s_oSpriteLibrary.getSprite("neighbor_enlight"),
            l);
        a.rotate(-108.2);
        e.oEnlight_31 = a;
        a = new CEnlight(397, 40, s_oSpriteLibrary.getSprite("neighbor_enlight"), l);
        a.rotate(8.7);
        e.oEnlight_32 = a;
        a = new CEnlight(249, 530, s_oSpriteLibrary.getSprite("neighbor_enlight"), l);
        a.rotate(-146.3);
        e.oEnlight_33 = a;
        a = new CEnlight(636, 268, s_oSpriteLibrary.getSprite("neighbor_enlight"), l);
        a.rotate(87.9);
        e.oEnlight_34 = a;
        a = new CEnlight(230, 85, s_oSpriteLibrary.getSprite("neighbor_enlight"), l);
        a.rotate(-29.1);
        e.oEnlight_35 = a;
        a = new CEnlight(600, 439, s_oSpriteLibrary.getSprite("neighbor_enlight"),
            l);
        a.rotate(127.1);
        e.oEnlight_36 = a;
        v = new createjs.Container;
        l.addChild(v);
        var a = s_oSpriteLibrary.getSprite("hitarea_neighbor"),
            b = new CGfxButton(376, 72, a, !1);
        b.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, {
            index: 0
        });
        b.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, {
            index: 0
        });
        b.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, {
            index: 0
        });
        l.addChild(b.getButtonImage());
        b = new CGfxButton(415, 76, a, !1);
        b.rotate(9.2);
        b.addEventListenerWithParams(ON_MOUSE_UP,
            this._onNeighborRelease, this, {
                index: 32
            });
        b.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, {
            index: 32
        });
        b.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, {
            index: 32
        });
        l.addChild(b.getButtonImage());
        b = new CGfxButton(453, 86, a, !1);
        b.rotate(20);
        b.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, {
            index: 15
        });
        b.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, {
            index: 15
        });
        b.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, {
            index: 15
        });
        l.addChild(b.getButtonImage());
        b = new CGfxButton(490, 102, a, !1);
        b.rotate(29.4);
        b.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, {
            index: 19
        });
        b.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, {
            index: 19
        });
        b.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, {
            index: 19
        });
        l.addChild(b.getButtonImage());
        b = new CGfxButton(520, 124, a, !1);
        b.rotate(39.4);
        b.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, {
            index: 4
        });
        b.addEventListenerWithParams(ON_MOUSE_OVER,
            this._onNeighborOver, this, {
                index: 4
            });
        b.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, {
            index: 4
        });
        l.addChild(b.getButtonImage());
        b = new CGfxButton(549, 150, a, !1);
        b.rotate(48.8);
        b.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, {
            index: 21
        });
        b.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, {
            index: 21
        });
        b.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, {
            index: 21
        });
        l.addChild(b.getButtonImage());
        b = new CGfxButton(571, 181, a, !1);
        b.rotate(58.5);
        b.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, {
            index: 2
        });
        b.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, {
            index: 2
        });
        b.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, {
            index: 2
        });
        l.addChild(b.getButtonImage());
        b = new CGfxButton(588, 216, a, !1);
        b.rotate(68.7);
        b.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, {
            index: 25
        });
        b.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, {
            index: 25
        });
        b.addEventListenerWithParams(ON_MOUSE_OUT,
            this._onNeighborOut, this, {
                index: 25
            });
        l.addChild(b.getButtonImage());
        b = new CGfxButton(599, 253, a, !1);
        b.rotate(78.9);
        b.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, {
            index: 17
        });
        b.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, {
            index: 17
        });
        b.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, {
            index: 17
        });
        l.addChild(b.getButtonImage());
        b = new CGfxButton(604, 291, a, !1);
        b.rotate(90.4);
        b.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, {
            index: 34
        });
        b.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, {
            index: 34
        });
        b.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, {
            index: 34
        });
        l.addChild(b.getButtonImage());
        b = new CGfxButton(603, 330, a, !1);
        b.rotate(96.5);
        b.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, {
            index: 6
        });
        b.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, {
            index: 6
        });
        b.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, {
            index: 6
        });
        l.addChild(b.getButtonImage());
        b = new CGfxButton(596, 368, a, !1);
        b.rotate(107.5);
        b.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, {
            index: 27
        });
        b.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, {
            index: 27
        });
        b.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, {
            index: 27
        });
        l.addChild(b.getButtonImage());
        b = new CGfxButton(580, 404, a, !1);
        b.rotate(116);
        b.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, {
            index: 13
        });
        b.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver,
            this, {
                index: 13
            });
        b.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, {
            index: 13
        });
        l.addChild(b.getButtonImage());
        b = new CGfxButton(560, 438, a, !1);
        b.rotate(126.2);
        b.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, {
            index: 36
        });
        b.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, {
            index: 36
        });
        b.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, {
            index: 36
        });
        l.addChild(b.getButtonImage());
        b = new CGfxButton(534, 466, a, !1);
        b.rotate(135.7);
        b.addEventListenerWithParams(ON_MOUSE_UP,
            this._onNeighborRelease, this, {
                index: 11
            });
        b.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, {
            index: 11
        });
        b.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, {
            index: 11
        });
        l.addChild(b.getButtonImage());
        b = new CGfxButton(504, 490, a, !1);
        b.rotate(145.2);
        b.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, {
            index: 30
        });
        b.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, {
            index: 30
        });
        b.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut,
            this, {
                index: 30
            });
        l.addChild(b.getButtonImage());
        b = new CGfxButton(471, 510, a, !1);
        b.rotate(154.9);
        b.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, {
            index: 8
        });
        b.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, {
            index: 8
        });
        b.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, {
            index: 8
        });
        l.addChild(b.getButtonImage());
        b = new CGfxButton(434, 522, a, !1);
        b.rotate(165.2);
        b.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, {
            index: 23
        });
        b.addEventListenerWithParams(ON_MOUSE_OVER,
            this._onNeighborOver, this, {
                index: 23
            });
        b.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, {
            index: 23
        });
        l.addChild(b.getButtonImage());
        b = new CGfxButton(395, 529, a, !1);
        b.rotate(174.9);
        b.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, {
            index: 10
        });
        b.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, {
            index: 10
        });
        b.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, {
            index: 10
        });
        l.addChild(b.getButtonImage());
        b = new CGfxButton(357, 529, a, !1);
        b.rotate(-176.5);
        b.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, {
            index: 5
        });
        b.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, {
            index: 5
        });
        b.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, {
            index: 5
        });
        l.addChild(b.getButtonImage());
        b = new CGfxButton(319, 522, a, !1);
        b.rotate(-166);
        b.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, {
            index: 24
        });
        b.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, {
            index: 24
        });
        b.addEventListenerWithParams(ON_MOUSE_OUT,
            this._onNeighborOut, this, {
                index: 24
            });
        l.addChild(b.getButtonImage());
        b = new CGfxButton(282, 509, a, !1);
        b.rotate(-156);
        b.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, {
            index: 16
        });
        b.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, {
            index: 16
        });
        b.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, {
            index: 16
        });
        l.addChild(b.getButtonImage());
        b = new CGfxButton(247, 491, a, !1);
        b.rotate(-146);
        b.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, {
            index: 33
        });
        b.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, {
            index: 33
        });
        b.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, {
            index: 33
        });
        l.addChild(b.getButtonImage());
        b = new CGfxButton(217, 466, a, !1);
        b.rotate(-137);
        b.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, {
            index: 1
        });
        b.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, {
            index: 1
        });
        b.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, {
            index: 1
        });
        l.addChild(b.getButtonImage());
        b = new CGfxButton(193, 437, a, !1);
        b.rotate(-128);
        b.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, {
            index: 20
        });
        b.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, {
            index: 20
        });
        b.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, {
            index: 20
        });
        l.addChild(b.getButtonImage());
        b = new CGfxButton(172, 404, a, !1);
        b.rotate(-118.4);
        b.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, {
            index: 14
        });
        b.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver,
            this, {
                index: 14
            });
        b.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, {
            index: 14
        });
        l.addChild(b.getButtonImage());
        b = new CGfxButton(158, 367, a, !1);
        b.rotate(-105.7);
        b.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, {
            index: 31
        });
        b.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, {
            index: 31
        });
        b.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, {
            index: 31
        });
        l.addChild(b.getButtonImage());
        b = new CGfxButton(149, 330, a, !1);
        b.rotate(-95.5);
        b.addEventListenerWithParams(ON_MOUSE_UP,
            this._onNeighborRelease, this, {
                index: 9
            });
        b.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, {
            index: 9
        });
        b.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, {
            index: 9
        });
        l.addChild(b.getButtonImage());
        b = new CGfxButton(148, 291, a, !1);
        b.rotate(-88.2);
        b.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, {
            index: 22
        });
        b.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, {
            index: 22
        });
        b.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut,
            this, {
                index: 22
            });
        l.addChild(b.getButtonImage());
        b = new CGfxButton(154, 252, a, !1);
        b.rotate(-78);
        b.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, {
            index: 18
        });
        b.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, {
            index: 18
        });
        b.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, {
            index: 18
        });
        l.addChild(b.getButtonImage());
        b = new CGfxButton(164, 216, a, !1);
        b.rotate(-67.8);
        b.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, {
            index: 29
        });
        b.addEventListenerWithParams(ON_MOUSE_OVER,
            this._onNeighborOver, this, {
                index: 29
            });
        b.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, {
            index: 29
        });
        l.addChild(b.getButtonImage());
        b = new CGfxButton(181, 181, a, !1);
        b.rotate(-57.6);
        b.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, {
            index: 7
        });
        b.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, {
            index: 7
        });
        b.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, {
            index: 7
        });
        l.addChild(b.getButtonImage());
        b = new CGfxButton(205, 150, a, !1);
        b.rotate(-48.8);
        b.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, {
            index: 28
        });
        b.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, {
            index: 28
        });
        b.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, {
            index: 28
        });
        l.addChild(b.getButtonImage());
        b = new CGfxButton(233, 124, a, !1);
        b.rotate(-39.1);
        b.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, {
            index: 12
        });
        b.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, {
            index: 12
        });
        b.addEventListenerWithParams(ON_MOUSE_OUT,
            this._onNeighborOut, this, {
                index: 12
            });
        l.addChild(b.getButtonImage());
        b = new CGfxButton(265, 102, a, !1);
        b.rotate(-29.9);
        b.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, {
            index: 35
        });
        b.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, {
            index: 35
        });
        b.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, {
            index: 35
        });
        l.addChild(b.getButtonImage());
        b = new CGfxButton(300, 86, a, !1);
        b.rotate(-19.2);
        b.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, {
            index: 3
        });
        b.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, {
            index: 3
        });
        b.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, {
            index: 3
        });
        l.addChild(b.getButtonImage());
        b = new CGfxButton(338, 76, a, !1);
        b.rotate(-8.5);
        b.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, {
            index: 26
        });
        b.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, {
            index: 26
        });
        b.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, {
            index: 26
        });
        l.addChild(b.getButtonImage());
        this._initNeighbors();
        a = s_oSpriteLibrary.getSprite("but_game_bg");
        r = new CTextButton(CANVAS_WIDTH - a.width / 2 - 10, 30, a, TEXT_EXIT, FONT1, "#fff", 14, !1);
        r.addEventListener(ON_MOUSE_UP, this.onExit, this);
        l.addChild(r.getButtonImage());
        this.reset();
        this.hide()
    };
    this.unload = function() {
        for (var a = 0; a < l.getNumChildren(); a++)
            if (b instanceof CGfxButton) {
                var b = l.getChildAt(a);
                b.unload()
            }
    };
    this.showPanel = function(a, b) {
        g = a;
        f = b;
        q = [];
        n.text = b + "$";
        l.visible = !0
    };
    this.hide = function() {
        l.visible = !1
    };
    this._initNeighbors = function() {
        d = [
            [3, 26, 0, 32, 15],
            [16, 33, 1, 20, 14],
            [4, 21, 2, 25, 17],
            [12, 35, 3, 26, 0],
            [15, 19, 4, 21, 2],
            [23, 10, 5, 24, 16],
            [17, 34, 6, 27, 13],
            [18, 29, 7, 28, 12],
            [11, 30, 8, 23, 10],
            [14, 31, 9, 22, 18],
            [8, 23, 10, 5, 24],
            [13, 36, 11, 30, 8],
            [7, 28, 12, 35, 3],
            [6, 27, 13, 36, 11],
            [1, 20, 14, 31, 9],
            [0, 32, 15, 19, 4],
            [5, 24, 16, 33, 1],
            [2, 25, 17, 34, 6],
            [9, 22, 18, 29, 7],
            [32, 15, 19, 4, 21],
            [33, 1, 20, 14, 31],
            [19, 4, 21, 2, 25],
            [31, 9, 22, 18, 29],
            [30, 8, 23, 10, 5],
            [10, 5, 24, 16, 33],
            [21, 2, 25, 17, 34],
            [35, 3, 26, 0, 32],
            [34, 6, 27, 13, 36],
            [29, 7, 28, 12, 35],
            [22, 18, 29, 7, 28],
            [36, 11, 30, 8, 23],
            [20, 14, 31, 9, 22],
            [26,
                0, 32, 15, 19
            ],
            [24, 16, 33, 1, 20],
            [25, 17, 34, 6, 27],
            [28, 12, 35, 3, 26],
            [27, 13, 36, 11, 30]
        ];
        p = [];
        p.oAttach_0 = new createjs.Point(363, 59);
        p.oAttach_32 = new createjs.Point(402, 65);
        p.oAttach_15 = new createjs.Point(440, 76);
        p.oAttach_19 = new createjs.Point(473, 91);
        p.oAttach_4 = new createjs.Point(505, 110);
        p.oAttach_21 = new createjs.Point(537, 139);
        p.oAttach_2 = new createjs.Point(556, 168);
        p.oAttach_25 = new createjs.Point(578, 205);
        p.oAttach_17 = new createjs.Point(588, 240);
        p.oAttach_34 = new createjs.Point(592, 283);
        p.oAttach_6 = new createjs.Point(592,
            321);
        p.oAttach_27 = new createjs.Point(585, 356);
        p.oAttach_13 = new createjs.Point(570, 392);
        p.oAttach_36 = new createjs.Point(550, 425);
        p.oAttach_11 = new createjs.Point(523, 457);
        p.oAttach_30 = new createjs.Point(491, 479);
        p.oAttach_8 = new createjs.Point(460, 500);
        p.oAttach_23 = new createjs.Point(420, 511);
        p.oAttach_10 = new createjs.Point(383, 521);
        p.oAttach_5 = new createjs.Point(342, 519);
        p.oAttach_24 = new createjs.Point(300, 511);
        p.oAttach_16 = new createjs.Point(267, 498);
        p.oAttach_33 = new createjs.Point(234, 479);
        p.oAttach_1 =
            new createjs.Point(203, 457);
        p.oAttach_20 = new createjs.Point(177, 428);
        p.oAttach_14 = new createjs.Point(158, 392);
        p.oAttach_31 = new createjs.Point(143, 356);
        p.oAttach_9 = new createjs.Point(138, 318);
        p.oAttach_22 = new createjs.Point(133, 279);
        p.oAttach_18 = new createjs.Point(138, 240);
        p.oAttach_29 = new createjs.Point(150, 202);
        p.oAttach_7 = new createjs.Point(167, 170);
        p.oAttach_28 = new createjs.Point(193, 137);
        p.oAttach_12 = new createjs.Point(220, 112);
        p.oAttach_35 = new createjs.Point(254, 88);
        p.oAttach_3 = new createjs.Point(287,
            74);
        p.oAttach_26 = new createjs.Point(324, 65)
    };
    this.reset = function() {
        c = [];
        for (var b = 0; b < NUMBERS_TO_BET; b++) c[b] = 0;
        if (h)
            for (b = 0; b < h.length; b++) v.removeChild(h[b].getSprite());
        h = [];
        k = [];
        a = 0
    };
    this.clearLastBet = function() {
        if (0 !== m.length) {
            var b = m.pop(),
                d = s_oGameSettings.getFicheValues(g);
            c[b] -= d;
            c[b] = roundDecimal(c[b], 1);
            d = k[b];
            0 < d.length ? v.removeChild(d[d.length - 1].getSprite()) : (m = [], c[b] = 0);
            h.pop();
            k[b].pop();
            if (0 === m.length)
                for (h = [], k = [], b = 0; b < NUMBERS_TO_BET; b++) c[b] = 0;
            a = 0
        }
    };
    this.onExit = function() {
        this.hide()
    };
    this.addFicheOnNeighborTable = function() {
        var e = s_oGameSettings.getFicheValues(g);
        if (!(a + 5 * e > f))
            if (a + 5 * e > MAX_BET) s_oGame.showMsgBox(TEXT_ERROR_MAX_BET_REACHED);
            else {
                a += 5 * e;
                a = roundDecimal(a, 1);
                var h = f - a,
                    h = roundDecimal(h, 1);
                n.text = h + "$";
                !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || createjs.Sound.play("chip");
                c[b] += e;
                c[b] = roundDecimal(c[b], 1);
                e = s_oGameSettings.generateFichesPileByIndex(c[b]);
                e.sort();
                this._removeFichesPile(k[b]);
                k[b] = [];
                for (var h = p["oAttach_" + b].x, l = p["oAttach_" + b].y, r = 0; r < e.length; r++) this._attachFichesPile(e[r],
                    b, h, l), l -= 5;
                q.push(b);
                s_oGame._onShowBetOnTableFromNeighbors({
                    button: "oBetNeighbors",
                    numbers: d[b],
                    bet_mult: 5,
                    bet_win: 7.2,
                    value: g,
                    num_fiches: 5,
                    num_clicked: b
                }, !1);
                m.push(b)
            }
    };
    this._attachFichesPile = function(a, b, c, d) {
        a = new CFiche(c, d, a, v, 1.3);
        k[b].push(a);
        h.push(a)
    };
    this._removeFichesPile = function(a) {
        for (var b in a) v.removeChild(a[b].getSprite())
    };
    this.searchForNumClicked = function() {
        for (var a = 0; a < q.length; a++)
            if (q[a] === b) return !0;
        return !1
    };
    this._onNeighborRelease = function(a) {
        b = a.index;
        this.addFicheOnNeighborTable()
    };
    this.rebet = function(a) {
        b = a;
        this.addFicheOnNeighborTable()
    };
    this._onNeighborOver = function(a) {
        a = d[a.index];
        for (var b = 0; b < a.length; b++) e["oEnlight_" + a[b]].show()
    };
    this._onNeighborOut = function(a) {
        a = d[a.index];
        for (var b = 0; b < a.length; b++) e["oEnlight_" + a[b]].hide()
    };
    this.isVisible = function() {
        return l.visible
    };
    this._init()
}

function CGameOver() {
    var b, g, f, a, d;
    this._init = function() {
        d = new createjs.Container;
        s_oStage.addChild(d);
        var c = createBitmap(s_oSpriteLibrary.getSprite("game_over_bg"));
        d.addChild(c);
        b = new createjs.Text(TEXT_NO_MONEY, "36px " + FONT1, "#fff");
        b.textAlign = "center";
        b.x = CANVAS_WIDTH / 2;
        b.y = 140;
        d.addChild(b);
        g = new createjs.Text(TEXT_RECHARGE_MSG, "20px " + FONT1, "#fff");
        g.textAlign = "center";
        g.x = CANVAS_WIDTH / 2;
        g.y = 240;
        d.addChild(g);
        f = new CTextButton(CANVAS_WIDTH / 2, 400, s_oSpriteLibrary.getSprite("but_game_bg"), TEXT_RECHARGE,
            FONT1, "#fff", 14, !1);
        f.addEventListener(ON_MOUSE_UP, this._onRecharge, this);
        d.addChild(f.getSprite());
        a = new CTextButton(CANVAS_WIDTH / 2, 440, s_oSpriteLibrary.getSprite("but_game_bg"), TEXT_EXIT, FONT1, "#fff", 14, !1);
        a.addEventListener(ON_MOUSE_UP, this._onExit, this);
        d.addChild(a.getSprite());
        this.hide()
    };
    this.unload = function() {
        f.unload();
        a.unload()
    };
    this.show = function() {
        d.visible = !0
    };
    this.hide = function() {
        d.visible = !1
    };
    this._onRecharge = function() {
        s_oGame.onRecharge()
    };
    this._onExit = function() {
        s_oGame.onExit()
    };
    this._init()
};