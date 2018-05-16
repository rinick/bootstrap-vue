import {loadFixture, testVM, nextTick} from '../../../tests/utils'

describe('modal', async () => {
  beforeEach(loadFixture(__dirname, 'modal'))
  testVM()

  it('Should bind event handler', async () => {
    const { app } = window

    expect(app.$refs.modalButton).toHaveProperty('__BV_boundEventListeners__.click')
  })

  it('Should unbind event handler', async () => {
    const { app } = window

    app.enableModal = false
    await nextTick()
    expect(app.$refs.button).not.toHaveProperty('__BV_boundEventListeners__.click')
  })

  it('Should show hide modal', async () => {
    const { app: { $refs } } = window
    const { modalButton, modal } = $refs

    // show the modal
    modalButton.click()
    await nextTick()
    expect(modal.$el.classList.contains('show'))

    // hide the modal
    let clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true, view: window })
    modal.$el.dispatchEvent(clickEvent)
    await nextTick()
    expect(!modal.$el.classList.contains('show'))
  })
})
