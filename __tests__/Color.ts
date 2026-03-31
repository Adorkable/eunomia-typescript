import {
  colorTypeToHexString,
  colorTypeWithAlphaToHexString,
  colorHexStringToColorType,
  colorGradientToCSS,
  colorSetToEvenColorGradient,
  ColorGradient
} from '../src'

test('colorTypeToHexString', () => {
  expect(colorTypeToHexString(0xff0000)).toEqual('#ff0000')
  expect(colorTypeToHexString(0x0000ff)).toEqual('#0000ff')
  expect(colorTypeToHexString(0x000000)).toEqual('#000000')
  expect(colorTypeToHexString(0xffffff)).toEqual('#ffffff')
  expect(colorTypeToHexString(0x00ff00)).toEqual('#00ff00')
  expect(colorTypeToHexString(0x0a0b0c)).toEqual('#0a0b0c')
})

test('colorTypeWithAlphaToHexString', () => {
  expect(colorTypeWithAlphaToHexString(0xff0000, 0)).toEqual('#ff000000')
  expect(colorTypeWithAlphaToHexString(0xff0000, 0.5)).toEqual('#ff000080')
  expect(colorTypeWithAlphaToHexString(0x000000, 0)).toEqual('#00000000')
  expect(colorTypeWithAlphaToHexString(0xffffff, 0.5)).toEqual('#ffffff80')
})

test('colorHexStringToColorType', () => {
  expect(colorHexStringToColorType('#ff0000')).toEqual(0xff0000)
  expect(colorHexStringToColorType('#0000ff')).toEqual(0x0000ff)
  expect(colorHexStringToColorType('#000000')).toEqual(0x000000)
  expect(colorHexStringToColorType('#ffffff')).toEqual(0xffffff)
})

test('colorHexStringToColorType roundtrips with colorTypeToHexString', () => {
  const colors = [0xff0000, 0x00ff00, 0x0000ff, 0x123456, 0xabcdef]
  colors.forEach(color => {
    expect(colorHexStringToColorType(colorTypeToHexString(color))).toEqual(color)
  })
})

test('colorGradientToCSS linear', () => {
  const gradient: ColorGradient = {
    type: { linear: true, direction: 90 },
    colorStops: [
      { color: 0xff0000, location: 0 },
      { color: 0x0000ff, location: 1 }
    ]
  }
  expect(colorGradientToCSS(gradient)).toEqual(
    'linear-gradient(90deg, #ff0000 0%, #0000ff 100%)'
  )
})

test('colorGradientToCSS linear with multiple stops', () => {
  const gradient: ColorGradient = {
    type: { linear: true, direction: 45 },
    colorStops: [
      { color: 0xff0000, location: 0 },
      { color: 0x00ff00, location: 0.5 },
      { color: 0x0000ff, location: 1 }
    ]
  }
  expect(colorGradientToCSS(gradient)).toEqual(
    'linear-gradient(45deg, #ff0000 0%, #00ff00 50%, #0000ff 100%)'
  )
})

test('colorGradientToCSS radial circle with numeric size', () => {
  const gradient: ColorGradient = {
    type: {
      radial: true,
      shape: { circle: true, circleSize: 50 },
      horizontalPosition: 'center',
      verticalPosition: 'center'
    },
    colorStops: [
      { color: 0xff0000, location: 0 },
      { color: 0x0000ff, location: 1 }
    ]
  }
  expect(colorGradientToCSS(gradient)).toEqual(
    'radial-gradient(circle 50px at center center, #ff0000 0%, #0000ff 100%)'
  )
})

test('colorGradientToCSS radial circle with string size', () => {
  const gradient: ColorGradient = {
    type: {
      radial: true,
      shape: { circle: true, circleSize: 'closest-side' },
      horizontalPosition: 0.5,
      verticalPosition: 0.5
    },
    colorStops: [
      { color: 0xff0000, location: 0 },
      { color: 0x0000ff, location: 1 }
    ]
  }
  expect(colorGradientToCSS(gradient)).toEqual(
    'radial-gradient(circle closest-side at 50% 50%, #ff0000 0%, #0000ff 100%)'
  )
})

test('colorSetToEvenColorGradient two colors', () => {
  const result = colorSetToEvenColorGradient([0xff0000, 0x0000ff])
  expect(result.colorStops).toHaveLength(2)
  expect(result.colorStops[0]).toEqual({ color: 0xff0000, location: 0 })
  expect(result.colorStops[1]).toEqual({ color: 0x0000ff, location: 1 })
  expect('linear' in result.type).toBe(true)
})

test('colorSetToEvenColorGradient three colors', () => {
  const result = colorSetToEvenColorGradient([0xff0000, 0x00ff00, 0x0000ff])
  expect(result.colorStops).toHaveLength(3)
  expect(result.colorStops[0].location).toEqual(0)
  expect(result.colorStops[1].location).toBeCloseTo(0.5)
  expect(result.colorStops[2].location).toEqual(1)
})

test('colorSetToEvenColorGradient four colors', () => {
  const result = colorSetToEvenColorGradient([0xff0000, 0xffff00, 0x00ffff, 0x0000ff])
  expect(result.colorStops).toHaveLength(4)
  expect(result.colorStops[0].location).toEqual(0)
  expect(result.colorStops[1].location).toBeCloseTo(1 / 3)
  expect(result.colorStops[2].location).toBeCloseTo(2 / 3)
  expect(result.colorStops[3].location).toEqual(1)
})
