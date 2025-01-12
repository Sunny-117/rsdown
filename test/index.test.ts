import { describe, expect, it } from 'vitest'
import { transformToVar } from '../index.js'

describe('transformToVar', () => {
  it('should transform const and let declarations correctly', () => {
    const input = `
const x = 1;
let y = 2;
`
    const result = transformToVar(input)
    expect(result).toMatchInlineSnapshot(`
      "var x = 1;
      var y = 2;
      "
    `)
  })
  it('should transform const declarations inside a function', () => {
    const input = `
function myFunction() {
  const a = 5;
  let b = 10;
}
`
    const result = transformToVar(input)
    expect(result).toMatchInlineSnapshot(`
      "function myFunction() {
          var a = 5;
          var b = 10;
      }
      "
    `)
  })

  it.skip('should transform let declarations inside a class', () => {
    const input = `
class MyClass {
  x = 1;
  y = 2;
  
  constructor() {
    const a = 1;
    let b = 2;
  }
  
  method() {
    const c = 3;
    let d = 4;
  }
}
`
    const result = transformToVar(input)
    expect(result).toMatchInlineSnapshot(`
      "class MyClass {
          x = 1;
          y = 2;
          constructor() {
              var a = 1;
              var b = 2;
          }
          method() {
              var c = 3;
              var d = 4;
          }
      }
      "
    `)
  })

  it('should handle nested declarations', () => {
    const input = `
function outerFunction() {
  const outerVar = 1;
  function innerFunction() {
    let innerVar = 2;
  }
}
`
    const result = transformToVar(input)
    expect(result).toMatchInlineSnapshot(`
      "function outerFunction() {
          var outerVar = 1;
          function innerFunction() {
              var innerVar = 2;
          }
      }
      "
    `)
  })
  it.todo('should transform const function declarations', () => {
    const input = `
const myFunction = function() {
  const a = 5;
  let b = 10;
}
`
    const result = transformToVar(input)
    expect(result).toMatchInlineSnapshot(`
      "var myFunction = function() {
          var a = 5;
          var b = 10;
      };
      "
    `)
  })

  it.todo('should transform arrow function assigned to const', () => {
    const input = `
const arrowFunction = () => {
  const x = 1;
  let y = 2;
}
`
    const result = transformToVar(input)
    expect(result).toMatchInlineSnapshot(`
      "var arrowFunction = ()=>{
          const x = 1;
          let y = 2;
      };
      "
    `)
  })
})
