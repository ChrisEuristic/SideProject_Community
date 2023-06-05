### XSS 공격에 대한 Next.js 대응 방법
```javascript
module.exports = {
  async headers() {
    return [
      {
        key: 'X-XSS-Protection',
        value: '1; mode=block'
      }
    ]
  },
}
```
