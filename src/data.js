var categories = [
  {title: 'Oyster', description: 'oyster!', status: 1, slug: 'oyster'},
  {title: 'Mussel', description: 'mussel!', status: 1, slug: 'mussel'},
  {title: 'Crab', description: 'crab!', status: 1, slug: 'crab'},
  {title: 'Lobster', description: 'lobster!', status: 1, slug: 'lobster'},
]

var sequence = Promise.resolve()

categories.reverse().forEach((item, i) => {
  sequence = sequence.then(() => {return api.delay(2000*i)}).then(function () {
    return ajax().then((instance) => {
    api.post('categories', item)
    })
  })
})