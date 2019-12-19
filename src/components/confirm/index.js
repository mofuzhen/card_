import './style.less';
import dialoger from '../dialoger'
// import * as dom from '../../utils/dom'

const Confirm = {}

Confirm.installed = false

Confirm.install = (Vue, options = {}) => {
  if (Vue.installed) return
  Vue.prototype.$confirm = (title = '', option = {}) => {
    option = {
      cancelText: '取消',
      confirmText: '确定',
      cancelColor: '#999',
      confirmColor: '#ff4d4a',
      cancelShow: true,    // 显示取消按钮
      confirmShow: true,   // 显示确定按钮
      actionReverse: false,// 默认 右确定 左取消
      confirmClose: true,  // 确定按钮自动关闭
      renderWithHtml: false,  // 用 html 渲染body
      width: '65%',
      ...options,
      ...option
    }
    return new Promise(resolve => {
      const ConfirmComp = Vue.extend({
        components: { dialoger },
        data() {
          return {
            showDialog: false
          }
        },
        computed: {
          actions() {
            const actions = [
              { text: option.cancelText, color: option.cancelColor, show: option.cancelShow, confirm: false }, // 取消
              { text: option.confirmText, color: option.confirmColor, show: option.confirmShow, confirm: true }, // 确定
            ]
            // 翻转按钮
            return option.actionReverse ? actions.reverse() : actions
          }
        },
        methods: {
          handleAction(confirm, e) {
            e.target.style.opacity = '.5'
            setTimeout(_ => {
              e.target.style.opacity = '1'
            }, 200)
            if (option.confirmClose) {
              this.close()
            }
            console.log(1111)
            resolve({ confirm, component: this })
          },
          close() {
            this.showDialog = false
            removeConfirmVmTpl()
          }
        },
        render(h) {
          return (
            <dialoger show={ this.showDialog } onChange={ statu => this.showDialog = statu } hide-on-blur={ false } width={ option.width }>
              <div class='confirm'>
                <div class='confirm-body'>
                  <div>{ option.renderWithHtml || title }</div>
                </div>
                <div class='confirm-footer'>
                  { this.actions.map((item, i) => {
                      return item.show
                      ? <span key={ i } onClick={ e => this.handleAction(item.confirm, e) } style={{ color: item.color }}>{ item.text }</span>
                      : ""
                    })
                  }
                </div>
              </div>
            </dialoger>
          )
        }
      })
      const confirmVm = new ConfirmComp()
      const confirmVmTpl = confirmVm.$mount().$el
      document.body.appendChild(confirmVmTpl)

      confirmVm.showDialog = true

      function removeConfirmVmTpl() {
        setTimeout(() => {
          document.body.removeChild(confirmVmTpl);
        }, 300)
      }

      Confirm.installed = true
    })
  }
}

export default Confirm