<template>
  <div class="c-invite">
    <div class="content flex-col">
      <div class="frm-canvas flex-col" id="frm-canvas">
        <canvas id="canvas"></canvas>
        <img :src="cover" id="cover">
        <div id="tips" @click="showNotice">
          <i class="icon-yike icon-information"></i>
          <span>分享规则</span>
        </div>
      </div>
      <div class="frm-notice flex-row">
        <div class="box-notice">
          <span>长按保存图片，邀请好友报名赚￥{{benefits.commission}}</span>
          <a :href="`${studentDomain}/?v=1#course/rank/${this.$route.query.sn}`">查看邀请榜</a>
        </div>
      </div>
      <div class="frm-picker flex-row">
        <div class="box-picker" v-for="(card, idx) in cards" :key="idx">
          <div class="btn-picker" :class="{active: active === idx}" @click="drawCard(idx)">
            <img :src="card.icon"/>
            <div class="btn-on flex-col">
              <i class="icon-yike icon-select"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <modal-notice title="佣金规则" confirm="知道了" :isShow="isShowNotice" v-on:close="showNotice(false)">
      <li>每成功邀请1名好友报名并听课，可获得￥{{benefits.commission}}佣金</li>
      <li>佣金将在好友听课（未退款）72小时后结算，可通过【账户资金】提现至微信零钱佣金将在好友听课（未退款）72小时后结算，可通过【账户资金】提现至微信零钱</li>
    </modal-notice>
  </div>
</template>

<script>
  import ModalNotice from '@/components/modal/Notice'

  export default {
    name: 'invite',
    components: {ModalNotice},
    data() {
      return {
        isShowNotice: false,
        cards: [],
        benefits: {},
        active: 0,
        cover: ''
      }
    },
    computed: {
      studentDomain: () => {
        return `${window.location.protocol}//student.${window.location.host}`
      }
    },
    created() {
      this.axios
        .get('/api/promote-invitation', {
          params: {
            sn: this.$route.query.sn
          }
        })
        .then(res => {
          if (res.data.error === '0') {
            this.cards = res.data.data.cards
            this.benefits = res.data.data.benefits
            this.drawCard(0);
          }
        })
    },
    mounted() {
      window.onresize = this.canvasResize
    },
    methods: {
      showNotice(force) {
        this.isShowNotice = force || !this.isShowNotice
      },
      drawCard(idx) {
        this.active = idx
        let card = this.cards[idx]
        let that=this
        let canvas = document.getElementById('canvas');
        let context = canvas.getContext('2d');
        canvas.width = card.base.size[0]
        canvas.height = card.base.size[1]
        let img = new Image();
        img.crossOrigin = 'Anonymous';
        img.src = card.base.src
        img.onload = function () {
          // base
          context.drawImage(img, 0, 0, card.base.size[0], card.base.size[1]);
          // qrcode
          let qrcode = card.qrcode
          qrcode.img = new Image();
          qrcode.img.crossOrigin = "Anonymous";
          qrcode.img.src = card.qrcode.src;
          qrcode.img.onload = function () {
            context.drawImage(qrcode.img, qrcode.offset[0], qrcode.offset[1], qrcode.size[0], qrcode.size[1]);
            console.log(that.cover)
            that.cover = canvas.toDataURL("image/jpeg", 1)
          }
          // avatar
          if (card.avatar) {
            let avatar = card.avatar
            avatar.img = new Image();
            avatar.img.src = avatar.src
            avatar.img.onload = () => {
              context.drawImage(avatar.img, avatar.offset[0], avatar.offset[1], avatar.size[0], avatar.size[1])
            }
          }
          // desc
          let desc = card.desc || []
          desc.forEach((v) => {
            v.font && (context.font = v.font)
            v.style && (context.fillStyle = v.style)
            v.align && (context.textAlign = v.align)
            v.bsline && (context.textBaseline = v.bsline)
            context.fillText(v.text, v.offset[0], v.offset[1])
          })
        }
        this.canvasResize()
      },
      canvasResize() {
        let frm = document.getElementById('frm-canvas')
        let cas = document.getElementById('canvas')
        let cover = document.getElementById('cover')
        let pw = cas.style.width
        let ph = cas.style.height
        if (frm.clientWidth / cas.clientWidth < frm.clientHeight / cas.clientHeight) {
          cas.style.width = frm.clientWidth * 0.8 + 'px'
          cover.style.width = frm.clientWidth * 0.8 +  'px'
        } else {
          cas.style.height = frm.clientHeight * 0.9 + 'px';
          cover.style.height = frm.clientHeight * 0.9 + 'px'
        }
        if (pw !== cas.style.width || ph !== cas.style.height) {
          this.canvasResize()
        }
      }
    }
  }
</script>

<style scoped>

  .c-invite {
    height: 100%;
    width: 100%;
  }

  .content {
    justify-content: flex-end;
    height: 100%;
    width: 100%;
    background: #333;
  }

  .frm-canvas {
    position: relative;
    flex-grow: 1;
    width: 100%;
    top:.5rem;
    overflow: hidden;
  }
  #cover{
    position: absolute;
    z-index: 0;
  }
  #tips {
    display: flex;
    align-items: center;
    position: absolute;
    top: 12%;
    right: 0;
    width: 1.5rem;
    height: .48rem;
    padding-left: .12rem;
    background: linear-gradient(45grad, rgba(151, 169, 219, 0.9), rgba(128, 150, 229, 0.9));
    border-radius: .24rem 0 0 .24rem;
    color: #fff;
    font-size: .24rem !important;
    letter-spacing: .01rem;
    box-shadow: 0 .02rem .05rem rgba(0, 0, 0, 0.25);
  }

  #tips > span {
    margin-left: .12rem;
  }

  #tips > i {
    font-size: .24rem;
  }

  .frm-notice {
    height: 1.26rem;
    width: 100%;
  }

  .box-notice {
    font-size: .24rem;
    height: .36rem;
    letter-spacing: 1px;
    color: #fff;
  }

  .box-notice > span {
    font-weight: bold;
  }

  .box-notice > a {
    margin-left: .24rem;
    width: 1.36rem;
    padding: .02rem .1rem;
    border-radius: .004rem;
    background: #5774ed;
    color: #fff;
    text-decoration: none;
  }

  .frm-picker {
    display: -webkit-box;
    -webkit-box-align: center;
    -webkit-box-pack: center;
    overflow-x: scroll;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    width: 100%;
    height: 2rem;
    background: #fff;
  }

  .box-picker {
    padding: .15rem;
  }

  .box-picker:first-child {
    margin-left: .15rem;
  }

  .btn-picker {
    position: relative;
    height: 1.28rem;
    width: 1.28rem;
    border-radius: .08rem;
  }

  .btn-picker > img {
    width: 100%;
    height: 100%;
  }

  .btn-on {
    display: none;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4)
  }

  .btn-on > i {
    font-size: .6rem;
    color: #fff;
  }

  .active .btn-on {
    display: flex;
  }
</style>
