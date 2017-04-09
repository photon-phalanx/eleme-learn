<template>
  <div class="img-wrapper">
    <input type="file" class="real-logic" @change="dealUpload($event)" ref="file"/>
    <div class="img-chosen" v-if="openFlag" ref="imgChosen">
      <canvas class="image" ref="image"></canvas>
      <canvas class="cover" ref="cover" @touchmove="touchmove($event)" @touchstart="touchstart($event)"
              @touchend="touchend($event)"></canvas>
      <div class="button-group">
        <button class="resetButton" @click="reset">取消</button>
        <button class="submitButton" @click="submit">提交</button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  function detectVerticalSquash (img) {
    if (/png$/i.test(img.src)) {
      return 1
    }
    let ih = img.naturalHeight
    let canvas = document.createElement('canvas')
    canvas.width = 1
    canvas.height = ih
    let ctx = canvas.getContext('2d')
    ctx.drawImage(img, 0, 0)
    let data = ctx.getImageData(0, 0, 1, ih).data

    let sy = 0
    let ey = ih
    let py = ih
    while (py > sy) {
      const alpha = data[(py - 1) * 4 + 3]
      if (alpha === 0) {
        ey = py
      } else {
        sy = py
      }
      py = (ey + sy) >> 1
    }
    const ratio = (py / ih)
    return (ratio === 0) ? 1 : ratio
  }
  // http://stackoverflow.com/questions/11929099/html5-canvas-drawimage-ratio-bug-ios
  function drawImageIOSFix (ctx, img, sx, sy, sw, sh, dx, dy, dw, dh) {
    const vertSquashRatio = detectVerticalSquash(img)
    ctx.drawImage(img, sx * vertSquashRatio, sy * vertSquashRatio,
      sw * vertSquashRatio, sh * vertSquashRatio,
      dx, dy, dw, dh)
  }
  export default {
    data () {
      return {
        imgData: null,
        selectX: 0,
        selectY: 0,
        selectWidth: 200,
        selectHeight: 200,
        imgWidth: 0,
        imgHeight: 0,
        openFlag: false,
        dragFlag: false,
        dragStartX: null,
        dragStartY: null
      }
    },
    mounted () {
    },
    props: [],
    methods: {
      dealUpload (event) {
        let self = this
        let file = this.$refs.file.files[0]
        if (!/image\/\w+/.test(file.type)) {
          self.$store.commit('commitMsg', '选择的不是图片，请重新选择')
          self.imgData = null
          return false
        }
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = function (f) {
          self.imgData = this.result
          self.openFlag = true
          // 至此，图片已经读完了，接下来就要去显示出来
          self.$nextTick(() => {
            self.print()
          })
        }
      },
      print () {
        let self = this
        let canvas = self.$refs.image
        let content = canvas.getContext('2d')
        let boxWidth = window.innerWidth
        let boxHeight = window.innerHeight
        content.clearRect(0, 0, boxWidth, boxHeight)
        let img = new Image()
        img.src = self.imgData
        img.onload = function () {
          let imgScale = img.width / img.height
          let boxScale = boxWidth / boxHeight
          // 图片和页面的宽高比，得到图片的缩放
          if (imgScale <= boxScale) {
            self.imgHeight = boxHeight
            self.imgWidth = boxHeight * imgScale
          } else {
            self.imgWidth = boxWidth
            self.imgHeight = boxWidth / imgScale
          }
          // 选择框也要比较 1是因为我的选择框长宽一样

          if (imgScale < 1) {
            self.selectWidth = self.imgWidth
            self.selectHeight = self.imgWidth
          } else {
            self.selectWidth = self.imgHeight
            self.selectHeight = self.imgHeight
          }
          console.log(img.width)
          // 会有模糊的问题，所以统一使用2倍，详情可以百度
          canvas.height = 2 * self.imgHeight
          canvas.width = 2 * self.imgWidth
          canvas.style.width = self.imgWidth + 'px'
          canvas.style.height = self.imgHeight + 'px'
          let vertSquashRatio = detectVerticalSquash(img)
          console.log(img)
          content.drawImage(img, 0, 0, 2 * self.imgWidth * vertSquashRatio, 2 * self.imgHeight * vertSquashRatio)
          self.drawCut()
        }
      },
      drawCut () {
        let self = this
        let canvas = self.$refs.cover
        let content = canvas.getContext('2d')

        canvas.height = 2 * self.imgHeight
        canvas.width = 2 * self.imgWidth

        // content.style.display = 'block'
        canvas.style.width = self.imgWidth + 'px'
        canvas.style.height = self.imgHeight + 'px'
        content.fillStyle = 'rgba(0, 0, 0, 0.7)'
        console.log(2 * self.imgWidth + ' ' + 2 * self.imgHeight)
        content.fillRect(0, 0, 2 * self.imgWidth, 2 * self.imgHeight)
        content.clearRect(2 * self.selectX, 2 * self.selectY, 2 * self.selectWidth, 2 * self.selectHeight)
      },
      touchmove (event) {
        if (this.dragFlag) {
          if (this.selectHeight === this.imgHeight) {
            // 除以5来减少滑动速度,下同
            let offsetX = (event.touches[0].pageX - this.dragStartX) / 5
            console.log('offset!' + offsetX)
            this.selectX = this.selectX + offsetX
            if (this.selectX <= 0) this.selectX = 0
            if (this.selectX > this.imgWidth - this.selectWidth) this.selectX = this.imgWidth - this.selectWidth
          } else {
            let startY = this.selectY
            let offsetY = (event.touches[0].pageY - this.dragStartY) / 5
            this.selectY = startY + offsetY
            if (this.selectY <= 0) this.selectY = 0
            if (this.selectY > this.imgHeight - this.selectHeight) this.selectY = this.imgHeight - this.selectHeight
          }
          this.drawCut()
        }
      },
      touchstart (event) {
        this.dragFlag = true
        this.dragStartX = event.touches[0].pageX
        this.dragStartY = event.touches[0].pageY
      },
      touchend () {
        this.dragFlag = false
      },
      reset () {
        this.imgData = null
        this.openFlag = false
      },
      submit () {
        let self = this
        let width = 60
        let height = 60
        let c = document.createElement('canvas')
        c.width = width
        c.height = height
        let ctx = c.getContext('2d')
        let images = new Image()
        images.src = self.imgData
        images.onload = function () {
          let scale = window.innerWidth === self.imgWidth ? images.width / window.innerWidth : images.height / window.innerHeight
          console.log('scale' + scale)
          console.log('submit' + images.width + ' ' + images.height)
          console.log('clip:' + self.selectX + ' ' + self.selectY)
          console.log('clipwidth' + self.selectWidth + ' ' + self.selectHeight)
          drawImageIOSFix(ctx, images, scale * self.selectX, scale * self.selectY,
            scale * self.selectWidth, scale * self.selectHeight, 0, 0, width, height)
          self.imgData = c.toDataURL('image/jpeg', 0.7)
          console.log(self.imgData)
          // test
          self.$store.commit('commitMsg', '上传成功')
          self.$store.commit('updateAvatar', self.imgData)
          self.openFlag = false
        }
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../assets/css/color.scss";
  .img-wrapper {
    .real-logic {
      opacity: 0;
    }
    .img-chosen {
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 799;
      background-color: rgb(0, 0, 0);
      .image, .cover {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 800;
      }
      .cover {
        z-index: 801;
      }
      .button-group {
        position: fixed;
        left: 0;
        bottom: 10px;
        width: 100%;
        height: 35px;
        z-index: 802;
        * {
          display: inline-block;
          box-sizing: border-box;
          width: 49%;
          height: 100%;
          border: none;
          border-radius: 10px;
          font-size: 20px;
          color: #fff;
        }
        .submitButton {
          background-color: $green;
        }
        .resetButton {
          background-color: $grey;
        }
      }
    }
  }
</style>
