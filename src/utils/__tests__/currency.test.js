import currency from 'utils/currency'

describe('test utils/currency.js', () => {
  it('with default currency', () => {
    expect(currency(1)).toBe('$1.00')
  })

  it('with ￥ currency', () => {
    expect(currency(1, '￥')).toBe('￥1.00')
  })

  it('with ￥ currency not float cause error', () => {
    expect(currency(1, '￥')).not.toBe('￥1')
  })
})