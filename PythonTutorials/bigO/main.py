# def max_element(lst):
#    current_max = lst[0]
#    for element in lst: 
#        if element > current_max:
#            current_max = element

#    return current_max
import time 
import big_o

# O
def find_max_delayed(lst):
    time.sleep(2)
    return max(lst)

positive_int_gen = lambda n: big_o.datagen.integers(n, min_=0, max_=1000000)

# Calculate the time complexity of the max function with generated positive integers
best, others = big_o.big_o(find_max_delayed, positive_int_gen, n_repeats=1)

#print(max([1,5,3,12,5,1]))

print(best)