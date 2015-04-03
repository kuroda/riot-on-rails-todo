list = [1, 2, 3]
list2 = [10, 20]
callbacks = []
results = []

# for n in list
#   callbacks.push (x) -> x * n

doubles = () ->
  #console.log(this)
  a = this
  for n in list
    for m in list2
      do (n) ->
        do (m) ->
          callbacks.push (x) -> x * n * m

doubles.call('a')

for cb in callbacks
  results.push cb(2)

#console.log(results)
