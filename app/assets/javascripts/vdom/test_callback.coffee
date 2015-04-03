list = [1, 2, 3]
callbacks = []
results = []

# for n in list
#   callbacks.push (x) -> x * n

for n in list
  do (n) ->
    callbacks.push (x) -> x * n

for cb in callbacks
  results.push cb(2)

console.log(results)
